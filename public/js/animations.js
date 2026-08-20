(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveal = document.querySelectorAll('.rise, [data-reveal]');
  if (!reduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, io) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (el) { el.classList.add('motion-ready'); observer.observe(el); });
  } else reveal.forEach(function (el) { el.classList.add('is-visible'); });

  var toggle = document.querySelector('.nav-toggle');
  var backdrop = document.querySelector('.nav-backdrop');
  var links = document.querySelector('.nav-links');
  function setNav(open) {
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    links?.classList.toggle('is-open', open); document.body.classList.toggle('nav-open', open);
    if (open) links?.querySelector('a')?.focus(); else toggle?.focus();
  }
  toggle?.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
  backdrop?.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setNav(false); });
  links?.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setNav(false); }); });
})();
