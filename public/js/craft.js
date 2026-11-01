// Craft page: scroll scrubs a stack of kitchen clips (T runs 0–7, one unit per section), with a kitchen ticket,
// station HUD and live station cards that follow the same timeline.
(() => {
const clamp = (x, a = 0, b = 1) => x < a ? a : x > b ? b : x;
const lerp = (a, b, t) => a + (b - a) * t;
const inv = (a, b, x) => clamp((x - a) / (b - a));
const sm = t => t * t * (3 - 2 * t);
const $ = s => document.querySelector(s);
const { tr } = window.TF;
const pad = n => String(n).padStart(2, '0');
const mqMobile = matchMedia('(max-width: 720px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const setText = (el, s) => { if (el && el.textContent !== s) el.textContent = s; };

/* ---------- film layers: each owns the T range a..b; F is the crossfade half-width ---------- */
const F = .04;
const LAYERS = [
  ['#v-p1', -1, 1], ['#v-p2', 1, 2], ['#v-p3', 2, 3], ['#v-p4a', 3, 3.5], ['#v-p4b', 3.5, 4],
  ['#v-p5a', 4, 4.3], ['#v-p5b', 4.3, 4.78], ['#v-p5c', 4.78, 5], ['#v-p6', 5, 6], ['#v-p7', 6, 9],
].map(([s, a, b]) => ({ el: $(s), video: $(s), a, b }));
const STATIONS = [
  { t: 0, name: tr('工位 01', 'Station 01'), loc: tr('面案', 'Dough bench'), day: '10-19', h: 8, m: 12 },
  { t: 1, name: tr('工位 02', 'Station 02'), loc: tr('冷藏醒发柜 · 4°C', 'Proving cabinet · 4°C'), day: '10-19', h: 9, m: 0 },
  { t: 2, name: tr('工位 03', 'Station 03'), loc: tr('披萨台', 'Pizza bench'), day: '10-22', h: 19, m: 41 },
  { t: 4, name: tr('工位 04', 'Station 04'), loc: tr('木柴炉 · 3 号炉膛', 'Wood oven · chamber 3'), day: '10-22', h: 19, m: 42 },
  { t: 5, name: tr('工位 05', 'Station 05'), loc: tr('出餐口', 'The pass'), day: '10-22', h: 19, m: 43 },
  { t: 6, name: tr('3 号桌', 'Table 3'), loc: tr('堂食', 'Dining room'), day: '10-22', h: 19, m: 44 },
];
let primed = false;
function prime() { // iOS only paints seeks after the element has played once
  if (primed) return; primed = true;
  for (const L of LAYERS) { const p = L.video.play(); if (p) p.then(() => L.video.pause()).catch(() => { }); }
}
['pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(e => addEventListener(e, prime, { once: true, passive: true }));
const layerOpacity = (L, T) => Math.min(L.a < 0 ? 1 : clamp((T - (L.a - F)) / (2 * F)), clamp(((L.b + F) - T) / (2 * F)));
function seek(v, u) {
  const d = v.duration; if (!d || !isFinite(d) || v.readyState < 1) return;
  const t = clamp(u * d, 0, d - .05);
  if (!v.seeking && Math.abs(v.currentTime - t) > .03) { try { v.currentTime = t; } catch (e) { } }
}
const blur = $('#blurbg'), bctx = blur.getContext('2d'), portLayer = LAYERS.find(L => L.el.classList.contains('port'));

/* ---------- scroll timeline ---------- */
const copies = [...document.querySelectorAll('.copy')];
const sections = [...document.querySelectorAll('.shot')];
let secTop = [], secH = [], stickTop = 0, stickBot = 0;
function measure() {
  secTop = sections.map(s => s.getBoundingClientRect().top + scrollY); secH = sections.map(s => s.offsetHeight);
  const cs = getComputedStyle(copies[1]); stickTop = parseFloat(cs.top) || 0; stickBot = parseFloat(cs.bottom) || 0;
}
function scrollT() { const y = scrollY; for (let i = sections.length - 1; i >= 0; i--) if (y >= secTop[i]) return Math.min(7, i + (y - secTop[i]) / secH[i]); return 0; }
function scrollToT(T) { const i = Math.min(6, Math.floor(T)), y = secTop[i] + (T - i) * secH[i] + 2; if (window.TF && TF.scrollTo) TF.scrollTo(y); else scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' }); }
function updateCopy() {
  const vh = innerHeight, mob = mqMobile.matches;
  for (const el of copies) {
    const r = el.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) { el.style.opacity = 0; continue; }
    const pin = mob ? vh - stickBot - r.height : stickTop, d = r.top - pin;
    el.style.opacity = (d > 0 ? 1 - clamp(d / (vh * .3)) : 1 - clamp(-d / (vh * .2))).toFixed(3);
  }
}
const stepBtns = [...document.querySelectorAll('#steps button')], STEPS = stepBtns.map(b => +b.dataset.t);
const stepLis = stepBtns.map(b => b.parentElement), progress = $('#progress');
let lastStep = -1;
function updateTicket(T) {
  let cur = 0; STEPS.forEach((s, i) => { if (T >= s - .001) cur = i; });
  progress.style.setProperty('--p', (T / 7).toFixed(4));
  if (cur === lastStep) return; lastStep = cur;
  stepLis.forEach((li, i) => { li.classList.toggle('done', i < cur || (i === cur && T >= 6.2)); li.classList.toggle('now', i === cur); });
}
stepBtns.forEach(b => b.addEventListener('click', () => scrollToT(+b.dataset.t + .02)));

/* ---------- station overlays ---------- */
const cards = [...document.querySelectorAll('.st-card')].map(el => ({ el, a: +el.dataset.from, b: +el.dataset.to }));
const rowLis = [...document.querySelectorAll('.st-card .rows li')];
const el = id => document.getElementById(id);
const stName = el('st-name'), stLoc = el('st-loc'), stTime = el('st-time');
const proofH = el('proof-h'), proofBar = el('proof-bar'), crust = el('crust'), gArc = el('g-arc'), gTemp = el('g-temp'), bakeBar = el('bake-bar'), bakeT = el('bake-t'), turn1 = el('turn1'), turn2 = el('turn2'), heat = el('heat');
function crustPath(k) { // cross-section of the base; k grows the rim from a flat disc to a 2 cm cornicione
  const rim = lerp(6, 26, k), mid = lerp(10, 4, k), y0 = 80;
  return `M10 ${y0} C10 ${y0 - rim} 52 ${y0 - rim} 54 ${y0 - mid - 2} L246 ${y0 - mid - 2} C248 ${y0 - rim} 290 ${y0 - rim} 290 ${y0} Z`;
}
function updateOverlays(T, activeVideo) {
  for (const c of cards) c.el.classList.toggle('on', T >= c.a && T < c.b);
  for (const li of rowLis) li.classList.toggle('ok', T >= +li.dataset.t);
  let st = STATIONS[0]; for (const s of STATIONS) if (T >= s.t - F) st = s;
  setText(stName, st.name); setText(stLoc, st.loc);
  const total = st.h * 3600 + st.m * 60 + Math.floor((activeVideo ? activeVideo.currentTime : 0) * 4);
  setText(stTime, `${st.day} ${pad(Math.floor(total / 3600) % 24)}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}`);
  const pr = sm(inv(1.08, 1.95, T)), mins = Math.round(pr * 72 * 60);
  setText(proofH, `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`); proofBar.style.setProperty('--v', pr.toFixed(3));
  crust.setAttribute('d', crustPath(sm(inv(2.1, 2.85, T))));
  const temp = Math.round(lerp(380, 485, sm(inv(4.02, 4.3, T)))), bake = sm(inv(4.3, 4.95, T)), secs = Math.round(bake * 90);
  setText(gTemp, `${T < 4.02 ? 380 : temp}°C`); gArc.setAttribute('stroke-dasharray', `${(temp / 500 * 100).toFixed(1)} 100`);
  bakeBar.style.setProperty('--v', bake.toFixed(3)); setText(bakeT, tr(`已烤 ${secs}″`, `Baked ${secs}″`));
  turn1.classList.toggle('ok', secs >= 30); turn2.classList.toggle('ok', secs >= 60);
  setText(turn1, secs >= 30 ? tr('转饼 ✓', 'Turned ✓') : tr('转饼 30″', 'Turn 30″')); setText(turn2, secs >= 60 ? tr('转饼 ✓', 'Turned ✓') : tr('转饼 60″', 'Turn 60″'));
  heat.style.opacity = (Math.min(inv(3.96, 4.1, T), 1 - inv(4.9, 5.08, T)) * .9).toFixed(3);
}

/* ---------- loop ---------- */
const finaleEl = el('finale');
let curT = 0, last = performance.now();
function tick(now) {
  const dt = Math.min(.05, Math.max(0, now - last) / 1000); last = now;
  const target = scrollT(); curT += (target - curT) * (reduced ? 1 : 1 - Math.exp(-dt * 6)); if (Math.abs(target - curT) < 1e-4) curT = target;
  const T = curT;
  let activeVideo = null, topO = 0;
  for (const L of LAYERS) {
    const o = layerOpacity(L, T); L.el.style.opacity = o.toFixed(3);
    if (T > L.a - .5 && T < L.b + .3 && L.video.preload !== 'auto') { L.video.preload = 'auto'; L.video.load(); }
    if (o > 0) {
      const u = L.a < 0 ? inv(0, L.b + F, T) : inv(L.a - F, L.b + F, T);
      seek(L.video, u); L.el.style.setProperty('--s', (1.05 - .05 * u).toFixed(4));
      if (o >= topO) { topO = o; activeVideo = L.video; }
    }
  }
  const po = layerOpacity(portLayer, T); blur.style.opacity = po.toFixed(3);
  if (po > 0 && portLayer.video.readyState >= 2) { try { bctx.drawImage(portLayer.video, 0, 0, blur.width, blur.height); } catch (e) { } }
  updateCopy(); updateTicket(T); updateOverlays(T, activeVideo);
  document.body.classList.toggle('in-finale', finaleEl.getBoundingClientRect().top < innerHeight * .65);
}
function frame(now) { tick(now); requestAnimationFrame(frame); }
addEventListener('resize', measure);

async function boot() {
  measure(); document.fonts.ready.then(measure);
  const fill = $('#ld-fill'); fill.style.transform = 'scaleX(.5)';
  const first = $('#v-p1');
  await Promise.race([new Promise(r => first.readyState >= 2 ? r() : first.addEventListener('loadeddata', r, { once: true })), new Promise(r => setTimeout(r, 4000))]);
  fill.style.transform = 'scaleX(1)'; $('#ld-msg').textContent = '485°C';
  curT = scrollT(); requestAnimationFrame(t => { last = t; frame(t); });
  setTimeout(() => $('#loader').classList.add('done'), 250);
}
boot();
})();
