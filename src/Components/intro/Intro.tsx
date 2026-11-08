import { useEffect, useMemo, useRef, useState } from "react";
import { Logo, Icon } from "../common/Icon";
import { Formula } from "../common/Formula";
import { MoleculeScene } from "./MoleculeScene";
import { chapterOpacity, clamp, sceneFrame } from "./sceneMath";
import { template } from "../../engine/templates";
import { analyzeMolecule } from "../../engine/analysis";
import { useUIStore } from "../../store/chemUIStore";
import "./Intro.css";

const chapters = ["Discover", "Draw", "Analyze", "Create"];
const stops = [0, 0.36, 0.65, 1];
export function Intro({ onEnter }: { onEnter: () => void }) {
  const root = useRef<HTMLElement>(null),
    canvas = useRef<HTMLCanvasElement>(null),
    stage = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0),
    [fallback, setFallback] = useState(false),
    [leaving, setLeaving] = useState(false),
    [contextEpoch, setContextEpoch] = useState(0);
  const theme = useUIStore((s) => s.theme);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analysis = useMemo(() => analyzeMolecule(template("benzene")), []);
  useEffect(
    () => () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
    },
    [],
  );

  useEffect(() => {
    const el = root.current!,
      surface = canvas.current!,
      stageEl = stage.current!;
    let renderer: MoleculeScene | null = null,
      alive = true,
      frameId = 0,
      dirty = true,
      previousTime = 0,
      current = 0,
      target = 0;
    let initializationReported = false;
    let lost = false,
      lastChapter = -1,
      pointer = { x: 0, y: 0 },
      pointerTarget = { x: 0, y: 0 };
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;
    try {
      renderer = new MoleculeScene(surface);
    } catch {
      surface.dataset.renderer = "fallback";
    }
    const cards = [...stageEl.querySelectorAll<HTMLElement>("[data-chapter]")];
    const progressLine = stageEl.querySelector<HTMLElement>(
      ".story-progress-fill",
    );
    const coordinate = stageEl.querySelector<HTMLElement>(".scene-coordinate");
    const setTarget = () => {
      const rect = el.getBoundingClientRect();
      target = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
      dirty = true;
    };
    const resize = () => {
      renderer?.resize();
      setTarget();
      dirty = true;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(stageEl);
    resize();
    const motionChange = () => {
      reduced = motionQuery.matches;
      el.dataset.reducedMotion = String(reduced);
      dirty = true;
    };
    motionChange();
    motionQuery.addEventListener("change", motionChange);
    const pointerMove = (e: PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      pointerTarget = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      dirty = true;
    };
    const pointerLeave = () => {
      pointerTarget = { x: 0, y: 0 };
      dirty = true;
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      surface.dataset.renderer = "fallback";
      setFallback(true);
    };
    const onRestored = () => setContextEpoch((value) => value + 1);
    const visibility = () => {
      dirty = true;
      previousTime = 0;
    };
    window.addEventListener("scroll", setTarget, { passive: true });
    window.addEventListener("resize", resize);
    stageEl.addEventListener("pointermove", pointerMove, { passive: true });
    stageEl.addEventListener("pointerleave", pointerLeave);
    surface.addEventListener("webglcontextlost", onLost);
    surface.addEventListener("webglcontextrestored", onRestored);
    document.addEventListener("visibilitychange", visibility);

    const render = (time: number) => {
      if (!alive) return;
      frameId = requestAnimationFrame(render);
      if (document.hidden) return;
      const dt = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      const damping = 1 - Math.exp(-dt / 70);
      if (
        !dirty &&
        Math.abs(target - current) < 0.00002 &&
        Math.abs(pointerTarget.x - pointer.x) < 0.001 &&
        Math.abs(pointerTarget.y - pointer.y) < 0.001
      )
        return;
      current = reduced ? target : current + (target - current) * damping;
      if (Math.abs(target - current) < 0.00002) current = target;
      pointer = reduced
        ? { x: 0, y: 0 }
        : {
            x: pointer.x + (pointerTarget.x - pointer.x) * damping,
            y: pointer.y + (pointerTarget.y - pointer.y) * damping,
          };
      if (!initializationReported) {
        setFallback(!renderer);
        initializationReported = true;
      }
      const scene = sceneFrame(current, window.innerWidth < 700, reduced);
      if (!lost) renderer?.render(scene, pointer, theme === "dark");
      stageEl.dataset.progress = current.toFixed(4);
      stageEl.style.setProperty("--story-progress", String(current));
      stageEl.style.setProperty("--scene-x", `${scene.position[0] * 7}%`);
      stageEl.style.setProperty("--scene-scale", String(scene.zoom));
      stageEl.style.setProperty("--halo-rotation", `${current * 140}deg`);
      const index =
        current < 0.235 ? 0 : current < 0.5 ? 1 : current < 0.82 ? 2 : 3;
      if (index !== lastChapter) {
        lastChapter = index;
        setChapter(index);
      }
      cards.forEach((card, i) => {
        const opacity = chapterOpacity(current, i);
        card.style.opacity = String(opacity);
        card.style.transform = reduced
          ? "none"
          : `translate3d(0,${(1 - opacity) * 22}px,0)`;
        card.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
        card.inert = opacity < 0.7;
        card.setAttribute("aria-hidden", String(opacity < 0.7));
      });
      if (progressLine) progressLine.style.transform = `scaleX(${current})`;
      if (coordinate)
        coordinate.textContent = `${String(Math.round(current * 100)).padStart(3, "0")} / 100`;
      dirty = false;
    };
    frameId = requestAnimationFrame(render);
    return () => {
      alive = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      renderer?.dispose();
      window.removeEventListener("scroll", setTarget);
      window.removeEventListener("resize", resize);
      stageEl.removeEventListener("pointermove", pointerMove);
      stageEl.removeEventListener("pointerleave", pointerLeave);
      surface.removeEventListener("webglcontextlost", onLost);
      surface.removeEventListener("webglcontextrestored", onRestored);
      document.removeEventListener("visibilitychange", visibility);
      motionQuery.removeEventListener("change", motionChange);
    };
  }, [theme, contextEpoch]);

  const go = (index: number) => {
    const el = root.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: start + stops[index] * (el.offsetHeight - window.innerHeight),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    enterTimer.current = setTimeout(
      onEnter,
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420,
    );
  };

  return (
    <main
      className={`scroll-intro ${leaving ? "is-entering" : ""} ${fallback ? "no-webgl" : ""}`}
      ref={root}
      data-active-chapter={chapter}
      aria-label="ChemEase interactive introduction"
    >
      <div className="story-stage" ref={stage}>
        <div className="scene-wash" />
        <div className="scene-halo halo-a" />
        <div className="scene-halo halo-b" />
        <div className="scene-floor" />
        <canvas
          className="webgl-scene"
          ref={canvas}
          role="img"
          aria-label="Scroll-controlled three-dimensional benzene molecule. Carbon and hydrogen spheres connected by bonds."
        />
        {fallback && (
          <div className="scene-fallback">
            <svg
              viewBox="0 0 400 400"
              role="img"
              aria-label="Benzene structure"
            >
              <g stroke="currentColor" fill="none" strokeWidth="3">
                <polygon points="300,200 250,286 150,286 100,200 150,114 250,114" />
                <circle cx="200" cy="200" r="65" strokeDasharray="7 6" />
              </g>
            </svg>
            <span>Reduced graphics · editor fully available</span>
          </div>
        )}
        <div className="story-readability" />
        <header className="story-nav">
          <Logo />
          <div className="story-nav-right">
            <span className="intro-build-label">THE MOLECULAR WORKSPACE</span>
            <button className="story-skip" onClick={enter}>
              Skip intro <Icon name="arrow" size={15} />
            </button>
          </div>
        </header>
        <div className="scene-topline">
          <span>
            <i /> A closer look at possibility.
          </span>
          <span>AN INTERACTIVE MOLECULAR STORY</span>
        </div>

        <section className="story-chapter chapter-discover" data-chapter="0">
          <span className="story-eyebrow">01 — A new perspective</span>
          <h1>
            Chemistry,
            <br />
            <em>Reimagined.</em>
          </h1>
          <p>
            Big discoveries begin
            <br />
            with the smallest connections.
          </p>
          <div className="story-actions">
            <button className="primary" onClick={enter}>
              Start Creating <Icon name="arrow" size={17} />
            </button>
            <button className="story-text-button" onClick={() => go(1)}>
              Explore the story <span>↘</span>
            </button>
          </div>
          <div className="story-footnote">
            Your browser. Your ideas. Your next discovery.
          </div>
        </section>

        <section
          className="story-chapter chapter-draw"
          data-chapter="1"
          aria-hidden="true"
        >
          <span className="story-eyebrow">02 — Find your building blocks</span>
          <h2>
            Start small.
            <br />
            <em>Connect anything.</em>
          </h2>
          <p>
            An atom becomes a bond.
            <br />A bond becomes a new possibility.
          </p>
          <div className="draw-sequence">
            <span>
              <b>C</b> Place
            </span>
            <i />
            <span>
              <Icon name="bond" size={20} />
              Connect
            </span>
            <i />
            <span>
              <Icon name="ring" size={21} />
              Build
            </span>
          </div>
          <span className="scene-microcopy">
            KEEP SCROLLING TO BRING IT TOGETHER
          </span>
        </section>

        <section
          className="story-chapter chapter-analyze"
          data-chapter="2"
          aria-hidden="true"
        >
          <span className="story-eyebrow">03 — See beneath the structure</span>
          <h2>
            More than
            <br />
            <em>meets the eye.</em>
          </h2>
          <p>
            Every connection tells a story.
            <br />
            Understand yours, as you draw.
          </p>
          <div className="intro-analysis">
            <div className="intro-analysis-header">
              <span>
                <i /> GRAPH-DERIVED ANALYSIS
              </span>
              <Icon name="flask" size={17} />
            </div>
            <div className="intro-analysis-primary">
              <div>
                <small>Molecular formula</small>
                <Formula value={analysis.formula} />
              </div>
              <div>
                <small>Molecular weight</small>
                <strong>
                  {analysis.weight?.toFixed(2)} <small>g/mol</small>
                </strong>
              </div>
            </div>
            <div className="intro-analysis-stats">
              <span>
                <b>{analysis.atoms}</b>drawn atoms
              </span>
              <span>
                <b>{analysis.bonds}</b>bonds
              </span>
              <span>
                <b>{analysis.rings}</b>ring
              </span>
            </div>
            <div className="intro-analysis-smiles">
              <span>SMILES</span>
              <code>{analysis.smiles}</code>
              <Icon name="check" size={14} />
            </div>
          </div>
        </section>

        <section
          className="story-chapter chapter-create"
          data-chapter="3"
          aria-hidden="true"
        >
          <span className="story-eyebrow">
            04 — From possibility to your canvas
          </span>
          <h2>
            Your next discovery.
            <br />
            <em>One bond away.</em>
          </h2>
          <button className="primary" onClick={enter}>
            Open ChemEase <Icon name="arrow" size={18} />
          </button>
          <p>No account. No installation. Just chemistry.</p>
        </section>

        <div className="molecule-identification">
          <span>01 / SPECIMEN</span>
          <strong>Benzene</strong>
          <span>C₆H₆ · illustrative geometry</span>
        </div>
        <div className="story-side-index" aria-hidden="true">
          <span>{String(chapter + 1).padStart(2, "0")}</span>
          <i />
          <span>04</span>
        </div>
        <footer className="story-footer">
          <div className="scroll-direction">
            <span className="scroll-mouse">
              <i />
            </span>
            <div>
              <strong>
                {chapter === 3 ? "Your canvas is ready" : "Scroll to discover"}
              </strong>
              <span>
                {chapter === 3
                  ? "Keep your curiosity moving."
                  : "You control the perspective."}
              </span>
            </div>
          </div>
          <nav
            className="chapter-navigation"
            aria-label="Introduction chapters"
          >
            {chapters.map((name, index) => (
              <button
                key={name}
                aria-label={`Go to ${name} chapter`}
                aria-current={chapter === index ? "step" : undefined}
                onClick={() => go(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {name}
                <i />
              </button>
            ))}
          </nav>
          <div className="story-coordinate">
            <span>SCROLL PROGRESS</span>
            <b className="scene-coordinate">000 / 100</b>
          </div>
        </footer>
        <div className="story-progress-track">
          <div className="story-progress-fill" />
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          Chapter {chapter + 1}: {chapters[chapter]}
        </span>
      </div>
    </main>
  );
}
