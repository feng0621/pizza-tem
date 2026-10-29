import { readFileSync } from 'node:fs';

const PHOTOS = JSON.parse(readFileSync(new URL('../photos.json', import.meta.url), 'utf8'));

const KITCHEN = [
  ['p1-knead', 7004879, '揉面'], ['p2-balls', 20315775, '面团'], ['p3-stretch', 5899154, '拍饼'], ['p4-sauce', 39363386, '抹酱'],
  ['p4-top', 39446124, '铺料'], ['p5-fire', 39235626, '炉火'], ['p5-bake', 4099111, '烘烤'], ['p5-out', 10802656, '出炉'],
  ['p6-pull', 16423978, '拉丝'], ['p7-table', 6222582, '上桌'],
];

export async function pages() {
  const credits = `
<header class="phero red" data-nav="dark">
  <div class="wrap narrow">
    <p class="caps kicker">Crediti · 素材与版权</p>
    <h1 class="display h-1">Credits</h1>
    <p class="lede">网站里的照片和视频来自 Pexels 和 Pixabay 的创作者，按各自平台的许可使用。点编号可以看原作和作者。</p>
  </div>
</header>
<section class="band cream">
  <div class="wrap narrow credits">
    <h2 class="cn-h">照片 · Pexels</h2>
    <ul class="credit-list">${Object.entries(PHOTOS).map(([name, m]) => `<li><span>${name}</span><a href="https://www.pexels.com/photo/${m.id}/" target="_blank" rel="noopener">Pexels #${m.id}</a></li>`).join('')}</ul>
    <h2 class="cn-h">厨房视频 · Pexels</h2>
    <ul class="credit-list">${KITCHEN.map(([f, id, t]) => `<li><span>${t} · ${f}.mp4</span><a href="https://www.pexels.com/video/${id}/" target="_blank" rel="noopener">Pexels #${id}</a></li>`).join('')}</ul>
    <h2 class="cn-h">首页抠图</h2>
    <p class="muted">披萨切片、整盘玛格丽特、马苏里拉和面粉，从 Pexels 照片 #17848752、#19260786、#9665183、#10809667 中抠出；罗勒与番茄来自 Pixabay（Pixabay 内容许可，部分为 AI 生成图像）。</p>
    <h2 class="cn-h">关于这个网站</h2>
    <p class="muted">Tre Fiamme 三分焰是一个虚构的演示品牌。店名、人名、地址、电话、价格、配方数字和所有的预订与下单功能都只作示意。</p>
  </div>
</section>`;

  const notFound = `
<section class="phero red nf" data-nav="dark">
  <div class="wrap nf-grid">
    <div class="stack">
      <p class="caps kicker">404 · Non trovata</p>
      <h1 class="display h-hero">Still in<br>the <em>oven.</em></h1>
      <p class="lede">这一页还没出炉，或者已经被吃掉了。回首页看看，或者直接点一张饼。</p>
      <div class="actions"><a class="pill solid" href="/"><span>回到首页</span></a><a class="pill" href="/menu"><span>看菜单</span></a></div>
    </div>
    <img class="nf-img" src="/media/rosso/slice-3.webp" alt="一块披萨切片" width="738" height="549">
  </div>
</section>`;

  return [
    { route: '/credits', title: '素材与版权', tone: 'dark', css: ['pages'], description: '三分焰网站使用的照片与视频来源。', main: credits },
    { route: '/404', title: '页面没找到', tone: 'dark', css: ['pages'], description: '这一页没有找到。', main: notFound },
  ];
}
