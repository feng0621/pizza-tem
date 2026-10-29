// Site-wide motion layer: inertia scrolling, cursor follower, masked headline lines, image parallax,
// counting numbers, magnetic buttons, the menu marquee, gift-card tilt, reading progress and the Shanghai clock.
// Everything here is decoration: the pages work and read the same without it.
(() => {
const root = document.documentElement, body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const navH = () => document.getElementById('nav').offsetHeight;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const outside = el => !el.closest('dialog, .stage, #stage, .mnav');
const TF = window.TF || (window.TF = {});

/* ---------- inertia scrolling ---------- */
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new window.Lenis({ lerp: .095, wheelMultiplier: .95, smoothWheel: true });
  TF.lenis = lenis;
  lenis.on('scroll', () => window.dispatchEvent(new Event('tf:scroll')));
}
TF.scrollTo = (y, smooth = true) => {
  if (lenis) lenis.scrollTo(y, { immediate: !smooth, duration: 1.4 });
  else scrollTo({ top: y, behavior: smooth && !reduced ? 'smooth' : 'auto' });
};
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.dataset.open || e.defaultPrevented) return;
  const id = decodeURIComponent(a.getAttribute('href').slice(1)), target = id && document.getElementById(id);
  if (!target || target.tagName === 'DIALOG') return;
  e.preventDefault();
  TF.scrollTo(target.getBoundingClientRect().top + scrollY - navH() - 12);
  history.replaceState(null, '', '#' + id);
});

/* ---------- headline lines rise out of a mask ---------- */
const heads = [...document.querySelectorAll('.display, .post-h, .finale h2')].filter(outside);
for (const h of heads) {
  const lines = h.innerHTML.split(/<br\s*\/?>/i);
  h.innerHTML = lines.map((l, i) => `<span class="ln"><span class="ln-i" style="--i:${i}">${l}</span></span>`).join('');
  h.classList.add('lines');
}

/* ---------- one observer for reveals that start when an element enters ---------- */
const onEnter = new Map();
const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { const f = onEnter.get(e.target); onEnter.delete(e.target); io.unobserve(e.target); f && f(); }
}, { rootMargin: '0px 0px -10% 0px', threshold: .1 }) : null;
const whenSeen = (el, f) => {
  if (!io || reduced) return f();
  const r = el.getBoundingClientRect();
  if (r.top < innerHeight * .92 && r.bottom > 0) { setTimeout(f, 180); return; } // already on screen: play the entrance now
  onEnter.set(el, f); io.observe(el);
};
for (const h of heads) whenSeen(h, () => h.classList.add('in'));

