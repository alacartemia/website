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

  const heroVideo = document.getElementById("hero-video");
  const HERO_SOURCES = {
    desktop: "/assets/hero/hero-desktop.mp4",
    mobile: "/assets/hero/hero-mobile.mp4",
  };
  const HERO_POSTERS = {
    desktop: "/assets/hero/hero-poster3.webp",
    mobile: "/assets/hero/hero-poster-mobile.webp",
  };

  function heroIsMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function heroPoster() {
    return heroIsMobile() ? HERO_POSTERS.mobile : HERO_POSTERS.desktop;
  }

  function heroSource() {
    return heroIsMobile() ? HERO_SOURCES.mobile : HERO_SOURCES.desktop;
  }

  function setHeroSource() {
    if (!heroVideo) return false;
    const source = heroVideo.querySelector("source");
    const nextSrc = heroSource();
    if (!source || source.getAttribute("src") === nextSrc) return false;
    source.src = nextSrc;
    heroVideo.load();
    return true;
  }

  function heroReduceMotion() {
    return document.documentElement.classList.contains("a11y-reduce-motion");
  }

  function restartHeroVideo() {
    if (!heroVideo || heroReduceMotion()) return;

    heroVideo.loop = true;
    heroVideo.muted = true;

    if (
      heroVideo.ended ||
      (Number.isFinite(heroVideo.duration) &&
        heroVideo.duration > 0 &&
        heroVideo.currentTime >= heroVideo.duration - 0.05)
    ) {
      heroVideo.currentTime = 0;
    }

    const playPromise = heroVideo.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }

  function syncHeroVideo() {
    if (!heroVideo) return;
    const sourceChanged = setHeroSource();

    if (heroReduceMotion()) {
      heroVideo.pause();
      heroVideo.setAttribute("poster", heroPoster());
      heroVideo.classList.add("is-ready");
      return;
    }

    heroVideo.removeAttribute("poster");
    heroVideo.loop = true;
    if (sourceChanged) {
      heroVideo.classList.remove("is-ready");
    }
    restartHeroVideo();
  }

  heroVideo?.addEventListener("playing", () => {
    heroVideo.removeAttribute("poster");
    heroVideo.classList.add("is-ready");
  });

  heroVideo?.addEventListener("canplay", () => {
    if (heroReduceMotion() || heroVideo.paused) return;
    heroVideo.classList.add("is-ready");
  });

  heroVideo?.addEventListener("ended", () => {
    heroVideo.currentTime = 0;
    restartHeroVideo();
  });

  const heroSection = document.getElementById("hero");
  if (heroVideo && heroSection && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            restartHeroVideo();
          }
        });
      },
      { threshold: 0.12 }
    );
    heroObserver.observe(heroSection);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      restartHeroVideo();
    }
  });

  syncHeroVideo();
  window.addEventListener("resize", syncHeroVideo);

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
      syncHeroVideo();
      if (document.documentElement.classList.contains("a11y-reduce-motion")) {
        stopCarouselAutoplay();
      } else {
        startCarouselAutoplay();
      }
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

  /* Highlights carousel */
  const carouselScroll = document.getElementById("highlights-carousel");
  const carouselPrev = document.querySelector("[data-carousel-prev]");
  const carouselNext = document.querySelector("[data-carousel-next]");
  const carouselGallery = document.querySelector(".carousel-gallery");
  const highlightsSection = document.getElementById("highlights");
  const CAROUSEL_INTERVAL = 4500;
  let carouselTimer = null;
  let carouselResumeTimer = null;
  let carouselInView = false;

  function carouselScrollStep() {
    const item = carouselScroll?.querySelector(".carousel-slide");
    if (!item || !carouselScroll) return 280;
    const styles = getComputedStyle(carouselScroll);
    const gap = parseFloat(styles.columnGap || styles.gap) || 20;
    return item.offsetWidth + gap;
  }

  function updateCarouselNav() {
    if (!carouselScroll || !carouselPrev || !carouselNext) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselScroll;
    const maxScroll = scrollWidth - clientWidth;
    carouselPrev.disabled = scrollLeft <= 2;
    carouselNext.disabled = maxScroll <= 2 || scrollLeft >= maxScroll - 2;
  }

  function advanceCarousel() {
    if (!carouselScroll) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselScroll;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 2) return;

    if (scrollLeft >= maxScroll - 2) {
      carouselScroll.scrollTo({ left: 0, behavior: scrollBehavior() });
      return;
    }

    carouselScroll.scrollBy({
      left: carouselScrollStep(),
      behavior: scrollBehavior(),
    });
  }

  function stopCarouselAutoplay() {
    if (carouselTimer) {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
    if (carouselResumeTimer) {
      clearTimeout(carouselResumeTimer);
      carouselResumeTimer = null;
    }
  }

  function canCarouselAutoplay() {
    return (
      carouselScroll &&
      carouselInView &&
      !document.documentElement.classList.contains("a11y-reduce-motion") &&
      !document.hidden
    );
  }

  function startCarouselAutoplay() {
    stopCarouselAutoplay();
    if (!canCarouselAutoplay()) return;

    carouselTimer = setInterval(advanceCarousel, CAROUSEL_INTERVAL);
  }

  function pauseCarouselAutoplay(ms = CAROUSEL_INTERVAL) {
    stopCarouselAutoplay();
    carouselResumeTimer = setTimeout(startCarouselAutoplay, ms);
  }

  carouselPrev?.addEventListener("click", () => {
    pauseCarouselAutoplay();
    carouselScroll?.scrollBy({
      left: -carouselScrollStep(),
      behavior: scrollBehavior(),
    });
  });

  carouselNext?.addEventListener("click", () => {
    pauseCarouselAutoplay();
    carouselScroll?.scrollBy({
      left: carouselScrollStep(),
      behavior: scrollBehavior(),
    });
  });

  carouselScroll?.addEventListener("scroll", updateCarouselNav, { passive: true });
  carouselGallery?.addEventListener("mouseenter", stopCarouselAutoplay);
  carouselGallery?.addEventListener("mouseleave", startCarouselAutoplay);
  carouselScroll?.addEventListener("pointerdown", stopCarouselAutoplay);
  carouselScroll?.addEventListener("pointerup", () => pauseCarouselAutoplay());
  carouselScroll?.addEventListener("focusin", stopCarouselAutoplay);
  carouselScroll?.addEventListener("focusout", startCarouselAutoplay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopCarouselAutoplay();
    else startCarouselAutoplay();
  });
  window.addEventListener("resize", () => {
    updateCarouselNav();
    startCarouselAutoplay();
  });

  if (highlightsSection && "IntersectionObserver" in window) {
    const carouselObserver = new IntersectionObserver(
      (entries) => {
        carouselInView = entries.some((entry) => entry.isIntersecting);
        if (carouselInView) startCarouselAutoplay();
        else stopCarouselAutoplay();
      },
      { threshold: 0.35 }
    );
    carouselObserver.observe(highlightsSection);
  } else {
    carouselInView = true;
  }

  updateCarouselNav();
  startCarouselAutoplay();

})();
