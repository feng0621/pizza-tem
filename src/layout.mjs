// Page shell (head, navigation, footer) plus small HTML helpers shared by every page module.
import { readFileSync } from 'node:fs';
import { content, HTML_LANG, prefix, translator } from './content.mjs';

const PHOTOS = JSON.parse(readFileSync(new URL('./photos.json', import.meta.url), 'utf8'));
const FONTS_LATIN = 'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..800&family=IBM+Plex+Mono:wght@400;500;600&family=Jost:wght@400;500;600';
const FONTS_CN = '&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@500;700;900';
const fonts = lang => `https://fonts.googleapis.com/css2?${FONTS_LATIN}${lang === 'zh' ? FONTS_CN : ''}&display=swap`;

export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const yuan = n => `¥${n}`;
export function fmtDate(iso, lang) {
  const [y, m, d] = iso.split('-').map(Number);
  if (lang === 'zh') return `${y} 年 ${m} 月 ${d} 日`;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Responsive <img> for a photo in public/media/photos (800w and 1600w WebP). */
export function photo(name, alt, { sizes = '(max-width: 760px) 100vw, 50vw', cls = '', eager = false } = {}) {
  const m = PHOTOS[name];
  if (!m) throw new Error(`unknown photo: ${name}`);
  const h = Math.round(m.h * 800 / m.w);
  return `<img class="${cls}" src="/media/photos/${name}-sm.webp" srcset="/media/photos/${name}-sm.webp 800w, /media/photos/${name}.webp 1600w" sizes="${sizes}" width="800" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

/** Today's hours line for a store, computed in the browser by site.js; this is the static fallback. */
export function hoursText(store, lang) {
  const tr = translator(lang);
  const fmt = d => d.length ? d.map(([a, b]) => `${a}–${b}`).join(tr('，', ', ')) : tr('休息', 'Closed');
  const groups = [];
  const names = tr(['周日', '周一', '周二', '周三', '周四', '周五', '周六'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  for (const d of [1, 2, 3, 4, 5, 6, 0]) {
    const t = fmt(store.hours[d]), last = groups[groups.length - 1];
    if (last && last.t === t) { last.to = d; last.days.push(d); } else groups.push({ from: d, to: d, t, days: [d] });
  }
  return groups.map(g => [g.from === g.to ? names[g.from] : `${names[g.from]}${tr('至', '–')}${names[g.to]}`, g.t, g.days.join(',')]);
}

const flame = `<svg class="flame" viewBox="0 0 32 32" aria-hidden="true"><path d="M9 28c-4-3-3-8 0-11 0 3 2 4 2 4-1-5 2-9 5-11-1 4 1 6 3 8 1-2 1-4 0-6 4 3 6 8 4 13-1 2-2 3-3 3z" fill="var(--pomodoro)"/><path d="M13 28c-2-2-1-5 1-7 0 2 1 3 2 3 0-3 1-5 3-6-1 3 2 5 1 8-1 1-2 2-3 2z" fill="var(--ember)"/><path d="M16 28c-1-1-1-3 0-4 1 1 2 1 2 1 0 1 0 2-1 3z" fill="var(--cream-ink)"/></svg>`;

const routeIn = (route, lang) => prefix(lang) + (route === '/' && lang !== 'en' ? '' : route);

/** EN / 中文 switch. data-raw keeps these links out of the /zh rewrite in localize(). */
function langSwitch(page, lang) {
  const tr = translator(lang);
  const link = (l, text) => `<a data-raw href="${routeIn(page.route, l)}" hreflang="${HTML_LANG[l]}" lang="${HTML_LANG[l]}"${l === lang ? ' aria-current="true"' : ''}>${text}</a>`;
  return `<div class="lang" role="group" aria-label="${tr('语言', 'Language')}">${link('en', 'EN')}<i aria-hidden="true">/</i>${link('zh', '中文')}</div>`;
}

function header(page, lang) {
  const { NAV, STORES } = content(lang);
  const tr = translator(lang);
  const here = page.route;
  const link = n => `<a href="${n.href}"${here === n.href || here.startsWith(n.href + '/') ? ' aria-current="page"' : ''}>${n.label}</a>`;
  return `<header class="nav" id="nav">
  <a class="brand" href="/" aria-label="${tr('Tre Fiamme 三分焰 首页', 'Tre Fiamme home')}"><b>TRE FIAMME</b><small>pizzeria napoletana · ${tr('三分焰', 'Shanghai')}</small></a>
  <nav class="links" aria-label="${tr('主导航', 'Main navigation')}">${NAV.map(link).join('')}</nav>
  ${langSwitch(page, lang)}
  <a class="pill nav-cta" href="/reserve"><span>${tr('预订 · Prenota', 'Book · Prenota')}</span></a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="${tr('打开导航', 'Open navigation')}"><span></span><span></span></button>
</header>
<div class="mnav" id="mnav" hidden data-lenis-prevent>
  <nav aria-label="${tr('移动端导航', 'Mobile navigation')}">
    <a href="/"><i>Casa</i><span>${tr('首页', 'Home')}</span></a>
    ${NAV.map(n => `<a href="${n.href}"><i>${n.it}</i><span>${n.label}</span></a>`).join('')}
    <a href="/reserve"><i>Prenota</i><span>${tr('预订', 'Book a table')}</span></a>
  </nav>
  <div class="mnav-foot">${STORES.map(s => `<p><b>${s.label}</b><span data-today="${s.id}">${s.address}</span></p>`).join('')}${langSwitch(page, lang)}</div>
</div>`;
}

function footer(page, lang) {
  const { NAV, SITE, STORES } = content(lang);
  const tr = translator(lang);
  return `<footer class="site-foot" data-nav="dark">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand big" href="/">${flame}<span><b>TRE FIAMME</b><small>pizzeria napoletana · ${tr('三分焰', 'Shanghai')}</small></span></a>
        <p>${tr('柴火、手艺和桌边的热闹，三团火做一张饼。', 'The wood fire, the skilled hand and the lively table: three flames, one pizza.')}</p>
        <form class="news" id="news" novalidate>
          <label for="news-email" class="caps">${tr('每月一封信 · 新菜单和活动', 'One letter a month · new menus and events')}</label>
          <div><input type="email" id="news-email" placeholder="${tr('你的邮箱', 'Your email')}" autocomplete="email" required><button class="pill solid" type="submit"><span>${tr('订阅', 'Subscribe')}</span></button></div>
          <p class="news-msg" id="news-msg" role="status"></p>
        </form>
      </div>
      <div class="foot-cols">
        <div><p class="caps">${tr('门店', 'Locations')}</p>${STORES.map(s => `<p><a href="/locations#${s.id}">${s.label}</a><br><span>${s.address}</span><br><span class="open-now" data-store="${s.id}"></span></p>`).join('')}</div>
        <div><p class="caps">${tr('探索', 'Explore')}</p><ul>${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}<li><a href="/reserve">${tr('预订', 'Book a table')}</a></li></ul></div>
        <div><p class="caps">${tr('联系', 'Contact')}</p><p>${tr('电话', 'Phone')} <span class="sel">${SITE.phone}</span><br>${tr('邮箱', 'Email')} <span class="sel">${SITE.email}</span></p><p><a href="/locations#faq">${tr('常见问题', 'FAQ')}</a><br><a href="/credits">${tr('素材与版权', 'Credits')}</a></p>${langSwitch(page, lang)}</div>
      </div>
    </div>
    <p class="foot-word" aria-hidden="true">Tre Fiamme</p>
    <div class="foot-base">
      <p>${tr('© 2026 Tre Fiamme 三分焰。这是一个虚构的演示品牌：地址、电话、价格和预订都只作示意，不会真的下单或预订。', '© 2026 Tre Fiamme. This is a fictional demo brand. Addresses, phone numbers, prices and bookings are examples, and no orders or bookings are actually placed.')}</p>
      <p>${tr('照片与视频来自', 'Photos and video from')} <a href="https://www.pexels.com/" target="_blank" rel="noopener">Pexels</a> ${tr('与', 'and')} <a href="https://pixabay.com/" target="_blank" rel="noopener">Pixabay</a></p>
    </div>
  </div>
</footer>`;
}

/** Chinese pages point at /zh versions of internal links, leaving assets and data-raw links alone. */
const localize = (html, lang) => lang === 'zh'
  ? html.replace(/(?<!data-raw )href="\/(?!css\/|js\/|media\/|favicon)/g, 'href="/zh/').replaceAll('href="/zh/"', 'href="/zh"')
  : html;

export function layout(page, { version, lang }) {
  const { SITE, STORES } = content(lang);
  const tr = translator(lang);
  const v = `?v=${version}`;
  const title = page.title
    ? `${page.title} · ${tr('Tre Fiamme 三分焰', 'Tre Fiamme')}`
    : tr('Tre Fiamme 三分焰 · 那不勒斯手拍披萨', 'Tre Fiamme · Neapolitan pizza in Shanghai');
  const desc = page.description || SITE.description;
  const abs = l => SITE.url + (routeIn(page.route, l) === '/' ? '' : routeIn(page.route, l));
  return localize(`<!doctype html>
<html lang="${HTML_LANG[lang]}" data-nav-tone="${page.tone || 'light'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(lang)}">
<link rel="alternate" hreflang="en" href="${abs('en')}">
<link rel="alternate" hreflang="zh-CN" href="${abs('zh')}">
<link rel="alternate" hreflang="x-default" href="${abs('en')}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${tr('zh_CN', 'en_US')}">
${page.ogImage ? `<meta property="og:image" content="${SITE.url}/media/photos/${page.ogImage}.webp">` : ''}
<meta name="theme-color" content="${page.themeColor || '#6c1b1f'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts(lang)}">
<link rel="stylesheet" href="/css/site.css${v}">
${(page.css || []).map(c => `<link rel="stylesheet" href="/css/${c}.css${v}">`).join('\n')}
</head>
<body class="${page.bodyClass || ''}">
<a class="skip" href="#main">${tr('跳到正文', 'Skip to content')}</a>
${header(page, lang)}
<main id="main">
${page.main.replace(/<dialog /g, '<dialog data-lenis-prevent ')}
</main>
${page.noFooter ? '' : footer(page, lang)}
<script>window.TF_STORES=${JSON.stringify(STORES.map(s => ({ id: s.id, label: s.label, hours: s.hours })))};</script>
<script src="/js/site.js${v}" defer></script>
<script src="/js/vendor/lenis.min.js" defer></script>
<script src="/js/fx.js${v}" defer></script>
${(page.js || []).map(j => `<script src="/js/${j}.js${v}" defer></script>`).join('\n')}
</body>
</html>
`, lang);
}