/* ---------- numbers count up ---------- */
for (const b of document.querySelectorAll('.facts b, .facts4 b, .post-facts b')) {
  const node = [...b.childNodes].find(n => n.nodeType === 3 && /^\s*[\d,]+\s*$/.test(n.textContent));
  if (!node) continue;
  const end = +node.textContent.replace(/[^\d]/g, ''), comma = node.textContent.includes(',');
  const fmt = v => comma ? v.toLocaleString('en-US') : String(v);
  if (reduced) continue;
  node.textContent = fmt(0);
  whenSeen(b, () => {
    const t0 = performance.now(), dur = 1600 + Math.min(end, 600);
    const step = now => { const k = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 4); node.textContent = fmt(Math.round(end * e)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

/* ---------- image parallax inside frames ---------- */
const para = [...document.querySelectorAll('.frame img, .phero-img img, .kitchen-bg')].filter(outside);
const live = new Set();
if (!reduced && para.length) {
  root.classList.add('fx-para');
  const pio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target)), { rootMargin: '10% 0px' });
  para.forEach(img => pio.observe(img));
}
function parallax() {
  const vh = innerHeight;
  for (const img of live) {
    const r = (img.parentElement || img).getBoundingClientRect();
    const p = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
    img.style.translate = `0 ${(-p * (img.classList.contains('kitchen-bg') ? 6 : 7)).toFixed(2)}%`;
  }
}

/* ---------- reading progress on articles ---------- */
const bar = document.getElementById('read-bar'), article = document.querySelector('.post-body');
function reading() {
  if (!bar || !article) return;
  const r = article.getBoundingClientRect();
  bar.style.transform = `scaleX(${clamp((innerHeight * .6 - r.top) / r.height, 0, 1).toFixed(4)})`;
}

/* ---------- menu marquee follows scroll speed and direction ---------- */
const tracks = [...document.querySelectorAll('.mq-track')].map(t => ({ t, anim: t.getAnimations ? t.getAnimations()[0] : null, rate: 1 }));
let lastY = scrollY, vel = 0;
function marquee(dt) {
  const y = scrollY, v = (y - lastY) / Math.max(dt, .001); lastY = y;
  vel += (v - vel) * .12;
  for (const m of tracks) {
    if (!m.anim) continue;
    const dir = vel < -30 ? -1 : vel > 30 ? 1 : Math.sign(m.rate) || 1;
    const target = dir * (1 + Math.min(5, Math.abs(vel) / 600));
    m.rate += (target - m.rate) * .08;
    m.anim.playbackRate = m.rate;
  }
}

/* ---------- one frame loop ---------- */
let prev = performance.now();
function frame(now) {
  const dt = (now - prev) / 1000; prev = now;
  if (lenis) {
    const busy = body.classList.contains('mnav-open') || document.querySelector('dialog[open]');
    if (busy && !lenis.isStopped) lenis.stop(); else if (!busy && lenis.isStopped) lenis.start();
    lenis.raf(now);
  }
  if (live.size) parallax();
  reading();
  if (tracks.length && !reduced) marquee(dt);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- cursor follower (mouse only) ---------- */
if (fine && !reduced) {
  const c = document.createElement('div');
  c.className = 'cursor'; c.setAttribute('aria-hidden', 'true'); c.innerHTML = '<span></span>';
  body.appendChild(c);
  const label = c.firstChild;
  let x = -100, y = -100, cx = x, cy = y, shown = false;
  const LABELS = [['.dish-a', '详情'], ['.team', '故事'], ['[data-open]', '打开'], ['.card, .visit-card, .lead-post, .nx', '查看'], ['.kitchen', '进入厨房']];
  addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY;
    if (!shown) { shown = true; cx = x; cy = y; c.classList.add('on'); }
    const t = e.target instanceof Element ? e.target : null;
    let text = '';
    if (t && !t.closest('.pill, button, input, select, textarea, label, .chips, summary')) for (const [sel, l] of LABELS) if (t.closest(sel)) { text = l; break; }
    if (t && t.closest('.kitchen') && !t.closest('a')) text = '';
    if (label.textContent !== text) label.textContent = text;
    c.classList.toggle('big', !!text);
    c.classList.toggle('link', !text && !!(t && t.closest('a, button, label, summary, select, input, textarea')));
  }, { passive: true });
  document.addEventListener('pointerleave', () => { shown = false; c.classList.remove('on'); });
  (function follow() {
    cx += (x - cx) * .22; cy += (y - cy) * .22;
    c.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
    c.classList.toggle('hide', !!document.querySelector('dialog[open]'));
    requestAnimationFrame(follow);
  })();
}

/* ---------- magnetic buttons ---------- */
if (fine && !reduced) {
  for (const p of document.querySelectorAll('.pill:not(.cta-c), .cart-fab, .burger, .dlg-x')) {
    p.addEventListener('pointermove', e => {
      const r = p.getBoundingClientRect();
      p.style.translate = `${((e.clientX - r.left - r.width / 2) * .22).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * .32).toFixed(1)}px`;
    });
    p.addEventListener('pointerleave', () => { p.style.translate = ''; });
  }
}

/* ---------- gift card tilt and sheen ---------- */
if (fine && !reduced) {
  for (const g of document.querySelectorAll('.giftcard')) {
    const host = g.closest('.frame, .gc-preview') || g;
    host.addEventListener('pointermove', e => {
      const r = g.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      g.style.transform = `perspective(900px) rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 16).toFixed(2)}deg) translateZ(0)`;
      g.style.setProperty('--gx', `${((px + .5) * 100).toFixed(1)}%`); g.style.setProperty('--gy', `${((py + .5) * 100).toFixed(1)}%`);
    });
    host.addEventListener('pointerleave', () => { g.style.transform = ''; });
  }
}

/* ---------- Shanghai clock and today's opening hours ---------- */
const clock = document.getElementById('sh-clock');
function tickClock() {
  const t = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  if (clock) clock.textContent = `上海 ${t}`;
}
if (clock) { tickClock(); setInterval(tickClock, 15000); }
if (TF.shanghaiNow) {
  const day = TF.shanghaiNow().day;
  for (const dt of document.querySelectorAll('dt[data-days]')) {
    if (dt.dataset.days.split(',').map(Number).includes(day)) { dt.classList.add('today'); dt.nextElementSibling && dt.nextElementSibling.classList.add('today'); }
  }
}
})();
