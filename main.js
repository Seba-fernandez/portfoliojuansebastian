/*
  main.js — Activa animaciones de entrada con IntersectionObserver.
  Sin dependencias. Sin framework.

  Por qué IntersectionObserver y no un evento scroll:
  - No bloquea el main thread
  - Se dispara solo cuando el elemento entra al viewport
  - unobserve() después de activar = cero costo a largo plazo
*/
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
