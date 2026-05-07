/*
  1 IntersectionObserver
  2 Menú hamburger
*/


/* ============================================================
   ANIMACIONES DE ENTRADA
   ============================================================ */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   MENÚ HAMBURGER
   ============================================================ */
(function () {
  "use strict";

  var btn  = document.getElementById("hamburger");
  var menu = document.getElementById("mobile-menu");

  /* Breakpoint(< 640px = mobile) */
  var DESKTOP_BP = 640;

  function toggle() {
    var isOpen = menu.classList.toggle("is-open");
    btn.classList.toggle("is-open", isOpen);
    btn.setAttribute("aria-expanded", isOpen);
    btn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  }

  function close() {
    menu.classList.remove("is-open");
    btn.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menú");
  }

  btn.addEventListener("click", toggle);

  /* Cierra al clickear */
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= DESKTOP_BP) {
      close();
    }
  });
})();


/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  window.addEventListener("scroll", function () {
    var scrolled = window.scrollY;
    var total    = root.scrollHeight - window.innerHeight;
    var pct      = total > 0 ? (scrolled / total * 100).toFixed(1) : 0;
    root.style.setProperty("--scroll-progress", pct + "%");
  }, { passive: true });
})();


/* ============================================================
   CONTADORES ANIMADOS
   ============================================================ */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".stat__count").forEach(function (el) {
      el.textContent = el.dataset.prefix + el.dataset.target + el.dataset.suffix;
    });
    return;
  }

  function animateCount(el) {
    var target   = +el.dataset.target;
    var prefix   = el.dataset.prefix || "";
    var suffix   = el.dataset.suffix || "";
    var duration = 1400;
    var start    = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".stat__count").forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   MAIL — mobile: mailto: nativo / desktop: Gmail web compose
   ============================================================ */
(function () {
  "use strict";

  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;

  var url = "https://mail.google.com/mail/?view=cm"
    + "&to=jsebasferna%40gmail.com"
    + "&su=Hola%20Sebasti%C3%A1n%20%E2%80%94%20Vi%20tu%20portfolio"
    + "&body=Hola%20Sebasti%C3%A1n%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarte.";

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.href   = url;
    a.target = "_blank";
    a.rel    = "noopener noreferrer";
  });
})();
