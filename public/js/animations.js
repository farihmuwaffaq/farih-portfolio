(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.querySelector('.identity-intro');
  var introPending = document.documentElement.classList.contains('intro-pending') && intro;
  if (introPending) {
    var introEnter = intro.querySelector('[data-intro-enter]');
    var introExitDuration = window.matchMedia('(max-width: 600px)').matches ? 450 : 650;
    var introFinished = false;
    var introBackground = document.querySelectorAll('.skip-link, .site-header, .mobile-menu, #main, .site-footer');
    introBackground.forEach(function (element) { element.inert = true; });
    function finishIntro() {
      if (introFinished) return;
      introFinished = true;
      try { sessionStorage.setItem('fm-intro-seen', 'true'); } catch (error) { /* Session gating remains best-effort. */ }
      intro.classList.add('is-leaving');
      window.setTimeout(function () {
        introBackground.forEach(function (element) { element.inert = false; });
        document.documentElement.classList.remove('intro-pending');
        intro.remove();
        document.querySelector('#main')?.focus({ preventScroll: true });
        window.dispatchEvent(new CustomEvent('intro:complete'));
      }, introExitDuration);
    }
    requestAnimationFrame(function () {
      intro.classList.add('is-running');
      introEnter?.focus({ preventScroll: true });
    });
    introEnter?.addEventListener('click', finishIntro);
  }
  var reveal = document.querySelectorAll('.rise, [data-reveal]');
  if (!reduced && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, io) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (el) { el.classList.add('motion-ready'); observer.observe(el); });
  } else reveal.forEach(function (el) { el.classList.add('is-visible'); });

  var systemBoot = document.querySelector('[data-system-boot]');
  if (systemBoot) {
    var bootMetrics = systemBoot.querySelectorAll('[data-count-to]');
    function formatBootMetric(metric, value) {
      var pad = Number(metric.getAttribute('data-count-pad') || 0);
      var suffix = metric.getAttribute('data-count-suffix') || '';
      return Math.round(value).toLocaleString('en-US').padStart(pad, '0') + suffix;
    }
    function countBootMetric(metric, delay, duration) {
      var target = Number(metric.getAttribute('data-count-to'));
      window.setTimeout(function () {
        var started = performance.now();
        function update(now) {
          var progress = Math.min((now - started) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          metric.textContent = formatBootMetric(metric, target * eased);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      }, delay);
    }
    function startSystemBoot() {
      systemBoot.classList.add('is-booted');
      bootMetrics.forEach(function (metric, index) {
        var delay = 1650 + (index * 270);
        var duration = index === 0 ? 800 : (index === 1 ? 480 : 420);
        countBootMetric(metric, delay, duration);
      });
    }
    function observeSystemBoot() {
      systemBoot.classList.add('is-boot-ready');
      bootMetrics.forEach(function (metric) { metric.textContent = formatBootMetric(metric, 0); });
      var bootObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startSystemBoot();
            bootObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.45 });
      bootObserver.observe(systemBoot);
    }
    if (!reduced && 'IntersectionObserver' in window) {
      if (introPending) window.addEventListener('intro:complete', observeSystemBoot, { once: true });
      else observeSystemBoot();
    }
  }

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
        map?.classList.toggle('has-inspection', active);
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
    }
  }

  var caseProgress = document.querySelector('[data-case-progress]');
  if (caseProgress) {
    var progressEvents = { 50: false, 90: false };
    var updateCaseProgress = function () {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 1;
      document.documentElement.style.setProperty('--case-progress', (progress * 100).toFixed(2) + '%');
      [50, 90].forEach(function (threshold) {
        if (!progressEvents[threshold] && progress * 100 >= threshold) {
          progressEvents[threshold] = true;
          window.portfolioAnalytics?.track('case_study_' + threshold, { path: window.location.pathname });
        }
      });
    };
    updateCaseProgress();
    window.addEventListener('scroll', updateCaseProgress, { passive: true });
    window.addEventListener('resize', updateCaseProgress);
    window.portfolioAnalytics?.track('project_view', { path: window.location.pathname });
  }

  var queryTransition = document.querySelector('[data-query-transition]');
  var queryConsole = document.querySelector('[data-query-console]');
  var queryRunning = false;
  var queryTimer = 0;

  function getRouteQuery(url) {
    var path = url.pathname.replace(/\/$/, '') || '/';
    var route = path === '/' ? 'HOME' : path.split('/').filter(Boolean).pop().replace(/-/g, ' ').toUpperCase();
    if (path.indexOf('/work/') === 0) {
      var slug = path.slice('/work/'.length).replace(/'/g, "''");
      return { route: 'CASE STUDY', code: "SELECT\n  problem,\n  system,\n  outcome\nFROM case_studies\nWHERE slug = '" + slug + "';", output: '1 ROW RETURNED' };
    }
    var queries = {
      '/': { route: 'HOME', code: 'SELECT * FROM portfolio LIMIT 1;', output: '1 PORTFOLIO FOUND' },
      '/work': { route: 'WORK', code: 'SELECT * FROM work WHERE evidence = TRUE;', output: '9 CASES FOUND' },
      '/about': { route: 'ABOUT', code: 'SELECT perspective, experience FROM profile;', output: '1 PROFILE FOUND' },
      '/resume': { route: 'RESUME', code: 'SELECT experience, education, skills FROM resume;', output: '1 RESUME FOUND' },
      '/contact': { route: 'CONTACT', code: 'SELECT email, linkedin FROM contact;', output: '2 CHANNELS FOUND' }
    };
    return queries[path] || { route: route, code: "SELECT * FROM portfolio WHERE path = '" + path.replace(/'/g, "''") + "';", output: 'QUERY OK' };
  }

  function canRunQueryTransition(event, anchor) {
    if (!queryTransition || queryRunning || reduced) return false;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    if (anchor.target && anchor.target !== '_self') return false;
    if (anchor.hasAttribute('download')) return false;
    var rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(rawHref)) return false;
    var url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.hash && url.pathname === window.location.pathname) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    return true;
  }

  function runQueryTransition(anchor) {
    var url = new URL(anchor.href, window.location.href);
    var query = getRouteQuery(url);
    var route = queryTransition.querySelector('[data-query-route]');
    var code = queryTransition.querySelector('[data-query-code]');
    var status = queryTransition.querySelector('[data-query-status]');
    var output = queryTransition.querySelector('[data-query-output]');
    var opening = queryTransition.querySelector('[data-query-opening]');
    var clock = queryTransition.querySelector('[data-query-clock]');
    var mobile = window.matchMedia('(max-width: 767px)').matches;
    var revealDelay = mobile ? 100 : 120;
    var resultDelay = mobile ? 400 : 560;
    var navigateDelay = mobile ? 700 : 950;
    queryRunning = true;
    route.textContent = 'QUERY / ' + query.route;
    code.textContent = '';
    status.textContent = 'EXECUTING QUERY';
    output.textContent = '';
    opening.textContent = '';
    clock.textContent = '00:00';
    queryTransition.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('query-transition-running');
    window.portfolioAnalytics?.track('query_transition_start', { label: url.pathname, path: window.location.pathname });
    requestAnimationFrame(function () { queryTransition.classList.add('is-visible'); });
    window.setTimeout(function () { code.textContent = query.code; clock.textContent = '00:01'; queryTransition.classList.add('has-query'); }, revealDelay);
    window.setTimeout(function () { status.textContent = 'QUERY OK'; output.textContent = query.output; opening.textContent = 'Opening ' + url.pathname + ' →'; queryTransition.classList.add('is-complete'); }, resultDelay);
    queryTimer = window.setTimeout(function () { window.location.assign(url.href); }, navigateDelay);
  }

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest('a[href]');
    if (!anchor || !canRunQueryTransition(event, anchor)) return;
    event.preventDefault();
    runQueryTransition(anchor);
  });

  window.addEventListener('pageshow', function () {
    window.clearTimeout(queryTimer);
    queryRunning = false;
    queryTransition?.classList.remove('is-visible', 'has-query', 'is-complete');
    queryTransition?.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('query-transition-running');
  });

  if (queryConsole) {
    var consoleTriggers = Array.prototype.slice.call(document.querySelectorAll('[data-query-console-open]'));
    var consoleClose = queryConsole.querySelector('[data-query-console-close]');
    var consoleForm = queryConsole.querySelector('[data-query-console-form]');
    var consoleInput = consoleForm.querySelector('input');
    var consoleResults = queryConsole.querySelector('[data-query-console-results]');
    var projectIndex = JSON.parse(document.querySelector('#query-project-index')?.textContent || '[]');
    var queryHistoryKey = 'fm-query-history';
    var queryHistory = [];
    var lastConsoleTrigger = null;
    var routeCommands = {
      about: [{ title: 'About Farih Muwaffaq', href: '/about', meta: 'Perspective and profile' }],
      profile: [{ title: 'About Farih Muwaffaq', href: '/about', meta: 'Perspective and profile' }],
      experience: [{ title: 'Professional experience', href: '/about#experience', meta: 'Career timeline' }],
      skills: [{ title: 'Skills and toolchain', href: '/resume#skills', meta: 'Data, BI, and business domains' }],
      resume: [{ title: 'Resume', href: '/resume', meta: 'Experience, education, and skills' }],
      contact: [{ title: 'Contact Farih', href: '/contact', meta: 'Email and LinkedIn' }],
      email: [{ title: 'Email Farih', href: 'mailto:farihmuwaffaq@gmail.com', meta: 'farihmuwaffaq@gmail.com' }],
      linkedin: [{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/farihmuwaffaq/', meta: 'Professional profile', external: true }]
    };
    try {
      queryHistory = JSON.parse(sessionStorage.getItem(queryHistoryKey) || '[]');
      if (!Array.isArray(queryHistory)) queryHistory = [];
      queryHistory = queryHistory.filter(function (item) { return typeof item === 'string' && item.trim(); }).slice(-5);
    } catch (_) { queryHistory = []; }

    function renderConsoleResults(command, results, message) {
      consoleResults.replaceChildren();
      var summary = document.createElement('p');
      summary.className = 'query-result-summary';
      summary.textContent = message || results.length + (results.length === 1 ? ' record found' : ' records found');
      consoleResults.appendChild(summary);
      if (!results.length) {
        var empty = document.createElement('p');
        empty.className = 'query-result-empty';
        empty.textContent = "No match for '" + command + "'. Try help, work, skills, or a project name.";
        consoleResults.appendChild(empty);
        return;
      }
      var list = document.createElement('ol');
      results.forEach(function (result) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = result.href;
        if (result.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
        link.dataset.event = 'query_console_result_click';
        link.dataset.eventLabel = command + ':' + result.href;
        var title = document.createElement('strong');
        title.textContent = result.title;
        var meta = document.createElement('span');
        meta.textContent = result.meta || '';
        link.append(title, meta);
        item.appendChild(link);
        list.appendChild(item);
      });
      consoleResults.appendChild(list);
    }

    function renderQueryHistory() {
      if (!queryHistory.length) {
        renderConsoleResults('', [], 'Type help for commands or EXPLAIN <project> for analytical context');
        return;
      }
      consoleResults.replaceChildren();
      var summary = document.createElement('p');
      summary.className = 'query-result-summary';
      summary.textContent = 'QUERY HISTORY';
      var list = document.createElement('ol');
      queryHistory.forEach(function (query) {
        var item = document.createElement('li');
        var button = document.createElement('button');
        button.type = 'button';
        button.dataset.queryHistory = query;
        var title = document.createElement('strong');
        title.textContent = query;
        var meta = document.createElement('span');
        meta.textContent = 'Run again';
        button.append(title, meta);
        item.appendChild(button);
        list.appendChild(item);
      });
      consoleResults.append(summary, list);
    }

    function rememberQuery(query) {
      if (!query) return;
      queryHistory = queryHistory.filter(function (item) { return item.toLowerCase() !== query.toLowerCase(); });
      queryHistory.push(query);
      queryHistory = queryHistory.slice(-5);
      try { sessionStorage.setItem(queryHistoryKey, JSON.stringify(queryHistory)); } catch (_) {}
    }

    function findExplainProjects(term) {
      var needle = term.toLowerCase().trim().replace(/^['"]|['"]$/g, '');
      if (!needle) return [];
      var exact = projectIndex.filter(function (project) {
        return project.slug.toLowerCase() === needle || project.title.toLowerCase() === needle;
      });
      if (exact.length) return exact;
      return projectIndex.filter(function (project) {
        return project.slug.toLowerCase().includes(needle) || project.title.toLowerCase().includes(needle);
      });
    }

    function renderExplain(term) {
      var matches = findExplainProjects(term);
      if (!matches.length) { renderConsoleResults(term, []); return; }
      if (matches.length > 1) {
        renderConsoleResults(term, matches.map(function (project) {
          return { title: project.slug, href: '', meta: 'Use EXPLAIN ' + project.slug };
        }), 'AMBIGUOUS PROJECT · Use an exact slug');
        return;
      }
      var project = matches[0];
      consoleResults.replaceChildren();
      var article = document.createElement('article');
      article.className = 'query-explain';
      var summary = document.createElement('p');
      summary.className = 'query-result-summary';
      summary.textContent = 'EXPLAIN / ' + project.slug.toUpperCase();
      var fields = [
        ['PROBLEM', project.problem],
        ['SYSTEM', project.decisions.map(function (item) { return item.decision; }).join(' → ')],
        ['DECISION USE', project.decisions[0]?.why || project.summary],
        ['EVIDENCE', project.evidenceStatus + ' · ' + project.evidenceNote]
      ];
      var definitionList = document.createElement('dl');
      fields.forEach(function (field) {
        var row = document.createElement('div');
        var termNode = document.createElement('dt');
        var valueNode = document.createElement('dd');
        termNode.textContent = field[0];
        valueNode.textContent = field[1];
        row.append(termNode, valueNode);
        definitionList.appendChild(row);
      });
      var link = document.createElement('a');
      link.href = '/work/' + project.slug;
      link.dataset.event = 'query_console_result_click';
      link.dataset.eventLabel = 'explain:' + project.slug;
      link.textContent = 'Open case study ↗';
      article.append(summary, definitionList, link);
      consoleResults.appendChild(article);
    }

    function renderEasterEgg(query) {
      if (query === 'SELECT * FROM analyst WHERE curiosity = TRUE') {
        renderConsoleResults(query, [], '1 ROW RETURNED · Farih Muwaffaq · Systems thinker · Business context · Probably debugging something');
        return true;
      }
      if (query === 'SELECT coffee FROM analyst') {
        renderConsoleResults(query, [], '1 ROW RETURNED · Cold brew · Query latency improved; causal relationship not established');
        return true;
      }
      return false;
    }

    function handleConsoleCommand(value) {
      var rawCommand = value.trim().replace(/;$/, '');
      var command = rawCommand.toLowerCase().replace(/^(show|select|open|find)\s+/, '');
      window.portfolioAnalytics?.track('query_console_submit', { label: command || 'help', path: window.location.pathname });
      if (!command || command === 'help') {
        renderConsoleResults(command, [
          { title: 'work', href: '/work', meta: 'List all case studies' },
          { title: 'EXPLAIN <project>', href: '', meta: 'Read problem, system, decision use, and evidence' },
          { title: 'experience', href: '/about#experience', meta: 'Open career timeline' },
          { title: 'skills', href: '/resume#skills', meta: 'Open skills and toolchain' },
          { title: 'contact', href: '/contact', meta: 'Open contact channels' }
        ], 'Available commands');
        return;
      }
      if (renderEasterEgg(rawCommand)) return;
      if (command.startsWith('explain ')) { renderExplain(rawCommand.slice(8).trim()); return; }
      if (command === 'work' || command === 'projects' || command === 'case studies' || command === 'cases') {
        renderConsoleResults(command, projectIndex.map(function (project) { return { title: project.title, href: '/work/' + project.slug, meta: project.categories.join(' · ') }; }));
        return;
      }
      if (routeCommands[command]) { renderConsoleResults(command, routeCommands[command]); return; }
      var terms = command.split(/\s+/).filter(Boolean);
      var matches = projectIndex.filter(function (project) {
        var haystack = [project.title, project.slug, project.summary].concat(project.categories).join(' ').toLowerCase();
        return terms.every(function (term) { return haystack.indexOf(term) !== -1; });
      }).map(function (project) { return { title: project.title, href: '/work/' + project.slug, meta: project.categories.join(' · ') }; });
      renderConsoleResults(command, matches);
    }

    function openQueryConsole(trigger) {
      lastConsoleTrigger = trigger?.classList.contains('mobile-query-trigger') ? document.querySelector('.nav-toggle') : trigger || document.activeElement;
      setNav(false);
      queryConsole.showModal();
      renderQueryHistory();
      window.portfolioAnalytics?.track('query_console_open', { label: trigger?.textContent.trim() || 'shortcut', path: window.location.pathname });
      requestAnimationFrame(function () { consoleInput.focus(); });
    }

    function closeQueryConsole() {
      queryConsole.close();
      lastConsoleTrigger?.focus?.();
    }

    consoleTriggers.forEach(function (trigger) { trigger.addEventListener('click', function () { openQueryConsole(trigger); }); });
    consoleClose.addEventListener('click', closeQueryConsole);
    queryConsole.addEventListener('cancel', function (event) { event.preventDefault(); closeQueryConsole(); });
    queryConsole.addEventListener('click', function (event) { if (event.target === queryConsole) closeQueryConsole(); });
    consoleResults.addEventListener('click', function (event) { if (event.target.closest('a[href]')) queryConsole.close();
      var historyButton = event.target.closest('[data-query-history]');
      if (historyButton) {
        consoleInput.value = historyButton.dataset.queryHistory;
        rememberQuery(consoleInput.value);
        handleConsoleCommand(consoleInput.value);
        return;
      }
    });
    consoleForm.addEventListener('submit', function (event) {
      event.preventDefault();
      rememberQuery(consoleInput.value.trim());
      handleConsoleCommand(consoleInput.value);
    });
    document.addEventListener('keydown', function (event) {
      var tag = event.target.tagName;
      var editable = event.target.isContentEditable || event.target.closest('[contenteditable="true"]') || /INPUT|TEXTAREA|SELECT/.test(tag);
      if (event.key === '/' && !editable && !queryConsole.open && !document.documentElement.classList.contains('intro-pending')) { event.preventDefault(); openQueryConsole(null); }
    });
  }

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  var close = document.querySelector('.mobile-menu-close');
  var navFocusables = menu?.querySelectorAll('a, button') || [];
  function setNav(open) {
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu?.classList.toggle('is-open', open);
    menu?.setAttribute('aria-hidden', String(!open));
    navFocusables.forEach(function (item) { item.setAttribute('tabindex', open ? '0' : '-1'); });
    document.body.classList.toggle('nav-open', open);
    if (open) requestAnimationFrame(function () { close?.focus(); }); else toggle?.focus();
  }
  toggle?.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
  close?.addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (event) {
    if (toggle?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setNav(false);
    if (event.key === 'Tab' && navFocusables.length) {
      var first = navFocusables[0]; var last = navFocusables[navFocusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  navFocusables.forEach(function (link) { link.addEventListener('click', function () { setNav(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth > 900 && toggle?.getAttribute('aria-expanded') === 'true') setNav(false); });
})();
