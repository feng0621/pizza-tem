import { MENU, MENU_ITEMS, SIZES, STORES, TAGS } from '../data.mjs';
import { esc, photo, yuan } from '../layout.mjs';

const tagChips = tags => tags.map(t => `<span class="tag ${TAGS[t].tone}">${TAGS[t].cn}</span>`).join('');
const noPhoto = i => `<div class="noimg" aria-hidden="true"><i>${i.it}</i><span>${i.cn}</span></div>`;

function row(i) {
  return `<li class="dish" data-id="${i.id}" data-tags="${i.tags.join(' ')}" data-photo="${i.photo || ''}">
    <a href="#${i.id}" data-open="${i.id}" class="dish-a">
      <span class="dish-thumb">${i.photo ? `<img src="/media/photos/${i.photo}-sm.webp" alt="" loading="lazy" decoding="async" width="80" height="80">` : `<span class="dish-mono">${i.it[0]}</span>`}</span>
      <span class="dish-main">
        <span class="nm"><b>${i.it}</b><span class="cn">${i.cn}</span><span class="dots" aria-hidden="true"></span><em>${yuan(i.price)}</em></span>
        <span class="ds">${i.desc}</span>
        ${i.tags.length ? `<span class="tags">${tagChips(i.tags)}</span>` : ''}
      </span>
    </a>
  </li>`;
}

function dialog(i) {
  return `<dialog class="dlg" id="dlg-${i.id}" aria-labelledby="t-${i.id}">
  <button class="dlg-x" type="button" aria-label="关闭">×</button>
  <div class="dlg-body">
    <div class="dlg-media">${i.photo ? photo(i.photo, `${i.cn}`, { sizes: '(max-width: 760px) 100vw, 45vw' }) : noPhoto(i)}</div>
    <form class="dlg-text add-form" data-id="${i.id}" novalidate>
      <div>
        <p class="caps kicker">${MENU.find(c => c.id === i.cat).it} · ${MENU.find(c => c.id === i.cat).cn}</p>
        <h2 class="display" id="t-${i.id}">${i.it}</h2>
        <p class="cn-h dish-cn">${i.cn} <span class="num">${yuan(i.price)}</span></p>
      </div>
      <p>${i.desc}</p>
      ${i.tags.length ? `<div class="tags">${tagChips(i.tags)}</div>` : ''}
      <div>
        <p class="caps kicker lbl">配料</p>
        <dl class="kv ing">${i.ing.map(([a, b]) => `<dt>${a}</dt><dd>${b || '—'}</dd>`).join('')}</dl>
      </div>
      <p class="allergen"><span class="caps">过敏原</span>${i.allergens.length ? i.allergens.join('、') : '无常见过敏原'}</p>
      ${i.pizza ? `<fieldset><legend class="caps kicker">尺寸</legend><div class="chips">${SIZES.map(s => `<input type="radio" name="size" id="sz-${i.id}-${s.cm}" value="${s.cm}"${s.cm === 30 ? ' checked' : ''}><label for="sz-${i.id}-${s.cm}">${s.cm} cm<small>${s.delta ? (s.delta > 0 ? '+' : '−') + Math.abs(s.delta) : '标准'}</small></label>`).join('')}</div></fieldset>` : ''}
      <div class="add-row">
        <div class="stepper"><button type="button" data-q="-1" aria-label="减少一份">−</button><output class="q" aria-live="polite">1</output><button type="button" data-q="1" aria-label="增加一份">+</button></div>
        <button type="submit" class="pill solid add-btn"><span>加入订单 · <span class="add-price">${yuan(i.price)}</span></span></button>
      </div>
      <p class="msg ok add-msg" role="status"></p>
    </form>
  </div>
</dialog>`;
}

