"""Browser smoke tests. Requires agent-browser CLI and a served ChemEase build.
Run: CHEMEASE_URL=http://127.0.0.1:4173/ChemEase.html python3 tests/browser-smoke.py
Uses a dedicated test browser session; clears only this application's test-origin storage.
"""
import subprocess, json, os, time
from pathlib import Path
ENV=dict(os.environ,AGENT_BROWSER_SESSION='chemease-smoke')
URL=os.environ.get('CHEMEASE_URL','http://127.0.0.1:4173/ChemEase.html')
OUT=Path(os.environ.get('CHEMEASE_QA_DIR','/data'));OUT.mkdir(parents=True,exist_ok=True)
checks=[]
def run(*args):
 p=subprocess.run(['agent-browser',*map(str,args)],env=ENV,capture_output=True,text=True,timeout=30)
 if p.returncode:raise RuntimeError(f'{args}: {p.stderr or p.stdout}')
 return p.stdout.strip()
def js(expr):
 data=json.loads(run('eval',f'JSON.stringify({expr})','--json'))
 if not data.get('success'):raise RuntimeError(data)
 return json.loads(data['data']['result'])
def click(sel):run('click',sel)
def press(key):run('press',key)
def mouse(x,y):run('mouse','move',round(x),round(y))
def tap(x,y):mouse(x,y);run('mouse','down','left');run('mouse','up','left')
def formula():return run('get','text','[data-testid="formula"]')
def check(name,condition):
 assert condition,name
 checks.append(name);print('PASS',name,flush=True)
