import { readFileSync } from 'node:fs';
import { translator } from '../content.mjs';

const PHOTOS = JSON.parse(readFileSync(new URL('../photos.json', import.meta.url), 'utf8'));

const KITCHEN = [
  ['p1-knead', 7004879, '揉面', 'Kneading'], ['p2-balls', 20315775, '面团', 'Dough balls'], ['p3-stretch', 5899154, '拍饼', 'Stretching'], ['p4-sauce', 39363386, '抹酱', 'Saucing'],
  ['p4-top', 39446124, '铺料', 'Topping'], ['p5-fire', 39235626, '炉火', 'The fire'], ['p5-bake', 4099111, '烘烤', 'Baking'], ['p5-out', 10802656, '出炉', 'Out of the oven'],
  ['p6-pull', 16423978, '拉丝', 'Cheese pull'], ['p7-table', 6222582, '上桌', 'At the table'],
];

export async function pages(lang) {
  const tr = translator(lang);
  const credits = `
<header class="phero red" data-nav="dark">
  <div class="wrap narrow">
    <p class="caps kicker">Crediti · ${tr('素材与版权', 'Photo and video sources')}</p>
    <h1 class="display h-1">Credits</h1>
    <p class="lede">${tr('网站里的照片和视频来自 Pexels 和 Pixabay 的创作者，按各自平台的许可使用。点编号可以看原作和作者。', "The photos and video on this site come from creators on Pexels and Pixabay and are used under each platform's licence. Follow a number to see the original and its creator.")}</p>
  </div>
</header>
<section class="band cream">
  <div class="wrap narrow credits">
    <h2 class="cn-h">${tr('照片', 'Photos')} · Pexels</h2>
    <ul class="credit-list">${Object.entries(PHOTOS).map(([name, m]) => `<li><span>${name}</span><a href="https://www.pexels.com/photo/${m.id}/" target="_blank" rel="noopener">Pexels #${m.id}</a></li>`).join('')}</ul>
    <h2 class="cn-h">${tr('厨房视频', 'Kitchen video')} · Pexels</h2>
    <ul class="credit-list">${KITCHEN.map(([f, id, cn, en]) => `<li><span>${tr(cn, en)} · ${f}.mp4</span><a href="https://www.pexels.com/video/${id}/" target="_blank" rel="noopener">Pexels #${id}</a></li>`).join('')}</ul>
    <h2 class="cn-h">${tr('首页抠图', 'Home page cut-outs')}</h2>
    <p class="muted">${tr('披萨切片、整盘玛格丽特、马苏里拉和面粉，从 Pexels 照片 #17848752、#19260786、#9665183、#10809667 中抠出；罗勒与番茄来自 Pixabay（Pixabay 内容许可，部分为 AI 生成图像）。', 'The pizza slice, plated Margherita, mozzarella and flour were cut out of Pexels photos #17848752, #19260786, #9665183 and #10809667. The basil and tomatoes come from Pixabay (Pixabay Content License; some are AI-generated images).')}</p>
    <h2 class="cn-h">${tr('关于这个网站', 'About this site')}</h2>
    <p class="muted">${tr('Tre Fiamme 三分焰是一个虚构的演示品牌。店名、人名、地址、电话、价格、配方数字和所有的预订与下单功能都只作示意。', 'Tre Fiamme is a fictional demo brand. Its name, people, addresses, phone numbers, prices and recipe figures, and all booking and ordering features, are examples only.')}</p>
  </div>
</section>`;

  const notFound = `
<section class="phero red nf" data-nav="dark">
  <div class="wrap nf-grid">
    <div class="stack">
      <p class="caps kicker">404 · Non trovata</p>
      <h1 class="display h-hero">Still in<br>the <em>oven.</em></h1>
      <p class="lede">${tr('这一页还没出炉，或者已经被吃掉了。回首页看看，或者直接点一张饼。', 'This page has not come out of the oven yet, or someone has already eaten it. Head back to the home page, or just order a pizza.')}</p>
      <div class="actions"><a class="pill solid" href="/"><span>${tr('回到首页', 'Back to home')}</span></a><a class="pill" href="/menu"><span>${tr('看菜单', 'See the menu')}</span></a></div>
    </div>
    <img class="nf-img" src="/media/rosso/slice-3.webp" alt="${tr('一块披萨切片', 'A slice of pizza')}" width="738" height="549">
  </div>
</section>`;

  return [
    { route: '/credits', title: tr('素材与版权', 'Credits'), tone: 'dark', css: ['pages'], description: tr('三分焰网站使用的照片与视频来源。', 'Sources for the photos and video used on the Tre Fiamme site.'), main: credits },
    { route: '/404', title: tr('页面没找到', 'Page not found'), tone: 'dark', css: ['pages'], description: tr('这一页没有找到。', 'This page could not be found.'), main: notFound },
  ];
}
