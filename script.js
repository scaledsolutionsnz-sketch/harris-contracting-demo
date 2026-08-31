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
      '<div class="hero-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
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
