"""Exercise actual downloads, dialog keyboard behavior, and large-screen layouts."""
import os,subprocess,json,base64,time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-export')
URL=os.environ.get('CHEMEASE_URL','file:///data/chemease-integrated/dist/ChemEase.html')
OUT=Path('/data')
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=30)
 if p.returncode:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout.strip()
def js(expr):
 x=json.loads(run('eval',f'JSON.stringify({expr})','--json'));return json.loads(x['data']['result'])
def click(sel):run('click',sel)
run('open',URL);run('set','viewport','1440','900');run('eval','localStorage.clear(); location.reload();');run('wait','--text','Start Creating');click('.story-actions .primary');run('wait','--text','Start drawing');run('select','select[aria-label="Load example structure"]','aspirin');run('wait','--text','Aspirin')
# Capture the real Blob used by each download while preserving normal download behavior.
run('eval',"window.__downloads=[]; window.__blobs=new Map(); const originalURL=URL.createObjectURL; URL.createObjectURL=function(blob){const u=originalURL.call(URL,blob);window.__blobs.set(u,blob);return u}; const originalClick=HTMLAnchorElement.prototype.click; HTMLAnchorElement.prototype.click=function(){const blob=window.__blobs.get(this.href);if(blob){const row={name:this.download,type:blob.type,base64:null};window.__downloads.push(row);const reader=new FileReader();reader.onload=()=>row.base64=reader.result.split(',')[1];reader.readAsDataURL(blob)}return originalClick.call(this)}")
click('button.export-button');run('wait','--text','Take your chemistry with you')
for index,fmt in enumerate(['png','svg','json']):
 click(f'.export-option:nth-child({index+1})')
 run('wait','--fn',f'window.__downloads.length>{index} && window.__downloads[{index}].base64!==null')
 row=js(f'window.__downloads[{index}]');raw=base64.b64decode(row['base64']);(OUT/f'chemease-export-test.{fmt}').write_bytes(raw)
 assert len(raw)>100,fmt
 if fmt=='png':assert raw[:8]==b'\x89PNG\r\n\x1a\n'
 if fmt=='svg':assert b'<svg' in raw and b'<line' in raw
 if fmt=='json':assert len(json.loads(raw)['atoms'])==13
 print('PASS actual',fmt.upper(),'download:',row['name'],len(raw),'bytes',flush=True)
run('press','Escape');click('button[aria-label="Settings"]');run('screenshot','/data/chemease-settings.png');run('press','Tab');assert js('document.querySelector("[role=dialog]").contains(document.activeElement)');run('press','Shift+Tab');assert js('document.querySelector("[role=dialog]").contains(document.activeElement)');run('press','Escape');print('PASS dialog focus trap and Escape',flush=True)
for width,height in [(1920,1080),(2560,1440)]:
 run('set','viewport',width,height);assert js('document.documentElement.scrollWidth<=innerWidth && document.documentElement.scrollHeight<=innerHeight');print(f'PASS {width}×{height} layout',flush=True)
run('set','viewport','390','844');run('screenshot','/data/chemease-mobile-editor.png');r=js("(()=>{const svg=document.querySelector('#molecular-canvas').getBoundingClientRect();const atoms=[...document.querySelectorAll('[data-atom]')].map(el=>new DOMPoint(0,0).matrixTransform(el.getScreenCTM()));return atoms.every(p=>p.x>=svg.x&&p.x<=svg.right&&p.y>=svg.y&&p.y<=svg.bottom)})()");assert r;print('PASS responsive auto-fit keeps every atom in viewport',flush=True)
run('set','viewport','1440','900');run('a11y','--tags','wcag2a,wcag2aa','--json')
(OUT/'chemease-a11y.json').write_text(run('a11y','--tags','wcag2a,wcag2aa','--json'))
print('Export and responsive checks complete.',flush=True)
