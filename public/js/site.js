// Shared behaviour: nav colour follows the section beneath it, mobile menu, store open/closed status,
// newsletter (demo) and <dialog> open/close with #hash deep links.
(() => {
const root = document.documentElement, nav = document.getElementById('nav');

/* ---------- nav tone ---------- */
let queued = false;
function navTone() {
  queued = false;
  if (document.body.classList.contains('mnav-open')) { root.dataset.navTone = 'dark'; root.dataset.navSolid = '0'; return; }
  const y = Math.min(nav.getBoundingClientRect().bottom + 4, innerHeight - 1);
  const under = document.elementsFromPoint(innerWidth / 2, y).find(el => !nav.contains(el));
  const host = under && under.closest('[data-nav]');
  root.dataset.navTone = host ? host.dataset.nav : 'light';
  root.dataset.navSolid = scrollY > 30 && !(host && host.dataset.navSolid === 'false') ? '1' : '0';
}
const queue = () => { if (!queued) { queued = true; requestAnimationFrame(navTone); } };
addEventListener('scroll', queue, { passive: true });
addEventListener('resize', queue);
navTone();
window.TF = { navTone };

/* ---------- mobile menu ---------- */
const burger = nav.querySelector('.burger'), mnav = document.getElementById('mnav');
function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  mnav.hidden = !open;
  document.body.classList.toggle('mnav-open', open);
  navTone();
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
mnav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); burger.focus(); } });

/* ---------- open now (store time is Shanghai time) ---------- */
const WK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
function shanghaiNow() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Shanghai', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
    .formatToParts(new Date()).map(p => [p.type, p.value]));
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday), mins: (+parts.hour % 24) * 60 + +parts.minute };
}
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
function storeStatus(store) {
  const { day, mins } = shanghaiNow();
  for (const [a, b] of store.hours[day]) if (mins >= toMin(a) && mins < toMin(b)) return { open: true, text: `营业中 · ${b} 打烊` };
  for (let k = 0; k < 8; k++) {
    const d = (day + k) % 7;
    for (const [a] of store.hours[d]) if (k > 0 || toMin(a) > mins) return { open: false, text: `已打烊 · ${k === 0 ? '今天' : k === 1 ? '明天' : WK[d]} ${a} 开门` };
  }
  return { open: false, text: '已打烊' };
}
window.TF.storeStatus = storeStatus;
window.TF.shanghaiNow = shanghaiNow;
for (const el of document.querySelectorAll('.open-now[data-store]')) {
  const store = (window.TF_STORES || []).find(s => s.id === el.dataset.store);
  if (!store) continue;
  const st = storeStatus(store);
  el.textContent = st.text;
  el.classList.toggle('is-open', st.open);
}

/* ---------- newsletter (demo) ---------- */
const news = document.getElementById('news');
if (news) news.addEventListener('submit', e => {
  e.preventDefault();
  const input = news.querySelector('input'), msg = document.getElementById('news-msg');
  if (!input.checkValidity()) { msg.textContent = '这个邮箱地址好像不完整，再检查一下。'; msg.style.color = '#ffc2b0'; input.focus(); return; }
  msg.style.color = ''; msg.textContent = '订阅好了。这是演示网站，不会真的发邮件。'; input.value = '';
});

/* ---------- dialogs ---------- */
function openDialog(d, hash) {
  if (!d || d.open) return;
  d.showModal();
  if (hash) history.replaceState(null, '', '#' + hash);
}
document.addEventListener('click', e => {
  const opener = e.target.closest('[data-open]');
  if (opener) { e.preventDefault(); openDialog(document.getElementById('dlg-' + opener.dataset.open), opener.dataset.open); return; }
  const x = e.target.closest('.dlg-x');
  if (x) { x.closest('dialog').close(); return; }
  if (e.target instanceof HTMLDialogElement) e.target.close(); // click on the backdrop
});
for (const d of document.querySelectorAll('dialog.dlg')) {
  d.addEventListener('close', () => { if (location.hash === '#' + d.id.replace(/^dlg-/, '')) history.replaceState(null, '', location.pathname + location.search); });
}
function fromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const d = document.getElementById('dlg-' + id);
  if (d) openDialog(d);
}
addEventListener('hashchange', fromHash);
fromHash();
window.TF.openDialog = openDialog;

/* ---------- scroll reveals: only for things below the first screen, so nothing visible ever blinks ---------- */
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const SEL = '.sec-head, .card, .frame, .phero-img, .facts>div, .flames li, .timeline li, .values>div, .src, .season li, .visit-card, .lead-post, .post-body>*, .split>.stack>*, .faq details, .kitchen-in>*, .mini-tl li, .next3>.nx, .cat-h, .credit-list li';
  const items = [...document.querySelectorAll(SEL)].filter(el => !el.closest('dialog, .stage, #stage') && el.getBoundingClientRect().top > innerHeight * .92);
  root.classList.add('js');
  const seen = new Map();
  for (const el of items) {
    if (el.matches('.card, .frame') && el.closest('.card') && el.closest('.card') !== el) continue; // a card reveals as one piece
    const parent = el.parentElement, k = seen.get(parent) || 0; seen.set(parent, k + 1);
    el.style.setProperty('--d', `${Math.min(k, 5) * 0.08}s`);
    el.classList.add('rv');
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}
})();
