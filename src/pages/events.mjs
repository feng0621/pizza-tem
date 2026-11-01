import { giftCard } from '../components.mjs';
import { content, translator } from '../content.mjs';
import { photo } from '../layout.mjs';

export async function pages(lang) {
  const { EVENTS, SEASON } = content(lang);
  const tr = translator(lang);
  const nameField = id => `<div><label class="caps kicker lbl" for="${id}">${tr('称呼', 'Name')}</label><input class="input" id="${id}" autocomplete="name" required></div>`;
  const phoneField = id => `<div><label class="caps kicker lbl" for="${id}">${tr('手机', 'Mobile')}</label><input class="input" id="${id}" type="tel" autocomplete="tel" inputmode="tel" required></div>`;
  const forms = {
    scuola: `
      <fieldset><legend class="caps kicker">${tr('选一个周六', 'Pick a Saturday')}</legend><div class="chips" id="class-dates"></div></fieldset>
      <fieldset><legend class="caps kicker">${tr('人数', 'People')}</legend><div class="stepper"><button type="button" data-step="-1" aria-label="${tr('减少一位', 'One fewer')}">−</button><output id="class-n">1</output><button type="button" data-step="1" aria-label="${tr('增加一位', 'One more')}">+</button><span class="muted" id="class-sum">¥398</span></div></fieldset>
      <div class="row2">${nameField('cl-name')}${phoneField('cl-phone')}</div>`,
    privata: `
      <div class="row2">
        <div><label class="caps kicker lbl" for="pv-date">${tr('日期', 'Date')}</label><input class="input" id="pv-date" type="date" required></div>
        <div><label class="caps kicker lbl" for="pv-n">${tr('人数（20–40）', 'Guests (20–40)')}</label><input class="input" id="pv-n" type="number" min="20" max="40" value="24" required></div>
      </div>
      <fieldset><legend class="caps kicker">${tr('套餐', 'Menu')}</legend><div class="chips">
        <input type="radio" name="pkg" id="pk-288" value="288" checked><label for="pk-288">¥288<small>${tr('前菜 + 3 种披萨 + 甜点', 'Starter + 3 pizzas + dessert')}</small></label>
        <input type="radio" name="pkg" id="pk-388" value="388"><label for="pk-388">¥388<small>${tr('再加酒水搭配', 'Adds wine pairing')}</small></label>
      </div></fieldset>
      <div class="row2">${nameField('pv-name')}${phoneField('pv-phone')}</div>
      <div><label class="caps kicker lbl" for="pv-note">${tr('想办成什么样', 'What do you have in mind?')}</label><textarea class="input" id="pv-note" rows="3" placeholder="${tr('比如：公司年会，想要一段拍饼表演', 'For example: a company dinner with a dough-stretching show')}"></textarea></div>
      <p class="muted" id="pv-sum"></p>`,
    regalo: `
      <div class="gc-preview">${giftCard(500, tr('给你', 'For you'))}</div>
      <fieldset><legend class="caps kicker">${tr('面额', 'Value')}</legend><div class="chips">
        ${[200, 500, 1000].map(a => `<input type="radio" name="amt" id="amt-${a}" value="${a}"${a === 500 ? ' checked' : ''}><label for="amt-${a}">¥${a}</label>`).join('')}
      </div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="gc-to">${tr('送给', 'To')}</label><input class="input" id="gc-to" maxlength="16" placeholder="${tr('收卡人的名字', "Recipient's name")}"></div>
        <div><label class="caps kicker lbl" for="gc-from">${tr('来自', 'From')}</label><input class="input" id="gc-from" maxlength="16" placeholder="${tr('你的名字', 'Your name')}"></div>
      </div>
      <div><label class="caps kicker lbl" for="gc-msg">${tr('写一句话（会印在卡背面）', 'Your message (printed on the back)')}</label><input class="input" id="gc-msg" maxlength="40" placeholder="${tr('生日快乐，请你吃一张饼', 'Happy birthday. The next pizza is on me.')}"></div>`,
  };
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">Eventi · ${tr('活动', 'Events')}</p>
      <h1 class="display h-hero">At our<br><em>table.</em></h1>
      <p class="lede">${tr('周六下午的披萨课、院子里的整桌包场，还有一张可以送人的礼品卡。', 'Pizza class on Saturday afternoons, the whole courtyard table for your group, and a gift card to give away.')}</p>
      <div class="actions store-jump">${EVENTS.map(e => `<a class="pill" href="#ev-${e.id}"><span>${e.label}</span></a>`).join('')}</div>
    </div>
    <div class="phero-img">${photo('fire-oven', tr('木柴炉里烧着火，炉口放着两张披萨', 'A fire burning in the wood oven, with two pizzas at its mouth'), { eager: true, sizes: '(max-width: 860px) 100vw, 40vw' })}</div>
  </div>
</header>

<section class="band tight hi" aria-labelledby="h-season">
  <div class="wrap">
    <p class="caps kicker" id="h-season">Questa stagione · ${tr('这个季节', 'This season')}</p>
    <ol class="season">
      ${SEASON.map(s => `<li><span class="caps kicker">${s.date}</span><p class="it s-it">${s.it}</p><h3 class="cn-h">${s.label}</h3><p class="muted">${s.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

${EVENTS.map((e, k) => `<section class="band ${k % 2 ? 'hi' : 'cream'} event" id="ev-${e.id}" aria-labelledby="h-${e.id}">
  <div class="wrap split${k % 2 ? ' rev' : ''}">
    <div class="frame r-45${k % 2 ? ' order-2' : ''}">${e.photo ? photo(e.photo, e.label, { sizes: '(max-width: 860px) 100vw, 42vw' }) : `<div class="gc-stage">${giftCard(1000, tr('送给爱吃披萨的你', 'For the pizza lover'))}</div>`}</div>
    <div class="stack">
      <p class="caps kicker">${e.when} · ${e.where}</p>
      <h2 class="display h-1" id="h-${e.id}">${e.it}</h2>
      <p class="cn-h store-cn">${e.label} <span class="num price">${e.price}</span></p>
      <p class="lede muted">${e.lede}</p>
      <dl class="kv">${e.detail.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>
      <div class="actions"><a class="pill solid" href="#${e.id}" data-open="${e.id}"><span>${e.cta} →</span></a></div>
    </div>
  </div>
</section>
<dialog class="dlg" id="dlg-${e.id}" aria-labelledby="t-${e.id}">
  <button class="dlg-x" type="button" aria-label="${tr('关闭', 'Close')}">×</button>
  <div class="dlg-body solo">
    <form class="dlg-text form ev-form" data-ev="${e.id}" novalidate>
      <div><p class="caps kicker">${e.it}</p><h2 class="display" id="t-${e.id}">${e.label}</h2><p class="muted">${e.when} · ${e.where} · ${e.price}</p></div>
      ${forms[e.id]}
      <div class="actions"><button class="pill solid" type="submit"><span>${e.submit}</span></button></div>
      <p class="msg" role="status"></p>
      <p class="demo-note">${tr('这是演示网站，不会真的报名、咨询或付款。', 'This is a demo site. No sign-up, enquiry or payment will actually be made.')}</p>
    </form>
  </div>
</dialog>`).join('\n')}`;

  return [{
    route: '/events', title: tr('活动', 'Events'), tone: 'dark', css: ['pages'], js: ['forms'], ogImage: 'event-class',
    description: tr('三分焰的活动：周六披萨课、庭院包场与私宴、礼品卡，以及这个季节的限定活动。', 'Events at Tre Fiamme: Saturday pizza class, private dining in the courtyard, gift cards and what is on this season.'),
    main,
  }];
}
