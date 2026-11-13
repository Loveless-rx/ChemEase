"""Download the pinned official Vina release into backend/bin; verify before use."""
import hashlib
import platform
import urllib.request
from pathlib import Path

HASHES = {
    "win.exe": "e0c4b2715e0c1a74f6e92d0f3be0328ac97542eafbc111e6b1efad897a73cce5",
    "linux_x86_64": "f31f774f723bba7bbe6e9d1c47577020eea9a8da16424284c043d22593570644",
    "linux_aarch64": "d30c18a7d5f6f8ea9146e1cbc0aa7ade0bbb105b54ece08b4e5a7fa53edb6c62",
    "mac_x86_64": "9f44ccbb163223613283a75d0be53235d9e63f4da08292cb7196144f9838b7f9",
    "mac_aarch64": "823c2bbacf26d72183861322345f0a89736aca66c8e81054c66f93af5ad623f1",
}
system=platform.system();arch="aarch64" if platform.machine().lower() in ("arm64","aarch64") else "x86_64"
key="win.exe" if system=="Windows" else ("mac_" if system=="Darwin" else "linux_")+arch
if key not in HASHES:raise SystemExit("Unsupported platform; configure CHEMEASE_VINA manually.")
folder=Path(__file__).resolve().parents[1]/"backend"/"bin";folder.mkdir(parents=True,exist_ok=True)
target=folder/("vina.exe" if system=="Windows" else "vina")
url=f"https://github.com/forlilab/AutoDock-Vina/releases/download/v1.2.7/vina_1.2.7_{key}"
data=urllib.request.urlopen(url,timeout=120).read(10*1024*1024)
if hashlib.sha256(data).hexdigest()!=HASHES[key]:raise SystemExit("Vina checksum mismatch; binary was not installed.")
target.write_bytes(data);target.chmod(target.stat().st_mode|0o111)
license_data=urllib.request.urlopen("https://raw.githubusercontent.com/forlilab/AutoDock-Vina/v1.2.7/LICENSE",timeout=30).read(100000)
(folder/"LICENSE.txt").write_bytes(license_data)
print(f"Installed official AutoDock Vina 1.2.7: {target}; SHA256 {HASHES[key]}")
