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

  var operating = document.querySelector('[data-operating-model]');
  if (operating) {
    var map = operating.querySelector('.capability-map');
    var steps = Array.prototype.slice.call(operating.querySelectorAll('[data-capability-step]'));
    var completed = reduced;
    function setOperatingProgress(progress) {
      var value = Math.max(0, Math.min(1, progress));
      map?.style.setProperty('--progress', String(value));
      steps.forEach(function (step, index) { step.classList.toggle('is-active', value >= index / Math.max(1, steps.length - 1) - 0.03); });
      if (value >= 1) completed = true;
    }
    var operatingTicking = false;
    function updateOperating() {
      var rect = operating.getBoundingClientRect();
      var progress = (window.innerHeight * 0.78 - rect.top) / Math.max(rect.height * 0.55, 1);
      setOperatingProgress(progress);
      operatingTicking = false;
      if (completed) window.removeEventListener('scroll', requestOperatingUpdate);
    }
    function requestOperatingUpdate() {
      if (!operatingTicking && !completed) { operatingTicking = true; requestAnimationFrame(updateOperating); }
    }
    if (reduced) setOperatingProgress(1);
    else {
      var operatingObserver = new IntersectionObserver(function (entries, io) {
        if (entries[0].isIntersecting) { requestOperatingUpdate(); window.addEventListener('scroll', requestOperatingUpdate, { passive: true }); io.disconnect(); }
      }, { threshold: 0.08 });
      operatingObserver.observe(operating);
    }
    steps.forEach(function (step, index) {
      function inspect(active) {
        if (!completed) return;
        map?.style.setProperty('--progress', String(active ? index / Math.max(1, steps.length - 1) : 1));
        steps.forEach(function (item, itemIndex) {
          item.classList.toggle('is-muted', active && itemIndex !== index);
          item.classList.toggle('is-active', !active || itemIndex <= index);
        });
      }
      step.addEventListener('mouseenter', function () { inspect(true); });
      step.addEventListener('mouseleave', function () { inspect(false); });
      step.addEventListener('focus', function () { inspect(true); });
      step.addEventListener('blur', function () { inspect(false); });
    });
  }

  var commercial = document.querySelector('[data-commercial-system]');
  if (commercial) {
    var nodes = Array.prototype.slice.call(commercial.querySelectorAll('[data-commercial-node]'));
    var connectors = commercial.querySelectorAll('[data-connector]');
    var center = commercial.querySelector('[data-commercial-reset]');
    var kicker = commercial.querySelector('[data-center-kicker]');
    var title = commercial.querySelector('[data-center-title]');
    var detail = commercial.querySelector('[data-center-detail]');
    var status = commercial.querySelector('[data-focus-status]');
    var live = commercial.querySelector('[data-commercial-live]');
    var pinned = false;
    function selectCommercial(node, persist) {
      var key = node?.getAttribute('data-commercial-node') || '';
      pinned = persist && Boolean(node);
      commercial.classList.toggle('has-selection', Boolean(node));
      nodes.forEach(function (item) {
        var active = item === node;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      connectors.forEach(function (path) { path.classList.toggle('is-active', path.getAttribute('data-connector') === key); });
      if (node) {
        kicker.textContent = node.textContent.trim();
        title.innerHTML = node.getAttribute('data-title').replace(' ', '<br>');
        detail.textContent = node.getAttribute('data-detail');
        status.textContent = node.getAttribute('data-detail');
        live.textContent = node.textContent.trim() + ': ' + node.getAttribute('data-detail');
      } else {
        kicker.textContent = 'Decision system';
        title.innerHTML = 'Commercial<br>health';
        detail.textContent = 'Signal → context → action';
        status.textContent = 'Choose an input to inspect';
        live.textContent = 'Commercial health decision system.';
      }
    }
    nodes.forEach(function (node) {
      node.addEventListener('mouseenter', function () { if (!pinned) selectCommercial(node, false); });
      node.addEventListener('mouseleave', function () { if (!pinned) selectCommercial(null, false); });
      node.addEventListener('focus', function () { if (!pinned) selectCommercial(node, false); });
      node.addEventListener('blur', function () { if (!pinned) selectCommercial(null, false); });
      node.addEventListener('click', function () { selectCommercial(node, true); });
    });
    center?.addEventListener('click', function () { selectCommercial(null, false); });
    commercial.addEventListener('click', function (event) {
      if (!event.target.closest('[data-commercial-node], [data-commercial-reset]')) selectCommercial(null, false);
    });
    document.addEventListener('click', function (event) { if (!commercial.contains(event.target)) selectCommercial(null, false); });
    if (reduced) commercial.classList.add('is-entered', 'is-settled');
    else {
      var commercialObserver = new IntersectionObserver(function (entries, io) {
        if (entries[0].isIntersecting) {
          commercial.classList.add('is-entered');
          window.setTimeout(function () { commercial.classList.add('is-settled'); }, 1000);
          io.disconnect();
        }
      }, { threshold: 0.3 });
      commercialObserver.observe(commercial);
      if (window.matchMedia('(pointer:fine)').matches) {
        commercial.addEventListener('pointermove', function (event) {
          var rect = commercial.getBoundingClientRect();
          commercial.style.setProperty('--center-x', ((event.clientX - rect.left) / rect.width - .5) * 10 + 'px');
          commercial.style.setProperty('--center-y', ((event.clientY - rect.top) / rect.height - .5) * 10 + 'px');
        });
        commercial.addEventListener('pointerleave', function () { commercial.style.setProperty('--center-x', '0px'); commercial.style.setProperty('--center-y', '0px'); });
      }
    }
  }

  var toggle = document.querySelector('.nav-toggle');
  var backdrop = document.querySelector('.nav-backdrop');
  var links = document.querySelector('.nav-links');
  var navFocusables = document.querySelectorAll('.nav-links a, .mobile-nav-footer a');
  function setNav(open) {
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    links?.classList.toggle('is-open', open); document.body.classList.toggle('nav-open', open);
    if (open) links?.querySelector('a')?.focus(); else toggle?.focus();
  }
  toggle?.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
  backdrop?.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (event) {
    if (toggle?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setNav(false);
    if (event.key === 'Tab' && navFocusables.length) {
      var first = navFocusables[0]; var last = navFocusables[navFocusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); toggle.focus(); }
      else if (!event.shiftKey && document.activeElement === toggle) { event.preventDefault(); first.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.focus(); }
    }
  });
  navFocusables.forEach(function (link) { link.addEventListener('click', function () { setNav(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900 && toggle?.getAttribute('aria-expanded') === 'true') setNav(false); });
})();
