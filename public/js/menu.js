// Menu: photo peek follows the hovered dish, tag filters, per-dish order form inside its dialog, and a cart kept in localStorage.
(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const MENU = window.TF_MENU, SIZES = window.TF_SIZES;
const { tr } = window.TF;
const yuan = n => `¥${n}`;

/* ---------- photo peek ---------- */
const peekImgs = $$('.menu-peek img'), peekIt = $('#peek-it'), peekCn = $('#peek-cn');
function peek(id) {
  const img = peekImgs.find(i => i.dataset.for === id);
  if (!img) return;
  peekImgs.forEach(i => i.classList.toggle('on', i === img));
  peekIt.textContent = MENU[id].it; peekCn.textContent = MENU[id].label;
}
for (const li of $$('.dish')) {
  li.addEventListener('pointerenter', () => peek(li.dataset.id));
  li.addEventListener('focusin', () => peek(li.dataset.id));
}

/* ---------- filters ---------- */
$('.filters').addEventListener('change', e => {
  const f = e.target.value;
  for (const cat of $$('.cat')) {
    let shown = 0;
    for (const li of $$('.dish', cat)) {
      const ok = f === 'all' || li.dataset.tags.split(' ').includes(f) || (f === 'veg' && li.dataset.tags.includes('vegan'));
      li.hidden = !ok; shown += ok;
    }
    $('.empty', cat).hidden = shown > 0;
  }
});

/* ---------- cart state ---------- */
const KEY = 'tf-cart-v1';
let cart = [];
try { cart = JSON.parse(localStorage.getItem(KEY) || '[]').filter(l => MENU[l.id]); } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { } };
const unit = (id, size) => MENU[id].price + (size ? (SIZES.find(s => s.cm === size) || { delta: 0 }).delta : 0);

/* ---------- per-dish forms ---------- */
for (const form of $$('.add-form')) {
  const id = form.dataset.id, out = $('.q', form), priceEl = $('.add-price', form), msg = $('.add-msg', form);
  let q = 1;
  const size = () => { const r = form.querySelector('input[name="size"]:checked'); return r ? +r.value : null; };
  const refresh = () => { out.textContent = q; priceEl.textContent = yuan(unit(id, size()) * q); };
  form.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) { q = Math.max(1, Math.min(9, q + +b.dataset.q)); refresh(); msg.textContent = ''; } });
  form.addEventListener('change', () => { refresh(); msg.textContent = ''; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const sz = size(), line = cart.find(l => l.id === id && l.size === sz);
    if (line) line.q = Math.min(20, line.q + q); else cart.push({ id, size: sz, q });
    save(); renderCart();
    msg.textContent = tr(`已加入订单：${q} 份 ${MENU[id].label}${sz ? ` · ${sz} cm` : ''}`, `Added to your order: ${q} × ${MENU[id].it}${sz ? ` · ${sz} cm` : ''}`);
    q = 1; refresh();
  });
  form.closest('dialog').addEventListener('close', () => { msg.textContent = ''; });
}

/* ---------- cart dialog ---------- */
const fab = $('#cart-fab'), lines = $('#cart-lines'), sum = $('#cart-sum'), empty = $('#cart-empty'), cmsg = $('#cart-msg'), cform = $('#cart-form');
function totals() {
  const sub = cart.reduce((s, l) => s + unit(l.id, l.size) * l.q, 0);
  const out = cform.querySelector('input[name="mode"]:checked').value === 'out';
  const fee = out && sub > 0 && sub < 150 ? 6 : 0;
  return { sub, fee, out, total: sub + fee, count: cart.reduce((s, l) => s + l.q, 0) };
}
function renderCart() {
  const t = totals();
  fab.hidden = t.count === 0;
  $('#cart-count').textContent = t.count; $('#cart-total').textContent = yuan(t.total);
  empty.hidden = cart.length > 0;
  lines.innerHTML = cart.map((l, k) => `<li>
      <span class="cl-n"><b>${MENU[l.id].it}</b><span>${MENU[l.id].label}${l.size ? ` · ${l.size} cm` : ''}</span></span>
      <span class="stepper sm"><button type="button" data-line="${k}" data-d="-1" aria-label="${tr('减少一份', 'One less')} ${MENU[l.id].label}">−</button><output>${l.q}</output><button type="button" data-line="${k}" data-d="1" aria-label="${tr('增加一份', 'One more')} ${MENU[l.id].label}">+</button></span>
      <span class="cl-p num">${yuan(unit(l.id, l.size) * l.q)}</span>
    </li>`).join('');
  const rows = [[tr('小计', 'Subtotal'), yuan(t.sub)]];
  if (t.out) rows.push([tr('配送费', 'Delivery'), t.fee ? yuan(t.fee) : (t.sub ? tr('满 ¥150 免', 'Free over ¥150') : '—')]);
  const mins = t.out ? 35 + Math.max(0, t.count - 2) * 2 : 15 + Math.max(0, t.count - 2) * 2;
  sum.innerHTML = rows.map(([a, b]) => `<p><span>${a}</span><span class="num">${b}</span></p>`).join('') +
    `<p class="tot"><span>${tr('合计', 'Total')}</span><b class="num">${yuan(t.total)}</b></p>` +
    (t.count ? `<p class="eta">${t.out ? tr(`约 ${mins} 分钟送到`, `Delivered in about ${mins} minutes`) : tr(`约 ${mins} 分钟后可以来取`, `Ready for pickup in about ${mins} minutes`)}</p>` : '');
  $('#cart-submit').disabled = t.count === 0;
}
lines.addEventListener('click', e => {
  const b = e.target.closest('[data-line]'); if (!b) return;
  const l = cart[+b.dataset.line]; l.q += +b.dataset.d;
  if (l.q <= 0) cart.splice(+b.dataset.line, 1);
  save(); renderCart(); cmsg.textContent = '';
});
cform.addEventListener('change', () => { renderCart(); cmsg.textContent = ''; });
$('#cart-clear').addEventListener('click', () => { cart = []; save(); renderCart(); cmsg.textContent = ''; });
cform.addEventListener('submit', e => {
  e.preventDefault();
  if (!cart.length) return;
  const t = totals(), no = 'TF' + String(Date.now()).slice(-6);
  cmsg.className = 'msg ok';
  cmsg.textContent = tr(`订单 ${no} 已提交，合计 ${yuan(t.total)}。这是演示网站，订单不会真的发出。`, `Order ${no} placed, total ${yuan(t.total)}. This is a demo site, so no order will actually be sent.`);
  cart = []; save(); renderCart();
});
renderCart();
})();
