import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Modal } from "../../Components/common/Modal";
import { Icon } from "../../Components/common/Icon";
import { downloadBlob } from "../../engine/export";
import { useMoleculeStore } from "../../store/moleculeStore";
import { useWorkspaceStore } from "../workspace/store";
import { LocalWorkspaceRepository } from "../workspace/repository";
import { applyGraph } from "../workspace/editorBridge";
import { mergeGuestWorkspace } from "./guestImport";
import { saveDockingFiles } from "./dockingCloud";
import { supabase, authRedirect, accountConfigurationError } from "./client";
import { initializeAccount, prepareAccountChange, reloadAccount, useAccount } from "./state";
import "./Account.css";

export function AccountBoundary({children}:{children:ReactNode}){
  const ready=useAccount(s=>s.ready),owner=useAccount(s=>s.user?.id??"guest");
  useEffect(()=>{initializeAccount();},[]);
  return <>{ready?<div className="account-scope" key={owner}>{children}</div>:<main className="account-loading" role="status"><Icon name="atom" size={36}/><h1>Opening ChemEase</h1><p>Connecting your workspace…</p></main>}<AccountDialog/></>;
}
export function AccountButton(){
  const user=useAccount(s=>s.user);
  return <button className="secondary account-button" onClick={()=>useAccount.setState({dialog:true})} aria-label={user?"Open account settings":"Sign in or register"}><Icon name="user" size={16}/><span>{user?"Account":"Sign in"}</span></button>;
}
export function AccountStatus(){
  const user=useAccount(s=>s.user),{pending,error,writable}=useWorkspaceStore();
  const [online,setOnline]=useState(navigator.onLine);
  useEffect(()=>{const update=()=>setOnline(navigator.onLine);window.addEventListener("online",update);window.addEventListener("offline",update);return()=>{window.removeEventListener("online",update);window.removeEventListener("offline",update);};},[]);
  const text=!user?"Guest · saved on this device":!online?"Offline · cloud saves unavailable":error?"Cloud save needs attention":pending?"Saving to your account…":writable?"Account workspace · cloud connected":"Cloud workspace unavailable";
  return <div className="account-status" role="status"><span className={error||!online?"account-dot warning":"account-dot"}/><span>{text}</span>{!user&&<button onClick={()=>useAccount.setState({dialog:true})}>Save across devices →</button>}</div>;
}
function AccountDialog(){
  const account=useAccount(),workspace=useWorkspaceStore();
  const [mode,setMode]=useState<"login"|"register"|"reset">("login"),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[confirm,setConfirm]=useState("");
  const [busy,setBusy]=useState(false),[error,setError]=useState(""),[message,setMessage]=useState("");
  const close=useCallback(()=>{if(!busy&&!useAccount.getState().recovery){useAccount.setState({dialog:false,error:""});setError("");setMessage("");setPassword("");setConfirm("");}},[busy]);
  const run=async(fn:()=>Promise<void>)=>{setBusy(true);setError("");setMessage("");try{await fn();}catch(e){setError(e instanceof Error?e.message:"This action could not be completed.");}finally{setBusy(false);}};
  const backup=()=>{
    const data=structuredClone(useWorkspaceStore.getState().data);data.draft=structuredClone(useMoleculeStore.getState().molecule);
    downloadBlob(new Blob([JSON.stringify(data)],{type:"application/json"}),"ChemEase-workspace-backup.json");
  };
  if(!account.dialog)return null;
  const recovery=account.recovery;
  return <Modal title={recovery?"Choose a new password":account.user?"Your ChemEase account":"Your chemistry, wherever you work"} onClose={close} className="account-modal">
    <div className="account-body"><div className="account-intro"><span className="account-emblem"><Icon name="atom" size={28}/></span><div><span className="eyebrow">CHEMEASE / PERSONAL WORKSPACE</span><p>{account.user?account.user.email:"Save molecules, research and docking results in your private workspace."}</p></div></div>
    {(error||account.error)&&<p className="account-alert" role="alert">{error||account.error}</p>}{message&&<p className="account-message" role="status">{message}</p>}
    {!supabase&&<p className="account-alert">{accountConfigurationError||"Account sign-in is not configured on this build yet."} Guest mode is ready to use. Add the Supabase project settings to enable accounts.</p>}
    {account.user&&!recovery?<div className="account-details">
      <div className="account-summary"><div><strong>{workspace.data.projects.length}</strong><span>Projects</span></div><div><strong>{workspace.data.versions.length}</strong><span>Saved versions</span></div><div><strong>{workspace.data.reports?.length??0}</strong><span>Reports</span></div></div>
      <p>Saved versions, analyses and report records belong to this account. Browser docking files are uploaded when you save a completed run to the workspace. Running jobs stay on the device where you start them.</p>
      <div className="account-actions"><button className="secondary" disabled={busy||!!workspace.pending} onClick={()=>void run(async()=>{await useWorkspaceStore.getState().draft(structuredClone(useMoleculeStore.getState().molecule));setMessage("Your current drawing is saved to your account.");})}>Retry saving drawing</button><button className="secondary" onClick={backup}>Download workspace backup</button><button className="secondary" disabled={busy||!!workspace.pending} onClick={()=>void run(async()=>{if(!window.confirm("Reload your saved cloud workspace? Unsaved changes in this tab will be replaced. Download a backup first if you need to keep them."))return;await reloadAccount();setMessage("Cloud workspace reloaded.");})}>Reload cloud data</button></div>
      <section className="account-import"><h3>Bring your guest work with you</h3><p>Copy this device’s guest projects and saved results into your account. The guest originals remain on this device. Existing account records are never overwritten.</p><button className="secondary" disabled={busy||!workspace.writable||!!workspace.pending} onClick={()=>void run(async()=>{
        await prepareAccountChange();const owner=account.user!.id;
        const guest=await new LocalWorkspaceRepository("local-device").load();
        if(!guest||(!guest.projects.length&&!guest.draft))throw new Error("There is no guest workspace to import on this device.");
        mergeGuestWorkspace(useWorkspaceStore.getState().data,guest);
        for(const r of guest.dockingRuns??[])if(r.result.execution?.kind==="browser-wasm")await saveDockingFiles(supabase!,owner,r.result,"local-device");
        await useWorkspaceStore.getState().transact(current=>{if(current.ownerId!==owner)throw new Error("The account changed during import.");return mergeGuestWorkspace(current,guest);});
        const draft=useWorkspaceStore.getState().data.draft;if(draft)applyGraph(draft);setMessage("Guest work copied to this account. Guest originals were kept.");
      })}>Copy guest work to my account</button></section>
      <p className="account-note">Cloud saving needs an internet connection. Failed saves are not marked as saved. Export a backup before reloading after a connection failure or conflict.</p>
      <button className="secondary" disabled={busy} onClick={()=>void run(async()=>{await prepareAccountChange();const {error}=await supabase!.auth.signOut({scope:"local"});if(error)throw error;useAccount.setState({dialog:false});setPassword("");})}>Sign out · return to guest</button>
    </div>:<>
      {!recovery&&<><div className="account-tabs" aria-label="Account access"><button aria-pressed={mode==="login"} onClick={()=>{setMode("login");setError("");setMessage("");}}>Sign in</button><button aria-pressed={mode==="register"} onClick={()=>{setMode("register");setError("");setMessage("");}}>Create account</button></div><button className="account-google secondary" disabled={!supabase||busy} onClick={()=>void run(async()=>{
        await prepareAccountChange();const {error}=await supabase!.auth.signInWithOAuth({provider:"google",options:{redirectTo:authRedirect(),queryParams:{prompt:"select_account"}}});if(error)throw error;
      })}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.89-1.74 2.98-4.3 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H3.05v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.92a6 6 0 0 1 0-3.84V7.49H3.05a10 10 0 0 0 0 9.02l3.35-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.95 5.49l3.35 2.59A5.99 5.99 0 0 1 12 5.96Z"/></svg>Continue with Google</button><div className="account-divider"><span>or use your email</span></div></>}
      <form className="account-form" onSubmit={e=>{e.preventDefault();void run(async()=>{
        if(!supabase)throw new Error("Supabase is not configured.");
        if((recovery||mode==="register")&&password!==confirm)throw new Error("The passwords do not match.");
        if(recovery){const {error}=await supabase.auth.updateUser({password});if(error)throw error;useAccount.setState({recovery:false});setPassword("");setConfirm("");setMessage("Password updated.");const url=new URL(location.href);url.searchParams.delete("recovery");history.replaceState(null,"",url);return;}
        if(mode==="reset"){const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:authRedirect(true)});if(error)throw error;setMessage("If this email has an account, a password-reset link will arrive shortly. Open it in this browser.");return;}
        await prepareAccountChange();
        if(mode==="register"){
          const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:authRedirect()}});if(error)throw error;
          setPassword("");setConfirm("");setMessage(data.session?"Your account is ready.":"Check your email to confirm your account. Open the link in this browser, then sign in.");
        }else{const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;setPassword("");useAccount.setState({dialog:false});}
      });}}>
        {!recovery&&<label>Email address<input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>}
        {(mode!=="reset"||recovery)&&<label>{recovery?"New password":"Password"}<input type="password" autoComplete={recovery||mode==="register"?"new-password":"current-password"} minLength={recovery||mode==="register"?8:undefined} required value={password} onChange={e=>setPassword(e.target.value)}/></label>}
        {(recovery||mode==="register")&&<label>Confirm password<input type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)}/><small>Use at least 8 characters.</small></label>}
        <button className="primary" disabled={!supabase||busy}>{busy?"Please wait…":recovery?"Update password":mode==="register"?"Create my account":mode==="reset"?"Send reset link":"Sign in"}</button>
      </form>
      {!recovery&&<><button className="account-link" disabled={busy} onClick={()=>{setMode(mode==="reset"?"login":"reset");setError("");setMessage("");}}>{mode==="reset"?"Back to sign in":"Forgot your password?"}</button>{mode==="register"&&<button className="account-link" disabled={busy||!supabase||!email} onClick={()=>void run(async()=>{const {error}=await supabase!.auth.resend({type:"signup",email,options:{emailRedirectTo:authRedirect()}});if(error)throw error;setMessage("Confirmation email requested. Check your inbox and spam folder.");})}>Resend confirmation email</button>}<button className="secondary account-guest" disabled={busy} onClick={()=>{useAccount.setState({guest:true});close();}}>Continue as guest</button><p className="account-note">Guest mode lets you draw, analyze and save locally. Exports and downloads require an account. Signing in opens a separate private workspace.</p></>}
    </>}
  </div></Modal>;
}
