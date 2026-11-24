let allowed=false;
let prompt:()=>void=()=>{};
export function configureExportAccess(account:boolean,onRequired:()=>void){allowed=account;prompt=onRequired;}
export function requireExportAccount(){if(allowed)return true;prompt();return false;}

let identity="";
export function setExportIdentity(value:string){identity=value.replace(/[\r\n\t]/g," ").trim().slice(0,254);}
export function exportIdentity(){return identity;}