def atoms():return js("[...document.querySelectorAll('[data-atom]')].map(el=>{const p=new DOMPoint(0,0).matrixTransform(el.getScreenCTM());return{id:el.dataset.atom,x:p.x,y:p.y}})")
def bondpoint(i=0):return js(f"(()=>{{const r=document.querySelectorAll('[data-bond]')[{i}].getBoundingClientRect();return{{x:r.x+r.width/2,y:r.y+r.height/2}}}})()")
def tool(label):click(f'button[aria-label="{label}"]')
def screenshot(name):run('screenshot',str(OUT/name))
run('open',URL);run('set','viewport','1440','900');run('eval','localStorage.clear(); location.reload();');run('wait','--text','Start Creating')
click('.story-actions .primary');run('wait','--text','Start drawing')
check('Intro transitions to editor',js('!!document.querySelector("#molecular-canvas")'))
screenshot('chemease-empty.png')
r=js('document.querySelector("#molecular-canvas").getBoundingClientRect().toJSON()');cx=r['x']+r['width']/2;cy=r['y']+r['height']/2
# Actual pointer events, not direct calls to the state store.
tap(cx-100,cy);check('Carbon placement produces methane',formula()=='CH4')
tap(cx,cy-55);tool('Draw Oxygen');tap(cx+100,cy);check('Disconnected atoms analyzed independently',formula()=='C2H10O')
points=atoms();tool('Single bond tool');tap(points[0]['x'],points[0]['y']);tap(points[1]['x'],points[1]['y']);tap(points[1]['x'],points[1]['y']);tap(points[2]['x'],points[2]['y'])
check('Connecting atoms produces ethanol',formula()=='C2H6O')
check('SMILES derives from drawn graph',run('get','text','.smiles-value')=='CCO')
press('2');bp=bondpoint();tap(bp['x'],bp['y']);check('Bond-order edit updates hydrogens',formula()=='C2H4O')
press('Control+z');check('Keyboard undo restores chemistry',formula()=='C2H6O')
press('Control+Shift+z');check('Keyboard redo restores bond order',formula()=='C2H4O');press('Control+z')
press('e');tap(points[2]['x'],points[2]['y']);check('Erase removes atom and attached bond',formula()=='C2H6');press('Control+z')
press('l');mouse(cx-130,cy-90);run('mouse','down','left');mouse(cx+145,cy+40);run('mouse','up','left')
check('Lasso selects multiple atoms',js("document.querySelectorAll('.atom-shape.is-selected').length")==3)
press('v');mouse(points[0]['x'],points[0]['y']);run('mouse','down','left');mouse(points[0]['x']+35,points[0]['y']+24);run('mouse','up','left');after=atoms()
check('Selection drag moves the group',all(abs(after[i]['x']-points[i]['x']-35)<1 for i in range(3)))
press('Control+z');check('One undo restores entire drag',abs(atoms()[0]['x']-points[0]['x'])<1)
press('Escape');tool('Benzene ring tool');tap(cx-50,cy+170);check('Ring placement creates six real atoms',len(atoms())==9);press('Control+z');check('Ring insertion is one undo operation',len(atoms())==3)
press('v');points=atoms();tap(points[2]['x'],points[2]['y']);run('fill','input[aria-label="Selected atom charge"]','-1');check('Charge affects implicit hydrogens',formula()=='C2H5O');press('Tab');press('Escape');press('Control+z');check('Charge can be undone',formula()=='C2H6O')
# Zoom and pan.
z0=run('get','text','.zoom-percent');tool('Zoom in');check('Zoom control changes viewport',run('get','text','.zoom-percent')!=z0);click('.zoom-percent')
press('Escape');points=atoms();mouse(cx,cy+110);run('press','Space')
# Explicit pan tool avoids holding keyboard state across CLI commands.
tool('Pan tool');run('mouse','down','left');mouse(cx+30,cy+145);run('mouse','up','left');check('Pan updates atom screen positions',abs(atoms()[0]['x']-points[0]['x']-30)<1)
# Save and reload actual localStorage.
press('Control+s');check('Save writes graph locally',len(js('JSON.parse(localStorage.getItem("chemease.molecule.v1")).atoms'))==3)
run('eval','location.reload()');run('wait','--text','Molecule overview');check('Returning visit skips intro and restores saved molecule',formula()=='C2H6O')
click('button[title="New molecule (Ctrl/⌘ N)"]');run('find','role','button','click','--name','New molecule','--exact');check('New clears graph after confirmation',len(atoms())==0);press('Control+z');check('New is undoable',formula()=='C2H6O')
run('select','select[aria-label="Load example structure"]','aspirin');run('wait','--text','Aspirin');check('Aspirin example is a connected real graph',formula()=='C9H8O4')
screenshot('chemease-editor.png')
run('find','role','button','click','--name','Analyze Structure','--exact');check('Analysis modal opens',js('!!document.querySelector("[role=dialog]")'));check('Analysis displays real mass','180.16' in run('get','text','.analysis-content'));screenshot('chemease-analysis.png');press('Escape');check('Escape closes modal',not js('!!document.querySelector("[role=dialog]")'))
tool('Switch to dark theme');check('Theme persists',js('localStorage.getItem("chemease.theme")')=='dark');screenshot('chemease-dark.png')
run('set','viewport','1280','720');check('1280px editor has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'));screenshot('chemease-1280.png')
run('set','viewport','390','844');check('Mobile uses compact editor',js('getComputedStyle(document.querySelector(".mobile-notice")).display')!='none');check('Mobile has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'));screenshot('chemease-mobile-editor.png')
run('find','role','button','click','--name','Tools','--exact');check('Mobile chemistry tools can be opened',js('getComputedStyle(document.querySelector(".toolbar-container")).display')!='none');run('find','role','button','click','--name','Tools','--exact');run('find','role','button','click','--name','Info','--exact');check('Mobile information panel opens',js('getComputedStyle(document.querySelector(".info-container")).display')!='none')
run('set','viewport','1440','900');tool('Switch to light theme');press('Control+s');tool('Settings');run('find','role','button','click','--name','Replay introduction','--exact');run('wait','--text','Start Creating');run('set','viewport','390','844');screenshot('chemease-mobile-landing.png');check('Mobile landing has no horizontal overflow',js('document.documentElement.scrollWidth<=innerWidth'))
run('set','viewport','1440','900')
print(json.dumps({'passed':len(checks),'checks':checks},indent=2),flush=True)
(OUT/'chemease-browser-results.json').write_text(json.dumps({'passed':len(checks),'checks':checks},indent=2))
