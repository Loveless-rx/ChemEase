import type { Atom, Molecule, Bond } from "../types/chem";
import { adjacency } from "./chemistry";
import { valenceMap } from "./valence";
import { validateMolecule } from "./validation";
export interface SmilesResult {
  smiles: string;
  error: string | null;
}
export function generateSmiles(m: Molecule): SmilesResult {
  if (!m.atoms.length) return { smiles: "", error: null };
  if (m.atoms.length > 1500)
    return {
      smiles: "",
      error: "SMILES export is limited to 1,500 drawn atoms.",
    };
  const vals = valenceMap(m);
  const issues = validateMolecule(m);
  if (
    issues.some(
      (w) =>
        w.severity === "error" ||
        /exceeds|Incomplete aromatic|Unsupported aromatic|Charged aromatic|Stereochemistry|Bond stereochemistry/.test(
          w.message,
        ),
    )
  )
    return {
      smiles: "",
      error:
        "Resolve valence, aromaticity or stereochemistry warnings before SMILES export.",
    };
  if (m.atoms.some((a) => vals.get(a.id)!.unsupported && a.element !== "R"))
    return {
      smiles: "",
      error: "SMILES unavailable for an unsupported element or charge state.",
    };
  const adj = adjacency(m),
    atomMap = new Map(m.atoms.map((a) => [a.id, a]));
  const visited = new Set<string>(),
    treeEdges = new Set<string>(),
    children = new Map<string, { id: string; bond: Bond }[]>(),
    roots: string[] = [];
  function walk(id: string) {
    visited.add(id);
    children.set(id, []);
    for (const n of adj.get(id) || [])
      if (!visited.has(n.atomId)) {
        treeEdges.add(n.bond.id);
        children.get(id)!.push({ id: n.atomId, bond: n.bond });
        walk(n.atomId);
      }
  }
  try {
    for (const a of m.atoms)
      if (!visited.has(a.id)) {
        roots.push(a.id);
        walk(a.id);
      }
    const closures = new Map<
      string,
      { label: string; bond: Bond; first: boolean }[]
    >();
    let ring = 0;
    for (const b of m.bonds)
      if (!treeEdges.has(b.id)) {
        ring++;
        if (ring > 99)
          return {
            smiles: "",
            error: "SMILES supports at most 99 ring closures.",
          };
        const label = ring < 10 ? `${ring}` : `%${ring}`;
        for (const [id, first] of [
          [b.atomA, true],
          [b.atomB, false],
        ] as const) {
          closures.set(id, [
            ...(closures.get(id) || []),
            { label, bond: b, first },
          ]);
        }
      }
    function bondSymbol(b: Bond) {
      if (b.type === "double") return "=";
      if (b.type === "triple") return "#";
      if (b.type === "aromatic") return "";
      return atomMap.get(b.atomA)?.aromatic && atomMap.get(b.atomB)?.aromatic
        ? "-"
        : "";
    }
    function token(a: Atom) {
      if (a.element === "R") return "*";
      const h = vals.get(a.id)!.implicitH;
      const symbol = a.aromatic ? a.element.toLowerCase() : a.element;
      const organic = [
        "B",
        "C",
        "N",
        "O",
        "P",
        "S",
        "F",
        "Cl",
        "Br",
        "I",
      ].includes(a.element);
      const needsBracket =
        !!a.isotope ||
        a.charge !== 0 ||
        !organic ||
        a.hydrogenOverride !== undefined ||
        (a.aromatic && a.element !== "C" && h > 0);
      if (!needsBracket) return symbol;
      const charge =
        a.charge === 0
          ? ""
          : `${a.charge > 0 ? "+" : "-"}${Math.abs(a.charge) > 1 ? Math.abs(a.charge) : ""}`;
      return `[${a.isotope || ""}${symbol}${h ? "H" + (h > 1 ? h : "") : ""}${charge}]`;
    }
    function render(id: string): string {
      let text = token(atomMap.get(id)!);
      for (const c of closures.get(id) || [])
        text += (c.first ? bondSymbol(c.bond) : "") + c.label;
      const next = children.get(id) || [];
      next.forEach((n, i) => {
        const part = bondSymbol(n.bond) + render(n.id);
        text += i < next.length - 1 ? `(${part})` : part;
      });
      return text;
    }
    return { smiles: roots.map(render).join("."), error: null };
  } catch {
    return { smiles: "", error: "This graph could not be serialized safely." };
  }
}
