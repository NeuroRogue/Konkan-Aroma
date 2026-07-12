/* ===================================================================
   KONKANAROMA — MAIN.JS
   Vanilla JS only, used for exactly two things:
   1. Mobile hamburger menu toggle
   2. Progressive scroll-reveal for .reveal elements
   No analytics, no cookies, no storage, no tracking of any kind.
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     1. Mobile nav toggle
     ----------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is tapped (mobile UX nicety)
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -----------------------------------------------------------
     2. Scroll reveal
     Adds .js-ready to <html> so CSS only hides .reveal elements
     when JS is actually running (content never gets stuck
     invisible if JS fails or is blocked).
     Respects prefers-reduced-motion by revealing everything
     immediately without observing scroll.
     ----------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }
});
