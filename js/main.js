(function () {
  "use strict";

  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

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

  /* Waxing gallery: enlarge in lightbox dialog */
  var waxLightbox = document.getElementById("waxing-lightbox");
  var waxServices = document.getElementById("waxing-services");
  if (waxLightbox && waxServices) {
    var lightboxImg = waxLightbox.querySelector(".lightbox__img");
    var canModal = typeof waxLightbox.showModal === "function";

    function setLbScrollLock(on) {
      document.documentElement.style.overflow = on ? "hidden" : "";
    }

    waxServices.querySelectorAll(".gallery__zoom-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sm = btn.querySelector("img");
        if (!sm || !lightboxImg) return;
        var src = sm.currentSrc || sm.src;
        var alt = sm.getAttribute("alt") || "";

        lightboxImg.src = src;
        lightboxImg.alt = alt;

        if (canModal) {
          try {
            waxLightbox.showModal();
            setLbScrollLock(true);
            requestAnimationFrame(function () {
              var closeBtn = waxLightbox.querySelector(".lightbox__close");
              if (closeBtn) closeBtn.focus();
            });
            return;
          } catch (_err) {
            /* Some file:// or older contexts block modal dialogs */
          }
        }

        window.open(src, "_blank", "noopener,noreferrer");
      });
    });

    if (canModal) {
      waxLightbox.addEventListener("close", function () {
        setLbScrollLock(false);
        if (lightboxImg) {
          lightboxImg.removeAttribute("src");
          lightboxImg.alt = "";
        }
      });

      waxLightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
        el.addEventListener("click", function () {
          waxLightbox.close();
        });
      });
    }
  }

  /* Contact form — opens user's email client with a prefilled message */
  var contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    var status = contactForm.querySelector("[data-contact-status]");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (typeof contactForm.checkValidity === "function" && !contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var data = new FormData(contactForm);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      var lines = [];
      if (name) lines.push("Name: " + name);
      if (email) lines.push("Email: " + email);
      if (phone) lines.push("Phone: " + phone);
      if (service) lines.push("Service of interest: " + service);
      lines.push("");
      lines.push("Message:");
      lines.push(message);

      var to = contactForm.getAttribute("data-contact-to") || "pkbeauty25@icloud.com";
      var subject = "Inquiry from " + (name || "PK Beauty website");
      var href =
        "mailto:" +
        encodeURIComponent(to) +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      if (status) {
        status.textContent = "Opening your email app to send the message…";
        status.classList.add("is-visible");
      }

      window.location.href = href;
    });
  }
})();
