(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-solid");
    } else {
      header.classList.remove("is-solid");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      navMenu.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Hero load class */
  requestAnimationFrame(function () {
    document.querySelector(".hero")?.classList.add("is-loaded");
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Before / after sliders */
  function initCompare(root) {
    var before = root.querySelector("[data-compare-before]");
    var handle = root.querySelector("[data-compare-handle]");
    if (!before || !handle) return;

    var dragging = false;

    function setPct(pct) {
      var clamped = Math.max(4, Math.min(96, pct));
      before.style.width = clamped + "%";
      handle.style.left = clamped + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }

    function pctFromClientX(clientX) {
      var rect = root.getBoundingClientRect();
      if (rect.width <= 0) return 50;
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onDown(e) {
      dragging = true;
      root.classList.add("is-dragging");
      var x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setPct(pctFromClientX(x));
      e.preventDefault();
    }

    function onMove(e) {
      if (!dragging) return;
      var x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setPct(pctFromClientX(x));
    }

    function onUp() {
      dragging = false;
      root.classList.remove("is-dragging");
    }

    root.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    root.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    root.addEventListener("click", function (e) {
      if (e.target === handle || handle.contains(e.target)) return;
      setPct(pctFromClientX(e.clientX));
    });

    handle.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 3;
      var current = parseFloat(before.style.width) || 50;
      if (e.key === "ArrowLeft") {
        setPct(current - step);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setPct(current + step);
        e.preventDefault();
      } else if (e.key === "Home") {
        setPct(4);
        e.preventDefault();
      } else if (e.key === "End") {
        setPct(96);
        e.preventDefault();
      }
    });

    setPct(50);
  }

  document.querySelectorAll("[data-compare]").forEach(initCompare);
})();
