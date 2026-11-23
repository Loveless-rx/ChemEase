export function accountConfig(url?:string,key?:string){
  if(!url?.trim()&&!key?.trim())return {error:"",config:null};
  try{
    if(!url?.trim()||!key?.trim())throw new Error("Set both the Supabase Project URL and publishable key.");
    const parsed=new URL(url.trim());
    if(parsed.protocol!=="https:"&&!(parsed.protocol==="http:"&&["localhost","127.0.0.1"].includes(parsed.hostname)))throw new Error("Use the HTTPS Supabase Project URL.");
    if(parsed.username||parsed.password||parsed.search||parsed.hash||parsed.pathname!=="/")throw new Error("Use the Supabase project origin without a path.");
    const publicKey=key.trim();
    if(publicKey.startsWith("sb_secret_"))throw new Error("A secret key cannot be used in a browser build. Use the publishable key.");
    if(!publicKey.startsWith("sb_publishable_")){
      const payload=JSON.parse(atob(publicKey.split(".")[1].replaceAll("-","+").replaceAll("_","/")));
      if(payload.role!=="anon")throw new Error("Only a publishable key or legacy anon key can be used.");
    }
    return {error:"",config:{url:parsed.origin,key:publicKey}};
  }catch(e){return {error:`Account configuration: ${(e as Error).message}`,config:null};}
}
