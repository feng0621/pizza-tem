import { translator } from '../content.mjs';
import { photo } from '../layout.mjs';

const clips = [
  ['p1', 'p1-knead', '60% 50%', 'auto'], ['p2', 'p2-balls', '55% 50%', 'auto'], ['p3', 'p3-stretch', '58% 50%', 'metadata'],
  ['p4a', 'p4-sauce', '50% 50%', 'metadata'], ['p4b', 'p4-top', '50% 50%', 'metadata'], ['p5a', 'p5-fire', '55% 50%', 'metadata'],
  ['p5b', 'p5-bake', '55% 50%', 'metadata'], ['p5c', 'p5-out', '55% 50%', 'metadata'],
];
const video = ([id, file, pos, pre], cls = '') => `<video class="clip${cls}" id="v-${id}" src="/media/kitchen/${file}.mp4" poster="/media/kitchen/${file}.jpg" muted playsinline preload="${pre}" style="--pos:${pos}"></video>`;
const tricolore = '<span class="tricolore" aria-hidden="true"><i style="background:var(--basil-k)"></i><i style="background:var(--flour)"></i><i style="background:var(--pomodoro)"></i></span>';
const shots = [[0, 1], [2], [3], [4], [5], [6], [7]];

export async function pages(lang) {
  const tr = translator(lang);
  const beats = [
    { h: '110vh', pt: '0px', first: true },
    { n: 'i', it: 'Impasto', label: tr('揉面', 'Kneading'), h2: tr('只用四样东西：面粉、水、盐、酵母', 'Just four things: flour, water, salt, yeast'), p: [tr('00 号软麦粉配 65% 的水，揉到表面光滑、能拉出薄膜为止。我们每天早上 8 点揉面，今天揉好的面团，要等三天后才上炉。', 'Soft 00 flour at 65% hydration, kneaded until smooth enough to stretch into a thin film. We start at 8 every morning, and today’s dough will not see the oven for another three days.')], h: '150vh' },
    { n: 'ii', it: 'Lievitazione', label: tr('醒发', 'Proving'), h2: tr('72 小时，等它慢慢长大', '72 hours of slow growth'), p: [tr('面团分成 250 克一个的小球，放进 4°C 的冷藏柜发酵 72 小时，出餐前两小时拿出来回温。慢发酵的面更好消化，饼边也更香。', 'The dough is divided into 250 g balls and ferments at 4°C for 72 hours, then comes out two hours before service to warm up. Slow-fermented dough is easier to digest, and the rim tastes better.')], link: ['/journal/72-hours', tr('读：为什么是 72 小时', 'Read: why 72 hours')] },
    { n: 'iii', it: 'Stesura', label: tr('拍饼', 'Stretching'), h2: tr('不用擀面杖，只用手', 'No rolling pin, just hands'), p: [tr('从中间往外压，把面团里的空气赶到边上，留出 2 厘米的饼边。擀面杖会把气泡压没，所以那不勒斯披萨只用手拍。', 'Pressing out from the centre pushes the air to the edge and leaves a 2 cm rim. A rolling pin would crush the bubbles, so Neapolitan pizza is only ever stretched by hand.')] },
    { n: 'iv', it: 'Condimento', label: tr('铺料', 'Topping'), h2: tr('一张玛格丽特，只放四样料', 'A Margherita takes only four toppings'), p: [tr('圣马扎诺番茄打成酱，从中心转圈抹开；再放撕开的水牛马苏里拉、几片罗勒，最后淋一圈橄榄油。', 'San Marzano tomato sauce goes on in a spiral from the centre, then torn buffalo mozzarella, a few basil leaves and a ring of olive oil.'), tricolore + tr('罗勒绿、芝士白、番茄红，正好是意大利国旗的颜色。', 'Green basil, white cheese, red tomato: the colours of the Italian flag.')], h: '240vh', link: ['/journal/san-marzano', tr('读：一颗番茄的旅程', 'Read: the journey of a tomato')] },
    { n: 'v', it: 'Cottura', label: tr('入炉', 'Baking'), h2: tr('<em>485°C</em>，<em>90</em> 秒', '<em>485°C</em>, <em>90</em> seconds'), p: [tr('木柴炉的炉底大约 430°C，炉顶接近 500°C。饼送进去之后，披萨师傅每 30 秒转一次，让每一边都均匀受火。90 秒后饼边鼓起，烤出一圈豹纹焦斑。', 'The oven floor is about 430°C and the dome close to 500°C. Once a pizza is in, the pizzaiolo turns it every 30 seconds so that every side meets the flames. After 90 seconds the rim has risen and charred in leopard spots.')], h: '300vh', link: ['/journal/485-degrees', tr('读：怎么烧一座木柴炉', 'Read: how to fire a wood oven')] },
    { n: 'vi', it: 'Sfornata', label: tr('出炉', 'Out of the oven'), h2: tr('饼边鼓起，芝士刚好拉丝', 'A risen rim, and the cheese just stretching'), p: [tr('刚出炉的那不勒斯披萨中心是软的，边缘外脆里松。趁热切开，芝士还在拉丝的这一分钟最好吃。', 'A fresh Neapolitan pizza is soft in the centre, with a rim that is crisp outside and airy within. It is at its best in the one minute while the cheese still stretches.')], h: '210vh' },
    { n: 'vii', it: 'In tavola', label: tr('上桌', 'At the table'), h2: tr('从入炉到上桌，2 分钟', 'Oven to table in 2 minutes'), p: [tr('出炉、切块、上桌，一张饼在厨房里只待两分钟。外送用透气纸盒加保温包，3 公里内 35 分钟送到。', 'Out, sliced, served: a pizza spends only two minutes in the kitchen. Deliveries travel in vented boxes and insulated bags, and reach you within 35 minutes inside 3 km.')] },
  ];

  const beat = b => b.first ? `<div class="beat" style="--h:110vh;--pt:0px">
      <div class="copy">
        <p class="eyebrow"><span>Il Forno · ${tr('三分焰的厨房', 'The Tre Fiamme kitchen')}</span></p>
        <h1>${tr('一张披萨的 <em>90″</em>，和它之前的 <em>72</em> 小时', 'A pizza’s <em>90″</em>, and the <em>72</em> hours before them')}</h1>
        <p class="lede">${tr('木柴炉烧到 485°C，饼送进去 90 秒就出炉。真正花时间的是前面：面团要冷藏发酵整整三天。往下滚动，看一张玛格丽特是怎么做出来的。', 'At 485°C, the wood oven bakes a pizza in 90 seconds. The real time goes in earlier: the dough spends three full days fermenting in the cold. Scroll down to see how a Margherita gets made.')}</p>
        <p class="hint"><span class="line"></span>${tr('向下滚动', 'Scroll down')}</p>
      </div>
    </div>` : `<div class="beat" style="--h:${b.h || '200vh'}">
      <div class="copy">
        <p class="eyebrow"><span class="n">${b.n}</span><span>${b.label} · ${b.it}</span></p>
        <h2>${b.h2}</h2>
        ${b.p.map(t => `<p>${t}</p>`).join('')}
        ${b.link ? `<p><a class="copy-link" href="${b.link[0]}">${b.link[1]} →</a></p>` : ''}
      </div>
    </div>`;

  const steps = [['0', tr('揉面', 'Knead'), '10-19'], ['1.02', tr('醒发 72 h', 'Prove 72 h'), '4°C'], ['2.02', tr('拍饼', 'Stretch'), '30 cm'], ['3.02', tr('抹番茄酱', 'Tomato sauce'), '80 g'], ['3.5', tr('芝士 + 罗勒', 'Cheese + basil'), 'DOP'], ['4.02', tr('入炉', 'Into the oven'), '485°C'], ['4.8', tr('出炉', 'Out of the oven'), '90″'], ['6.04', tr('上桌', 'Served'), '19:44']];

  const main = `
<div id="stage" data-nav="soot" data-nav-solid="false" aria-hidden="true">
  ${clips.map(c => video(c)).join('\n  ')}
  <canvas id="blurbg" width="48" height="85"></canvas>
  ${video(['p6', 'p6-pull', '50% 45%', 'metadata'], ' port')}
  ${video(['p7', 'p7-table', '55% 50%', 'metadata'])}
  <div id="heat"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
</div>
<div class="scrim" aria-hidden="true"></div>
<div class="progress" id="progress" aria-hidden="true"></div>
<div id="hud" aria-hidden="true"><span class="fire"></span><b id="st-name">${tr('工位 01', 'Station 01')}</b><span id="st-loc">${tr('面案', 'Dough bench')}</span><span class="tc" id="st-time">10-19 08:12:00</span></div>

<aside id="cards" aria-label="${tr('工位实时信息', 'Live station details')}">
  <div class="st-card" data-from="0.45" data-to="1.03">
    <h3>${tr('今日面团 · 第 3 批', "Today's dough · batch 3")}</h3>
    <dl class="kv"><dt>${tr('00 号软麦粉', 'Soft 00 flour')}</dt><dd>1000 g</dd><dt>${tr('水（含水 65%）', 'Water (65% hydration)')}</dt><dd>650 g</dd><dt>${tr('海盐', 'Sea salt')}</dt><dd>28 g</dd><dt>${tr('鲜酵母', 'Fresh yeast')}</dt><dd>1 g</dd><dt>${tr('揉面', 'Kneading')}</dt><dd>${tr('15 分钟', '15 min')}</dd></dl>
  </div>
  <div class="st-card" data-from="1.08" data-to="2.03">
    <h3>${tr('冷藏醒发 · 4°C', 'Cold proving · 4°C')}</h3>
    <div class="big"><span id="proof-h">00:00</span><small>/ 72:00 ${tr('小时', 'hours')}</small></div>
    <div class="bar2"><i id="proof-bar"></i></div>
    <dl class="kv"><dt>${tr('每个面团', 'Each dough ball')}</dt><dd>250 g</dd><dt>${tr('出餐前回温', 'Warming before service')}</dt><dd>${tr('2 小时', '2 hours')}</dd></dl>
  </div>
  <div class="st-card" data-from="2.08" data-to="3.03">
    <h3>${tr('拍饼规格', 'Stretch spec')}</h3>
    <svg class="profile" viewBox="0 0 300 92" aria-hidden="true">
      <path id="crust" fill="#e9d9bd" d=""/>
      <g font-family="IBM Plex Mono,monospace" font-size="10" fill="#9d8f80">
        <line x1="10" y1="80" x2="290" y2="80" stroke="#3d3129"/>
        <text x="150" y="91" text-anchor="middle">${tr('直径 30 cm', 'Diameter 30 cm')}</text><text x="20" y="18">${tr('边缘 2 cm', 'Rim 2 cm')}</text><text x="150" y="44" text-anchor="middle">${tr('中心 3 mm', 'Centre 3 mm')}</text>
      </g>
    </svg>
    <dl class="kv"><dt>${tr('手法', 'Method')}</dt><dd>${tr('手拍 · 不用擀面杖', 'By hand · no rolling pin')}</dd></dl>
  </div>
  <div class="st-card" data-from="3.06" data-to="4.03">
    <h3>${tr('Margherita DOP 配料', 'Margherita DOP toppings')}</h3>
    <ul class="rows">
      <li data-t="3.1" style="--c:var(--pomodoro)"><i></i><span>${tr('圣马扎诺番茄酱', 'San Marzano sauce')}</span><span>80 g</span></li>
      <li data-t="3.55" style="--c:var(--flour)"><i></i><span>${tr('水牛马苏里拉', 'Buffalo mozzarella')}</span><span>100 g</span></li>
      <li data-t="3.74" style="--c:var(--basil-k)"><i></i><span>${tr('新鲜罗勒', 'Fresh basil')}</span><span>${tr('4 片', '4 leaves')}</span></li>
      <li data-t="3.9" style="--c:#d6b24a"><i></i><span>${tr('特级初榨橄榄油', 'Extra virgin olive oil')}</span><span>5 ml</span></li>
    </ul>
  </div>
  <div class="st-card" data-from="4.06" data-to="5.03">
    <h3>${tr('木柴炉 · 3 号炉膛', 'Wood oven · chamber 3')}</h3>
    <svg class="gauge" viewBox="0 0 260 120" aria-hidden="true">
      <path d="M30 110 A100 100 0 0 1 230 110" fill="none" stroke="#3d3129" stroke-width="10" stroke-linecap="round"/>
      <path id="g-arc" d="M30 110 A100 100 0 0 1 230 110" fill="none" stroke="#ff9b3d" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="0 100"/>
      <g font-family="IBM Plex Mono,monospace" font-size="10" fill="#9d8f80"><text x="24" y="122">0°</text><text x="236" y="122" text-anchor="end">500°</text></g>
      <text id="g-temp" x="130" y="96" text-anchor="middle" font-family="Bodoni Moda,serif" font-style="italic" font-weight="700" font-size="44" fill="#f4eee3">380°C</text>
    </svg>
    <div class="bar2"><i id="bake-bar" style="background:var(--pomodoro)"></i></div>
    <div class="ticks"><span id="bake-t">${tr('已烤 0″', 'Baked 0″')}</span><span id="turn1">${tr('转饼 30″', 'Turn 30″')}</span><span id="turn2">${tr('转饼 60″', 'Turn 60″')}</span><span>90″</span></div>
  </div>
  <div class="st-card" data-from="5.06" data-to="6.03">
    <h3>${tr('出炉检查', 'Out-of-oven check')}</h3>
    <ul class="rows">
      <li data-t="5.12" style="--c:var(--basil-k)"><i></i><span>${tr('饼边鼓起 2 cm', 'Rim risen 2 cm')}</span><span>✓</span></li>
      <li data-t="5.3" style="--c:var(--basil-k)"><i></i><span>${tr('豹纹焦斑均匀', 'Even leopard spots')}</span><span>✓</span></li>
      <li data-t="5.48" style="--c:var(--basil-k)"><i></i><span>${tr('中心湿润，不塌', 'Moist centre, no sag')}</span><span>✓</span></li>
      <li data-t="5.66" style="--c:var(--basil-k)"><i></i><span>${tr('芝士拉丝', 'Cheese stretch')}</span><span>72°C</span></li>
    </ul>
  </div>
  <div class="st-card" data-from="6.1" data-to="7.2">
    <h3>${tr('已上桌 · 3 号桌', 'Served · table 3')}</h3>
    <dl class="kv"><dt>${tr('入炉', 'In')}</dt><dd>19:42:01</dd><dt>${tr('出炉', 'Out')}</dt><dd>19:43:31</dd><dt>${tr('上桌', 'Served')}</dt><dd>19:44:11</dd><dt>${tr('下一张', 'Next up')}</dt><dd>Diavola · ${tr('5 号桌', 'table 5')}</dd></dl>
  </div>
</aside>

<nav class="ticket" aria-label="${tr('厨房小票', 'Kitchen ticket')}">
  <div class="th"><b>Tre Fiamme</b><span>ORDINE #047 · ${tr('3 号桌', 'Table 3')} · 19:41</span></div>
  <div class="item"><span>1 × Margherita DOP</span><span>30cm</span></div>
  <ol id="steps">
    ${steps.map(([t, a, b]) => `<li><button type="button" data-t="${t}"><span class="box"></span><span>${a}</span><small>${b}</small></button></li>`).join('\n    ')}
  </ol>
  <div class="tf">${tr('点任意一步跳过去看', 'Tap a step to jump to it')}</div>
</nav>

<div class="beats" id="top">
  ${shots.map(group => `<section class="shot" aria-label="${beats[group[group.length - 1]].label || tr('开场', 'Opening')}">${group.map(i => beat(beats[i])).join('')}</section>`).join('\n  ')}
</div>

<section class="finale" id="finale" data-nav="soot" aria-labelledby="fin-h">
  <div class="inner">
    <div>
      <p class="eyebrow"><span>Dal forno alla tavola · ${tr('从炉口到桌上', 'From the oven to the table')}</span></p>
      <h2 id="fin-h">${tr('现在轮到你了', 'Now it’s your turn')}</h2>
    </div>
    <div class="facts4">
      <div><b>72<small>h</small></b><span>${tr('冷藏发酵', 'Cold fermentation')}</span></div>
      <div><b>485<small>°C</small></b><span>${tr('木柴炉温', 'Oven temperature')}</span></div>
      <div><b>90<small>s</small></b><span>${tr('入炉到出炉', 'In the oven')}</span></div>
      <div><b>120</b><span>${tr('每天只做这么多个面团', 'Dough balls a day, no more')}</span></div>
    </div>
    <div class="next3">
      <a class="nx" href="/menu"><div class="frame r-32">${photo('menu-margherita', tr('一张玛格丽特披萨', 'A Margherita pizza'), { sizes: '(max-width: 860px) 100vw, 33vw' })}</div><b class="it">La Carta</b><span>${tr('点一张，外送或自取', 'Order one for delivery or pickup')}</span></a>
      <a class="nx" href="/reserve"><div class="frame r-32">${photo('fire-oven', tr('木柴炉里的火', 'The fire in the wood oven'), { sizes: '(max-width: 860px) 100vw, 33vw' })}</div><b class="it">Prenota</b><span>${tr('预订吧台位，看着炉子吃', 'Book the bar and eat facing the oven')}</span></a>
      <a class="nx" href="/events#ev-scuola"><div class="frame r-32">${photo('event-class', tr('把披萨放上木铲', 'Sliding a pizza onto a wooden peel'), { sizes: '(max-width: 860px) 100vw, 33vw' })}</div><b class="it">Scuola di Pizza</b><span>${tr('周六下午，自己拍一张', 'Stretch your own on a Saturday afternoon')}</span></a>
    </div>
  </div>
</section>

<div id="loader" role="status">
  <div class="ld">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 28c-4-3-3-8 0-11 0 3 2 4 2 4-1-5 2-9 5-11-1 4 1 6 3 8 1-2 1-4 0-6 4 3 6 8 4 13-1 2-2 3-3 3z" fill="var(--pomodoro)"/><path d="M13 28c-2-2-1-5 1-7 0 2 1 3 2 3 0-3 1-5 3-6-1 3 2 5 1 8-1 1-2 2-3 2z" fill="var(--ember)"/></svg>
    <span id="ld-msg">${tr('炉子正在升温…', 'The oven is heating up…')}</span>
    <div class="ld-bar"><span id="ld-fill"></span></div>
  </div>
</div>`;

  return [{
    route: '/craft', title: tr('工艺', 'Craft'), tone: 'soot', bodyClass: 'craft', css: ['craft'], js: ['craft'], themeColor: '#15110e', ogImage: 'fire-oven',
    description: tr('一张那不勒斯玛格丽特的 90 秒，和它之前的 72 小时：揉面、醒发、拍饼、铺料、入炉、出炉、上桌。', 'The 90 seconds of a Neapolitan Margherita and the 72 hours before them: kneading, proving, stretching, topping, baking and serving.'),
    main,
  }];
}
