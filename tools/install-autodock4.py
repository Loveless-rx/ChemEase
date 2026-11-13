"""Install verified official Windows AD4/AutoGrid binaries without running an installer.

Requires 7-Zip. On other platforms configure native binaries using backend env vars.
"""
import hashlib
import os
import platform
import shutil
import subprocess
import tempfile
import urllib.request
from pathlib import Path

BASE="https://autodock.scripps.edu/wp-content/uploads/sites/56/2021/10/"
PACKAGE="autodocksuite-4.2.6.i86Windows.exe"
PACKAGE_SHA="306dc72a06e80a2da6f3c410ac6aba7ebdaeef6b702eca42de44c7c6c9d48755"
HASHES={"autodock4.exe":"36c0b16c04d7df8e6225737bae65bb04058d1f4c90accfaf2d230dbc913954bf","autogrid4.exe":"797efce687d1ae82df59726461e0e1966b3d8edb0f8b187f982fa1ab0c12da9e"}


def main():
    if platform.system()!="Windows" or platform.machine().lower() not in ("amd64","x86_64","x86","i386","i686"):
        raise SystemExit("This installer verifies the official Windows package only. See backend/README.md for native AutoDock 4/AutoGrid 4 configuration.")
    seven=shutil.which("7z") or str(Path(os.environ.get("ProgramFiles","C:/Program Files"))/"7-Zip"/"7z.exe")
    if not Path(seven).is_file():raise SystemExit("Install official 7-Zip, or configure existing AutoDock 4 and AutoGrid 4 paths. The suite installer is not executed automatically.")
    target=Path(__file__).resolve().parents[1]/"backend"/"bin"
    with tempfile.TemporaryDirectory(prefix="chemease-ad4-") as temp:
        folder=Path(temp);archive=folder/PACKAGE
        data=urllib.request.urlopen(BASE+PACKAGE,timeout=60).read(5*1024*1024)
        if hashlib.sha256(data).hexdigest()!=PACKAGE_SHA:raise SystemExit("Official package checksum changed; nothing was installed.")
        license_text=urllib.request.urlopen("https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt",timeout=30).read(100000)
        if hashlib.sha256(license_text).hexdigest()!="edaef632cbb643e4e7a221717a6c441a4c1a7c918e6e4d56debc3d8739b233f6":raise SystemExit("GPL license checksum changed; nothing was installed.")
        archive.write_bytes(data)
        subprocess.run([seven,"e",str(archive),*HASHES,f"-o{folder}","-y"],check=True,capture_output=True)
        for name,expected in HASHES.items():
            if hashlib.sha256((folder/name).read_bytes()).hexdigest()!=expected:raise SystemExit("Extracted binary checksum mismatch; nothing was installed.")
        target.mkdir(parents=True,exist_ok=True)
        for name in HASHES:shutil.copyfile(folder/name,target/name)
        (target/"AUTODOCK4-COPYING.txt").write_bytes(license_text)
    (target/"AUTODOCK4-NOTICE.txt").write_text("AutoDock 4.2.6 and AutoGrid 4.2.6. Copyright The Scripps Research Institute. GNU GPL version 2 or later. Official binaries and corresponding source: https://autodock.scripps.edu/download-autodock4/ . License: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html . Package SHA256: "+PACKAGE_SHA+"\n")
    print("Installed verified official AutoDock 4.2.6 and AutoGrid 4.2.6 into "+str(target))


if __name__=="__main__":main()
