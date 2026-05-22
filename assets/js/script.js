(function () {
  function initWorkTabs() {
    var tabBar = document.querySelector('.work-tabs');
    if (!tabBar) return;

    var tabs = Array.prototype.slice.call(tabBar.querySelectorAll('.work-tab'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.work-section'));
    if (!tabs.length || !sections.length) return;

    function setTab(name, updateHash) {
      var beforeTop = tabBar.getBoundingClientRect().top;

      tabs.forEach(function (tab) {
        tab.setAttribute('aria-selected', tab.getAttribute('data-tab') === name ? 'true' : 'false');
      });

      sections.forEach(function (section) {
        var which = section.getAttribute('data-section');
        var show = name === 'all' || name === which;
        if (show) section.removeAttribute('hidden');
        else section.setAttribute('hidden', '');
      });

      if (updateHash) {
        var hash = name === 'all' ? '#work-archive' : '#' + name;
        if (history.replaceState) history.replaceState(null, '', hash);
      }

      requestAnimationFrame(function () {
        var afterTop = tabBar.getBoundingClientRect().top;
        var delta = afterTop - beforeTop;
        if (Math.abs(delta) > 1) window.scrollBy(0, delta);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        setTab(tab.getAttribute('data-tab'), true);
      });
    });

    var initial = 'all';
    var hash = window.location.hash.replace('#', '');
    if (hash === 'motion' || hash === 'studies' || hash === 'case-studies') {
      initial = hash === 'case-studies' ? 'studies' : hash;
    } else {
      var selected = tabBar.querySelector('.work-tab[aria-selected="true"]');
      if (selected) initial = selected.getAttribute('data-tab');
    }
    setTab(initial, false);
  }

  function fmt(time) {
    if (!isFinite(time) || time < 0) time = 0;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  function initVideos() {
    var frames = Array.prototype.slice.call(document.querySelectorAll('.vid-frame.js-video'));

    frames.forEach(function (frame) {
      var figure = frame.closest('.vid');
      var video = frame.querySelector('video');
      var bar = frame.querySelector('.v-progress .bar');
      var marker = frame.querySelector('.v-progress .marker');
      var timeEl = figure ? figure.querySelector('[data-time]') : null;
      var hintEl = frame.querySelector('[data-hint]');
      var clickEl = frame.querySelector('[data-click]');
      if (!video) return;

      frame.classList.add('is-loading');

      function setHint(label) { if (hintEl) hintEl.textContent = label; }
      function setClick(label) { if (clickEl) clickEl.textContent = label; }
      function markPlaying(isPlaying) { frame.classList.toggle('is-playing', !!isPlaying); }
      function clearLoading() { frame.classList.remove('is-loading'); }
      function setMutedState(isMuted) {
        video.muted = isMuted;
        video.defaultMuted = isMuted;
        if (isMuted) video.setAttribute('muted', '');
        else video.removeAttribute('muted');
      }

      video.addEventListener('loadeddata', function () {
        clearLoading();
        if (timeEl) timeEl.textContent = '00:00 / ' + fmt(video.duration);
      });
      video.addEventListener('canplay', clearLoading);
      video.addEventListener('error', function () { frame.classList.add('is-loading'); });
      video.addEventListener('play', function () { markPlaying(true); });
      video.addEventListener('playing', function () { markPlaying(true); });
      video.addEventListener('pause', function () { markPlaying(false); });
      video.addEventListener('ended', function () { markPlaying(false); });
      video.addEventListener('timeupdate', function () {
        if (!video.duration || isNaN(video.duration)) return;
        var pct = (video.currentTime / video.duration) * 100;
        if (bar) bar.style.width = pct + '%';
        if (marker) marker.style.left = pct + '%';
        if (timeEl) timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
      });

      setMutedState(true);
      setHint('Hover to preview');
      setClick('Click for sound');

      var wantsPlaying = false;
      function startHoverPlay() {
        if (frame.classList.contains('has-sound')) return;
        wantsPlaying = true;
        setMutedState(true);
        var promise = video.play();
        if (promise && typeof promise.then === 'function') {
          promise.then(function () {
            if (!wantsPlaying && !frame.classList.contains('has-sound')) video.pause();
          }).catch(function () {});
        }
        setHint('Muted Preview');
      }
      function endHoverPlay() {
        if (frame.classList.contains('has-sound')) return;
        wantsPlaying = false;
        video.pause();
        setHint('Hover to preview');
      }

      function resetFrame(otherFrame) {
        var otherVideo = otherFrame.querySelector('video');
        if (otherVideo) {
          otherVideo.muted = true;
          otherVideo.defaultMuted = true;
          otherVideo.setAttribute('muted', '');
          otherVideo.pause();
        }
        otherFrame.classList.remove('has-sound');
        var otherHint = otherFrame.querySelector('[data-hint]');
        var otherClick = otherFrame.querySelector('[data-click]');
        if (otherHint) otherHint.textContent = 'Hover to preview';
        if (otherClick) otherClick.textContent = 'Click for sound';
      }

      function toggleSound() {
        if (frame.classList.contains('has-sound')) {
          setMutedState(true);
          frame.classList.remove('has-sound');
          setHint('Hover to preview');
          setClick('Click for sound');
          if (!frame.matches(':hover')) video.pause();
          return;
        }

        frames.forEach(function (otherFrame) {
          if (otherFrame !== frame && otherFrame.classList.contains('has-sound')) resetFrame(otherFrame);
        });

        setMutedState(false);
        video.volume = 1;
        frame.classList.add('has-sound');
        var promise = video.play();
        if (promise && promise.catch) promise.catch(function () {});
        setHint('Sound On');
        setClick('Click to mute');
      }

      var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
      if (isTouch) {
        frame.classList.add('touch-native-video');
        video.classList.add('use-native-controls');
        video.controls = true;
        video.setAttribute('controls', 'controls');
        setHint('Use controls for sound');
        setClick('');
      }

      frame.addEventListener('mouseenter', startHoverPlay);
      frame.addEventListener('mouseleave', endHoverPlay);
      frame.addEventListener('pointerleave', endHoverPlay);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden && !frame.classList.contains('has-sound')) endHoverPlay();
      });

      if (!isTouch) {
        frame.setAttribute('tabindex', '0');
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', (frame.getAttribute('data-title') || 'Video') + ' — click to toggle sound');
        frame.addEventListener('keydown', function (event) {
          if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            toggleSound();
          }
        });
      }

      if (isTouch) {
        frame.removeAttribute('role');
        frame.removeAttribute('tabindex');
        frame.setAttribute('aria-label', (frame.getAttribute('data-title') || 'Video') + ' — use native controls for sound');
      } else {
        frame.addEventListener('click', function (event) {
          if (event.target.closest('a, button')) return;
          toggleSound();
        });
      }
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target.querySelector('video');
          if (!video) return;
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            if (entry.target.classList.contains('has-sound')) {
              var promise = video.play();
              if (promise && promise.catch) promise.catch(function () {});
            }
          } else if (!video.paused) {
            video.pause();
          }
        });
      }, { threshold: [0, 0.25, 0.5] });

      frames.forEach(function (frame) { observer.observe(frame); });
    }
  }

  function initMotionReveal() {
    var selector = [
      '.brand-playhead',
      '.timeline-track',
      '.timeline-tracks',
      '.motion-path',
      '.dot-grid',
      '.hero-meta-markers',
      '.foot-palette-strip',
      '.geo',
      '.moves-timeline'
    ].join(', ');

    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

      document.querySelectorAll(selector).forEach(function (el) { revealObs.observe(el); });
    } else {
      document.querySelectorAll(selector).forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  function initMediaLightbox() {
    var lightbox = document.createElement('div');
    lightbox.className = 'media-lightbox';
    lightbox.id = 'media-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded media');
    lightbox.hidden = true;
    lightbox.innerHTML =
      '<span class="media-lightbox-label" aria-hidden="true"><span class="sq"></span><span data-media-label>Expanded View</span></span>' +
      '<button type="button" class="media-lightbox-close" aria-label="Close media"><span class="x" aria-hidden="true">✕</span><span>Close</span></button>' +
      '<div class="media-lightbox-stage" data-media-stage></div>';
    document.body.appendChild(lightbox);

    var stage = lightbox.querySelector('[data-media-stage]');
    var closeButton = lightbox.querySelector('.media-lightbox-close');
    var label = lightbox.querySelector('[data-media-label]');
    var activeMedia = null;

    function pauseInlineMedia() {
      document.querySelectorAll('.vid-frame video').forEach(function (video) {
        try { video.pause(); } catch (e) {}
      });
    }

    function clearStage() {
      if (activeMedia && activeMedia.tagName === 'VIDEO') {
        try { activeMedia.pause(); } catch (e) {}
      }
      stage.innerHTML = '';
      activeMedia = null;
    }

    function openLightbox(type, source, title) {
      if (!source) return;
      pauseInlineMedia();
      clearStage();
      label.textContent = title ? title + ' — Expanded View' : 'Expanded View';

      if (type === 'embed') {
        activeMedia = document.createElement('iframe');
        activeMedia.className = 'media-lightbox-embed';
        activeMedia.src = source;
        activeMedia.title = title || 'Expanded media';
        activeMedia.loading = 'eager';
        activeMedia.allow = 'autoplay; fullscreen; picture-in-picture';
        activeMedia.allowFullscreen = true;
      } else {
        activeMedia = document.createElement('video');
        activeMedia.className = 'media-lightbox-video';
        activeMedia.controls = true;
        activeMedia.playsInline = true;
        activeMedia.preload = 'metadata';
        activeMedia.src = source;
      }

      stage.appendChild(activeMedia);
      lightbox.hidden = false;
      document.body.classList.add('media-open');
      requestAnimationFrame(function () { lightbox.classList.add('is-open'); });

      if (type !== 'embed') {
        try {
          activeMedia.currentTime = 0;
          activeMedia.muted = false;
          var promise = activeMedia.play();
          if (promise && promise.catch) promise.catch(function () {});
        } catch (e) {}
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('media-open');
      clearStage();
      setTimeout(function () { lightbox.hidden = true; }, 280);
    }

    document.querySelectorAll('.vid-frame').forEach(function (frame) {
      if (!frame.querySelector('video') && !frame.querySelector('iframe')) return;

      var expandButton = document.createElement('button');
      expandButton.type = 'button';
      expandButton.className = 'vid-expand';
      expandButton.setAttribute('aria-label', 'Expand ' + (frame.getAttribute('data-title') || 'video'));
      expandButton.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M8 4H4v4M16 4h4v4M20 16v4h-4M8 20H4v-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/>' +
        '</svg>';
      frame.appendChild(expandButton);

      expandButton.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var inlineFrame = frame.querySelector('iframe');
        if (inlineFrame) {
          openLightbox('embed', inlineFrame.getAttribute('src'), frame.getAttribute('data-title') || inlineFrame.getAttribute('title') || 'Video');
          return;
        }

        var source = frame.getAttribute('data-src');
        if (!source) {
          var sourceEl = frame.querySelector('video source');
          if (sourceEl) source = sourceEl.getAttribute('src');
        }
        openLightbox('video', source, frame.getAttribute('data-title') || 'Video');
      });
    });

    document.querySelectorAll('.js-open-reel').forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        var heroSource = 'assets/Reel/GregLashReel_2026_update.mp4';
        openLightbox('video', heroSource, 'Reel 2026');
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  initWorkTabs();
  initVideos();
  initMotionReveal();
  initMediaLightbox();
})();
