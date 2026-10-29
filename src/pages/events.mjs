import { giftCard } from '../components.mjs';
import { EVENTS, SEASON } from '../data.mjs';
import { photo } from '../layout.mjs';

const forms = {
  scuola: `
      <fieldset><legend class="caps kicker">选一个周六</legend><div class="chips" id="class-dates"></div></fieldset>
      <fieldset><legend class="caps kicker">人数</legend><div class="stepper"><button type="button" data-step="-1" aria-label="减少一位">−</button><output id="class-n">1</output><button type="button" data-step="1" aria-label="增加一位">+</button><span class="muted" id="class-sum">¥398</span></div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="cl-name">称呼</label><input class="input" id="cl-name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="cl-phone">手机</label><input class="input" id="cl-phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
      </div>`,
  privata: `
      <div class="row2">
        <div><label class="caps kicker lbl" for="pv-date">日期</label><input class="input" id="pv-date" type="date" required></div>
        <div><label class="caps kicker lbl" for="pv-n">人数（20–40）</label><input class="input" id="pv-n" type="number" min="20" max="40" value="24" required></div>
      </div>
      <fieldset><legend class="caps kicker">套餐</legend><div class="chips">
        <input type="radio" name="pkg" id="pk-288" value="288" checked><label for="pk-288">¥288<small>前菜 + 3 种披萨 + 甜点</small></label>
        <input type="radio" name="pkg" id="pk-388" value="388"><label for="pk-388">¥388<small>再加酒水搭配</small></label>
      </div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="pv-name">称呼</label><input class="input" id="pv-name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="pv-phone">手机</label><input class="input" id="pv-phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
      </div>
      <div><label class="caps kicker lbl" for="pv-note">想办成什么样</label><textarea class="input" id="pv-note" rows="3" placeholder="比如：公司年会，想要一段拍饼表演"></textarea></div>
      <p class="muted" id="pv-sum"></p>`,
  regalo: `
      <div class="gc-preview">${giftCard(500, '给你')}</div>
      <fieldset><legend class="caps kicker">面额</legend><div class="chips">
        ${[200, 500, 1000].map(a => `<input type="radio" name="amt" id="amt-${a}" value="${a}"${a === 500 ? ' checked' : ''}><label for="amt-${a}">¥${a}</label>`).join('')}
      </div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="gc-to">送给</label><input class="input" id="gc-to" maxlength="16" placeholder="收卡人的名字"></div>
        <div><label class="caps kicker lbl" for="gc-from">来自</label><input class="input" id="gc-from" maxlength="16" placeholder="你的名字"></div>
      </div>
      <div><label class="caps kicker lbl" for="gc-msg">写一句话（会印在卡背面）</label><input class="input" id="gc-msg" maxlength="40" placeholder="生日快乐，请你吃一张饼"></div>`,
};

export async function pages() {
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">Eventi · 活动</p>
      <h1 class="display h-hero">At our<br><em>table.</em></h1>
      <p class="lede">周六下午的披萨课、院子里的整桌包场，还有一张可以送人的礼品卡。</p>
      <div class="actions store-jump">${EVENTS.map(e => `<a class="pill" href="#ev-${e.id}"><span>${e.cn}</span></a>`).join('')}</div>
    </div>
    <div class="phero-img">${photo('fire-oven', '木柴炉里烧着火，炉口放着两张披萨', { eager: true, sizes: '(max-width: 860px) 100vw, 40vw' })}</div>
  </div>
</header>

<section class="band tight hi" aria-labelledby="h-season">
  <div class="wrap">
    <p class="caps kicker" id="h-season">Questa stagione · 这个季节</p>
    <ol class="season">
      ${SEASON.map(s => `<li><span class="caps kicker">${s.date}</span><p class="it s-it">${s.it}</p><h3 class="cn-h">${s.cn}</h3><p class="muted">${s.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

${EVENTS.map((e, k) => `<section class="band ${k % 2 ? 'hi' : 'cream'} event" id="ev-${e.id}" aria-labelledby="h-${e.id}">
  <div class="wrap split${k % 2 ? ' rev' : ''}">
    <div class="frame r-45${k % 2 ? ' order-2' : ''}">${e.photo ? photo(e.photo, e.cn, { sizes: '(max-width: 860px) 100vw, 42vw' }) : `<div class="gc-stage">${giftCard(1000, '送给爱吃披萨的你')}</div>`}</div>
    <div class="stack">
      <p class="caps kicker">${e.when} · ${e.where}</p>
      <h2 class="display h-1" id="h-${e.id}">${e.it}</h2>
      <p class="cn-h store-cn">${e.cn} <span class="num price">${e.price}</span></p>
      <p class="lede muted">${e.lede}</p>
      <dl class="kv">${e.detail.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>
      <div class="actions"><a class="pill solid" href="#${e.id}" data-open="${e.id}"><span>${e.cta} →</span></a></div>
    </div>
  </div>
</section>
<dialog class="dlg" id="dlg-${e.id}" aria-labelledby="t-${e.id}">
  <button class="dlg-x" type="button" aria-label="关闭">×</button>
  <div class="dlg-body solo">
    <form class="dlg-text form ev-form" data-ev="${e.id}" novalidate>
      <div><p class="caps kicker">${e.it}</p><h2 class="display" id="t-${e.id}">${e.cn}</h2><p class="muted">${e.when} · ${e.where} · ${e.price}</p></div>
      ${forms[e.id]}
      <div class="actions"><button class="pill solid" type="submit"><span>${e.cta === '报名' ? '确认报名' : e.cta === '咨询' ? '发送咨询' : '购买礼品卡'}</span></button></div>
      <p class="msg" role="status"></p>
      <p class="demo-note">这是演示网站，不会真的报名、咨询或付款。</p>
    </form>
  </div>
</dialog>`).join('\n')}`;

  return [{
    route: '/events', title: '活动', tone: 'dark', css: ['pages'], js: ['forms'], ogImage: 'event-class',
    description: '三分焰的活动：周六披萨课、庭院包场与私宴、礼品卡，以及这个季节的限定活动。',
    main,
  }];
}
