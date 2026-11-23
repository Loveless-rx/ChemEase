import { createClient } from "@supabase/supabase-js";

import { accountConfig } from "./config";
const {config,error}=accountConfig(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
export const accountConfigurationError=error;
export const supabase=config?createClient(config.url,config.key,{
  auth:{flowType:"pkce",persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},
}):null;
export function authRedirect(recovery=false) {
  const url=new URL(window.location.href);
  url.hash="";url.search="";
  if(recovery)url.searchParams.set("recovery","1");
  return url.toString();
}
