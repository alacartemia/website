from pathlib import Path
from collections import Counter

try:
    from PIL import Image
except ImportError:
    import subprocess
    subprocess.check_call(["pip", "install", "Pillow", "-q"])
    from PIL import Image

folder = Path(r"C:\Users\snir1\ALACARTE\assets\Food")
rows = []
for p in sorted(folder.glob("*.jpg")):
    with Image.open(p) as im:
        w, h = im.size
    orient = "portrait" if h > w else ("landscape" if w > h else "square")
    ratio = round(w / h, 2) if h else 0
    kb = p.stat().st_size / 1024
    rows.append((p.name, w, h, orient, ratio, kb))

dims = Counter((w, h) for _, w, h, _, _, _ in rows)
print("=== SUMMARY ===")
print(f"Total files: {len(rows)}")
print(f"Unique resolutions: {len(dims)}")
print()
for (w, h), c in sorted(dims.items(), key=lambda x: (-x[0][0], -x[0][1])):
    if h > w and w <= 900:
        label = "mobile / portrait"
    elif w >= h and w >= 1200:
        label = "desktop / landscape"
    elif w >= 1000:
        label = "large square-ish"
    else:
        label = "other"
    print(f"  {w}x{h}  x{c}  ({label})")
print()
print("=== ALL FILES ===")
for name, w, h, orient, ratio, kb in rows:
    print(f"{name:22} {w:4}x{h:<4} {orient:10} ratio={ratio:<5} {kb:6.0f} KB")
