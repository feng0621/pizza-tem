import { FAQ, SITE, STORES } from '../data.mjs';
import { hoursText, photo } from '../layout.mjs';

export async function pages() {
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap">
    <p class="caps kicker">Dove Siamo · 门店</p>
    <h1 class="display h-hero">Two <em>fires</em><br>in Shanghai.</h1>
    <p class="lede">静安的炉边店座位少、离炉子近；徐汇的庭院店有院子和长桌。两家店的菜单一样，面团都来自同一间面团房。</p>
    <p class="caps kicker clock" id="sh-clock"></p>
    <div class="actions store-jump">${STORES.map(s => `<a class="pill" href="#${s.id}"><span>${s.cn}</span></a>`).join('')}</div>
  </div>
</header>

${STORES.map((s, k) => `<section class="band ${k % 2 ? 'hi' : 'cream'} store" id="${s.id}" aria-labelledby="h-${s.id}">
  <div class="wrap split${k % 2 ? ' rev' : ''}">
    <div class="frame r-34${k % 2 ? ' order-2' : ''}">${photo(s.photo, `${s.cn}的店内`, { sizes: '(max-width: 860px) 100vw, 42vw' })}</div>
    <div class="stack">
      <p class="caps kicker">${s.it} · 自 ${s.since} 年</p>
      <h2 class="display h-1" id="h-${s.id}">${s.it}</h2>
      <p class="cn-h store-cn">${s.cn}</p>
      <p class="lede muted">${s.lede}</p>
      <dl class="kv store-kv">
        <dt>地址</dt><dd class="sel">${s.address}</dd>
        <dt>电话</dt><dd class="sel">${s.phone}</dd>
        <dt>座位</dt><dd>${s.seats} 个</dd>
        <dt>交通</dt><dd>${s.transport}</dd>
      </dl>
      <div class="hours">
        <p class="caps kicker">营业时间 <span class="open-now" data-store="${s.id}"></span></p>
        <dl class="kv">${hoursText(s).map(([d, t, days]) => `<dt data-days="${days}">${d}</dt><dd class="num">${t}</dd>`).join('')}</dl>
      </div>
      <div class="tags">${s.features.map(f => `<span class="tag ink">${f}</span>`).join('')}</div>
      <div class="actions"><a class="pill solid" href="/reserve?store=${s.id}"><span>预订这家</span></a>${s.id === 'cortile' ? '<a class="arrow" href="/events">庭院里的活动</a>' : '<a class="arrow" href="/craft">看炉边的厨房</a>'}</div>
    </div>
  </div>
</section>`).join('\n')}

<section class="band red" data-nav="dark" id="faq" aria-labelledby="h-faq">
  <div class="wrap split faq-split">
    <div class="stack">
      <p class="caps kicker">Domande · 常见问题</p>
      <h2 class="display h-1" id="h-faq">Good to<br><em>know</em></h2>
      <p class="lede muted">没找到答案？打电话问我们，或者在下面留言。</p>
    </div>
    <div class="faq on-dark">
      ${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="band cream" id="contact" aria-labelledby="h-contact">
  <div class="wrap split">
    <div class="stack">
      <p class="caps kicker">Scrivici · 联系我们</p>
      <h2 class="display h-1" id="h-contact">Write to <em>us</em></h2>
      <p class="lede muted">合作、媒体、失物招领或者对哪张饼有意见，都可以写给我们。一般两个工作日内回复。</p>
      <dl class="kv"><dt>电话</dt><dd class="sel">${SITE.phone}</dd><dt>邮箱</dt><dd class="sel">${SITE.email}</dd></dl>
    </div>
    <form class="form" id="contact-form" novalidate>
      <div class="row2">
        <div><label class="caps kicker lbl" for="c-name">称呼</label><input class="input" id="c-name" name="name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="c-email">邮箱</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required></div>
      </div>
      <div><label class="caps kicker lbl" for="c-topic">关于</label>
        <select class="input" id="c-topic" name="topic"><option>预订与座位</option><option>包场与私宴</option><option>合作与媒体</option><option>失物招领</option><option>其他</option></select></div>
      <div><label class="caps kicker lbl" for="c-msg">留言</label><textarea class="input" id="c-msg" name="msg" rows="4" required></textarea></div>
      <div class="actions"><button class="pill solid" type="submit"><span>发送</span></button></div>
      <p class="msg" id="c-out" role="status"></p>
      <p class="demo-note">这是演示网站，留言不会真的发出。</p>
    </form>
  </div>
</section>`;

  return [{
    route: '/locations', title: '门店', tone: 'dark', css: ['pages'], js: ['forms'], ogImage: 'store-courtyard',
    description: '三分焰的两家店：静安炉边店和徐汇庭院店。地址、营业时间、交通和常见问题。',
    main,
  }];
}
