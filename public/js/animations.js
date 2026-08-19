/* Portfolio animations — GSAP-driven, enhancement-only.
   Rules:
   - If GSAP fails to load or user prefers reduced motion, content stays fully visible.
   - Splash shows once per session (sessionStorage flag) and never blocks content without JS.
   - All scroll animations use gsap.from() so the no-JS default state is the final state. */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';

  // Register ScrollTrigger if present
  if (hasGsap && typeof window.ScrollTrigger !== 'undefined') {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';

  /* ---------------------------------------------------------------------
     1. INTRO SPLASH — overlay, once per session, teaser lines + Enter
     --------------------------------------------------------------------- */
  var splash = document.getElementById('intro-splash');
  var seenKey = 'fm_intro_seen';
  var alreadySeen = false;
  try { alreadySeen = window.sessionStorage.getItem(seenKey) === '1'; } catch (e) { alreadySeen = false; }

  function markSeen() {
    try { window.sessionStorage.setItem(seenKey, '1'); } catch (e) { /* private mode */ }
  }

  function removeSplash(immediate) {
    if (!splash) return;
    markSeen();
    if (immediate || !hasGsap || prefersReduced) {
      splash.setAttribute('hidden', '');
      splash.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('splash-open');
      return;
    }
    window.gsap.to(splash, {
      opacity: 0,
      yPercent: -4,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: function () {
        splash.setAttribute('hidden', '');
        splash.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('splash-open');
        // Return focus to the page content for keyboard users
        var main = document.querySelector('main, .hero h1');
        if (main && main.focus) { try { main.setAttribute('tabindex', '-1'); main.focus({ preventScroll: true }); } catch (e) {} }
      }
    });
  }

  function initSplash() {
    if (!splash) return;
    if (alreadySeen || prefersReduced || !hasGsap) {
      // Do not show: keep it hidden and non-blocking
      removeSplash(true);
      return;
    }
    // Show the splash
    splash.removeAttribute('hidden');
    splash.setAttribute('aria-hidden', 'false');
    document.body.classList.add('splash-open');

    var tl = window.gsap.timeline();
    // Grid + sparkline are drawn by canvas (below). Animate teaser copy in.
    var lines = splash.querySelectorAll('.splash-teaser .t-line');
    var nameEl = splash.querySelector('.splash-name');
    var enterBtn = splash.querySelector('.splash-enter');

    tl.from(splash.querySelector('.splash-canvas-wrap'), { opacity: 0, duration: 0.6, ease: 'power1.out' })
      .from(lines, { opacity: 0, y: 18, duration: 0.5, stagger: 0.35, ease: 'power2.out' }, '-=0.2')
      .from(nameEl, { opacity: 0, y: 14, duration: 0.5, ease: 'power2.out' }, '-=0.1')
      .from(enterBtn, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out', onComplete: enableEnter }, '-=0.1');

    function enableEnter() {
      if (enterBtn) enterBtn.removeAttribute('disabled');
    }

    if (enterBtn) {
      enterBtn.addEventListener('click', function () { removeSplash(false); });
    }
    var skipBtn = splash.querySelector('.splash-skip');
    if (skipBtn) skipBtn.addEventListener('click', function () { removeSplash(false); });
    document.addEventListener('keydown', function onEsc(ev) {
      if (ev.key === 'Escape' && !splash.hasAttribute('hidden')) { removeSplash(false); }
    });
  }

  /* ---------------------------------------------------------------------
     2. SPLASH CANVAS — subtle grid + self-drawing sparkline
     --------------------------------------------------------------------- */
  function drawSplashCanvas() {
    if (!splash || splash.hasAttribute('hidden')) return;
    var canvas = splash.querySelector('canvas.splash-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    var W = rect.width, H = rect.height;

    var accent = getComputedStyle(document.documentElement).getPropertyValue('--signal').trim() || '#0e6b3c';
    var lineSoft = 'rgba(16,19,18,0.08)';
    var lineGrid = 'rgba(16,19,18,0.05)';

    // grid
    ctx.strokeStyle = lineGrid; ctx.lineWidth = 1;
    var step = 40;
    for (var x = 0; x <= W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (var y = 0; y <= H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // sparkline path (smooth random-ish series)
    var pts = [];
    var n = 24;
    var base = H * 0.62;
    for (var i = 0; i < n; i++) {
      var px = (W / (n - 1)) * i;
      var py = base - Math.sin(i * 0.7) * (H * 0.08) - (i / n) * (H * 0.22) - Math.sin(i * 2.1) * 8;
      pts.push([px, py]);
    }
    var progress = { v: 0 };
    function render() {
      // redraw grid
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = lineGrid; ctx.lineWidth = 1;
      for (var gx = 0; gx <= W; gx += step) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (var gy = 0; gy <= H; gy += step) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      // line up to progress
      var upto = Math.floor(progress.v * (n - 1));
      ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
      for (var j = 0; j <= upto; j++) {
        var p = pts[j];
        if (j === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
      // dots
      ctx.fillStyle = accent;
      for (var k = 0; k <= upto; k += 4) { var q = pts[k]; ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, Math.PI * 2); ctx.fill(); }
    }
    if (hasGsap && !prefersReduced) {
      window.gsap.to(progress, { v: 1, duration: 1.6, ease: 'power1.inOut', onUpdate: render });
    } else { progress.v = 1; render(); }
  }

  /* ---------------------------------------------------------------------
     3. HERO BACKGROUND CANVAS — faint grid + drifting sparkline points
     --------------------------------------------------------------------- */
  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var dpr = window.devicePixelRatio || 1;
    var W, H, points = [], series = [];

    function resize() {
      var r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildSeries();
    }
    function buildSeries() {
      series = [];
      var n = 28, base = H * 0.72;
      for (var i = 0; i < n; i++) {
        series.push({ x: (W / (n - 1)) * i, y: base - Math.sin(i * 0.6) * (H * 0.1) - (i / n) * (H * 0.2), ph: Math.random() * Math.PI * 2 });
      }
    }
    var accent = getComputedStyle(document.documentElement).getPropertyValue('--signal').trim() || '#0e6b3c';

    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = 'rgba(16,19,18,0.045)'; ctx.lineWidth = 1;
      var step = 48;
      for (var gx = 0; gx <= W; gx += step) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (var gy = 0; gy <= H; gy += step) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
      // drifting line
      ctx.strokeStyle = accent; ctx.globalAlpha = 0.18; ctx.lineWidth = 1.5; ctx.beginPath();
      for (var i = 0; i < series.length; i++) {
        var p = series[i];
        var yy = p.y + Math.sin(t * 0.0006 + p.ph) * 6;
        if (i === 0) ctx.moveTo(p.x, yy); else ctx.lineTo(p.x, yy);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      // points
      ctx.fillStyle = accent; ctx.globalAlpha = 0.24;
      for (var j = 0; j < series.length; j += 5) {
        var q = series[j]; var qy = q.y + Math.sin(t * 0.0006 + q.ph) * 6;
        ctx.beginPath(); ctx.arc(q.x, qy, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    resize();
    window.addEventListener('resize', resize);

    if (prefersReduced || !hasGsap) { frame(0); return; } // static single frame
    window.gsap.ticker.add(function (time) { frame(time * 1000); });
  }

  /* ---------------------------------------------------------------------
     4. STAT COUNT-UP — [data-count] counts to target on enter
     --------------------------------------------------------------------- */
  function initCountUp() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    if (prefersReduced || !hasST) return; // leave final value as authored
    els.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      if (isNaN(target)) return;
      var obj = { v: 0 };
      el.textContent = prefix + (0).toFixed(decimals) + suffix;
      window.gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: function () { el.textContent = prefix + obj.v.toFixed(decimals) + suffix; }
      });
    });
  }

  /* ---------------------------------------------------------------------
     5. SPARKLINE DRAW-ON — .sparkline path draws itself on enter
     --------------------------------------------------------------------- */
  function initSparklines() {
    var paths = document.querySelectorAll('.sparkline .spark-path');
    if (!paths.length) return;
    paths.forEach(function (path) {
      var len = 0;
      try { len = path.getTotalLength(); } catch (e) { return; }
      path.style.strokeDasharray = String(len);
      if (prefersReduced || !hasST) { path.style.strokeDashoffset = '0'; return; }
      path.style.strokeDashoffset = String(len);
      window.gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: path.closest('.card, .register-row, article, svg') || path, start: 'top 88%', once: true }
      });
    });
  }

  /* ---------------------------------------------------------------------
     6. SCROLL-REVEAL — [data-reveal] sections fade/slide on scroll
     --------------------------------------------------------------------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (prefersReduced || !hasST) return;
    els.forEach(function (el) {
      window.gsap.from(el, {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  function boot() {
    initSplash();
    drawSplashCanvas();
    initHeroCanvas();
    initCountUp();
    initSparklines();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
