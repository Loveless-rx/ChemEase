export const workspaceRoutes=["home","editor","projects","library","properties","drug-likeness","medicinal-chemistry","visualizations","comparison","batch","reports","solubility","admet"] as const;
export type WorkspaceRoute=typeof workspaceRoutes[number];
export const routeLabels:Record<WorkspaceRoute,string>={home:"Home",editor:"Editor",projects:"Projects",library:"Library",properties:"Properties","drug-likeness":"Drug-likeness","medicinal-chemistry":"Alerts",visualizations:"Visualizations",comparison:"Comparison",batch:"Batch",reports:"Reports",solubility:"Solubility",admet:"ADMET"};
export function parseRoute(hash:string):WorkspaceRoute {
  const value=hash.replace(/^#\/?/,"");
  return workspaceRoutes.includes(value as WorkspaceRoute)?value as WorkspaceRoute:"home";
}
