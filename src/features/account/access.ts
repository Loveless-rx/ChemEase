let allowed=false;
let prompt:()=>void=()=>{};
export function configureExportAccess(account:boolean,onRequired:()=>void){allowed=account;prompt=onRequired;}
export function requireExportAccount(){if(allowed)return true;prompt();return false;}
