import { content, translator } from '../content.mjs';
import { esc, photo, yuan } from '../layout.mjs';

export async function pages(lang) {
  const { MENU, MENU_ITEMS, SIZES, STORES, TAGS } = content(lang);
  const tr = translator(lang);
  const closeLabel = tr('关闭', 'Close');
  const tagChips = tags => tags.map(t => `<span class="tag ${TAGS[t].tone}">${TAGS[t].label}</span>`).join('');
  const noPhoto = i => `<div class="noimg" aria-hidden="true"><i>${i.it}</i><span>${i.label}</span></div>`;

  const row = i => `<li class="dish" data-id="${i.id}" data-tags="${i.tags.join(' ')}" data-photo="${i.photo || ''}">
    <a href="#${i.id}" data-open="${i.id}" class="dish-a">
      <span class="dish-thumb">${i.photo ? `<img src="/media/photos/${i.photo}-sm.webp" alt="" loading="lazy" decoding="async" width="80" height="80">` : `<span class="dish-mono">${i.it[0]}</span>`}</span>
      <span class="dish-main">
        <span class="nm"><b>${i.it}</b><span class="cn">${i.label}</span><span class="dots" aria-hidden="true"></span><em>${yuan(i.price)}</em></span>
        <span class="ds">${i.desc}</span>
        ${i.tags.length ? `<span class="tags">${tagChips(i.tags)}</span>` : ''}
      </span>
    </a>
  </li>`;

  const dialog = i => `<dialog class="dlg" id="dlg-${i.id}" aria-labelledby="t-${i.id}">
  <button class="dlg-x" type="button" aria-label="${closeLabel}">×</button>
  <div class="dlg-body">
    <div class="dlg-media">${i.photo ? photo(i.photo, tr(i.label, i.it), { sizes: '(max-width: 760px) 100vw, 45vw' }) : noPhoto(i)}</div>
    <form class="dlg-text add-form" data-id="${i.id}" novalidate>
      <div>
        <p class="caps kicker">${MENU.find(c => c.id === i.cat).it} · ${MENU.find(c => c.id === i.cat).label}</p>
        <h2 class="display" id="t-${i.id}">${i.it}</h2>
        <p class="cn-h dish-cn">${i.label} <span class="num">${yuan(i.price)}</span></p>
      </div>
      <p>${i.desc}</p>
      ${i.tags.length ? `<div class="tags">${tagChips(i.tags)}</div>` : ''}
      <div>
        <p class="caps kicker lbl">${tr('配料', 'Ingredients')}</p>
        <dl class="kv ing">${i.ing.map(([a, b]) => `<dt>${a}</dt><dd>${b || '—'}</dd>`).join('')}</dl>
      </div>
      <p class="allergen"><span class="caps">${tr('过敏原', 'Allergens')}</span>${i.allergens.length ? i.allergens.join(tr('、', ', ')) : tr('无常见过敏原', 'No common allergens')}</p>
      ${i.pizza ? `<fieldset><legend class="caps kicker">${tr('尺寸', 'Size')}</legend><div class="chips">${SIZES.map(s => `<input type="radio" name="size" id="sz-${i.id}-${s.cm}" value="${s.cm}"${s.cm === 30 ? ' checked' : ''}><label for="sz-${i.id}-${s.cm}">${s.cm} cm<small>${s.delta ? (s.delta > 0 ? '+' : '−') + Math.abs(s.delta) : tr('标准', 'Standard')}</small></label>`).join('')}</div></fieldset>` : ''}
      <div class="add-row">
        <div class="stepper"><button type="button" data-q="-1" aria-label="${tr('减少一份', 'One less')}">−</button><output class="q" aria-live="polite">1</output><button type="button" data-q="1" aria-label="${tr('增加一份', 'One more')}">+</button></div>
        <button type="submit" class="pill solid add-btn"><span>${tr('加入订单', 'Add to order')} · <span class="add-price">${yuan(i.price)}</span></span></button>
      </div>
      <p class="msg ok add-msg" role="status"></p>
    </form>
  </div>
</dialog>`;

  const filters = [['all', tr('全部', 'All')], ['firma', tr('招牌', 'Signature')], ['veg', tr('素食', 'Vegetarian')], ['hot', tr('辣', 'Spicy')], ['season', tr('限定', 'Seasonal')], ['new', tr('新品', 'New')]];
  const main = `
<header class="phero red menu-hero" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">La Carta · ${tr('菜单', 'The menu')}</p>
      <h1 class="display h-hero">La <em>Carta</em></h1>
      <p class="lede">${tr(`${MENU_ITEMS.length} 道菜，披萨都是 30 cm、木柴炉 90 秒出炉。点任意一道看配料、产地和过敏原，也可以直接加进订单，外送或到店自取。`, `${MENU_ITEMS.length} dishes. Every pizza is 30 cm and spends 90 seconds in the wood oven. Tap any dish for its ingredients, origins and allergens, or add it to an order for delivery or pickup.`)}</p>
    </div>
    <img class="menu-hero-img" src="/media/rosso/slice-0.webp" alt="${tr('一块玛格丽特披萨切片', 'A slice of Margherita pizza')}" width="734" height="587">
  </div>
</header>

<div class="menu-bar" data-nav="light">
  <div class="wrap menu-bar-in">
    <nav class="cat-links" aria-label="${tr('菜单分类', 'Menu categories')}">${MENU.map(c => `<a href="#cat-${c.id}">${c.label}</a>`).join('')}</nav>
    <div class="chips filters" role="group" aria-label="${tr('筛选', 'Filter')}">${filters.map(([v, l], k) => `<input type="radio" name="filter" id="f-${v}" value="${v}"${k === 0 ? ' checked' : ''}><label for="f-${v}">${l}</label>`).join('')}</div>
  </div>
</div>

<div class="band cream menu-body">
  <div class="wrap menu-grid">
    <div class="menu-list">
      ${MENU.map(c => `<section class="cat" id="cat-${c.id}" aria-labelledby="h-${c.id}">
        <div class="cat-h"><h2 class="display h-2" id="h-${c.id}">${c.it}</h2><p><span class="cn-h">${c.label}</span>${c.note ? ` · <span class="muted">${c.note}</span>` : ''}</p></div>
        <ul class="dishes">${c.items.map(i => row({ ...i, cat: c.id })).join('')}</ul>
        <p class="empty muted" hidden>${tr('这一类里没有符合筛选的菜。', 'Nothing in this section matches the filter.')}</p>
      </section>`).join('')}
      <p class="menu-foot muted">${tr('价格含服务费。厨房同时处理麸质、乳制品和坚果，有严重过敏请提前告诉我们。', 'Prices include service. Our kitchen handles gluten, dairy and nuts together, so please tell us in advance about any serious allergy.')}</p>
    </div>
    <aside class="menu-peek" aria-hidden="true">
      <div class="peek-frame">
        ${MENU_ITEMS.filter(i => i.photo).map((i, k) => `<img data-for="${i.id}" src="/media/photos/${i.photo}-sm.webp" alt="" loading="${k ? 'lazy' : 'eager'}" decoding="async"${k ? '' : ' class="on"'}>`).join('')}
      </div>
      <p class="peek-cap"><b class="it" id="peek-it">${MENU_ITEMS[0].it}</b><span id="peek-cn">${MENU_ITEMS[0].label}</span></p>
    </aside>
  </div>
</div>

${MENU_ITEMS.map(dialog).join('\n')}

<button class="cart-fab" type="button" id="cart-fab" data-open="cart" hidden><span class="caps">${tr('订单', 'Order')}</span><b id="cart-count">0</b><span id="cart-total">¥0</span></button>
<dialog class="dlg cart-dlg" id="dlg-cart" aria-labelledby="cart-h">
  <button class="dlg-x" type="button" aria-label="${closeLabel}">×</button>
  <div class="dlg-body solo">
    <form class="dlg-text" id="cart-form" novalidate>
      <div><p class="caps kicker">Il tuo ordine</p><h2 class="display" id="cart-h">${tr('你的订单', 'Your order')}</h2></div>
      <ul class="cart-lines" id="cart-lines"></ul>
      <p class="muted" id="cart-empty">${tr('订单还是空的，回菜单挑几道吧。', 'Your order is empty. Head back to the menu and pick a few things.')}</p>
      <fieldset><legend class="caps kicker">${tr('怎么拿', 'How to get it')}</legend><div class="chips">
        <input type="radio" name="mode" id="m-out" value="out" checked><label for="m-out">${tr('外送', 'Delivery')}<small>${tr('3 km 内', 'Within 3 km')}</small></label>
        <input type="radio" name="mode" id="m-pick" value="pick"><label for="m-pick">${tr('到店自取', 'Pickup')}<small>${tr('免配送费', 'No delivery fee')}</small></label>
      </div></fieldset>
      <fieldset><legend class="caps kicker">${tr('门店', 'Restaurant')}</legend><div class="chips">${STORES.map((s, k) => `<input type="radio" name="store" id="cs-${s.id}" value="${s.id}"${k ? '' : ' checked'}><label for="cs-${s.id}">${esc(s.label)}</label>`).join('')}</div></fieldset>
      <div class="cart-sum" id="cart-sum"></div>
      <div class="actions"><button class="pill solid" type="submit" id="cart-submit"><span>${tr('提交订单', 'Place order')}</span></button><button class="pill" type="button" id="cart-clear"><span>${tr('清空', 'Clear')}</span></button></div>
      <p class="msg" id="cart-msg" role="status"></p>
      <p class="demo-note">${tr('这是演示网站，订单不会真的发出。', 'This is a demo site. No order will actually be placed.')}</p>
    </form>
  </div>
</dialog>
<script>window.TF_MENU=${JSON.stringify(Object.fromEntries(MENU_ITEMS.map(i => [i.id, { it: i.it, label: i.label, price: i.price, pizza: !!i.pizza }])))};window.TF_SIZES=${JSON.stringify(SIZES)};</script>`;

  return [{
    route: '/menu', title: tr('菜单', 'Menu'), tone: 'dark', css: ['pages'], js: ['menu'], ogImage: 'menu-margherita',
    description: tr('三分焰的完整菜单：红披萨、白披萨、炸物前菜、甜点和饮品。每道菜都标了配料产地和过敏原，可以直接下单外送或自取。', 'The full Tre Fiamme menu: red pizzas, white pizzas, fried starters, desserts and drinks. Every dish lists its ingredients, origins and allergens, and can be ordered for delivery or pickup.'),
    main,
  }];
}
