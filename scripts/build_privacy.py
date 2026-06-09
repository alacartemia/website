from pathlib import Path
import html
import re

txt = Path(r"C:\Users\snir1\Downloads\Toast privacy policy.txt").read_text(encoding="utf-8")
headings = {
    "California Addendum",
    "US State Law Addendum",
    "Your Privacy Choices",
    "Changes to This Privacy Policy",
    "Contact Us",
    "Personal Information Collected Via the App",
    "How Your Personal Information is Used",
    "How Your Information Is Shared",
    "CCPA Categories of Personal Information",
    "Additional Disclosures of Personal Information",
    "Additional Rights Under US State Privacy Laws",
    "Sensitive Personal Information",
    "Right to Limit the Use of Sensitive Personal Information",
    "Personal Information Retention",
}

parts = []
in_list = False

def close_list():
    global in_list
    if in_list:
        parts.append("</ul>")
        in_list = False

for raw in txt.splitlines():
    line = raw.strip()
    if not line or line == "Powered by Toast":
        continue
    if line.startswith("Privacy Policy for"):
        continue
    if line.startswith("Last Updated"):
        continue
    if line in headings:
        close_list()
        parts.append(f"<h2>{html.escape(line)}</h2>")
        continue
    if line.startswith("•"):
        if not in_list:
            parts.append("<ul>")
            in_list = True
        parts.append(f"<li>{html.escape(line[1:].strip())}</li>")
        continue
    close_list()
    parts.append(f"<p>{html.escape(line)}</p>")

close_list()

content = "\n".join(parts)

page = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy | Á La Carte Miami</title>
  <link rel="icon" href="/assets/favicon/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container site-header__inner">
      <div aria-hidden="true"></div>
      <a class="site-header__logo" href="/"><img src="/assets/Logo/logo-white.png" alt="" width="180" height="48"></a>
      <div class="site-header__actions"><a class="btn btn--primary" href="/">Home</a></div>
    </div>
  </header>
  <main id="main" class="page-legal container">
    <h1>Privacy Policy</h1>
    <p class="page-legal__updated">A La Carte Miami Mobile App · Powered by Toast · Last Updated: 2/20/2025</p>
    {content}
    <p style="margin-top:2rem"><a href="/">← Back to home</a></p>
  </main>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__copy">&copy; Á La Carte Miami</p>
    </div>
  </footer>
</body>
</html>
"""

Path(r"C:\Users\snir1\ALACARTE\privacy.html").write_text(page, encoding="utf-8")
print("OK")
