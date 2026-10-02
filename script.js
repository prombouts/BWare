(function(c, l, a, r, i, t, y) {
  c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "w61ccmn7u4");

// Nav: frost on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Gig countdown (Europe/Amsterdam local time)
const gigCountdown = document.getElementById('gig-countdown');
if (gigCountdown) {
  const eventDate = new Date(2026, 4, 9, 0, 0, 0);
  const now = new Date();
  const msLeft = eventDate.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (msLeft > 0) {
    const days = Math.ceil(msLeft / dayMs);
    gigCountdown.textContent = `Nog ${days} dag${days === 1 ? '' : 'en'} tot FoxFarm`;
  } else {
    const eventEnd = new Date(2026, 4, 9, 23, 59, 0);
    gigCountdown.textContent = now <= eventEnd ? 'Vanavond live in FoxFarm' : 'Dit optreden is geweest';
  }
}

// Lightbox
const photoItems = Array.from(document.querySelectorAll('.photo-item'));
const photos = photoItems.map(item => item.querySelector('img').getAttribute('src'));
let cur = 0;
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');

function showPhoto(idx) {
  cur = (idx + photos.length) % photos.length;
  lbImg.src = photos[cur];
}
function openLB(idx) {
  showPhoto(idx);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLB() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

photoItems.forEach((el, index) => {
  el.addEventListener('click', () => openLB(index));
});

// Bio expand toggle
const btnExpand = document.getElementById('btn-expand');
const bioMore = document.getElementById('bio-more');
btnExpand.addEventListener('click', () => {
  const isOpen = bioMore.classList.toggle('open');
  btnExpand.classList.toggle('open', isOpen);
  btnExpand.setAttribute('aria-expanded', String(isOpen));
  btnExpand.querySelector('.arrow').parentElement.childNodes[0].textContent = isOpen ? 'Lees minder ' : 'Lees meer ';
});
document.getElementById('lb-close').addEventListener('click', closeLB);
document.getElementById('lb-prev').addEventListener('click', () => showPhoto(cur - 1));
document.getElementById('lb-next').addEventListener('click', () => showPhoto(cur + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') showPhoto(cur - 1);
  if (e.key === 'ArrowRight') showPhoto(cur + 1);
  if (e.key === 'Escape') closeLB();
});
