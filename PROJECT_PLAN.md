# A La Carte Miami — תוכנית פרויקט (מסמך פנימי)

> **לקוח:** A La Carte Miami — בית קפה / מסעדה  
> **סוג:** אתר סטטי (ללא Shop)  
> **רפרנס עיצוב:** [Erewhon](https://ship.erewhon.com/)  
> **תשתית:** GitHub + Netlify  
> **עדכון אחרון:** יוני 2026

---

## דומיין וחשבונות

| פריט | ערך |
|------|-----|
| **דומיין** | [https://alacartemia.com/](https://alacartemia.com/) |
| **מייל עסק (Google)** | info@alacartemia.com — מחובר ל-Google של העסק |
| **Contact / Forms** | info@alacartemia.com |
| **אתר נוכחי** | "Coming Soon" — ORDER HERE + Instagram בלבד |

### השלכות לפרויקט

**שלב 1 — DNS**
- הדומיין `alacartemia.com` כבר קיים — צריך **גישה ל-DNS** (Squarespace / רשם) לכיוון ל-Netlify
- Launch = החלפת האתר הנוכחי (Coming Soon) באתר החדש **על אותו דומיין**

**שלב 2 — Google**
- **Search Console** + **Analytics** — לרשום עם **info@alacartemia.com** (אותו חשבון Google של העסק)
- אימות דומיין: `alacartemia.com`

---

## תוכן עניינים

1. [סקירה כללית](#סקירה-כללית)
2. [מבנה האתר ותוכן](#מבנה-האתר-ותוכן)
3. [עיצוב](#עיצוב)
4. [נגישות](#נגישות)
5. [שלב 1 — עלייה לאוויר](#שלב-1--עלייה-לאוויר)
6. [שלב 2 — SEO Optimization](#שלב-2--seo-optimization)
7. [הצעת מחיר ללקוח](#הצעת-מחיר-ללקוח)
8. [תשתית טכנית](#תשתית-טכנית)
9. [Assets — מה צריך מהלקוח](#assets--מה-צריך-מהלקוח)
10. [אחסון סרטון Hero](#אחסון-סרטון-hero)
11. [Checklist לפני התחלה](#checklist-לפני-התחלה)
12. [Checklist Launch / העברה ללקוח](#checklist-launch--העברה-ללקוח)
13. [מה לא כלול](#מה-לא-כלול)
14. [הערכת זמן (פנימית)](#הערכת-זמן-פנימית)

---

## סקירה כללית

| פריט | פירוט |
|------|--------|
| **מטרה** | אתר סטטי פרימיום להצגת המותג, הזמנות (Toast), מיקומים, Contact |
| **שפה** | אנגלית |
| **דפים** | דף בית (עמוד אחד) + Privacy Policy + Accessibility Statement + 404 |
| **ללא** | Shop, CMS, חנות מוצרים |
| **CTA מרכזי** | ORDER NOW / Start Your Order → Toast |
| **דומיין** | alacartemia.com |
| **מייל** | info@alacartemia.com |
| **Hero desktop** | `assets/hero/hero-poster3.webp` (3612×1344, 21:9) ✓ |
| **Hero mobile** | `hero-poster-mobile.webp` (1536×2752, 9:16) ✓ |
| **Hero video** | TBD — poster slots ready |
| **Assets map** | `ASSETS_MAP.md` — full inventory + build mapping |
| **Favicon** | `assets/favicon/` ✓ (favicon.io + webmanifest) |
| **Site build** | Phase 1 ✓ — pending deploy |

---

## מבנה האתר ותוכן

### Header
- פס עליון בצבע **#171842** (Navy)
- **לוגו במרכז:** `assets/Logo/logo-white.png` (wordmark cream על navy)
- כפתור **ORDER NOW** — בולט (desktop + mobile)
- תפריט hamburger במובייל — **ORDER NOW** גם בתפריט הצד

### Hero ✓
- **Desktop:** `hero-poster3.webp` (21:9 ultrawide) via `<picture>`
- **Mobile:** `hero-poster-mobile.webp` (9:16 portrait) — `max-width: 767px`
- **SEO text:** H1 `Á La Carte Miami` · H2 tagline · location link → `#locations`
- **Layout:** text centered upper area (mobile) / vertically centered (desktop); **Start Your Order** fixed at bottom
- **Legacy alts:** `hero-poster.webp`, `hero-poster2.webp`, `hero-poster4.webp` — kept for comparison
- **Video:** TBD — same slot

### About ✓
```
A LA CARTE is food you can feel good about.
Thoughtfully prepared with no seed oils, coconut sugar only, minimally processed
ingredients, fresh produce delivered daily, high-protein options, full ingredient
transparency, and catering platters for every occasion.
Kosher Certified by ORB
```

**קישור Toast (מוגדר ב-`js/main.js`):**
```
https://order.toasttab.com/online/a-la-carte-613-w-hallandale-beach-blvd
```

### סקשני תמונות ✓

> פירוט מלא: **`ASSETS_MAP.md`**

| סקשן | תיקייה | קובץ מוביל |
|------|--------|------------|
| **Community / App** | `working/` | `ALC0047 copy.webp` (barista + apron) |
| **Food featured** | `Food2/` | `Nov 2025 - 35.webp` (landscape spread) |
| **Food grid** | `Food/` + `Food2/` | 14 JPG + Dec dishes WebP |
| **Our Space** | `interior/` | 7 gallery thumbs `*-.webp` @ 1000×1500 + scroll arrows |

### Community / App ✓
- `working/ALC0047 copy.webp`
- App Store / Google Play — **coming soon** (placeholder buttons)
- Mobile: centered buttons in `section--alt`

### Food ✓
- Featured: `Food2/Nov 2025 - 35.webp`
- Mosaic grid: 5 cells + desktop 2×2 large tile (CSS `100cqi`)
- Bugfix: Food2 paths — `ALC  -` (2 spaces) vs `ALC -` (1 space) for EXT files

### Interior / Our Space ✓
- Horizontal scroll gallery + prev/next nav + styled scrollbar
- Gallery uses reduced thumbs (`3-.webp` … `Int --.webp`) for performance
- Masters (3.4k–5.8k px) kept alongside for phase 2 / print

### Locations ✓
| מיקום | פרטים |
|--------|--------|
| **Hallandale Beach** | 613 W Hallandale Beach Blvd, Hallandale Beach, FL 33009, United States |
| **Bay Harbor** | Coming Soon |
| **מפה** | Google Maps embed / קישור |

### Contact ✓
- Netlify Forms → `/?sent=1` success message

### Footer ✓
- Instagram: https://www.instagram.com/alacartemia
- TikTok: https://www.tiktok.com/@alacartemia
- Privacy Policy | Accessibility Statement

### עמודים נוספים ✓

| עמוד | סטטוס |
|------|--------|
| **Privacy Policy** | ✓ `privacy.html` — Toast txt via `scripts/build_privacy.py` |
| **Accessibility Statement** | ✓ `accessibility.html` |
| **404** | ✓ `404.html` |

---

## עיצוב

### רפרנס
- [ship.erewhon.com](https://ship.erewhon.com/) — מינימליסטי, פרימיום, טיפוגרפיה נקייה, hero ויזואלי
- **ללא** סקשן Shop / מוצרים

### צבעי מותג

| שם | Hex | שימוש |
|----|-----|--------|
| **Navy** | `#171842` | פס header, כפתורים (ORDER NOW), accents, טקסט על רקע בהיר |
| **Cream** | `#FFF3D2` | **רקע האתר**, סקשנים בהירים, copy בהיר על navy |

> פרטים: `assets/colors.txt`

### Brand reference (sticker)
- **`assets/alc_sticker_page_1.png`** — sticker עגול (reference בלבד, לא header)

### לוגו ✓ — `assets/Logo/`

| קובץ | שימוש |
|------|--------|
| **logo-white.png** | Wordmark cream — **header navy** `#171842` |
| **logo-blue.png** | Wordmark navy — **רקע cream** `#FFF3D2` |
| **logo-icon-white.png** | Monogram ALC cream — רקע כהה |
| **logo-icon-blue.png** | Monogram ALC navy — רקע בהיר / favicon |

**כלל:** רקע כחול → לוגו בהיר | רקע בהיר → לוגו כחול  
פרטים: `assets/Logo/README.md`

### Favicon
- לייצר מ-`logo-icon-blue.png` או `Logo/social/icon-blue-social.png` (crop)

### Social / OG (pre-composed) ✓ — `Logo/social/`
- `logo-blue-social.png` — og-image, share (wordmark על cream)
- `logo-white-social.png` — navy card / stories
- `icon-*-social.png` — favicon backup

### נגישות צבעים
- contrast מינימום 4.5:1 (WCAG AA) — navy על cream

### Responsive ✓
- Desktop, tablet, mobile
- ORDER NOW בולט בכל breakpoint
- Hamburger **ימין** (LTR + centered logo); panel נפתח מימין
- Hero mobile: portrait image + text top + CTA bottom

### קבצי build ✓

```
index.html          — one-page site
css/styles.css      — design system
js/main.js          — nav, Toast links, a11y, interior scroll, form feedback
privacy.html
accessibility.html
404.html
netlify.toml
scripts/build_privacy.py
```

---

## נגישות

> **לא** widget חיצוני (UserWay / accessiBe) — בנייה מובנית מההתחלה.

### WCAG 2.1 AA — יסודות
- HTML סמנטי (`header`, `nav`, `main`, `footer`)
- Skip to content
- ניווט מקלדת (Tab, Enter, Escape)
- Focus visible — כולל ORDER NOW
- Alt text לכל תמונה
- `lang="en"`
- סרטון Hero: muted, `playsinline`, poster, ללא autoplay עם sound
- טופס Contact: labels, aria, הודעות שגיאה

### תפריט התאמות (Accessibility Toolbar)
כפתור קבוע (desktop + mobile):

| אפשרות | תיאור |
|--------|--------|
| הגדלת טקסט | +10% / +20% / איפוס |
| ניגודיות גבוהה | High contrast mode |
| הדגשת קישורים | underline + רקע |
| הפחתת תנוע | reduced motion |
| איפוס | חזרה לברירת מחדל |

- יישום: CSS classes על `<html>` + localStorage
- ללא ספרייה חיצונית

### Accessibility Statement
- מחויבות לנגישות
- תקן יעד: WCAG 2.1 Level AA
- תכונות: מקלדת, screen reader, תפריט התאמות
- דיווח: info@alacartemia.com
- תאריך עדכון

### שלב 2 (אופציונלי)
- Audit: axe / Lighthouse
- בדיקת VoiceOver / NVDA
- עדכון Accessibility Statement לפי ממצאים

---

## שלב 1 — עלייה לאוויר

**מחיר ללקוח:** $800  
**זמן ללקוח:** 2–3 ימי עבודה *(בכפוף ל-assets + DNS)*

### Scope

| # | פריט |
|---|------|
| 1 | עיצוב ופיתוח אתר סטטי | ✓ |
| 2 | Hero + Start Your Order / ORDER NOW → Toast | ✓ (poster; video TBD) |
| 3 | התאמה למחשב + מובייל | ✓ |
| 4 | מיקום + מפה (Hallandale + Bay Harbor Coming Soon) | ✓ |
| 5 | סושיאל: Instagram + TikTok | ✓ |
| 6 | טופס Contact → info@alacartemia.com | ✓ |
| 7 | נגישות: תפריט התאמות + הצהרת נגישות | ✓ |
| 8 | עמודים: Privacy Policy (Toast) + Accessibility | ✓ |
| 9 | SEO בסיסי: title, description, favicon, alt, H1/H2 | ✓ |
| 10 | תשתית GitHub (גיבוי קוד) | pending |
| 11 | מעבר לתשתית חדשה + אחסון Netlify | pending |
| 12 | חיבור דומיין | pending |

### תוצרים בסוף שלב 1
- אתר live על דומיין
- ORDER NOW → Toast
- Contact, Locations, Social
- Privacy + Accessibility
- תפריט נגישות
- Desktop + Mobile

---

## שלב 2 — SEO Optimization

**מחיר ללקוח:** $600  
**זמן ללקוח:** 1–2 ימי עבודה  
**דחיפות:** נמוכה יותר — אחרי Launch

### Scope

| # | פריט |
|---|------|
| 1 | Google Search Console — חשבון **info@alacartemia.com**, דומיין alacartemia.com |
| 2 | Google Analytics — אותו חשבון Google |
| 3 | Cookie notice (בהתאם ל-Analytics) |
| 4 | Media optimization — דחיסת תמונות |
| 5 | Open Graph — og:image, title, description |
| 6 | Structured Data — JSON-LD Restaurant / LocalBusiness |
| 7 | sitemap.xml + robots.txt |
| 8 | Audit נגישות (אופציונלי — לפי תקציב) |

### לא כלול בשלב 2
- Google Ads / קמפיינים
- SEO שוטף / בלוג
- ניהול Google Business Profile

> אופטימיזציות נוספות — לפי תקציב בהמשך.

---

## הצעת מחיר ללקוח

| שלב | תיאור | מחיר | זמן |
|-----|--------|------|-----|
| **1** | עלייה לאוויר — אתר + תשתית + נגישות | **$800** | 2–3 ימים |
| **2** | SEO Optimization | **$600** | 1–2 ימים |
| **סה"כ** | | **$1,400** | |

### הערות ללקוח (תשתית)
- **Netlify Free** — ~300 credits/חודש; מספיק לאתר סטטי
- כל deploy/שינוי צורך credits
- שדרוג ל-**Personal ~$9/חודש** רק במידת הצורך
- **נדרש:** גישה ל-DNS של **alacartemia.com** (Squarespace / רשם הדומיין)
- **Launch:** מחליף את [Coming Soon הנוכחי](https://alacartemia.com/) על אותו דומיין
- **שלב 1 הוא העיקר** — תשתית נכונה = בסיס לגוגל ומובייל

---

## תשתית טכנית

### Stack
```
HTML / CSS / JavaScript (static)
GitHub → Netlify (auto deploy)
Netlify Forms (Contact)
```

### זרימת עבודה (מומלץ)

```
פיתוח (אצלנו)
  ├── GitHub repo של המפתח
  ├── Netlify deploy לבדיקות (preview URL)
  └── push מ-Cursor

Launch (העברה ללקוח)
  ├── Transfer GitHub repo → חשבון הלקוח
  ├── Netlify: Import from Git / Transfer site (Support אם Free)
  ├── DNS → Netlify של הלקוח
  └── לקוח: owner מלא — billing, דומיין
```

### גישה ל-Netlify — אפשרויות

| אפשרות | Free | הערות |
|--------|------|--------|
| **Git collaborator** | ✓ | מומלץ — מפתח ב-repo, לקוח owner ב-Netlify |
| **Repo אצלנו → העברה** | ✓ | נוח לפיתוח; העברה לפני Launch |
| **מייל+סיסמה משותף** | ✓ | עובד; לא מומלץ — סיסמה זמנית, שנה אחרי Launch |
| **Developer role** | ✗ Free | רק ב-Pro ($20/חודש) |

### Netlify Free — מגבלות רלוונטיות
- **1** Team Owner (משתמש אחד)
- **~300** credits/חודש
- דומיין + SSL — כלול
- Forms — כלול (לאימות בחשבון)
- Reviewers — חינם (לא מספיק לפיתוח)

### חיבור דומיין (Squarespace)
1. לקוח נותן גישה ל-DNS ב-Squarespace
2. CNAME / A records → Netlify
3. SSL אוטומטי ב-Netlify
4. propagation: דקות עד 48 שעות

---

## Assets — מה צריך מהלקוח

### מבנה תיקיות

```
ALACARTE/
├── index.html                ✓
├── privacy.html              ✓
├── accessibility.html        ✓
├── 404.html                  ✓
├── netlify.toml              ✓
├── css/styles.css            ✓
├── js/main.js                ✓
├── scripts/build_privacy.py  ✓
├── assets/
│   ├── hero/
│   │   ├── hero-poster3.webp       ✓ active desktop
│   │   ├── hero-poster-mobile.webp  ✓ active mobile
│   │   └── hero-poster*.webp        alts / legacy
│   ├── interior/             7 masters + 7 *-.webp gallery
│   ├── Food/                 14 JPG
│   ├── Food2/                15 WebP
│   ├── working/              6 WebP
│   ├── Logo/                 ✓
│   ├── favicon/              ✓
│   └── colors.txt            ✓
├── ASSETS_MAP.md
├── PROJECT_PLAN.md
└── design-system/MASTER.md
```

### מפרט קבצים

| קובץ | מפרט |
|------|------|
| **logo** | PNG/SVG, רקע שקוף |
| **hero-video.mp4** | H.264, 1920×1080, 10–30 sec loop, ללא sound, **≤8MB** |
| **hero-poster.jpg** | 1920×1080, ~200–500KB |
| **community-app.jpg** | ~1200px רוחב |
| **section-feature.jpg** | ~1200px רוחב |
| **og-image.jpg** | 1200×630 |
| **favicon.ico** | 32×32 / 512×512 |
| **צבעים** | ✓ `#171842` + `#FFF3D2` — `colors.txt` |
| **sticker reference** | ✓ `alc_sticker_page_1.png` (לא לוגו) |

### קישורים חסרים מהלקוח
- [ ] קישור Toast נקי (ORDER NOW)
- [ ] App Store / Google Play
- [ ] דומיין + גישת Squarespace DNS

---

## אחסון סרטון Hero

| גודל | איפה |
|------|------|
| **≤ 8 MB** | `assets/hero-video.mp4` בפרויקט → Netlify |
| **> 8 MB** | CDN: Cloudinary / Bunny.net + poster מקומי |
| **YouTube embed** | לא מומלץ ל-Hero |

### דרישות `<video>`
- `autoplay` `muted` `loop` `playsinline`
- `poster="assets/hero-poster.jpg"`
- אופציונלי: poster only במובייל (חיסכון data)

### דחיסה (אם קובץ גדול)
- HandBrake, Cloudinary, FFmpeg (CRF 28–32)

---

## Checklist לפני התחלה

```
□ לוגו ✓ assets/Logo/ (white על navy header, blue על cream)
□ צבעים ✓ #171842 + #FFF3D2
□ favicon ✓ assets/favicon/
□ Hero poster desktop ✓ hero-poster3.webp (21:9)
□ Hero poster mobile ✓ hero-poster-mobile.webp (9:16)
□ סרטון Hero — TBD
□ Community ✓ ALC0047
□ Food + Interior galleries ✓
□ קישור Toast ✓ (js/main.js)
□ קישור אפליקציה — coming soon placeholders
□ אתר phase 1 ✓ built locally
□ GitHub repo — pending
□ Netlify + DNS — pending
□ גישה DNS → alacartemia.com
□ חשבון Google: info@alacartemia.com (לשלב 2)
```

---

## Checklist Launch / העברה ללקוח

```
□ QA — desktop + mobile (Chrome, Safari, iOS)
□ ORDER NOW → Toast עובד
□ Contact form → info@alacartemia.com
□ Privacy + Accessibility + 404
□ תפריט נגישות — כל האפשרויות
□ Tab navigation + focus states
□ Transfer GitHub repo → לקוח
□ Netlify — site בחשבון הלקוח
□ DNS → Netlify (SSL active)
□ לקוח שינה סיסמה (אם שיתוף גישה)
□ מפתח: collaborator על repo (אופציונלי — תחזוקה)
```

---

## מה לא כלול

| פריט |
|------|
| Shop / מוצרים |
| CMS / עריכה עצמית |
| Widget נגישות חיצוני |
| Terms of Service (אלא אם יתבקש) |
| Google Ads |
| SEO שוטף / בלוג |
| Audit נגישות מלא (שלב 2 — אופציונלי) |
| ניהול Google Business Profile |
| יצירת תוכן / copywriting (מלבד עיצוב טקסטים קיימים) |
| צילום / עריכת סרטון (מלבד דחיסה והטמעה) |

---

## הערכת זמן (פנימית)

### שלב 1

| משימה | שעות |
|--------|------|
| תשתית GitHub + Netlify + דומיין | 2–4 |
| עיצוב + פיתוח (Erewhon-style) | 5–7 |
| Responsive + mobile menu + ORDER NOW | 2–3 |
| תוכן + Privacy + Accessibility Statement | 2–3 |
| נגישות + תפריט התאמות | 3–5 |
| Assets + QA | 2–3 |
| תיקונים | 1–2 |
| **סה"כ** | **18–27 שעות** |

### שלב 2

| משימה | שעות |
|--------|------|
| SEO מתקדם (OG, Schema, sitemap) | 2–3 |
| Search Console + Analytics + Cookie | 1–1.5 |
| Media optimization | 1–2 |
| Audit נגישות (אופציונלי) | 2–4 |
| QA | 0.5–1 |
| **סה"כ** | **5–12 שעות** |

### תמחור פנימי

| שלב | מחיר | שעות | $/שעה (משוער) |
|-----|------|------|----------------|
| 1 | $800 | 18–27 | $30–44 |
| 2 | $600 | 5–12 | $50–120 |
| **סה"כ** | **$1,400** | | |

---

## טיימליין מומלץ

```
שבוע 1
  יום 1–2:  שלד + header/hero + ORDER NOW + Netlify
  יום 2–3:  סקשנים + responsive + Privacy/Accessibility
  יום 3–4:  נגישות + toolbar + QA
  יום 4–5:  העברה ללקוח + DNS + Launch

שבוע 2+ (אופציונלי)
  שלב 2: SEO + GSC + Analytics
```

---

## קישורים שימושיים

| משאב | URL |
|------|-----|
| רפרנס עיצוב | https://ship.erewhon.com/ |
| Toast Order | https://order.toasttab.com/online/a-la-carte-613-w-hallandale-beach-blvd |
| Instagram | https://www.instagram.com/alacartemia |
| TikTok | https://www.tiktok.com/@alacartemia |
| דומיין | https://alacartemia.com/ |
| Contact / Google | info@alacartemia.com |
| Netlify Pricing | https://www.netlify.com/pricing/ |
| Netlify Support (Site Transfer) | https://www.netlify.com/support/ |

---

## הערות פנימיות

- Privacy Policy מבוסס על **Toast Mobile App** — לוודא עם הלקוח אם צריך גרסה לאתר (לא רק אפליקציה).
- Bay Harbor — "Coming Soon" בלבד, ללא כתובת.
- אם הלקוח לא מספק סרטון — Hero עם `hero-poster.jpg` + ORDER NOW.
- Netlify credits: deployים תכופים בפיתוח — לצמצם rebuilds מיותרים.
- לא לcommit קבצים גדולים ל-Git — `.gitignore` לווידאו >8MB + CDN.

---

*מסמך פנימי — A La Carte Miami website project*
