import { content, translator } from '../content.mjs';
import { hoursText, photo } from '../layout.mjs';

export async function pages(lang) {
  const { FAQ, SITE, STORES } = content(lang);
  const tr = translator(lang);
  const main = `
<header class="phero red" data-nav="dark">
  <div class="wrap">
    <p class="caps kicker">Dove Siamo · ${tr('门店', 'Locations')}</p>
    <h1 class="display h-hero">Two <em>fires</em><br>in Shanghai.</h1>
    <p class="lede">${tr('静安的炉边店座位少、离炉子近；徐汇的庭院店有院子和长桌。两家店的菜单一样，面团都来自同一间面团房。', "Our Jing'an room is small and close to the oven. Our Xuhui room has a courtyard and a long table. The menu is the same at both, and all the dough comes from one dough room.")}</p>
    <p class="caps kicker clock" id="sh-clock"></p>
    <div class="actions store-jump">${STORES.map(s => `<a class="pill" href="#${s.id}"><span>${s.label}</span></a>`).join('')}</div>
  </div>
</header>

${STORES.map((s, k) => `<section class="band ${k % 2 ? 'hi' : 'cream'} store" id="${s.id}" aria-labelledby="h-${s.id}">
  <div class="wrap split${k % 2 ? ' rev' : ''}">
    <div class="frame r-34${k % 2 ? ' order-2' : ''}">${photo(s.photo, tr(`${s.label}的店内`, `Inside ${s.it}`), { sizes: '(max-width: 860px) 100vw, 42vw' })}</div>
    <div class="stack">
      <p class="caps kicker">${s.it} · ${tr(`自 ${s.since} 年`, `Since ${s.since}`)}</p>
      <h2 class="display h-1" id="h-${s.id}">${s.it}</h2>
      <p class="cn-h store-cn">${s.label}</p>
      <p class="lede muted">${s.lede}</p>
      <dl class="kv store-kv">
        <dt>${tr('地址', 'Address')}</dt><dd class="sel">${s.address}</dd>
        <dt>${tr('电话', 'Phone')}</dt><dd class="sel">${s.phone}</dd>
        <dt>${tr('座位', 'Seats')}</dt><dd>${tr(`${s.seats} 个`, s.seats)}</dd>
        <dt>${tr('交通', 'Getting here')}</dt><dd>${s.transport}</dd>
      </dl>
      <div class="hours">
        <p class="caps kicker">${tr('营业时间', 'Hours')} <span class="open-now" data-store="${s.id}"></span></p>
        <dl class="kv">${hoursText(s, lang).map(([d, t, days]) => `<dt data-days="${days}">${d}</dt><dd class="num">${t}</dd>`).join('')}</dl>
      </div>
      <div class="tags">${s.features.map(f => `<span class="tag ink">${f}</span>`).join('')}</div>
      <div class="actions"><a class="pill solid" href="/reserve?store=${s.id}"><span>${tr('预订这家', 'Book here')}</span></a>${s.id === 'cortile' ? `<a class="arrow" href="/events">${tr('庭院里的活动', 'Events in the courtyard')}</a>` : `<a class="arrow" href="/craft">${tr('看炉边的厨房', 'See the kitchen')}</a>`}</div>
    </div>
  </div>
</section>`).join('\n')}

<section class="band red" data-nav="dark" id="faq" aria-labelledby="h-faq">
  <div class="wrap split faq-split">
    <div class="stack">
      <p class="caps kicker">Domande · ${tr('常见问题', 'FAQ')}</p>
      <h2 class="display h-1" id="h-faq">Good to<br><em>know</em></h2>
      <p class="lede muted">${tr('没找到答案？打电话问我们，或者在下面留言。', "Can't find your answer? Call us, or leave a message below.")}</p>
    </div>
    <div class="faq on-dark">
      ${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="band cream" id="contact" aria-labelledby="h-contact">
  <div class="wrap split">
    <div class="stack">
      <p class="caps kicker">Scrivici · ${tr('联系我们', 'Contact us')}</p>
      <h2 class="display h-1" id="h-contact">Write to <em>us</em></h2>
      <p class="lede muted">${tr('合作、媒体、失物招领或者对哪张饼有意见，都可以写给我们。一般两个工作日内回复。', 'Partnerships, press, lost property or strong opinions about a pizza: write to us about any of it. We usually reply within two working days.')}</p>
      <dl class="kv"><dt>${tr('电话', 'Phone')}</dt><dd class="sel">${SITE.phone}</dd><dt>${tr('邮箱', 'Email')}</dt><dd class="sel">${SITE.email}</dd></dl>
    </div>
    <form class="form" id="contact-form" novalidate>
      <div class="row2">
        <div><label class="caps kicker lbl" for="c-name">${tr('称呼', 'Name')}</label><input class="input" id="c-name" name="name" autocomplete="name" required></div>
        <div><label class="caps kicker lbl" for="c-email">${tr('邮箱', 'Email')}</label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required></div>
      </div>
      <div><label class="caps kicker lbl" for="c-topic">${tr('关于', 'About')}</label>
        <select class="input" id="c-topic" name="topic">${tr(['预订与座位', '包场与私宴', '合作与媒体', '失物招领', '其他'], ['Bookings and seating', 'Private dining', 'Partnerships and press', 'Lost property', 'Something else']).map(o => `<option>${o}</option>`).join('')}</select></div>
      <div><label class="caps kicker lbl" for="c-msg">${tr('留言', 'Message')}</label><textarea class="input" id="c-msg" name="msg" rows="4" required></textarea></div>
      <div class="actions"><button class="pill solid" type="submit"><span>${tr('发送', 'Send')}</span></button></div>
      <p class="msg" id="c-out" role="status"></p>
      <p class="demo-note">${tr('这是演示网站，留言不会真的发出。', 'This is a demo site. Your message will not actually be sent.')}</p>
    </form>
  </div>
</section>`;

  return [{
    route: '/locations', title: tr('门店', 'Locations'), tone: 'dark', css: ['pages'], js: ['forms'], ogImage: 'store-courtyard',
    description: tr('三分焰的两家店：静安炉边店和徐汇庭院店。地址、营业时间、交通和常见问题。', "Tre Fiamme's two restaurants in Jing'an and Xuhui: addresses, opening hours, how to get there and frequently asked questions."),
    main,
  }];
}
