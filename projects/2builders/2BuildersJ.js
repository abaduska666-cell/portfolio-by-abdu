/* =========================================================
   2BUILDERS — INTERACTIONS
   Header state, mobile nav, scroll-reveal with stagger,
   animated stat counters, project filtering, contact form
   validation, and a back-to-top control. Respects
   prefers-reduced-motion throughout.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initSmoothAnchors();
    initScrollReveal();
    initStatCounters();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    document.getElementById("year").textContent = new Date().getFullYear();
  });

  /* ---------- Header state + scroll progress (single rAF-throttled listener) ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    var progress = document.getElementById("scrollProgress");
    var ticking = false;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("is-scrolled", scrollTop > 40);

      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + "%";

      toggleBackToTop(scrollTop);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", window.buildersTranslate("Open menu"));
    }

    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", window.buildersTranslate("Close menu"));
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    });

    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        closeNav();
      }
    });
  }

  /* ---------- Active nav link on scroll + smooth anchor offset safety ---------- */
  function initSmoothAnchors() {
    var links = document.querySelectorAll(".nav-link");
    var sections = Array.prototype.slice
      .call(links)
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = "#" + entry.target.id;
            links.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Scroll reveal with natural stagger ---------- */
  function initScrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (reduceMotion) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    // Stagger siblings that reveal together (same parent), capped delay.
    var counters = new Map();
    items.forEach(function (el) {
      var parent = el.parentElement;
      var index = counters.has(parent) ? counters.get(parent) : 0;
      counters.set(parent, index + 1);
      var delay = Math.min(index, 5) * 90;
      el.style.transitionDelay = delay + "ms";
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Animated stat counters ---------- */
  function initStatCounters() {
    var numbers = document.querySelectorAll(".stat-number");
    if (!numbers.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";

      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }

      var duration = 1400;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    numbers.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Project filters ---------- */
  function initProjectFilters() {
    var buttons = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".project-card");
    var emptyMsg = document.getElementById("projectEmpty");
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");

        var filter = btn.getAttribute("data-filter");
        var visibleCount = 0;

        cards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          if (match) {
            card.classList.remove("is-hidden");
            visibleCount++;
          } else {
            card.classList.add("is-hidden");
          }
        });

        emptyMsg.hidden = visibleCount !== 0;
      });
    });
  }

  /* ---------- Contact form (front-end validation + simulated send) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var status = document.getElementById("formStatus");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn.querySelector(".btn-label");

    function setError(field, hasError) {
      field.closest(".form-field").classList.toggle("has-error", hasError);
    }

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];
      var valid = true;

      if (!name.value.trim()) {
        setError(name, true);
        valid = false;
      } else {
        setError(name, false);
      }

      if (!email.value.trim() || !isValidEmail(email.value.trim())) {
        setError(email, true);
        valid = false;
      } else {
        setError(email, false);
      }

      if (!message.value.trim()) {
        setError(message, true);
        valid = false;
      } else {
        setError(message, false);
      }

      if (!valid) {
        status.textContent = window.buildersTranslate("Please fill in the highlighted fields.");
        status.classList.add("is-error");
        return;
      }

      status.classList.remove("is-error");
      submitBtn.disabled = true;
      submitLabel.textContent = window.buildersTranslate("Sending…");

      // Simulated send — replace with a real endpoint when ready.
      window.setTimeout(function () {
        status.textContent = window.buildersTranslate("Thanks — we've received your project details and will be in touch within one business day.");
        submitLabel.textContent = window.buildersTranslate("Send message");
        submitBtn.disabled = false;
        form.reset();
      }, 900);
    });

    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        setError(field, false);
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backToTopBtn;
  function initBackToTop() {
    backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function toggleBackToTop(scrollTop) {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle("is-visible", scrollTop > window.innerHeight * 0.6);
  }
})();
