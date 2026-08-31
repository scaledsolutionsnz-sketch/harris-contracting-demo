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

/* rotating hero reviews */
var HERO_REVIEWS = [
  { text: 'Tight bales, wrapped properly, and they left the gateways tidier than they found them.', name: 'Mark T., Hinds' },
  { text: 'The chop quality was spot on and the stack was covered before the rain came through.', name: 'Sarah M., Rakaia' },
  { text: 'Turned up when they said they would, load was strapped right, price was fair.', name: 'Dave R., Mayfield' }
];
var heroBox = document.getElementById('hero-review');
if (heroBox) {
  HERO_REVIEWS.forEach(function (r, i) {
    var d = document.createElement('div');
    d.className = 'hero-review-item' + (i === 0 ? ' is-active' : '');
    d.innerHTML =
      '<div class="hero-review-head">' +
        '<svg class="g-mark" viewBox="0 0 48 48" aria-label="Google review"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
        '<span class="hero-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>' +
      '</div>' +
      '<p class="hero-review-text"></p>' +
      '<p class="hero-review-name"></p>';
    d.querySelector('.hero-review-text').textContent = '"' + r.text + '"';
    d.querySelector('.hero-review-name').textContent = r.name;
    heroBox.appendChild(d);
  });
  var items = heroBox.querySelectorAll('.hero-review-item');
  var idx = 0;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && items.length > 1) {
    setInterval(function () {
      items[idx].classList.remove('is-active');
      idx = (idx + 1) % items.length;
      items[idx].classList.add('is-active');
    }, 5200);
  }
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

/* gallery lightbox */
var lightbox = document.getElementById('lightbox');
var boxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.gallery figure').forEach(function (fig) {
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
