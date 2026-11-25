// Progressive enhancements only — the site is fully usable without JavaScript.

(function () {
  "use strict";

  // ---- Mobile navigation toggle ----
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.hidden = false;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link (important for same-page anchors).
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    // Close with Escape and return focus to the toggle.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset when resizing to desktop.
    window.matchMedia("(min-width: 48em)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  // ---- Print button (CV page) ----
  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  // ---- Subtle reveal on scroll ----
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-reveal]");

  if (!reduceMotion && "IntersectionObserver" in window && items.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    // Items already on screen are shown immediately so nothing flashes.
    const viewportHeight = window.innerHeight;
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < viewportHeight) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });

    document.body.classList.add("reveal-ready");
  }

  // Make sure printed pages always show all content.
  window.addEventListener("beforeprint", () => {
    items.forEach((item) => item.classList.add("is-visible"));
  });
})();
