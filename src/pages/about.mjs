import { content, translator } from '../content.mjs';
import { photo } from '../layout.mjs';

export async function pages(lang) {
  const { SOURCES, TEAM, TIMELINE, VALUES } = content(lang);
  const tr = translator(lang);
  const portrait = m => tr(`${m.name}的工作照`, `${m.name} at work`);
  const flames = [
    ['La legna', tr('炉膛里的柴火', 'The fire in the oven'), tr('一座 3 吨的木柴炉，只烧干透的果木。开店前三小时点火，炉底 430°C，炉顶接近 500°C。', 'A three-ton wood oven that burns only well-seasoned fruitwood. We light it three hours before opening. The floor reaches 430°C and the dome nearly 500°C.')],
    ['Le mani', tr('师傅手上的火候', 'The feel in the hands'), tr('手拍饼、每 30 秒转一次饼、90 秒出炉。这些没法写进菜谱，只能一张一张练出来。', 'Stretching by hand, a turn every 30 seconds, out in 90. None of this fits in a recipe. It takes one pizza after another to learn.')],
    ['La tavola', tr('桌边的热闹', 'The life around the table'), tr('那不勒斯人吃披萨不用刀叉，折起来就吃。我们希望你也这样，吃得随意一点、热闹一点。', "In Naples nobody needs a knife and fork: you fold the pizza and eat. We hope you will do the same, and make a bit of noise while you're at it.")],
  ];
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">Chi Siamo · ${tr('关于我们', 'About us')}</p>
      <h1 class="display h-hero">Three<br><em>flames.</em></h1>
      <p class="lede">${tr('三分焰的名字来自三团火：炉膛里的柴火，师傅手上的火候，还有桌边的热闹。少了哪一团，都做不出一张像样的那不勒斯披萨。', "Tre Fiamme means three flames: the fire in the oven, the feel in the pizzaiolo's hands, and the life around the table. Take away any one of them and you don't have a proper Neapolitan pizza.")}</p>
    </div>
    <div class="phero-img">${photo('journal-sauce', tr('刚抹好番茄酱的饼底', 'A pizza base freshly spread with tomato sauce'), { eager: true, sizes: '(max-width: 860px) 100vw, 40vw' })}</div>
  </div>
</header>

<section class="band cream" aria-labelledby="h-flames">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">Il nome · ${tr('店名', 'The name')}</p><h2 class="display h-1" id="h-flames">Tre <em>fiamme</em></h2></div></div>
    <ol class="flames">
      ${flames.map(([it, name, text], k) => `<li><span class="fl-n">${['I', 'II', 'III'][k]}</span><h3><i class="it">${it}</i><span class="cn-h">${name}</span></h3><p class="muted">${text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="band hi" aria-labelledby="h-tl">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">La storia · ${tr('时间线', 'Our story')}</p><h2 class="display h-1" id="h-tl">Da <em>Napoli</em><br>a Shanghai</h2></div>
      <p class="lede muted">${tr('从一个学徒到两家店，用了十二年。', 'From one apprentice to two restaurants took twelve years.')}</p></div>
    <ol class="timeline">
      ${TIMELINE.map(t => `<li><b class="tl-y">${t.year}</b><span class="caps kicker">${t.place}</span><p>${t.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="band red" data-nav="dark" aria-labelledby="h-values">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">I nostri principi · ${tr('我们坚持的事', 'What we stand by')}</p><h2 class="display h-1" id="h-values">What we<br><em>won't</em> change</h2></div></div>
    <div class="grid g-3 values">
      ${VALUES.map(v => `<div><p class="it v-it">${v.it}</p><h3 class="cn-h">${v.label}</h3><p class="muted">${v.text}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="band cream" aria-labelledby="h-team">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">La squadra · ${tr('团队', 'The team')}</p><h2 class="display h-1" id="h-team">The <em>hands</em></h2></div>
      <p class="lede muted">${tr('厨房和前厅一共 26 个人。这四位你最可能见到。点开看他们的故事。', 'There are 26 of us across the kitchen and front of house. These are the four you are most likely to meet. Open a card to read their stories.')}</p></div>
    <div class="grid g-4">
      ${TEAM.map(m => `<a class="card team" href="#${m.id}" data-open="${m.id}">
        <div class="frame r-34">${photo(m.photo, portrait(m), { sizes: '(max-width: 620px) 100vw, 25vw' })}</div>
        <div class="t"><b>${m.it}</b></div>
        <span class="cn">${tr(`${m.name} · ${m.role}`, m.role)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>
${TEAM.map(m => `<dialog class="dlg" id="dlg-${m.id}" aria-labelledby="t-${m.id}">
  <button class="dlg-x" type="button" aria-label="${tr('关闭', 'Close')}">×</button>
  <div class="dlg-body">
    <div class="dlg-media">${photo(m.photo, portrait(m), { sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
    <div class="dlg-text">
      <div><p class="caps kicker">${m.role}</p><h2 class="display" id="t-${m.id}">${m.it}</h2>${tr(`<p class="cn-h">${m.name}</p>`, '')}</div>
      <p>${m.bio}</p>
      <div class="facts one"><div><b>${m.fact[1]}</b><span>${m.fact[0]}</span></div></div>
    </div>
  </div>
</dialog>`).join('\n')}

<section class="band hi" aria-labelledby="h-src">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">Da dove viene · ${tr('食材产地', 'Where it comes from')}</p><h2 class="display h-1" id="h-src">Where it<br>comes <em>from</em></h2></div>
      <a class="arrow" href="/journal/san-marzano">${tr('读：一颗番茄的旅程', 'Read: the journey of a tomato')}</a></div>
    <div class="sources">
      ${SOURCES.map(s => `<div class="src"><p class="caps kicker">${s.it}</p><h3 class="cn-h">${s.what}</h3><p class="src-from">${s.from}</p><p class="muted">${s.note}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="band red cta-band" data-nav="dark">
  <div class="wrap cta-in">
    <h2 class="display h-1">Come and<br>see the <em>fire</em>.</h2>
    <div class="actions"><a class="pill solid" href="/reserve"><span>${tr('预订座位', 'Book a table')}</span></a><a class="pill" href="/craft"><span>${tr('看一张饼怎么做', 'See how a pizza is made')}</span></a></div>
  </div>
</section>`;

  return [{
    route: '/about', title: tr('关于我们', 'About'), tone: 'dark', css: ['pages'], ogImage: 'journal-sauce',
    description: tr('三分焰的故事：从那不勒斯的学徒到上海的两家店。店名里的三团火、团队和每一样食材的产地。', 'The Tre Fiamme story: from an apprenticeship in Naples to two restaurants in Shanghai. The three flames in our name, the team and where every ingredient comes from.'),
    main,
  }];
}
