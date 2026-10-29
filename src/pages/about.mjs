import { SOURCES, TEAM, TIMELINE, VALUES } from '../data.mjs';
import { photo } from '../layout.mjs';

export async function pages() {
  const flames = [
    ['La legna', '炉膛里的柴火', '一座 3 吨的木柴炉，只烧干透的果木。开店前三小时点火，炉底 430°C，炉顶接近 500°C。'],
    ['Le mani', '师傅手上的火候', '手拍饼、每 30 秒转一次饼、90 秒出炉。这些没法写进菜谱，只能一张一张练出来。'],
    ['La tavola', '桌边的热闹', '那不勒斯人吃披萨不用刀叉，折起来就吃。我们希望你也这样，吃得随意一点、热闹一点。'],
  ];
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap phero-grid">
    <div>
      <p class="caps kicker">Chi Siamo · 关于我们</p>
      <h1 class="display h-hero">Three<br><em>flames.</em></h1>
      <p class="lede">三分焰的名字来自三团火：炉膛里的柴火，师傅手上的火候，还有桌边的热闹。少了哪一团，都做不出一张像样的那不勒斯披萨。</p>
    </div>
    <div class="phero-img">${photo('journal-sauce', '刚抹好番茄酱的饼底', { eager: true, sizes: '(max-width: 860px) 100vw, 40vw' })}</div>
  </div>
</header>

<section class="band cream" aria-labelledby="h-flames">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">Il nome · 店名</p><h2 class="display h-1" id="h-flames">Tre <em>fiamme</em></h2></div></div>
    <ol class="flames">
      ${flames.map(([it, cn, text], k) => `<li><span class="fl-n">${['I', 'II', 'III'][k]}</span><h3><i class="it">${it}</i><span class="cn-h">${cn}</span></h3><p class="muted">${text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="band hi" aria-labelledby="h-tl">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">La storia · 时间线</p><h2 class="display h-1" id="h-tl">Da <em>Napoli</em><br>a Shanghai</h2></div>
      <p class="lede muted">从一个学徒到两家店，用了十二年。</p></div>
    <ol class="timeline">
      ${TIMELINE.map(t => `<li><b class="tl-y">${t.year}</b><span class="caps kicker">${t.place}</span><p>${t.text}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="band red" data-nav="dark" aria-labelledby="h-values">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">I nostri principi · 我们坚持的事</p><h2 class="display h-1" id="h-values">What we<br><em>won't</em> change</h2></div></div>
    <div class="grid g-3 values">
      ${VALUES.map(v => `<div><p class="it v-it">${v.it}</p><h3 class="cn-h">${v.cn}</h3><p class="muted">${v.text}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="band cream" aria-labelledby="h-team">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">La squadra · 团队</p><h2 class="display h-1" id="h-team">The <em>hands</em></h2></div>
      <p class="lede muted">厨房和前厅一共 26 个人。这四位你最可能见到。点开看他们的故事。</p></div>
    <div class="grid g-4">
      ${TEAM.map(m => `<a class="card team" href="#${m.id}" data-open="${m.id}">
        <div class="frame r-34">${photo(m.photo, `${m.name}的工作照`, { sizes: '(max-width: 620px) 100vw, 25vw' })}</div>
        <div class="t"><b>${m.it}</b></div>
        <span class="cn">${m.name} · ${m.role}</span>
      </a>`).join('')}
    </div>
  </div>
</section>
${TEAM.map(m => `<dialog class="dlg" id="dlg-${m.id}" aria-labelledby="t-${m.id}">
  <button class="dlg-x" type="button" aria-label="关闭">×</button>
  <div class="dlg-body">
    <div class="dlg-media">${photo(m.photo, `${m.name}的工作照`, { sizes: '(max-width: 760px) 100vw, 45vw' })}</div>
    <div class="dlg-text">
      <div><p class="caps kicker">${m.role}</p><h2 class="display" id="t-${m.id}">${m.it}</h2><p class="cn-h">${m.name}</p></div>
      <p>${m.bio}</p>
      <div class="facts one"><div><b>${m.fact[1]}</b><span>${m.fact[0]}</span></div></div>
    </div>
  </div>
</dialog>`).join('\n')}

<section class="band hi" aria-labelledby="h-src">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">Da dove viene · 食材产地</p><h2 class="display h-1" id="h-src">Where it<br>comes <em>from</em></h2></div>
      <a class="arrow" href="/journal/san-marzano">读：一颗番茄的旅程</a></div>
    <div class="sources">
      ${SOURCES.map(s => `<div class="src"><p class="caps kicker">${s.it}</p><h3 class="cn-h">${s.what}</h3><p class="src-from">${s.from}</p><p class="muted">${s.note}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="band red cta-band" data-nav="dark">
  <div class="wrap cta-in">
    <h2 class="display h-1">Come and<br>see the <em>fire</em>.</h2>
    <div class="actions"><a class="pill solid" href="/reserve"><span>预订座位</span></a><a class="pill" href="/craft"><span>看一张饼怎么做</span></a></div>
  </div>
</section>`;

  return [{
    route: '/about', title: '关于我们', tone: 'dark', css: ['pages'], ogImage: 'journal-sauce',
    description: '三分焰的故事：从那不勒斯的学徒到上海的两家店。店名里的三团火、团队和每一样食材的产地。',
    main,
  }];
}
