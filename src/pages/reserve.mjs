import { STORES } from '../data.mjs';
import { esc } from '../layout.mjs';

export async function pages() {
  const main = `
<section class="phero red reserve" data-nav="dark" aria-labelledby="h-reserve">
  <div class="wrap reserve-grid">
    <div class="stack reserve-side">
      <p class="caps kicker">Prenota · 预订</p>
      <h1 class="display h-hero" id="h-reserve">A seat by<br>the <em>fire</em>.</h1>
      <p class="lede" id="rs-lede"></p>
      <dl class="kv rs-store">
        <dt>地址</dt><dd id="rs-addr"></dd>
        <dt>今天</dt><dd><span class="open-now" id="rs-open"></span></dd>
      </dl>
      <dl class="kv rules">
        <dt>保留</dt><dd>座位保留 15 分钟</dd>
        <dt>取消</dt><dd>请至少提前 2 小时取消或改期</dd>
        <dt>大桌</dt><dd>静安店最多 6 人；7 人以上请订庭院店，20 人以上看 <a href="/events#ev-privata">包场</a></dd>
        <dt>儿童</dt><dd>两家店都有儿童椅</dd>
      </dl>
    </div>

    <form class="form rs-form on-dark" id="rs-form" novalidate>
      <fieldset><legend class="caps kicker">门店</legend><div class="chips">
        ${STORES.map((s, k) => `<input type="radio" name="store" id="rs-${s.id}" value="${s.id}"${k ? '' : ' checked'}><label for="rs-${s.id}">${esc(s.cn)}</label>`).join('')}
      </div></fieldset>
      <fieldset><legend class="caps kicker">日期</legend><div class="chips days" id="rs-days"></div></fieldset>
      <fieldset><legend class="caps kicker">时间</legend><div class="chips" id="rs-times"></div><p class="muted small" id="rs-times-note"></p></fieldset>
      <fieldset><legend class="caps kicker">人数</legend>
        <div class="stepper"><button type="button" id="rs-minus" aria-label="减少一位">−</button><output id="rs-n">2</output><button type="button" id="rs-plus" aria-label="增加一位">+</button><span class="muted" id="rs-party-note"></span></div>
      </fieldset>
      <fieldset><legend class="caps kicker">座位偏好</legend><div class="chips" id="rs-areas"></div></fieldset>
      <div class="row2">
        <div><label class="caps kicker lbl" for="rs-name">称呼</label><input class="input" id="rs-name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="rs-phone">手机</label><input class="input" id="rs-phone" type="tel" inputmode="tel" autocomplete="tel" required></div>
      </div>
      <div><label class="caps kicker lbl" for="rs-note">备注</label><input class="input" id="rs-note" placeholder="过敏、庆祝生日、需要儿童椅……"></div>
      <div class="rs-sum" id="rs-sum"></div>
      <div class="actions"><button class="pill solid" type="submit"><span>确认预订 · Conferma</span></button></div>
      <p class="msg" id="rs-msg" role="status"></p>
      <p class="demo-note">这是演示网站，不会真的预订座位。</p>
    </form>

    <div class="rs-done on-dark" id="rs-done" hidden tabindex="-1">
      <p class="caps kicker">Prenotazione confermata</p>
      <h2 class="display h-2"><em>Ci vediamo!</em></h2>
      <p class="lede">座位留好了。到店报预订号或手机号就行。</p>
      <div class="ticket-card" id="rs-ticket"></div>
      <div class="actions"><button class="pill" type="button" id="rs-again"><span>改一下</span></button><a class="pill solid" href="/menu"><span>先看看菜单</span></a></div>
      <p class="demo-note">这是演示网站，不会真的预订座位。</p>
    </div>
  </div>
</section>
<script>window.TF_SLOTS=${JSON.stringify(Object.fromEntries(STORES.map(s => [s.id, { slots: s.slots, areas: s.areas, lede: s.lede, address: s.address, it: s.it, cn: s.cn }])))};</script>`;

  return [{
    route: '/reserve', title: '预订', tone: 'dark', css: ['pages'], js: ['reserve'], noFooter: false, ogImage: 'store-jingan',
    description: '在线预订三分焰的座位：选门店、日期、时间和人数。',
    main,
  }];
}
