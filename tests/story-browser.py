"""Browser QA for the scroll-driven WebGL introduction. Requires agent-browser."""
import subprocess,os,json,time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-story-test',AGENT_BROWSER_ARGS='--enable-unsafe-swiftshader,--use-gl=angle,--use-angle=swiftshader')
URL=os.environ.get('CHEMEASE_URL','file:///data/chemease-integrated/dist/ChemEase.html')
OUT=Path(os.environ.get('CHEMEASE_QA_DIR','/data/chemease-v2-qa'));OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=35)
 if p.returncode:raise RuntimeError(f'{args}: {p.stderr or p.stdout}')
 return p.stdout.strip()
def js(expr):
 d=json.loads(run('eval',f'JSON.stringify({expr})','--json'));return json.loads(d['data']['result'])
def check(name,condition):
 assert condition,name
 checks.append(name);print('PASS',name,flush=True)
def scroll(progress):
 run('eval',f'window.scrollTo(0,(document.querySelector(".scroll-intro").offsetHeight-innerHeight)*{progress})')
 run('wait','--fn',f'Math.abs(Number(document.querySelector(".story-stage").dataset.progress)-{progress})<.0005')
def shot(name):run('screenshot',str(OUT/name))
run('open',URL);run('set','media','light','no-preference');run('set','viewport','1440','900');run('eval','localStorage.clear();location.reload()');run('wait','--text','Start Creating');run('wait','--fn','document.querySelector(".webgl-scene")?.dataset.renderer==="webgl"')
check('Real WebGL context and shader-rendered scene active',js('document.querySelector(".webgl-scene").dataset.renderer')=='webgl')
check('Scene contains rendered nontransparent pixels',js('(()=>{const c=document.querySelector(".webgl-scene"),g=c.getContext("webgl"),b=new Uint8Array(c.width*c.height*4);g.readPixels(0,0,c.width,c.height,g.RGBA,g.UNSIGNED_BYTE,b);return b.some((n,i)=>i%4===3&&n>20)})()'))
shot('hero.png');initial=js('document.querySelector(".webgl-scene").dataset.camera')
scroll(.32);shot('draw.png');spread=js('Number(document.querySelector(".webgl-scene").dataset.spread)');camera=js('document.querySelector(".webgl-scene").dataset.camera');check('Scrolling dollies and orbits the camera',camera!=initial);check('Atoms separate and bonds dissolve with scroll',spread>2)
check('Full-screen stage stays pinned while document scrolls',js('Math.abs(document.querySelector(".story-stage").getBoundingClientRect().top)<1 && scrollY>500'))
check('Only the active chapter can receive keyboard focus',js('[...document.querySelectorAll("[data-chapter]")].filter(x=>!x.inert).length')==1)
scroll(.65);shot('analyze.png');check('Analysis stage reassembles the molecule',js('Number(document.querySelector(".webgl-scene").dataset.spread)')<.05)
check('Intro analysis is graph-derived benzene',js('document.querySelector(".intro-analysis .formula").textContent')=='C6H6')
scroll(.32);reverse=js('document.querySelector(".webgl-scene").dataset.camera');check('Reverse scrolling restores the same 3D camera',max(abs(float(a)-float(b)) for a,b in zip(camera.split(','),reverse.split(',')))<.01)
scroll(1);shot('create.png');check('Final chapter exposes the editor CTA',js('!document.querySelector(".chapter-create").inert'))
# Chapter links move the native document scroll; no wheel interception.
run('click','button[aria-label="Go to Discover chapter"]');run('wait','--fn','Number(document.querySelector(".story-stage").dataset.progress)<.0001');check('Chapter navigation rewinds the scroll story',js('scrollY')<1)
run('mouse','move','700','700');run('mouse','wheel','400');run('wait','--fn','Number(document.querySelector(".story-stage").dataset.progress)>.05');check('Native mouse-wheel scrolling drives the scene',js('scrollY')>0)
# Reduced motion is live, not just a CSS override of the renderer.
run('set','media','light','reduced-motion');scroll(.32);check('Reduced motion disables disassembly',js('Number(document.querySelector(".webgl-scene").dataset.spread)')==0);reducedCamera=js('document.querySelector(".webgl-scene").dataset.camera');scroll(.65);check('Reduced motion keeps the camera stationary',js('document.querySelector(".webgl-scene").dataset.camera')==reducedCamera);shot('reduced-motion.png')
# Restore animation preference, then check touch-size layouts.
run('set','media','light','no-preference');run('set','viewport','390','844');scroll(0);shot('mobile-hero.png');check('Mobile intro has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'))
scroll(.65);shot('mobile-analyze.png');scroll(1);shot('mobile-create.png')
run('set','viewport','1280','720');scroll(.65);shot('analyze-1280.png');check('1280×720 story fits horizontally',js('document.documentElement.scrollWidth<=innerWidth'))
# Simulate genuine GPU context loss: controls and fallback must remain usable.
run('eval','window.__lostContext=document.querySelector(".webgl-scene").getContext("webgl").getExtension("WEBGL_lose_context");window.__lostContext.loseContext()');run('wait','--fn','!!document.querySelector(".scene-fallback")');check('GPU context loss has an accessible fallback',js('!!document.querySelector(".scene-fallback")'));shot('fallback.png')
run('eval','window.__lostContext.restoreContext()');run('wait','--fn','!document.querySelector(".scene-fallback") && document.querySelector(".webgl-scene").dataset.renderer==="webgl"');check('WebGL context restoration recovers the scene',js('!document.querySelector(".scene-fallback")'))
run('set','viewport','1440','900');scroll(.65);run('a11y','--tags','wcag2a,wcag2aa','--json');(OUT/'intro-accessibility.json').write_text(run('a11y','--tags','wcag2a,wcag2aa','--json'))
run('eval','window.__sameDocument=true;window.__disposed=0;const gl=document.querySelector(".webgl-scene").getContext("webgl");const original=gl.deleteBuffer.bind(gl);gl.deleteBuffer=function(b){window.__disposed++;return original(b)}');run('click','.story-skip');run('wait','--text','Start drawing');check('Intro-to-editor transition does not reload the page',js('window.__sameDocument') is True);check('WebGL buffers are disposed on entering editor',js('window.__disposed')>=2);check('Editor replaces rather than hides the 3D scene',js('!document.querySelector(".webgl-scene") && !!document.querySelector("#molecular-canvas")'))
result={'passed':len(checks),'checks':checks};(OUT/'story-results.json').write_text(json.dumps(result,indent=2));print(json.dumps(result,indent=2),flush=True)
