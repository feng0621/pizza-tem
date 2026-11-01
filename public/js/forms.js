// Demo forms on the locations and events pages: contact, pizza class sign-up, private dinner enquiry, gift card.
(() => {
const $ = (s, r = document) => r.querySelector(s);
const { tr, dayLabel, shortDate } = window.TF;
const say = (form, text, ok = true) => { const m = $('.msg', form) || $('#c-out'); m.className = 'msg ' + (ok ? 'ok' : 'err'); m.textContent = text; };
function need(form, ids) {
  for (const id of ids) {
    const el = $('#' + id);
    if (!el.value.trim() || !el.checkValidity()) { { const label = el.labels[0].textContent.replace(/（.*）|\s*\(.*\)/, ''); say(form, tr(`${label}还没填好。`, `Please complete: ${label}.`), false); }; el.focus(); return false; }
  }
  return true;
}

/* contact */
const contact = $('#contact-form');
if (contact) contact.addEventListener('submit', e => {
  e.preventDefault();
  if (!need(contact, ['c-name', 'c-email', 'c-msg'])) return;
  say(contact, tr('收到了，我们会在两个工作日内回复。这是演示网站，留言不会真的发出。', 'Thanks, we will reply within two working days. This is a demo site, so your message will not actually be sent.'));
  contact.reset();
});

/* pizza class: the next four Saturdays, seats left are simulated */
const cls = document.querySelector('.ev-form[data-ev="scuola"]');
if (cls) {
  const box = $('#class-dates'), base = new Date(); let n = 1;
  const sats = []; for (let d = new Date(base); sats.length < 4; d.setDate(d.getDate() + 1)) if (d.getDay() === 6 && d > base) sats.push(new Date(d));
  box.innerHTML = sats.map((d, i) => { const left = [3, 6, 0, 8][i]; return `<input type="radio" name="cday" id="cd-${i}" value="${shortDate(d)}"${left ? '' : ' disabled'}><label for="cd-${i}">${shortDate(d)}<small>${left ? tr(`剩 ${left} 位`, `${left} left`) : tr('已满', 'Full')}</small></label>`; }).join('');
  box.querySelector('input:not(:disabled)').checked = true;
  const refresh = () => { $('#class-n').textContent = n; $('#class-sum').textContent = tr(`合计 ¥${398 * n}`, `Total ¥${398 * n}`); };
  cls.addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (b) { n = Math.max(1, Math.min(4, n + +b.dataset.step)); refresh(); } });
  cls.addEventListener('submit', e => {
    e.preventDefault();
    if (!need(cls, ['cl-name', 'cl-phone'])) return;
    const day = cls.querySelector('input[name="cday"]:checked').value;
    say(cls, tr(`报好了：${day} 周六 14:00，${n} 位，合计 ¥${398 * n}。这是演示网站，不会真的报名。`, `You are in: Saturday, ${day} at 14:00, ${n} ${n === 1 ? 'person' : 'people'}, total ¥${398 * n}. This is a demo site, so no sign-up will actually be made.`));
  });
  refresh();
}

/* private dinner */
const pv = document.querySelector('.ev-form[data-ev="privata"]');
if (pv) {
  const date = $('#pv-date'), soon = new Date(); soon.setDate(soon.getDate() + 7);
  date.min = soon.toISOString().slice(0, 10);
  const refresh = () => {
    const guests = Math.max(20, Math.min(40, +$('#pv-n').value || 20)), pkg = +pv.querySelector('input[name="pkg"]:checked').value;
    const d = date.value ? new Date(date.value + 'T12:00') : null;
    const warn = d && (d.getDay() === 5 || d.getDay() === 6 || d.getDay() === 0) ? tr(' · 包场只在周一至周四晚', ' · private dining runs Monday to Thursday evenings only') : '';
    $('#pv-sum').textContent = `${tr(`预计 ${guests} 人`, `Estimate: ${guests} guests`)} × ¥${pkg} = ¥${(guests * pkg).toLocaleString('en-US')}${d ? ` · ${dayLabel(d)}` : ''}${warn}`;
  };
  pv.addEventListener('input', refresh);
  pv.addEventListener('submit', e => {
    e.preventDefault();
    if (!need(pv, ['pv-date', 'pv-n', 'pv-name', 'pv-phone'])) return;
    say(pv, tr('咨询已发送，活动经理会在一个工作日内打电话给你。这是演示网站，不会真的发出。', 'Enquiry sent. Our events manager will call you within one working day. This is a demo site, so nothing will actually be sent.'));
  });
  refresh();
}

/* gift card: live preview */
const gc = document.querySelector('.ev-form[data-ev="regalo"]');
if (gc) {
  const card = $('.gc-preview .giftcard', gc);
  const refresh = () => {
    $('.gc-amt b', card).textContent = gc.querySelector('input[name="amt"]:checked').value;
    const to = $('#gc-to').value.trim(), from = $('#gc-from').value.trim();
    $('.gc-to', card).textContent = to ? tr(`给 ${to}${from ? ` · 来自 ${from}` : ''}`, `To ${to}${from ? ` · from ${from}` : ''}`) : (from ? tr(`来自 ${from}`, `From ${from}`) : tr('给你', 'For you'));
  };
  gc.addEventListener('input', refresh);
  gc.addEventListener('submit', e => {
    e.preventDefault();
    say(gc, tr(`¥${gc.querySelector('input[name="amt"]:checked').value} 礼品卡已经做好了。这是演示网站，不会真的付款。`, `Your ¥${gc.querySelector('input[name="amt"]:checked').value} gift card is ready. This is a demo site, so no payment will actually be taken.`));
  });
  refresh();
}
})();
