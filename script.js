// ══════════════════════════════════════
// HEADER SCROLL
// ══════════════════════════════════════
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 60);
});

// ══════════════════════════════════════
// MENU HAMBURGUESA
// ══════════════════════════════════════
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('active');
});
document.querySelectorAll('#nav a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav').classList.remove('active'));
});

// ══════════════════════════════════════
// ANIMACIONES SCROLL
// ══════════════════════════════════════
const animables = document.querySelectorAll('.animar');
function checkAnimar() {
  animables.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkAnimar);
checkAnimar();

// ══════════════════════════════════════
// CONTADOR STATS — arranca en 0, cuenta al llegar
// ══════════════════════════════════════
function animarContador(el) {
  const target = parseInt(el.getAttribute('data-target'));
  el.textContent = '0';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

let contadorListo = false;
const statsEl = document.querySelector('.hero-stats');

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !contadorListo) {
      contadorListo = true;
      document.querySelectorAll('.stat-num').forEach(animarContador);
    }
  });
}, { threshold: 0.8 });

if (statsEl) statsObserver.observe(statsEl);

// ══════════════════════════════════════
// CARRUSEL TESTIMONIOS
// ══════════════════════════════════════
let currentTesti = 0;
const totalTesti = 5;
const testiTrack = document.getElementById('testiTrack');
const testiDots = document.querySelectorAll('.tdot');

function goTesti(n) {
  currentTesti = (n + totalTesti) % totalTesti;
  testiTrack.style.transform = `translateX(-${currentTesti * 100}%)`;
  testiDots.forEach((d, i) => d.classList.toggle('active', i === currentTesti));
}

setInterval(() => goTesti(currentTesti + 1), 5000);

if (testiTrack) {
  let startX = 0;
  testiTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  testiTrack.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTesti(diff > 0 ? currentTesti + 1 : currentTesti - 1);
  });
}

// ══════════════════════════════════════
// FAQ ACORDEÓN
// ══════════════════════════════════════
function toggleFaq(btn) {
  const resp = btn.nextElementSibling;
  const estaAbierto = btn.classList.contains('open');
  document.querySelectorAll('.faq-btn.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!estaAbierto) {
    btn.classList.add('open');
    resp.classList.add('open');
  }
}
