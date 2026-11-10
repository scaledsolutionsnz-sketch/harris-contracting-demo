/* Harris Contracting — demo site */

/* sticky nav */
var nav = document.getElementById('nav');
var onScroll = function () {
  nav.classList.toggle('is-scrolled', window.scrollY > 24);
};
onScroll();
addEventListener('scroll', onScroll, { passive: true });

/* mobile menu */
var toggle = document.getElementById('nav-toggle');
var menu = document.getElementById('mobile-menu');
toggle.addEventListener('click', function () {
  var open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* hero video: respect reduced motion */
var heroVideo = document.getElementById('hero-video');
if (heroVideo && matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}


/* scroll reveal */
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

/* expandable service panels */
document.querySelectorAll('.svc-panel').forEach(function (p) {
  var toggle = function () {
    var open = p.classList.toggle('is-open');
    p.setAttribute('aria-expanded', open);
  };
  p.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    toggle();
  });
  p.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === p) {
      e.preventDefault();
      toggle();
    }
  });
});

/* auto-drifting photo strips */
document.querySelectorAll('.fleet-scroller').forEach(function (sc) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var slides = Array.prototype.slice.call(sc.children);
  slides.forEach(function (sl) {
    var c = sl.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    sc.appendChild(c);
  });
  var GAP = 12;
  var paused = false;
  var resumeTimer;
  var pause = function () {
    paused = true;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () { paused = false; }, 2500);
  };
  ['pointerdown', 'wheel', 'touchstart', 'focusin'].forEach(function (ev) {
    sc.addEventListener(ev, pause, { passive: true });
  });
  sc.addEventListener('mouseenter', function () { paused = true; clearTimeout(resumeTimer); });
  sc.addEventListener('mouseleave', function () { paused = false; });
  var step = function () {
    if (!paused) {
      var half = (sc.scrollWidth + GAP) / 2;
      sc.scrollLeft += 0.6;
      if (sc.scrollLeft >= half) sc.scrollLeft -= half;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});

/* gallery lightbox */
var lightbox = document.getElementById('lightbox');
var boxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.fleet-scroller figure').forEach(function (fig) {
  fig.addEventListener('click', function () {
    var img = fig.querySelector('img');
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});
function closeBox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}
document.getElementById('lightbox-close').addEventListener('click', closeBox);
lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeBox(); });
addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBox(); });

/* gmail compose buttons (address assembled in JS so Cloudflare cannot rewrite it) */
document.querySelectorAll('a[data-gmail]').forEach(function (a) {
  var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
  var su = a.getAttribute('data-su') || '';
  var body = a.getAttribute('data-body') || '';
  a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + su + '&body=' + body;
  a.target = '_blank';
  a.rel = 'noopener';
});

/* year */
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
