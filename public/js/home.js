// Home stage: a slice on wine red bursts into its ingredients, which orbit with leader-line labels
// on cream and then settle back as a plated Margherita. Everything is driven by scroll progress p (0–1).
(() => {
const $ = s => document.querySelector(s);
const clamp = (x, a = 0, b = 1) => x < a ? a : x > b ? b : x;
const lerp = (a, b, t) => a + (b - a) * t;
const inv = (a, b, x) => clamp((x - a) / (b - a));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const D = Math.PI / 180;
const story = $('#story');
if (!story) return;

/* ---------- orbiting ingredients: radius r and size s are in stage units (1u = min(W, 1.5H)/100) ---------- */
const ITEMS = [
  { src: 'mozz-0', s: 17, r: 31, a: 10, h: 2, label: ['Fior di latte', '阿杰罗拉鲜马苏里拉'] },
  { src: 'tomato-half', s: 17, r: 34, a: 75, h: -6, label: ['Pomodoro San Marzano', '圣马扎诺番茄 · DOP'] },
  { src: 'basil-sprig-b', s: 22, r: 33, a: 140, h: -10, label: ['Basilico', '新鲜罗勒，出炉前才放'] },
  { src: 'mozz-2', s: 14, r: 29, a: 200, h: 8 },
  { src: 'tomato-a', s: 11.5, r: 37, a: 250, h: 10 },
  { src: 'basil-sprig-a', s: 19, r: 30, a: 305, h: -4 },
  { src: 'tomato-b', s: 10, r: 22, a: 40, h: -18 },
  { src: 'mozz-4', s: 12, r: 24, a: 225, h: -16 },
  { src: 'mozz-1', s: 11, r: 40, a: 340, h: 14 },
  { drop: true, s: 2.6, r: 19, a: 110, h: 14, label: ['Olio extravergine', '特级初榨橄榄油 · 最后淋一圈'] },
  { drop: true, s: 2.0, r: 26, a: 175, h: -2 },
  { drop: true, s: 1.7, r: 21, a: 290, h: 6 },
];
const orbit = $('#orbit'), labelsEl = $('#labels'), leaders = $('#leaders');
function makeLabel(label) {
  const lb = document.createElement('div'); lb.className = 'lbl'; lb.innerHTML = `<i>${label[0]}</i><span>${label[1]}</span>`;
  labelsEl.appendChild(lb);
  const ln = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  ln.setAttribute('fill', 'none'); ln.setAttribute('stroke', '#2b1915'); ln.setAttribute('stroke-width', '.8'); ln.setAttribute('stroke-opacity', '0');
  leaders.appendChild(ln);
  return { lb, ln };
}
for (const it of ITEMS) {
  let el;
  if (it.drop) { el = document.createElement('div'); el.className = 'drop'; }
  else { el = document.createElement('img'); el.className = 'obj shadow'; el.src = `/media/rosso/${it.src}.webp`; el.alt = ''; el.decoding = 'async'; }
  el.setAttribute('aria-hidden', 'true'); orbit.appendChild(el); it.el = el;
  if (it.label) Object.assign(it, makeLabel(it.label));
}
const flourLabel = makeLabel(['Farina tipo 00', '00 号软麦粉 · 含水 65%']);

const stage = $('#stage'), hero = $('#o-hero'), plate = $('#o-plate'), flour = $('#o-flour'), flourA = $('#o-flourA'), crema = $('#crema'), glow = $('#glow');
const txtA = $('#txtA'), txtB = $('#txtB'), txtC = $('#txtC'), ctaC = $('#ctaC'), side = $('#side'), cue = $('#cue'), dots = [...document.querySelectorAll('.dots i')];
const G = [['#d-basil', .62, -.28, .42, 24], ['#d-tomato', -.6, .3, .3, -12], ['#d-tomato2', -.5, .52, .17, 0], ['#d-mozz', .58, .42, .24, 30]].map(([s, ...r]) => [$(s), ...r]);

const aspect = el => (el.naturalWidth && el.naturalHeight) ? el.naturalHeight / el.naturalWidth : 1;
function place(el, x, y, w, rot = 0, o = 1, z = 0) {
  const h = w * (el.tagName === 'IMG' ? aspect(el) : 1.25);
  el.style.width = w.toFixed(1) + 'px';
  el.style.transform = `translate3d(${(x - w / 2).toFixed(1)}px,${(y - h / 2).toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg)`;
  el.style.opacity = o.toFixed(3); el.style.zIndex = z;
}

let p = 0, t0 = performance.now(), clock = 0, lastTone = '';
const target = () => { const r = story.getBoundingClientRect(); return clamp(-r.top / (story.offsetHeight - innerHeight)); };
const SECTIONS = ['Sezione 01 — La Fetta', 'Sezione 02 — Gli Ingredienti', 'Sezione 03 — Il Capolavoro'];

function frame(now) {
  requestAnimationFrame(frame);
  const r = story.getBoundingClientRect();
  if (r.bottom < -50 || r.top > innerHeight + 50) { t0 = now; return; } // off screen: skip work
  const dt = Math.min(.05, (now - t0) / 1000); t0 = now; clock += reduced ? 0 : dt;
  const pt = target(); p += (pt - p) * (reduced ? 1 : 1 - Math.exp(-dt * 7)); if (Math.abs(pt - p) < 1e-4) p = pt;
  const W = innerWidth, H = stage.clientHeight, mob = W < 820, U = mob ? Math.min(W / 72, H / 110) : Math.min(W, H * 1.5) / 100;
  const fin = ease(inv(.66, .8, p));
  const cx = W * (mob ? .5 : lerp(.6, .5, fin)), cy = H * (mob ? .58 : lerp(.63, .56, fin));

  // cream panel rises over the wine red; the nav and side labels follow the ground colour
  const wipe = ease(inv(.15, .3, p));
  crema.style.transform = `translateY(${((1 - wipe) * 100).toFixed(2)}%)`;
  glow.style.opacity = (1 - wipe).toFixed(3);
  const tone = wipe > .55 ? 'light' : 'dark';
  if (tone !== lastTone) { lastTone = tone; stage.dataset.nav = tone; window.TF && window.TF.navTone(); }

  // copy
  const aOut = inv(.1, .19, p);
  txtA.style.opacity = (1 - aOut).toFixed(3); txtA.style.translate = `0 ${(-aOut * 40).toFixed(1)}px`;
  txtA.style.visibility = aOut >= 1 ? 'hidden' : 'visible';
  const bOn = Math.min(inv(.3, .37, p), 1 - inv(.62, .69, p));
  txtB.style.opacity = bOn.toFixed(3); txtB.style.translate = `0 ${((1 - inv(.3, .37, p)) * 24).toFixed(1)}px`;
  const cOn = inv(.76, .84, p);
  txtC.style.opacity = cOn.toFixed(3); ctaC.style.opacity = cOn.toFixed(3); ctaC.style.pointerEvents = cOn > .5 ? 'auto' : 'none';
  ctaC.style.visibility = cOn > 0 ? 'visible' : 'hidden';
  ctaC.style.translate = `0 ${((1 - cOn) * 16).toFixed(1)}px`;
  cue.style.opacity = (1 - inv(.02, .06, p)).toFixed(3);
  const sec = p < .24 ? 0 : p < .74 ? 1 : 2; dots.forEach((d, i) => d.classList.toggle('on', i === sec));
  if (side.textContent !== SECTIONS[sec]) side.textContent = SECTIONS[sec];

  // hero slice: floats right on red, glides to the centre, spins while the ingredients orbit, then sinks into the plate
  const bob = Math.sin(clock * 1.3) * 6;
  const toC = ease(inv(.14, .3, p)), sink = ease(inv(.64, .76, p));
  const hx = lerp(mob ? W * .56 : W * .72, cx, toC), hy = lerp(mob ? H * .79 : H * .52, cy, toC) + bob * (1 - toC) + sink * 8 * U;
  const hw = lerp(mob ? Math.min(36 * U, H * .23) : 38 * U, 21 * U, toC) * (1 - sink * .45);
  const hr = lerp(-16, 8, toC) + inv(.3, .66, p) * 50 + sink * 30 + Math.sin(clock * .9) * 2 * (1 - toC);
  place(hero, hx, hy, hw, hr, 1 - inv(.72, .79, p), 30);

  // flour: a streak behind the slice on red, a cloud behind the orbit on cream
  place(flourA, hx + 4 * U, hy - 2 * U, lerp(48, 30, toC) * U, -20, .55 * (1 - inv(.18, .26, p)), 1);
  const fl = Math.min(inv(.22, .34, p), 1 - inv(.66, .76, p));
  place(flour, cx - 2 * U, cy + 2 * U, (46 + inv(.3, .66, p) * 10) * U, inv(.3, .66, p) * 20, fl * .9, 2);
  flour.style.filter = 'brightness(.86) sepia(.25)';

  // orbit: burst out of the slice, circle on a tilted ring with depth, then spiral back in
  const burst = easeOut(inv(.17, .33, p)), gather = ease(inv(.64, .77, p));
  const spin = inv(.2, .76, p) * 300 + clock * 4, tilt = .32;
  const xr = mob ? .9 : Math.min(1.2, (cx - W * .4) / (36 * U));
  const visible = [];
  for (const it of ITEMS) {
    const ang = (it.a + spin) * D, rad = it.r * U * burst * (1 - gather) * (mob ? .82 : 1);
    const z = Math.sin(ang);
    const x = cx + Math.cos(ang) * rad * Math.max(.75, xr);
    const y = cy + it.h * U * burst * (1 - gather) + z * rad * tilt + gather * 6 * U;
    const depth = .72 + .28 * (z + 1) / 2;
    const w = it.s * U * depth * (.4 + .6 * burst) * (1 - gather * .7);
    const o = burst * (1 - gather) * (.55 + .45 * (z + 1) / 2);
    place(it.el, x, y, w, (it.a * 1.7 + spin * (it.drop ? 0 : .6)) % 360, o, z > 0 ? 40 + Math.round(z * 10) : 20);
    if (it.lb) visible.push({ it, x, y, w, z });
  }
  const lblOn = Math.min(inv(.32, .38, p), 1 - inv(.6, .66, p));
  for (const { it, x, y, w, z } of visible) {
    const show = lblOn * clamp((z + .15) / .5);
    const right = x >= cx, lx = x + (right ? 1 : -1) * (w * .45 + 7 * U), ly = y - (mob ? 7 : 9) * U;
    it.lb.className = 'lbl ' + (right ? 'r' : 'l');
    const bw = it.lb.offsetWidth, bx = clamp(right ? lx + 6 : lx - 6 - bw, 8, W - bw - 8);
    it.lb.style.transform = `translate3d(${bx.toFixed(1)}px,${(ly - 34).toFixed(1)}px,0)`;
    it.lb.style.opacity = show.toFixed(3);
    it.ln.setAttribute('points', `${(x + (right ? 1 : -1) * w * .3).toFixed(1)},${(y - w * .12).toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)} ${(lx + (right ? 1 : -1) * Math.min(bw, 150)).toFixed(1)},${ly.toFixed(1)}`);
    it.ln.setAttribute('stroke-opacity', (show * .55).toFixed(3));
  }
  { // flour label sits on the cloud, left of centre
    const show = lblOn * (mob ? 0 : 1), lx = cx - 30 * U, ly = cy + 24 * U, bw = flourLabel.lb.offsetWidth;
    flourLabel.lb.className = 'lbl l';
    flourLabel.lb.style.transform = `translate3d(${(lx - 6 - bw).toFixed(1)}px,${(ly - 34).toFixed(1)}px,0)`; flourLabel.lb.style.opacity = show.toFixed(3);
    flourLabel.ln.setAttribute('points', `${(cx - 12 * U).toFixed(1)},${(cy + 14 * U).toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)} ${(lx - Math.min(bw, 150)).toFixed(1)},${ly.toFixed(1)}`);
    flourLabel.ln.setAttribute('stroke-opacity', (show * .55).toFixed(3));
  }

  // the plated Margherita rises in as everything gathers; sized to fit under the headline on short screens
  const rise = ease(inv(.64, .78, p));
  const pwFull = Math.min((mob ? 80 : 50) * U, H * (mob ? .5 : .56), W * .84), pw = pwFull * lerp(.85, 1, rise);
  const headBottom = txtC.offsetTop + txtC.offsetHeight + 8, plateY = Math.max(cy + 3 * U, headBottom + pwFull / 2);
  place(plate, cx, lerp(H + pw * .6, plateY, rise), pw, lerp(-40, 0, rise) + inv(.8, 1, p) * 14, Math.min(1, rise * 1.4), 25);
  const dz = easeOut(inv(.78, .9, p)), k = mob ? .8 : 1;
  for (const [el, gx, gy, gs, gr] of G) {
    place(el, cx + gx * pwFull * k + (1 - dz) * gx * 40 * U, plateY + gy * pwFull * k - (1 - dz) * 10 * U, gs * pwFull, gr + (1 - dz) * 40, dz, 26);
  }
}
requestAnimationFrame(t => { t0 = t; frame(t); });

// the kitchen teaser video only plays while it is on screen
const kv = document.querySelector('.kitchen-bg');
if (kv) {
  if (reduced) { kv.removeAttribute('autoplay'); kv.pause(); }
  else new IntersectionObserver(([e]) => { if (e.isIntersecting) kv.play().catch(() => { }); else kv.pause(); }).observe(kv);
}
})();
