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

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });
})();
