(() => {
  "use strict";

  const TOAST_ORDER_URL =
    "https://order.toasttab.com/online/a-la-carte-613-w-hallandale-beach-blvd";

  const A11Y_KEY = "alc-a11y";

  /* Mobile navigation */
  const menuBtn = document.querySelector("[data-menu-open]");
  const mobileNav = document.getElementById("mobile-nav");
  const menuClose = document.querySelector("[data-menu-close]");
  const backdrop = document.querySelector(".mobile-nav__backdrop");

  function openMenu() {
    mobileNav?.classList.add("is-open");
    menuBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileNav?.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  backdrop?.addEventListener("click", closeMenu);

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("is-open")) {
      closeMenu();
      menuBtn?.focus();
    }
  });

  /* Set order links */
  document.querySelectorAll("[data-order-link]").forEach((el) => {
    el.setAttribute("href", TOAST_ORDER_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  /* Accessibility toolbar */
  const html = document.documentElement;
  const a11yToggle = document.querySelector("[data-a11y-toggle]");
  const a11yPanel = document.querySelector("[data-a11y-panel]");
  const saved = JSON.parse(localStorage.getItem(A11Y_KEY) || "{}");

  function applyA11y(settings) {
    html.classList.remove(
      "a11y-text-lg",
      "a11y-text-xl",
      "a11y-high-contrast",
      "a11y-highlight-links",
      "a11y-reduce-motion"
    );
    if (settings.textSize === "lg") html.classList.add("a11y-text-lg");
    if (settings.textSize === "xl") html.classList.add("a11y-text-xl");
    if (settings.highContrast) html.classList.add("a11y-high-contrast");
    if (settings.highlightLinks) html.classList.add("a11y-highlight-links");
    if (settings.reduceMotion) html.classList.add("a11y-reduce-motion");
    localStorage.setItem(A11Y_KEY, JSON.stringify(settings));
  }

  applyA11y(saved);

  a11yToggle?.addEventListener("click", () => {
    const open = a11yPanel?.classList.toggle("is-open");
    a11yToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll("[data-a11y-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-a11y-action");
      const current = JSON.parse(localStorage.getItem(A11Y_KEY) || "{}");

      switch (action) {
        case "text-lg":
          current.textSize = current.textSize === "lg" ? null : "lg";
          break;
        case "text-xl":
          current.textSize = current.textSize === "xl" ? null : "xl";
          break;
        case "contrast":
          current.highContrast = !current.highContrast;
          break;
        case "links":
          current.highlightLinks = !current.highlightLinks;
          break;
        case "motion":
          current.reduceMotion = !current.reduceMotion;
          break;
        case "reset":
          Object.keys(current).forEach((k) => delete current[k]);
          break;
        default:
          break;
      }
      applyA11y(current);
    });
  });

  document.addEventListener("click", (e) => {
    if (
      a11yPanel?.classList.contains("is-open") &&
      !e.target.closest(".a11y-toolbar")
    ) {
      a11yPanel.classList.remove("is-open");
      a11yToggle?.setAttribute("aria-expanded", "false");
    }
  });

  /* Contact form feedback (Netlify) */
  const params = new URLSearchParams(window.location.search);
  const formMsg = document.querySelector("[data-form-message]");
  if (params.get("sent") === "1" && formMsg) {
    formMsg.textContent = "Thank you — your message has been sent.";
    formMsg.classList.add("is-visible", "form-message--success");
  }

  /* Interior gallery scroll */
  const interiorScroll = document.getElementById("interior-scroll");
  const interiorPrev = document.querySelector("[data-interior-prev]");
  const interiorNext = document.querySelector("[data-interior-next]");

  function interiorScrollStep() {
    const item = interiorScroll?.querySelector(".interior-scroll__item");
    if (!item || !interiorScroll) return 280;
    const styles = getComputedStyle(interiorScroll);
    const gap = parseFloat(styles.columnGap || styles.gap) || 16;
    return item.offsetWidth + gap;
  }

  function scrollBehavior() {
    return document.documentElement.classList.contains("a11y-reduce-motion")
      ? "auto"
      : "smooth";
  }

  function updateInteriorNav() {
    if (!interiorScroll || !interiorPrev || !interiorNext) return;
    const { scrollLeft, scrollWidth, clientWidth } = interiorScroll;
    const maxScroll = scrollWidth - clientWidth;
    interiorPrev.disabled = scrollLeft <= 2;
    interiorNext.disabled = maxScroll <= 2 || scrollLeft >= maxScroll - 2;
  }

  interiorPrev?.addEventListener("click", () => {
    interiorScroll?.scrollBy({
      left: -interiorScrollStep(),
      behavior: scrollBehavior(),
    });
  });

  interiorNext?.addEventListener("click", () => {
    interiorScroll?.scrollBy({
      left: interiorScrollStep(),
      behavior: scrollBehavior(),
    });
  });

  interiorScroll?.addEventListener("scroll", updateInteriorNav, { passive: true });
  window.addEventListener("resize", updateInteriorNav);
  updateInteriorNav();
})();
