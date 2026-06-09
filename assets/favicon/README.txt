Favicon package — from favicon.io ✓

Files (standard complete set):
  favicon.ico                 16 + 32 + 48 embedded
  favicon-16x16.png
  favicon-32x32.png
  apple-touch-icon.png        180×180
  android-chrome-192x192.png
  android-chrome-512x512.png
  site.webmanifest

Fix at build time (site.webmanifest):
  - name / short_name → "Á La Carte" or "A La Carte Miami"
  - icons src paths → /assets/favicon/android-chrome-*.png
  - theme_color → #171842
  - background_color → #FFF3D2

HTML (when building):
  <link rel="icon" href="/assets/favicon/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="/assets/favicon/site.webmanifest">
