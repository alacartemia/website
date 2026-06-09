from pathlib import Path
from collections import Counter, defaultdict

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call(["pip", "install", "Pillow", "-q"])
    from PIL import Image

FOLDERS = [
    Path(r"C:\Users\snir1\Downloads\a la carte media\workingwebp"),
    Path(r"C:\Users\snir1\Downloads\a la carte media\more"),
    Path(r"C:\Users\snir1\Downloads\a la carte media\interior"),
]

EXTS = {".webp", ".jpg", ".jpeg", ".png", ".mp4", ".mov", ".webm"}

rows = []
by_folder = defaultdict(list)

for folder in FOLDERS:
    if not folder.exists():
        print(f"MISSING: {folder}")
        continue
    for p in sorted(folder.rglob("*")):
        if p.suffix.lower() not in EXTS or not p.is_file():
            continue
        info = {"folder": folder.name, "name": p.name, "path": str(p), "ext": p.suffix.lower(), "kb": p.stat().st_size / 1024}
        if p.suffix.lower() in {".webp", ".jpg", ".jpeg", ".png"}:
            try:
                with Image.open(p) as im:
                    info["w"], info["h"] = im.size
                    info["orient"] = "portrait" if im.height > im.width else ("landscape" if im.width > im.height else "square")
                    info["ratio"] = round(im.width / im.height, 2)
            except Exception as e:
                info["error"] = str(e)
        else:
            info["type"] = "video"
        rows.append(info)
        by_folder[folder.name].append(info)

print("=" * 60)
print("SUMMARY BY FOLDER")
print("=" * 60)
for fname, items in by_folder.items():
    imgs = [i for i in items if "w" in i]
    vids = [i for i in items if i.get("type") == "video"]
    print(f"\n{fname}/  total={len(items)}  images={len(imgs)}  videos={len(vids)}")
    if imgs:
        dims = Counter((i["w"], i["h"]) for i in imgs)
        print("  resolutions:")
        for (w, h), c in sorted(dims.items(), key=lambda x: -x[1])[:8]:
            print(f"    {w}x{h} x{c}")
        orients = Counter(i["orient"] for i in imgs)
        print(f"  orient: {dict(orients)}")
        sizes = [i["kb"] for i in imgs]
        print(f"  size KB: min={min(sizes):.0f} avg={sum(sizes)/len(sizes):.0f} max={max(sizes):.0f}")

print("\n" + "=" * 60)
print("ALL FILES")
print("=" * 60)
for i in rows:
    if "w" in i:
        print(f"[{i['folder']:12}] {i['name'][:55]:55} {i['w']:4}x{i['h']:<4} {i['orient']:10} {i['kb']:6.0f}KB")
    else:
        print(f"[{i['folder']:12}] {i['name'][:55]:55} VIDEO {i['kb']:6.0f}KB")

print(f"\nTOTAL FILES: {len(rows)}")
