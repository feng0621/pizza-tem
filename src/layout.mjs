// Page shell (head, navigation, footer) plus small HTML helpers shared by every page module.
import { readFileSync } from 'node:fs';
import { NAV, SITE, STORES } from './data.mjs';

const PHOTOS = JSON.parse(readFileSync(new URL('./photos.json', import.meta.url), 'utf8'));
const FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..800&family=IBM+Plex+Mono:wght@400;500;600&family=Jost:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@500;700;900&display=swap';

export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const yuan = n => `¥${n}`;
export const fmtDate = iso => { const [y, m, d] = iso.split('-').map(Number); return `${y} 年 ${m} 月 ${d} 日`; };

/** Responsive <img> for a photo in public/media/photos (800w and 1600w WebP). */
export function photo(name, alt, { sizes = '(max-width: 760px) 100vw, 50vw', cls = '', eager = false } = {}) {
  const m = PHOTOS[name];
  if (!m) throw new Error(`unknown photo: ${name}`);
  const h = Math.round(m.h * 800 / m.w);
  return `<img class="${cls}" src="/media/photos/${name}-sm.webp" srcset="/media/photos/${name}-sm.webp 800w, /media/photos/${name}.webp 1600w" sizes="${sizes}" width="800" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

/** Today's hours line for a store, computed in the browser by site.js; this is the static fallback. */
export function hoursText(store) {
  const fmt = d => d.length ? d.map(([a, b]) => `${a}–${b}`).join('，') : '休息';
  const groups = [];
  const names = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (const d of [1, 2, 3, 4, 5, 6, 0]) {
    const t = fmt(store.hours[d]), last = groups[groups.length - 1];
    if (last && last.t === t) { last.to = d; last.days.push(d); } else groups.push({ from: d, to: d, t, days: [d] });
  }
  return groups.map(g => [g.from === g.to ? names[g.from] : `${names[g.from]}至${names[g.to]}`, g.t, g.days.join(',')]);
}

const flame = `<svg class="flame" viewBox="0 0 32 32" aria-hidden="true"><path d="M9 28c-4-3-3-8 0-11 0 3 2 4 2 4-1-5 2-9 5-11-1 4 1 6 3 8 1-2 1-4 0-6 4 3 6 8 4 13-1 2-2 3-3 3z" fill="var(--pomodoro)"/><path d="M13 28c-2-2-1-5 1-7 0 2 1 3 2 3 0-3 1-5 3-6-1 3 2 5 1 8-1 1-2 2-3 2z" fill="var(--ember)"/><path d="M16 28c-1-1-1-3 0-4 1 1 2 1 2 1 0 1 0 2-1 3z" fill="var(--cream-ink)"/></svg>`;

function header(page) {
  const here = page.route;
  const link = n => `<a href="${n.href}"${here === n.href || here.startsWith(n.href + '/') ? ' aria-current="page"' : ''}>${n.cn}</a>`;
  return `<header class="nav" id="nav">
  <a class="brand" href="/" aria-label="Tre Fiamme 三分焰 首页"><b>TRE FIAMME</b><small>pizzeria napoletana · 三分焰</small></a>
  <nav class="links" aria-label="主导航">${NAV.map(link).join('')}</nav>
  <a class="pill nav-cta" href="/reserve"><span>预订 · Prenota</span></a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="打开导航"><span></span><span></span></button>
</header>
<div class="mnav" id="mnav" hidden data-lenis-prevent>
  <nav aria-label="移动端导航">
    <a href="/"><i>Home</i><span>首页</span></a>
    ${NAV.map(n => `<a href="${n.href}"><i>${n.it}</i><span>${n.cn}</span></a>`).join('')}
    <a href="/reserve"><i>Prenota</i><span>预订</span></a>
  </nav>
  <div class="mnav-foot">${STORES.map(s => `<p><b>${s.cn}</b><span data-today="${s.id}">${s.address}</span></p>`).join('')}</div>
</div>`;
}

function footer() {
  return `<footer class="site-foot" data-nav="dark">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand big" href="/">${flame}<span><b>TRE FIAMME</b><small>pizzeria napoletana · 三分焰</small></span></a>
        <p>柴火、手艺和桌边的热闹，三团火做一张饼。</p>
        <form class="news" id="news" novalidate>
          <label for="news-email" class="caps">每月一封信 · 新菜单和活动</label>
          <div><input type="email" id="news-email" placeholder="你的邮箱" autocomplete="email" required><button class="pill solid" type="submit"><span>订阅</span></button></div>
          <p class="news-msg" id="news-msg" role="status"></p>
        </form>
      </div>
      <div class="foot-cols">
        <div><p class="caps">门店</p>${STORES.map(s => `<p><a href="/locations#${s.id}">${s.cn}</a><br><span>${s.address}</span><br><span class="open-now" data-store="${s.id}"></span></p>`).join('')}</div>
        <div><p class="caps">探索</p><ul>${NAV.map(n => `<li><a href="${n.href}">${n.cn}</a></li>`).join('')}<li><a href="/reserve">预订</a></li></ul></div>
        <div><p class="caps">联系</p><p>电话 <span class="sel">${SITE.phone}</span><br>邮箱 <span class="sel">${SITE.email}</span></p><p><a href="/locations#faq">常见问题</a><br><a href="/credits">素材与版权</a></p></div>
      </div>
    </div>
    <p class="foot-word" aria-hidden="true">Tre Fiamme</p>
    <div class="foot-base">
      <p>© 2026 Tre Fiamme 三分焰。这是一个虚构的演示品牌：地址、电话、价格和预订都只作示意，不会真的下单或预订。</p>
      <p>照片与视频来自 <a href="https://www.pexels.com/" target="_blank" rel="noopener">Pexels</a> 与 <a href="https://pixabay.com/" target="_blank" rel="noopener">Pixabay</a></p>
    </div>
  </div>
</footer>`;
}

export function layout(page, { version }) {
  const v = `?v=${version}`;
  const title = page.title ? `${page.title} · Tre Fiamme 三分焰` : 'Tre Fiamme 三分焰 · 那不勒斯手拍披萨';
  const desc = page.description || SITE.description;
  return `<!doctype html>
<html lang="zh-CN" data-nav-tone="${page.tone || 'light'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
${page.ogImage ? `<meta property="og:image" content="/media/photos/${page.ogImage}.webp">` : ''}
<meta name="theme-color" content="${page.themeColor || '#6c1b1f'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/css/site.css${v}">
${(page.css || []).map(c => `<link rel="stylesheet" href="/css/${c}.css${v}">`).join('\n')}
</head>
<body class="${page.bodyClass || ''}">
<a class="skip" href="#main">跳到正文</a>
${header(page)}
<main id="main">
${page.main.replace(/<dialog /g, '<dialog data-lenis-prevent ')}
</main>
${page.noFooter ? '' : footer()}
<script>window.TF_STORES=${JSON.stringify(STORES.map(s => ({ id: s.id, cn: s.cn, hours: s.hours })))};</script>
<script src="/js/site.js${v}" defer></script>
<script src="/js/vendor/lenis.min.js" defer></script>
<script src="/js/fx.js${v}" defer></script>
${(page.js || []).map(j => `<script src="/js/${j}.js${v}" defer></script>`).join('\n')}
</body>
</html>
`;
}
