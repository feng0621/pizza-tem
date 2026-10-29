// Reservation (demo): store → date → time → party → seating, all in Shanghai time; availability is simulated but stable.
(() => {
const $ = s => document.querySelector(s);
const STORES = window.TF_STORES, SL = window.TF_SLOTS;
const WK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const MAX = { jingan: 6, cortile: 10 };
const form = $('#rs-form'), days = $('#rs-days'), times = $('#rs-times'), areas = $('#rs-areas');
const nOut = $('#rs-n'), partyNote = $('#rs-party-note'), timesNote = $('#rs-times-note'), sum = $('#rs-sum'), msg = $('#rs-msg');
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

const q = new URLSearchParams(location.search).get('store');
if (q && SL[q]) $('#rs-' + q).checked = true;
let n = 2;

const storeId = () => form.querySelector('input[name="store"]:checked').value;
const store = () => STORES.find(s => s.id === storeId());
function shanghaiDate(offset) {
  const d = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  d.setDate(d.getDate() + offset);
  return d;
}
const nowMin = () => { const d = shanghaiDate(0); return d.getHours() * 60 + d.getMinutes(); };
const checked = name => form.querySelector(`input[name="${name}"]:checked`);

function renderDays() {
  const prev = checked('day')?.value, s = store();
  let html = '';
  const lastSlot = SL[s.id].slots.map(toMin).reduce((a, b) => Math.max(a, b), 0);
  for (let i = 0; i < 14; i++) {
    const d = shanghaiDate(i), closed = !s.hours[d.getDay()].length, over = i === 0 && !closed && nowMin() + 30 >= lastSlot;
    html += `<input type="radio" name="day" id="day-${i}" value="${i}"${closed || over ? ' disabled' : ''}><label for="day-${i}">${d.getMonth() + 1}/${d.getDate()}<small>${closed ? '休息' : over ? '今天已截止' : i === 0 ? '今天' : i === 1 ? '明天' : WK[d.getDay()]}</small></label>`;
  }
  days.innerHTML = html;
  const keep = prev && !$('#day-' + prev).disabled ? $('#day-' + prev) : days.querySelector('input:not(:disabled)');
  keep.checked = true;
}
function renderTimes() {
  const prev = checked('time')?.value, s = store(), di = +checked('day').value, d = shanghaiDate(di);
  const open = s.hours[d.getDay()], late = di === 0 ? nowMin() + 30 : -1;
  const slots = SL[s.id].slots.filter(t => open.some(([a, b]) => toMin(t) >= toMin(a) && toMin(t) <= toMin(b) - 60));
  times.innerHTML = slots.map((t, i) => {
    const past = toMin(t) <= late;
    const full = !past && ((i * 7 + di * 3 + n) % 5 === 0 || (n >= 6 && i % 2 === 1));
    return `<input type="radio" name="time" id="tm-${i}" value="${t}"${past || full ? ' disabled' : ''}><label for="tm-${i}">${t}${full ? '<small>已满</small>' : ''}</label>`;
  }).join('');
  const keep = [...times.querySelectorAll('input:not(:disabled)')];
  (keep.find(i => i.value === prev) || keep.find(i => i.value >= '19:00') || keep[0] || {}).checked = true;
  timesNote.textContent = keep.length ? '' : '这一天已经订满了，换一天试试。';
}
function renderAreas() {
  const prev = checked('area')?.value, s = SL[storeId()];
  areas.innerHTML = s.areas.map((a, i) => {
    const off = a.startsWith('吧台') && n > 2;
    return `<input type="radio" name="area" id="ar-${i}" value="${a}"${off ? ' disabled' : ''}><label for="ar-${i}">${a}${off ? '<small>最多 2 位</small>' : ''}</label>`;
  }).join('');
  const ok = [...areas.querySelectorAll('input:not(:disabled)')];
  (ok.find(i => i.value === prev) || ok[0]).checked = true;
}
function renderSide() {
  const s = SL[storeId()];
  $('#rs-lede').textContent = s.lede; $('#rs-addr').textContent = s.address;
  const st = window.TF.storeStatus(store()), el = $('#rs-open');
  el.textContent = st.text; el.classList.toggle('is-open', st.open);
}
function renderSummary() {
  const s = SL[storeId()], d = shanghaiDate(+checked('day').value), t = checked('time');
  const max = MAX[storeId()];
  partyNote.innerHTML = n >= max ? (storeId() === 'jingan' ? '静安店最多 6 位，人多请选庭院店' : '10 位以上请看<a href="/events#ev-privata">包场</a>') : '';
  sum.innerHTML = `<p class="caps kicker">你的预订</p><p class="rs-line">${s.it} · ${s.cn}</p><p class="rs-big">${d.getMonth() + 1} 月 ${d.getDate()} 日 ${WK[d.getDay()]} · ${t ? t.value : '—'} · ${n} 位</p><p class="muted">${checked('area')?.value || ''}</p>`;
  form.querySelector('button[type="submit"]').disabled = !t;
}
function renderAll(full = true) {
  if (full) { renderSide(); renderDays(); }
  renderTimes(); renderAreas(); renderSummary(); msg.textContent = '';
}

form.addEventListener('change', e => {
  if (e.target.name === 'store') { n = Math.min(n, MAX[storeId()]); nOut.textContent = n; renderAll(true); }
  else if (e.target.name === 'day') renderAll(false);
  else renderSummary();
});
$('#rs-minus').addEventListener('click', () => { n = Math.max(1, n - 1); nOut.textContent = n; renderAll(false); });
$('#rs-plus').addEventListener('click', () => { n = Math.min(MAX[storeId()], n + 1); nOut.textContent = n; renderAll(false); });

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#rs-name'), phone = $('#rs-phone');
  if (!name.value.trim()) { msg.className = 'msg err'; msg.textContent = '请留一个称呼，到店时报给我们。'; name.focus(); return; }
  if (!/^[\d\s+-]{7,}$/.test(phone.value.trim())) { msg.className = 'msg err'; msg.textContent = '手机号好像不完整，再检查一下。'; phone.focus(); return; }
  const s = SL[storeId()], d = shanghaiDate(+checked('day').value), code = 'TF-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  $('#rs-ticket').innerHTML = `<p class="tk-code">${code}</p><dl class="kv">
    <dt>门店</dt><dd>${s.it} · ${s.cn}</dd><dt>地址</dt><dd>${s.address}</dd>
    <dt>时间</dt><dd>${d.getMonth() + 1} 月 ${d.getDate()} 日 ${WK[d.getDay()]} ${checked('time').value}</dd>
    <dt>人数</dt><dd>${n} 位 · ${checked('area').value}</dd>
    <dt>称呼</dt><dd>${name.value.trim().replace(/[<>&]/g, '')}</dd></dl>`;
  form.hidden = true; const done = $('#rs-done'); done.hidden = false; done.focus();
  const y = done.getBoundingClientRect().top + scrollY - 100; if (window.TF && TF.scrollTo) TF.scrollTo(y); else scrollTo({ top: y, behavior: 'smooth' });
});
$('#rs-again').addEventListener('click', () => { $('#rs-done').hidden = true; form.hidden = false; form.querySelector('input:checked').focus(); });

renderAll(true);
})();
