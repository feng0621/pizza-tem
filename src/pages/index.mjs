import { content, translator } from '../content.mjs';
import { fmtDate, hoursText, photo, yuan } from '../layout.mjs';
import { giftCard } from '../components.mjs';

export async function pages(lang) {
  const { EVENTS, MENU_ITEMS, POSTS, STORES, TIMELINE } = content(lang);
  const tr = translator(lang);
  const classics = ['margherita', 'marinara', 'diavola', 'bufala'].map(id => MENU_ITEMS.find(i => i.id === id));
  const main = `
<div id="story" class="story">
  <div class="stage" id="stage" data-nav="dark" data-nav-solid="false">
    <div class="bg-rosso-glow" id="glow"></div>
    <div class="bg-crema" id="crema"></div>
    <img class="obj" id="o-flourA" src="/media/rosso/flour-streak.webp" alt="" aria-hidden="true">
    <img class="obj" id="o-flour" src="/media/rosso/flour-cloud.webp" alt="" aria-hidden="true">
    <img class="obj shadow" id="o-plate" src="/media/rosso/plate-margherita.webp" alt="${tr('一整张玛格丽特披萨，盛在白盘里', 'A whole Margherita pizza on a white plate')}">
    <img class="obj shadow" id="d-basil" src="/media/rosso/basil-sprig-a.webp" alt="" aria-hidden="true">
    <img class="obj shadow" id="d-tomato" src="/media/rosso/tomato-half.webp" alt="" aria-hidden="true">
    <img class="obj shadow" id="d-tomato2" src="/media/rosso/tomato-a.webp" alt="" aria-hidden="true">
    <img class="obj shadow" id="d-mozz" src="/media/rosso/mozz-0.webp" alt="" aria-hidden="true">
    <div id="orbit"></div>
    <img class="obj shadow" id="o-hero" src="/media/rosso/slice-2.webp" alt="${tr('一块那不勒斯玛格丽特披萨切片，上面有马苏里拉和两片罗勒', 'A slice of Neapolitan Margherita with mozzarella and two basil leaves')}" fetchpriority="high">
    <svg class="leaders" id="leaders" aria-hidden="true"></svg>
    <div id="labels" aria-hidden="true"></div>

    <div class="txt txt-a" id="txtA">
      <p class="caps eyebrow">La Fetta · The Slice</p>
      <h1>Love at<br><em>first</em><br>bite.</h1>
      <p class="sub"><em>Ninety seconds in a 485° fire.</em>${tr('木柴炉 485°C，饼进去 90 秒就出炉。饼边鼓起、带着豹纹焦斑，中心还是软的，这一口就是那不勒斯。', 'At 485°C, a pizza is done in 90 seconds. The rim rises and chars in leopard spots, the centre stays soft. That first bite is Naples.')}</p>
      <div class="actions"><a class="pill" href="/menu"><span>${tr('看菜单 · La Carta →', 'See the menu →')}</span></a><a class="pill ghost-link" href="/reserve"><span>${tr('预订座位', 'Book a table')}</span></a></div>
    </div>
    <div class="txt txt-b" id="txtB">
      <p class="caps kicker">Gli Ingredienti${tr(' · 配料', '')}</p>
      <h2>Five things.<br>Nothing to hide.</h2>
      <p>${tr('面粉、番茄、马苏里拉、罗勒、橄榄油。一张玛格丽特只有这五样，所以每一样都得是最好的。', 'Flour, tomato, mozzarella, basil, olive oil. A Margherita has only these five things, so each one has to be the best we can find.')}</p>
    </div>
    <div class="txt txt-c" id="txtC">
      <p class="caps kicker">03 · Il Capolavoro</p>
      <h2>The fire is lit.</h2>
    </div>
    <a class="pill cta-c" id="ctaC" href="/reserve"><span>Reserve a table${tr(' · 预订座位', '')}</span></a>

    <div class="caps side" id="side">Sezione 01 — La Fetta</div>
    <div class="dots" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
    <div class="caps cue" id="cue">Scroll</div>
  </div>
</div>

<section class="band cream" aria-labelledby="h-intro">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="caps kicker">Tre Fiamme · ${tr('三分焰', 'Three flames')}</p><h2 class="display h-1" id="h-intro">Three <em>flames</em>,<br>one pizza.</h2></div>
      <p class="lede muted">${tr('名字里的三团火：炉膛里的柴火，师傅手上的火候，还有桌边的热闹。2019 年从静安一座木柴炉开始，现在有两家店。', "Our name means three flames: the fire in the oven, the feel in the pizzaiolo's hands, and the life around the table. We started with one wood oven in Jing'an in 2019. Now we have two restaurants.")}</p>
    </div>
    <div class="facts">
      <div><b>72<small>h</small></b><span>${tr('面团冷藏发酵', 'Cold-fermented dough')}</span></div>
      <div><b>485<small>°C</small></b><span>${tr('木柴炉炉温', 'Wood oven temperature')}</span></div>
      <div><b>90<small>s</small></b><span>${tr('入炉到出炉', 'In the oven')}</span></div>
      <div><b>120</b><span>${tr('每天只做这么多个面团', 'Dough balls a day, no more')}</span></div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true"><div class="mq-track"><span>Margherita</span><i></i><span>Marinara</span><i></i><span>Diavola</span><i></i><span>Bufala</span><i></i><span>Quattro Formaggi</span><i></i><span>Contadina</span><i></i><span>Funghi e Tartufo</span><i></i><span>Ortolana</span><i></i><span>Montanara</span><i></i><span>Margherita</span><i></i><span>Marinara</span><i></i><span>Diavola</span><i></i><span>Bufala</span><i></i><span>Quattro Formaggi</span><i></i><span>Contadina</span><i></i><span>Funghi e Tartufo</span><i></i><span>Ortolana</span><i></i><span>Montanara</span><i></i></div></div>

<section class="band hi" aria-labelledby="h-classics">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="caps kicker">La Carta · ${tr('菜单', 'The menu')}</p><h2 class="display h-1" id="h-classics">Le <em>Classiche</em></h2></div>
      <a class="arrow" href="/menu">${tr(`完整菜单 · ${MENU_ITEMS.length} 道`, `Full menu · ${MENU_ITEMS.length} dishes`)}</a>
    </div>
    <div class="grid g-4">
      ${classics.map(i => `<a class="card" href="/menu#${i.id}">
        <div class="frame r-45">${photo(i.photo, tr(`${i.label}披萨`, `${i.it} pizza`), { sizes: '(max-width: 620px) 100vw, (max-width: 1020px) 50vw, 25vw' })}</div>
        <div class="t"><b>${i.it}</b><em>${yuan(i.price)}</em></div>
        <span class="cn">${i.label}</span>
        <p>${i.desc}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="kitchen soot" data-nav="soot" aria-labelledby="h-kitchen">
  <video class="kitchen-bg" src="/media/kitchen/p5-fire.mp4" poster="/media/kitchen/p5-fire.jpg" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video>
  <div class="kitchen-shade" aria-hidden="true"></div>
  <div class="wrap kitchen-in">
    <p class="caps kicker">Il Forno · ${tr('厨房', 'The kitchen')}</p>
    <h2 class="display h-1" id="h-kitchen">72 hours.<br><em>90 seconds.</em></h2>
    <p class="lede">${tr('一张披萨在炉子里只待 90 秒，前面却要等三天。跟着厨房小票，从揉面看到上桌。', 'A pizza spends 90 seconds in the oven and three days getting there. Follow the kitchen ticket from mixing bowl to table.')}</p>
    <ol class="kitchen-steps">
      <li style="--k:0"><b>i</b>${tr('揉面', 'Knead')}<span>08:12</span></li><li style="--k:1"><b>ii</b>${tr('醒发', 'Prove')}<span>72 h · 4°C</span></li><li style="--k:2"><b>iii</b>${tr('拍饼', 'Stretch')}<span>30 cm</span></li><li style="--k:3"><b>iv</b>${tr('铺料', 'Top')}<span>DOP</span></li><li style="--k:4"><b>v</b>${tr('入炉', 'Bake')}<span>485°C</span></li><li style="--k:5"><b>vi</b>${tr('上桌', 'Serve')}<span>2 min</span></li>
    </ol>
    <a class="pill solid" href="/craft"><span>${tr('走进厨房 →', 'Step into the kitchen →')}</span></a>
  </div>
</section>

<section class="band red" data-nav="dark" aria-labelledby="h-story">
  <div class="wrap split">
    <div class="frame r-34">${photo('journal-dough', tr('师傅用手把面团从中间往外压开', 'A pizzaiolo pressing dough outward from the centre by hand'), { sizes: '(max-width: 860px) 100vw, 42vw' })}</div>
    <div class="stack">
      <p class="caps kicker">Chi Siamo · ${tr('关于我们', 'About us')}</p>
      <h2 class="display h-1" id="h-story">Da <em>Napoli</em><br>a Shanghai.</h2>
      <p class="lede muted">${tr('陈屿在那不勒斯当了三年学徒，2019 年带着一座 3 吨的木柴炉回到上海。', 'Chen Yu spent three years as an apprentice in Naples, then came back to Shanghai in 2019 with a three-ton wood oven.')}</p>
      <ol class="mini-tl">
        ${TIMELINE.filter(t => [2014, 2019, 2024].includes(t.year)).map(t => `<li style="--k:6"><b>${t.year}</b><span>${t.text}</span></li>`).join('')}
      </ol>
      <div><a class="arrow" href="/about">${tr('我们的故事', 'Our story')}</a></div>
    </div>
  </div>
</section>

<section class="band cream" aria-labelledby="h-events">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="caps kicker">Eventi · ${tr('活动', 'Events')}</p><h2 class="display h-1" id="h-events">At our <em>table</em></h2></div>
      <a class="arrow" href="/events">${tr('全部活动', 'All events')}</a>
    </div>
    <div class="grid g-3">
      ${EVENTS.map(ev => `<a class="card" href="/events#ev-${ev.id}">
        <div class="frame r-34">${ev.photo ? photo(ev.photo, ev.label, { sizes: '(max-width: 620px) 100vw, 33vw' }) : `<div class="gc-stage">${giftCard(500, tr('生日快乐', 'Happy birthday'))}</div>`}</div>
        <div class="t"><b>${ev.it}</b><em>${ev.price.split(' ')[0]}</em></div>
        <span class="cn">${ev.label} · ${ev.when}</span>
        <p>${ev.lede}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="band hi" aria-labelledby="h-journal">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="caps kicker">Diario · ${tr('日志', 'Journal')}</p><h2 class="display h-1" id="h-journal">From the <em>kitchen</em></h2></div>
      <a class="arrow" href="/journal">${tr('全部文章', 'All stories')}</a>
    </div>
    <div class="grid g-3">
      ${POSTS.slice(0, 3).map(p => `<a class="card" href="/journal/${p.slug}">
        <div class="frame r-32">${photo(p.photo, p.title, { sizes: '(max-width: 620px) 100vw, 33vw' })}</div>
        <span class="caps kicker">${p.cat} · ${fmtDate(p.date, lang)}</span>
        <h3 class="cn-h post-t">${p.title}</h3>
        <p>${p.excerpt}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="band red" data-nav="dark" aria-labelledby="h-visit">
  <div class="wrap">
    <div class="sec-head">
      <div><p class="caps kicker">Dove Siamo · ${tr('门店', 'Locations')}</p><h2 class="display h-1" id="h-visit">A seat by<br>the <em>fire</em>.</h2></div>
      <a class="pill solid" href="/reserve"><span>${tr('预订座位', 'Book a table')} · Prenota</span></a>
    </div>
    <div class="grid g-2 visit">
      ${STORES.map(s => `<a class="visit-card" href="/locations#${s.id}">
        <div class="frame r-32">${photo(s.photo, s.label, { sizes: '(max-width: 620px) 100vw, 50vw' })}</div>
        <div class="visit-t"><b class="it">${s.it}</b><span>${s.label}</span></div>
        <p class="muted">${s.address}</p>
        <dl class="kv">${hoursText(s, lang).map(([d, t, days]) => `<dt data-days="${days}">${d}</dt><dd>${t}</dd>`).join('')}</dl>
        <span class="open-now" data-store="${s.id}"></span>
      </a>`).join('')}
    </div>
  </div>
</section>`;

  return [{
    route: '/', title: '', tone: 'dark', css: ['home'], js: ['home'], ogImage: 'menu-margherita',
    description: tr('三分焰 Tre Fiamme，上海的那不勒斯手拍披萨店。72 小时冷藏发酵，485°C 木柴炉 90 秒出炉。看菜单、了解我们、预订座位。', 'Tre Fiamme is a Neapolitan pizzeria in Shanghai: 72-hour cold-fermented dough, baked for 90 seconds in a 485°C wood oven. See the menu, meet the team and book a table.'),
    main,
  }];
}
