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

  const heroMobileVideo = document.querySelector(".hero__mobile video");

  function syncHeroMobileVideo() {
    if (!heroMobileVideo) return;
    const reduceMotion = document.documentElement.classList.contains("a11y-reduce-motion");
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const source = heroMobileVideo.querySelector("source");
    const poster = "/assets/hero/hero-poster-mobile.webp";

    if (reduceMotion || !isMobile) {
      heroMobileVideo.pause();
      if (source?.getAttribute("src")) {
        source.dataset.src = source.getAttribute("src");
        source.removeAttribute("src");
      }
      heroMobileVideo.removeAttribute("poster");
      heroMobileVideo.load();
      return;
    }

    if (source && !source.getAttribute("src") && source.dataset.src) {
      source.src = source.dataset.src;
    }
    if (!heroMobileVideo.getAttribute("poster")) {
      heroMobileVideo.setAttribute("poster", poster);
    }
    heroMobileVideo.muted = true;
    heroMobileVideo.play().catch(() => {});
  }

  if (heroMobileVideo) {
    heroMobileVideo.addEventListener("loadeddata", syncHeroMobileVideo);
  }

  syncHeroMobileVideo();
  window.addEventListener("resize", syncHeroMobileVideo);

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
      syncHeroMobileVideo();
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

  /* Contact form (Netlify) */
  const contactForm = document.querySelector(".contact-form");
  const formMsg = document.querySelector("[data-form-message]");
  const contactModal = document.querySelector("[data-contact-modal]");
  let contactModalTrigger = null;

  function openContactModal() {
    if (!contactModal) return;
    contactModalTrigger = document.activeElement;
    contactModal.hidden = false;
    contactModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-modal-open");
    contactModal.querySelector(".contact-modal__btn")?.focus();
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    contactModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-modal-open");
    contactModalTrigger?.focus();
  }

  contactModal?.querySelectorAll("[data-contact-modal-close]").forEach((el) => {
    el.addEventListener("click", closeContactModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal && !contactModal.hidden) {
      closeContactModal();
    }
  });

  function showContactSuccess() {
    if (formMsg) {
      formMsg.textContent = "";
      formMsg.classList.remove("is-visible", "form-message--success", "form-message--error");
    }
    openContactModal();
  }

  function showContactError() {
    if (!formMsg) return;
    formMsg.textContent = "Something went wrong. Please try again or email us directly.";
    formMsg.classList.add("is-visible", "form-message--error");
    formMsg.classList.remove("form-message--success");
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      submitBtn?.setAttribute("disabled", "disabled");

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(contactForm)).toString(),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Form submission failed");
          contactForm.reset();
          showContactSuccess();
        })
        .catch(() => {
          showContactError();
        })
        .finally(() => {
          submitBtn?.removeAttribute("disabled");
        });
    });
  }

})();
