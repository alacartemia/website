# Food images — inventory (22 files)

Scanned: assets/Food/
All images: JPG, width fixed at **1024px**

## By resolution / use case

| Resolution | Count | Ratio | Best for |
|------------|-------|-------|----------|
| **1024×576** | 2 | 16:9 landscape | Desktop wide sections, hero poster candidate |
| **1024×683** | 1 | 3:2 landscape | Desktop / tablet banner |
| **1024×1280** | 3 | 4:5 portrait | Section blocks (balanced mobile + desktop) |
| **1024×1535** | 13 | 2:3 portrait | Mobile-first sections, tall image columns |
| **1024×1536** | 3 | 2:3 portrait | Same as above |

## File list

### Landscape — desktop / wide
| File | Size | WxH | KB |
|------|------|-----|-----|
| alacarte8089.jpg | hero-style spread (many dishes + drinks) | 1024×576 | 168 |
| alacarte8096.jpg | | 1024×576 | 157 |
| alacarte8152.jpg | | 1024×683 | 149 |

### Portrait 4:5
| File | WxH | KB |
|------|-----|-----|
| alacarte8131.jpg | 1024×1280 | 315 |
| alacarte8149.jpg | 1024×1280 | 337 |
| alacarte8151.jpg | 1024×1280 | 327 |

### Portrait 2:3 (1024×1535)
alacarte8103, 8106, 8109, 8110, 8111, 8112, 8116, 8117, 8120, 8122, 8127, 8143, 8154

### Portrait 2:3 (1024×1536)
alacarte8136, 8142, 8148

## Suggested mapping (draft — confirm at build)

| Site slot | Suggested file | Why |
|-----------|----------------|-----|
| `section-feature.jpg` (desktop) | alacarte8089.jpg | Wide spread, brand feel |
| `section-feature.jpg` (mobile alt) | alacarte8106.jpg or alacarte8131.jpg | Strong single-plate portrait |
| `community-app.jpg` | alacarte8149.jpg or alacarte8151.jpg | 4:5 works in split layout |
| `hero-poster.jpg` | alacarte8089.jpg | Landscape, full menu vibe |

Implementation: use `<picture>` — landscape src for `(min-width: 768px)`, portrait for mobile.

## Notes
- All files web-ready (~150–370 KB). Phase 2 can compress further.
- Not renamed yet — at build, copy winners to root `assets/` names or reference from `Food/`.
- Run scan again: `python scripts/scan_food_images.py`
