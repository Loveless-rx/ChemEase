"""Generate full source book, checksums and the integrated source archive.
Run from the project root: python3 tools/package.py
"""
from pathlib import Path
import hashlib,json,zipfile,os
root=Path.cwd()
excluded={'node_modules','.test-build','.cache','.git','dist','backup','qa','__pycache__','.venv','.data','bin','.pytest_cache'}
generated={'COMPLETE_SOURCE.md','FILES.json'}
text_files=[]
for directory,dirs,names in os.walk(root):
 dirs[:]=[name for name in dirs if name not in excluded]
 for name in names:
  p=Path(directory)/name
  if p.is_symlink() or name in generated or (name.startswith('.env') and name!='.env.example') or p.suffix in {'.log','.zip','.pyc'}:continue
  text_files.append(p)
text_files.sort()

baseline={}
backup=root/'backup/original-source.zip'
if backup.exists():
 with zipfile.ZipFile(backup) as z:
  baseline={n.removeprefix('chemease-original/'):z.read(n) for n in z.namelist() if not n.endswith('/')}
def state(p):
 key=p.relative_to(root).as_posix()
 if key not in baseline:return 'CREATE NEW FILE'
 return 'RETAIN FILE' if baseline[key]==p.read_bytes() else 'REPLACE FILE'
book=['# ChemEase — complete integrated source files\n\nEvery text source/config file is included in full and labelled by its exact path and status relative to the uploaded project. Binary deliverables and the original-source backup are separate ZIP entries. FILES.json records checksums; this book and the manifest do not recursively include themselves.\n\n## File index\n']
for p in text_files:book.append(f'- `{p.relative_to(root).as_posix()}` — {state(p)}\n')
for p in text_files:
 name=p.relative_to(root).as_posix();content=p.read_text();language={'.tsx':'tsx','.ts':'typescript','.mjs':'javascript','.py':'python','.css':'css','.json':'json','.html':'html','.svg':'xml','.md':'markdown'}.get(p.suffix,'text')
 fence='````'
 while fence in content:fence+='`'
 book.extend([f'\n## {state(p)}\n\nFILE: `{name}`\n\n',f'{fence}{language}\n{content.rstrip()}\n{fence}\n'])
(root/'COMPLETE_SOURCE.md').write_text(''.join(book))
files=text_files+[root/'COMPLETE_SOURCE.md',root/'dist/ChemEase.html']
if backup.exists():files.append(backup)
manifest={'project':'ChemEase integrated scroll-WebGL edition','textSourceFileCount':len(text_files),'files':[{'path':p.relative_to(root).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
(root/'FILES.json').write_text(json.dumps(manifest,indent=2)+'\n')
archive=root.parent/'ChemEase-integrated-source.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for p in files+[root/'FILES.json']:z.write(p,'chemease/'+p.relative_to(root).as_posix())
with zipfile.ZipFile(archive) as z:
 assert z.testzip() is None
 assert not any(any(part=='node_modules' or (part.startswith('.env') and part!='.env.example') for part in Path(n).parts) for n in z.namelist())
 assert 'chemease/src/Components/intro/MoleculeScene.ts' in z.namelist()
 assert 'chemease/package-lock.json' in z.namelist()
print(json.dumps({'archive':str(archive),'textSourceFiles':len(text_files),'zipBytes':archive.stat().st_size,'sourceBookBytes':(root/'COMPLETE_SOURCE.md').stat().st_size},indent=2))
