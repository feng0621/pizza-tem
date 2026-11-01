import { content, translator } from '../content.mjs';
import { esc, fmtDate, photo } from '../layout.mjs';

const block = ([kind, a, b]) => {
  if (kind === 'h') return `<h2 class="cn-h">${a}</h2>`;
  if (kind === 'quote') return `<blockquote><p>${a}</p><cite>${b}</cite></blockquote>`;
  if (kind === 'facts') return `<div class="post-facts">${a.map(([k, v]) => `<div><b class="num">${v}</b><span>${k}</span></div>`).join('')}</div>`;
  return `<p>${a}</p>`;
};

export async function pages(lang) {
  const { POSTS } = content(lang);
  const tr = translator(lang);
  const readTime = p => tr(`${p.minutes} 分钟读完`, `${p.minutes} min read`);

  function list() {
    const [lead, ...rest] = POSTS;
    const cats = [...new Set(POSTS.map(p => p.cat))];
    const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap">
    <p class="caps kicker">Diario · ${tr('日志', 'Journal')}</p>
    <h1 class="display h-hero">From the<br><em>kitchen.</em></h1>
    <p class="lede">${tr('厨房里的事、食材的来历和店里的新闻。大概每个月写一篇。', 'Notes from the kitchen, where our ingredients come from and news from the restaurants. We write about once a month.')}</p>
  </div>
</header>
<section class="band cream" aria-label="${tr('文章列表', 'Stories')}">
  <div class="wrap">
    <a class="lead-post" href="/journal/${lead.slug}">
      <div class="frame r-32">${photo(lead.photo, lead.title, { eager: true, sizes: '(max-width: 860px) 100vw, 60vw' })}</div>
      <div class="stack">
        <span class="caps kicker">${lead.cat} · ${fmtDate(lead.date, lang)} · ${readTime(lead)}</span>
        <p class="it lead-it">${lead.it}</p>
        <h2 class="cn-h lead-t">${lead.title}</h2>
        <p class="muted">${lead.excerpt}</p>
        <span class="arrow">${tr('阅读全文', 'Read the story')}</span>
      </div>
    </a>
    <div class="chips post-filter" role="group" aria-label="${tr('按分类筛选', 'Filter by category')}">
      <input type="radio" name="pc" id="pc-all" value="" checked><label for="pc-all">${tr('全部', 'All')}</label>
      ${cats.map(c => `<input type="radio" name="pc" id="pc-${c}" value="${c}"><label for="pc-${c}">${c}</label>`).join('')}
    </div>
    <div class="grid g-3 posts">
      ${rest.map(p => `<a class="card" href="/journal/${p.slug}" data-cat="${p.cat}">
        <div class="frame r-32">${photo(p.photo, p.title, { sizes: '(max-width: 620px) 100vw, 33vw' })}</div>
        <span class="caps kicker">${p.cat} · ${fmtDate(p.date, lang)}</span>
        <h3 class="cn-h post-t">${p.title}</h3>
        <p>${p.excerpt}</p>
      </a>`).join('')}
    </div>
  </div>
</section>
<script>
document.querySelector('.post-filter').addEventListener('change', e => {
  for (const a of document.querySelectorAll('.posts .card')) a.hidden = !!e.target.value && a.dataset.cat !== e.target.value;
});
</script>`;
    return { route: '/journal', title: tr('日志', 'Journal'), tone: 'dark', css: ['pages'], ogImage: lead.photo, description: tr('三分焰日志：面团发酵、圣马扎诺番茄、木柴炉和店里的新闻。', 'The Tre Fiamme journal: dough fermentation, San Marzano tomatoes, the wood oven and news from the restaurants.'), main };
  }

  function article(p, k) {
    const others = POSTS.filter(o => o !== p).slice(0, 2);
    const next = POSTS[(k + 1) % POSTS.length];
    const main = `
<div class="read-bar" id="read-bar" aria-hidden="true"></div>
<article>
  <header class="phero red post-hero" data-nav="dark">
    <div class="wrap narrow">
      <p class="caps crumbs"><a href="/journal">${tr('日志', 'Journal')}</a><span>/</span><span>${p.cat}</span></p>
      <p class="it post-it">${p.it}</p>
      <h1 class="cn-h post-h">${p.title}</h1>
      <p class="caps kicker">${fmtDate(p.date, lang)} · ${readTime(p)}</p>
    </div>
  </header>
  <div class="post-cover wrap">${photo(p.photo, p.title, { eager: true, sizes: '(max-width: 1180px) 100vw, 1180px', cls: 'cover-img' })}</div>
  <div class="band cream post-band">
    <div class="wrap narrow post-body">
      <p class="post-lede">${p.excerpt}</p>
      ${p.body.map(block).join('\n      ')}
      <p class="post-end muted">— ${tr('三分焰 Tre Fiamme', 'Tre Fiamme')}</p>
    </div>
  </div>
</article>
<section class="band hi" aria-labelledby="h-more">
  <div class="wrap">
    <div class="sec-head"><div><p class="caps kicker">Continua · ${tr('继续读', 'Keep reading')}</p><h2 class="display h-2" id="h-more">More <em>stories</em></h2></div><a class="arrow" href="/journal/${next.slug}">${tr('下一篇：', 'Next: ')}${esc(next.title)}</a></div>
    <div class="grid g-2">
      ${others.map(o => `<a class="card" href="/journal/${o.slug}">
        <div class="frame r-32">${photo(o.photo, o.title, { sizes: '(max-width: 620px) 100vw, 50vw' })}</div>
        <span class="caps kicker">${o.cat} · ${fmtDate(o.date, lang)}</span>
        <h3 class="cn-h post-t">${o.title}</h3>
      </a>`).join('')}
    </div>
  </div>
</section>`;
    return { route: `/journal/${p.slug}`, title: p.title, tone: 'dark', css: ['pages'], ogImage: p.photo, description: p.excerpt, main };
  }

  return [list(), ...POSTS.map(article)];
}