export async function pages() {
  const filters = [['all', '全部'], ['firma', '招牌'], ['veg', '素食'], ['hot', '辣'], ['season', '限定'], ['new', '新品']];
  const main = `
<header class="phero red menu-hero" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">La Carta · 菜单</p>
      <h1 class="display h-hero">La <em>Carta</em></h1>
      <p class="lede">${MENU_ITEMS.length} 道菜，披萨都是 30 cm、木柴炉 90 秒出炉。点任意一道看配料、产地和过敏原，也可以直接加进订单，外送或到店自取。</p>
    </div>
    <img class="menu-hero-img" src="/media/rosso/slice-0.webp" alt="一块玛格丽特披萨切片" width="734" height="587">
  </div>
</header>

<div class="menu-bar" data-nav="light">
  <div class="wrap menu-bar-in">
    <nav class="cat-links" aria-label="菜单分类">${MENU.map(c => `<a href="#cat-${c.id}">${c.cn}</a>`).join('')}</nav>
    <div class="chips filters" role="group" aria-label="筛选">${filters.map(([v, l], k) => `<input type="radio" name="filter" id="f-${v}" value="${v}"${k === 0 ? ' checked' : ''}><label for="f-${v}">${l}</label>`).join('')}</div>
  </div>
</div>

<div class="band cream menu-body">
  <div class="wrap menu-grid">
    <div class="menu-list">
      ${MENU.map(c => `<section class="cat" id="cat-${c.id}" aria-labelledby="h-${c.id}">
        <div class="cat-h"><h2 class="display h-2" id="h-${c.id}">${c.it}</h2><p><span class="cn-h">${c.cn}</span>${c.note ? ` · <span class="muted">${c.note}</span>` : ''}</p></div>
        <ul class="dishes">${c.items.map(i => row({ ...i, cat: c.id })).join('')}</ul>
        <p class="empty muted" hidden>这一类里没有符合筛选的菜。</p>
      </section>`).join('')}
      <p class="menu-foot muted">价格含服务费。厨房同时处理麸质、乳制品和坚果，有严重过敏请提前告诉我们。</p>
    </div>
    <aside class="menu-peek" aria-hidden="true">
      <div class="peek-frame">
        ${MENU_ITEMS.filter(i => i.photo).map((i, k) => `<img data-for="${i.id}" src="/media/photos/${i.photo}-sm.webp" alt="" loading="${k ? 'lazy' : 'eager'}" decoding="async"${k ? '' : ' class="on"'}>`).join('')}
      </div>
      <p class="peek-cap"><b class="it" id="peek-it">${MENU_ITEMS[0].it}</b><span id="peek-cn">${MENU_ITEMS[0].cn}</span></p>
    </aside>
  </div>
</div>

${MENU_ITEMS.map(dialog).join('\n')}

<button class="cart-fab" type="button" id="cart-fab" data-open="cart" hidden><span class="caps">订单</span><b id="cart-count">0</b><span id="cart-total">¥0</span></button>
<dialog class="dlg cart-dlg" id="dlg-cart" aria-labelledby="cart-h">
  <button class="dlg-x" type="button" aria-label="关闭">×</button>
  <div class="dlg-body solo">
    <form class="dlg-text" id="cart-form" novalidate>
      <div><p class="caps kicker">Il tuo ordine</p><h2 class="display" id="cart-h">你的订单</h2></div>
      <ul class="cart-lines" id="cart-lines"></ul>
      <p class="muted" id="cart-empty">订单还是空的，回菜单挑几道吧。</p>
      <fieldset><legend class="caps kicker">怎么拿</legend><div class="chips">
        <input type="radio" name="mode" id="m-out" value="out" checked><label for="m-out">外送<small>3 km 内</small></label>
        <input type="radio" name="mode" id="m-pick" value="pick"><label for="m-pick">到店自取<small>免配送费</small></label>
      </div></fieldset>
      <fieldset><legend class="caps kicker">门店</legend><div class="chips">${STORES.map((s, k) => `<input type="radio" name="store" id="cs-${s.id}" value="${s.id}"${k ? '' : ' checked'}><label for="cs-${s.id}">${esc(s.cn)}</label>`).join('')}</div></fieldset>
      <div class="cart-sum" id="cart-sum"></div>
      <div class="actions"><button class="pill solid" type="submit" id="cart-submit"><span>提交订单</span></button><button class="pill" type="button" id="cart-clear"><span>清空</span></button></div>
      <p class="msg" id="cart-msg" role="status"></p>
      <p class="demo-note">这是演示网站，订单不会真的发出。</p>
    </form>
  </div>
</dialog>
<script>window.TF_MENU=${JSON.stringify(Object.fromEntries(MENU_ITEMS.map(i => [i.id, { it: i.it, cn: i.cn, price: i.price, pizza: !!i.pizza }])))};window.TF_SIZES=${JSON.stringify(SIZES)};</script>`;

  return [{
    route: '/menu', title: '菜单', tone: 'dark', css: ['pages'], js: ['menu'], ogImage: 'menu-margherita',
    description: '三分焰的完整菜单：红披萨、白披萨、炸物前菜、甜点和饮品。每道菜都标了配料产地和过敏原，可以直接下单外送或自取。',
    main,
  }];
}
