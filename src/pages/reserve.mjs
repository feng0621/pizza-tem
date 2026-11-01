import { content, translator } from '../content.mjs';
import { esc } from '../layout.mjs';

export async function pages(lang) {
  const { STORES } = content(lang);
  const tr = translator(lang);
  const demo = tr('这是演示网站，不会真的预订座位。', 'This is a demo site. No table will actually be booked.');
  const main = `
<section class="phero red reserve" data-nav="dark" aria-labelledby="h-reserve">
  <div class="wrap reserve-grid">
    <div class="stack reserve-side">
      <p class="caps kicker">Prenota · ${tr('预订', 'Book a table')}</p>
      <h1 class="display h-hero" id="h-reserve">A seat by<br>the <em>fire</em>.</h1>
      <p class="lede" id="rs-lede"></p>
      <dl class="kv rs-store">
        <dt>${tr('地址', 'Address')}</dt><dd id="rs-addr"></dd>
        <dt>${tr('今天', 'Today')}</dt><dd><span class="open-now" id="rs-open"></span></dd>
      </dl>
      <dl class="kv rules">
        <dt>${tr('保留', 'Holding')}</dt><dd>${tr('座位保留 15 分钟', 'We hold your table for 15 minutes')}</dd>
        <dt>${tr('取消', 'Cancelling')}</dt><dd>${tr('请至少提前 2 小时取消或改期', 'Please cancel or change at least 2 hours ahead')}</dd>
        <dt>${tr('大桌', 'Groups')}</dt><dd>${tr('静安店最多 6 人；7 人以上请订庭院店，20 人以上看 <a href="/events#ev-privata">包场</a>', `Jing'an seats up to 6. For 7 or more, book The Courtyard. For 20 or more, see <a href="/events#ev-privata">private dining</a>`)}</dd>
        <dt>${tr('儿童', 'Children')}</dt><dd>${tr('两家店都有儿童椅', 'High chairs at both restaurants')}</dd>
      </dl>
    </div>

    <form class="form rs-form on-dark" id="rs-form" novalidate>
      <fieldset><legend class="caps kicker">${tr('门店', 'Restaurant')}</legend><div class="chips">
        ${STORES.map((s, k) => `<input type="radio" name="store" id="rs-${s.id}" value="${s.id}"${k ? '' : ' checked'}><label for="rs-${s.id}">${esc(s.label)}</label>`).join('')}
      </div></fieldset>
      <fieldset><legend class="caps kicker">${tr('日期', 'Date')}</legend><div class="chips days" id="rs-days"></div></fieldset>
      <fieldset><legend class="caps kicker">${tr('时间', 'Time')}</legend><div class="chips" id="rs-times"></div><p class="muted small" id="rs-times-note"></p></fieldset>
      <fieldset><legend class="caps kicker">${tr('人数', 'Party size')}</legend>
        <div class="stepper"><button type="button" id="rs-minus" aria-label="${tr('减少一位', 'One fewer')}">−</button><output id="rs-n">2</output><button type="button" id="rs-plus" aria-label="${tr('增加一位', 'One more')}">+</button><span class="muted" id="rs-party-note"></span></div>
      </fieldset>
      <fieldset><legend class="caps kicker">${tr('座位偏好', 'Seating')}</legend><div class="chips" id="rs-areas"></div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="rs-name">${tr('称呼', 'Name')}</label><input class="input" id="rs-name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="rs-phone">${tr('手机', 'Mobile')}</label><input class="input" id="rs-phone" type="tel" inputmode="tel" autocomplete="tel" required></div>
      </div>
      <div><label class="caps kicker lbl" for="rs-note">${tr('备注', 'Notes')}</label><input class="input" id="rs-note" placeholder="${tr('过敏、庆祝生日、需要儿童椅……', 'Allergies, a birthday, a high chair…')}"></div>
      <div class="rs-sum" id="rs-sum"></div>
      <div class="actions"><button class="pill solid" type="submit"><span>${tr('确认预订', 'Confirm booking')} · Conferma</span></button></div>
      <p class="msg" id="rs-msg" role="status"></p>
      <p class="demo-note">${demo}</p>
    </form>

    <div class="rs-done on-dark" id="rs-done" hidden tabindex="-1">
      <p class="caps kicker">Prenotazione confermata</p>
      <h2 class="display h-2"><em>Ci vediamo!</em></h2>
      <p class="lede">${tr('座位留好了。到店报预订号或手机号就行。', 'Your table is set. Just give us your booking code or mobile number when you arrive.')}</p>
      <div class="ticket-card" id="rs-ticket"></div>
      <div class="actions"><button class="pill" type="button" id="rs-again"><span>${tr('改一下', 'Change it')}</span></button><a class="pill solid" href="/menu"><span>${tr('先看看菜单', 'See the menu')}</span></a></div>
      <p class="demo-note">${demo}</p>
    </div>
  </div>
</section>
<script>window.TF_SLOTS=${JSON.stringify(Object.fromEntries(STORES.map(s => [s.id, { slots: s.slots, areas: s.areas, lede: s.lede, address: s.address, it: s.it, label: s.label }])))};</script>`;

  return [{
    route: '/reserve', title: tr('预订', 'Book a table'), tone: 'dark', css: ['pages'], js: ['reserve'], noFooter: false, ogImage: 'store-jingan',
    description: tr('在线预订三分焰的座位：选门店、日期、时间和人数。', 'Book a table at Tre Fiamme: choose a restaurant, date, time and party size.'),
    main,
  }];
}
