// All site content lives here. Tre Fiamme 三分焰 is a fictional brand; names, addresses, prices and numbers are examples.

export const SITE = {
  name: 'Tre Fiamme',
  cn: '三分焰',
  tagline: 'pizzeria napoletana',
  description: '三分焰 Tre Fiamme，上海的那不勒斯手拍披萨店。72 小时冷藏发酵的面团，485°C 木柴炉 90 秒出炉。',
  phone: '021-5017-0485',
  email: 'ciao@trefiamme.example',
};

export const NAV = [
  { href: '/menu', cn: '菜单', it: 'La Carta' },
  { href: '/craft', cn: '工艺', it: 'Il Forno' },
  { href: '/about', cn: '关于我们', it: 'Chi Siamo' },
  { href: '/events', cn: '活动', it: 'Eventi' },
  { href: '/journal', cn: '日志', it: 'Diario' },
  { href: '/locations', cn: '门店', it: 'Dove Siamo' },
];

/* ------------------------------------------------------------------ stores */
// hours: index 0 = Sunday … 6 = Saturday; each entry is a list of [open, close] in "HH:MM"
const LUNCH_DINNER = [['11:30', '14:30'], ['17:30', '22:30']];
export const STORES = [
  {
    id: 'jingan',
    it: 'Il Forno',
    cn: '静安 · 炉边店',
    since: 2019,
    address: '上海市静安区 梧桐巷 18 号',
    phone: '021-5017-0485',
    seats: 28,
    photo: 'store-jingan',
    lede: '第一家店，也是那座 3 吨木柴炉的家。28 个座位围着炉口，坐吧台能看到师傅拍饼、入炉、转饼。',
    features: ['吧台看炉', '只接受 6 人以内预订', '3 公里外送', '无障碍入口'],
    transport: '地铁站步行 8 分钟；附近有公共停车场，晚市停车约 ¥15 / 小时。',
    hours: [LUNCH_DINNER, [], LUNCH_DINNER, LUNCH_DINNER, LUNCH_DINNER, [['11:30', '14:30'], ['17:30', '23:30']], [['11:30', '23:30']]],
    slots: ['11:30', '12:15', '13:00', '17:30', '18:15', '19:00', '19:45', '20:30', '21:15'],
    areas: ['吧台 · 看得到炉口', '室内小桌'],
  },
  {
    id: 'cortile',
    it: 'Il Cortile',
    cn: '徐汇 · 庭院店',
    since: 2024,
    address: '上海市徐汇区 庭院弄 7 号',
    phone: '021-5017-0486',
    seats: 64,
    photo: 'store-courtyard',
    lede: '老洋房的院子里摆了一张 24 人的长桌，天气好的晚上在树下吃。周六下午的披萨课也在这里。',
    features: ['庭院长桌', '可包场 20–40 人', '庭院可带宠物', '周六披萨课'],
    transport: '地铁站步行 12 分钟；院内 6 个车位，需提前预约。',
    hours: Array.from({ length: 7 }, (_, d) => d === 5 || d === 6 ? [['11:30', '23:30']] : [['11:30', '22:30']]),
    slots: ['11:30', '12:30', '13:30', '17:00', '18:00', '19:00', '20:00', '21:00'],
    areas: ['室内', '庭院长桌', '吧台'],
  },
];

/* -------------------------------------------------------------------- menu */
export const TAGS = {
  firma: { cn: '招牌', tone: 'oro' },
  veg: { cn: '素食', tone: 'basil' },
  vegan: { cn: '纯素', tone: 'basil' },
  hot: { cn: '辣', tone: 'pomodoro' },
  new: { cn: '新品', tone: 'ink' },
  season: { cn: '秋冬限定', tone: 'ink' },
  alcol: { cn: '含酒精', tone: 'ink' },
};

export const MENU = [
  {
    id: 'rosse', it: 'Pizze Rosse', cn: '红披萨', note: '番茄底 · 30 cm · 可选 25 / 35 cm',
    items: [
      { id: 'margherita', it: 'Margherita', cn: '玛格丽特', price: 88, tags: ['firma', 'veg'], photo: 'menu-margherita', pizza: true,
        desc: '店里点得最多的一张，也是检验一家那不勒斯披萨店的标准。',
        ing: [['圣马扎诺番茄', '坎帕尼亚 · DOP'], ['阿杰罗拉鲜马苏里拉', 'Fior di latte'], ['罗勒', '出炉前才放'], ['特级初榨橄榄油', '普利亚']],
        allergens: ['麸质', '乳制品'] },
      { id: 'marinara', it: 'Marinara', cn: '海员', price: 68, tags: ['vegan'], photo: 'menu-marinara', pizza: true,
        desc: '那不勒斯最老的一张披萨。名字来自出海的渔民，里面其实没有海鲜，也不放芝士。',
        ing: [['圣马扎诺番茄', '手捏碎，只加盐'], ['大蒜', '切薄片'], ['西西里牛至', '干'], ['特级初榨橄榄油', '普利亚']],
        allergens: ['麸质'] },
      { id: 'diavola', it: 'Diavola', cn: '恶魔', price: 98, tags: ['hot'], photo: 'menu-diavola', pizza: true,
        desc: '辣香肠在炉里烤出红油，渗进饼里。辣度中等，怕辣可以去掉辣椒油。',
        ing: [['番茄', '圣马扎诺'], ['马苏里拉', 'Fior di latte'], ['卡拉布里亚辣香肠', '猪肉'], ['辣椒油', '自制']],
        allergens: ['麸质', '乳制品', '猪肉'] },
      { id: 'bufala', it: 'Bufala e Pomodorini', cn: '水牛芝士小番茄', price: 118, tags: ['veg'], photo: 'menu-bufala', pizza: true,
        desc: '水牛马苏里拉出炉后整颗放上去，保持冰凉、多汁，和滚烫的饼底一起吃。',
        ing: [['番茄酱', '圣马扎诺'], ['烤樱桃番茄', '入炉前切半'], ['水牛马苏里拉', '坎帕尼亚 · DOP'], ['罗勒', '新鲜']],
        allergens: ['麸质', '乳制品'] },
      { id: 'contadina', it: 'Contadina', cn: '农家', price: 112, tags: [], photo: 'menu-capricciosa', pizza: true,
        desc: '料最多的一张：萨拉米、蘑菇和烤甜椒，出炉后再放一把芝麻菜。',
        ing: [['番茄', '圣马扎诺'], ['马苏里拉', 'Fior di latte'], ['萨拉米', '猪肉'], ['蘑菇、烤甜椒', '本地'], ['芝麻菜', '出炉后放']],
        allergens: ['麸质', '乳制品', '猪肉'] },
    ],
  },
  {
    id: 'bianche', it: 'Pizze Bianche', cn: '白披萨', note: '不放番茄 · 30 cm',
    items: [
      { id: 'quattro', it: 'Quattro Formaggi', cn: '四芝士', price: 108, tags: ['veg'], photo: 'menu-quattro', pizza: true,
        desc: '四种芝士各管一件事：马苏里拉拉丝，戈贡佐拉带咸香，帕玛森出焦壳，佩科里诺收尾。',
        ing: [['马苏里拉', 'Fior di latte'], ['戈贡佐拉', '甜味'], ['帕玛森', '24 个月'], ['佩科里诺', '罗马']],
        allergens: ['麸质', '乳制品'] },
      { id: 'salsiccia', it: 'Salsiccia e Funghi', cn: '香肠蘑菇', price: 116, tags: [], photo: 'menu-salsiccia', pizza: true,
        desc: '手工茴香猪肉香肠捏成小块，和蘑菇一起在炉里烤出油香。',
        ing: [['马苏里拉', 'Fior di latte'], ['茴香猪肉香肠', '店里每天现做'], ['烤蘑菇', '本地'], ['帕玛森', '24 个月']],
        allergens: ['麸质', '乳制品', '猪肉'] },
      { id: 'funghi', it: 'Funghi e Tartufo', cn: '松露蘑菇', price: 128, tags: ['veg', 'season'], photo: 'menu-funghi', pizza: true,
        desc: '三种蘑菇加黑松露酱，只在 11 月到 2 月供应。',
        ing: [['马苏里拉', 'Fior di latte'], ['口蘑、香菇、平菇', '本地'], ['黑松露酱', '翁布里亚'], ['百里香', '新鲜']],
        allergens: ['麸质', '乳制品'] },
      { id: 'ortolana', it: 'Ortolana', cn: '菜园时蔬', price: 98, tags: ['veg', 'new'], photo: 'menu-orto', pizza: true,
        desc: '合作农场当周送来什么菜就烤什么。秋天是南瓜、西葫芦、甜椒和红洋葱。',
        ing: [['马苏里拉', 'Fior di latte'], ['烤南瓜、西葫芦', '合作农场'], ['甜椒、红洋葱', '合作农场'], ['罗勒油', '自制']],
        allergens: ['麸质', '乳制品'] },
    ],
  },
  {
    id: 'antipasti', it: 'Fritti & Antipasti', cn: '炸物与前菜', note: '适合 2–3 人分享',
    items: [
      { id: 'montanara', it: 'Montanara', cn: '炸饼', price: 42, tags: ['firma', 'veg'],
        desc: '那不勒斯街头小吃：小面团先炸一下再进炉，表面抹番茄酱、撒帕玛森。',
        ing: [['披萨面团', '72 小时'], ['番茄酱', '圣马扎诺'], ['帕玛森', '24 个月'], ['罗勒', '新鲜']],
        allergens: ['麸质', '乳制品'] },
      { id: 'arancini', it: 'Arancini', cn: '炸饭团 · 3 个', price: 48, tags: [], photo: 'menu-arancini',
        desc: '番红花米饭包着肉酱和马苏里拉，外壳炸到金黄。',
        ing: [['番红花米饭', ''], ['肉酱', '牛肉、猪肉'], ['马苏里拉', 'Fior di latte'], ['面包糠', '']],
        allergens: ['麸质', '乳制品', '蛋', '猪肉'] },
      { id: 'burrata', it: 'Burrata', cn: '布拉塔', price: 78, tags: ['veg'], photo: 'menu-burrata',
        desc: '切开会流出奶油的布拉塔，配温热的番茄酱和炉烤面包。',
        ing: [['布拉塔', '普利亚'], ['番茄酱', '圣马扎诺'], ['罗勒油', '自制'], ['炉烤面包', '用当天的面团']],
        allergens: ['麸质', '乳制品'] },
      { id: 'caprese', it: 'Insalata Caprese', cn: '卡普雷塞沙拉', price: 58, tags: ['veg'], photo: 'menu-caprese',
        desc: '番茄、水牛马苏里拉、罗勒，同样是意大利国旗的三种颜色。',
        ing: [['当季番茄', '合作农场'], ['水牛马苏里拉', '坎帕尼亚 · DOP'], ['罗勒', '新鲜'], ['橄榄油', '普利亚']],
        allergens: ['乳制品'] },
    ],
  },
  {
    id: 'dolci', it: 'Dolci', cn: '甜点', note: '',
    items: [
      { id: 'tiramisu', it: 'Tiramisù', cn: '提拉米苏', price: 52, tags: ['firma'], photo: 'menu-tiramisu',
        desc: '每天下午做一盘，冷藏一夜再切。咖啡用店里的意式浓缩。',
        ing: [['马斯卡彭', ''], ['手指饼干', ''], ['意式浓缩', ''], ['可可粉', '']],
        allergens: ['麸质', '乳制品', '蛋', '酒精'] },
      { id: 'nocciola', it: 'Pizza Nocciola', cn: '榛子巧克力披萨', price: 58, tags: ['veg'],
        desc: '炉烤饼底抹上榛子巧克力酱，撒烤榛子和糖粉，两个人分刚好。',
        ing: [['披萨饼底', '72 小时'], ['榛子巧克力酱', '自制'], ['烤榛子', '皮埃蒙特'], ['糖粉', '']],
        allergens: ['麸质', '乳制品', '坚果'] },
      { id: 'gelato', it: 'Gelato Fior di Latte', cn: '牛奶冰淇淋', price: 32, tags: ['veg'],
        desc: '只用牛奶和奶油做的冰淇淋，淋一点特级初榨橄榄油，撒海盐。',
        ing: [['全脂牛奶', ''], ['奶油', ''], ['橄榄油', '普利亚'], ['海盐', '']],
        allergens: ['乳制品'] },
    ],
  },
  {
    id: 'bevande', it: 'Bevande', cn: '饮品', note: '',
    items: [
      { id: 'spritz', it: 'Spritz', cn: '橙味开胃酒', price: 68, tags: ['alcol'], photo: 'menu-spritz',
        desc: '意式苦橙利口酒加普洛赛克起泡酒和苏打，配一片橙子。',
        ing: [['苦橙利口酒', ''], ['普洛赛克', '威尼托'], ['苏打水', ''], ['橙片', '']], allergens: ['酒精'] },
      { id: 'vino', it: 'Vino della Casa', cn: '本店红酒 · 杯', price: 58, tags: ['alcol'], photo: 'menu-vino',
        desc: '坎帕尼亚的艾格尼科红葡萄酒，单宁柔和，配番茄底的披萨正好。',
        ing: [['艾格尼科', '坎帕尼亚']], allergens: ['酒精'] },
      { id: 'limonata', it: 'Limonata', cn: '自制柠檬苏打', price: 28, tags: ['vegan'], photo: 'menu-limonata',
        desc: '西西里柠檬现榨，加一点蔗糖和苏打水。',
        ing: [['西西里柠檬', ''], ['蔗糖', ''], ['苏打水', '']], allergens: [] },
      { id: 'espresso', it: 'Espresso', cn: '意式浓缩', price: 22, tags: ['vegan'],
        desc: '饭后一小杯。想要加奶就点 Macchiato。',
        ing: [['咖啡豆', '深烘']], allergens: [] },
    ],
  },
];
export const MENU_ITEMS = MENU.flatMap(c => c.items.map(i => ({ ...i, cat: c.id })));
export const SIZES = [{ cm: 25, delta: -15 }, { cm: 30, delta: 0 }, { cm: 35, delta: 30 }];

/* ---------------------------------------------------------------- about */
export const TIMELINE = [
  { year: 2014, place: 'Napoli', text: '陈屿在那不勒斯吃到第一张真正的玛格丽特，第二个月就进了一家老店当学徒。' },
  { year: 2017, place: 'Napoli', text: '学徒第三年，师傅第一次让他一个人看炉。' },
  { year: 2019, place: '静安', text: '第一家店开业。28 个座位，一座从那不勒斯运来的 3 吨木柴炉。' },
  { year: 2021, place: '面团房', text: '自建面团房和 4°C 冷藏发酵室，每天最多做 120 个面团。' },
  { year: 2024, place: '徐汇', text: '第二家店「庭院」开业，院子里摆下了一张 24 人的长桌。' },
  { year: 2026, place: '庭院', text: '每周六下午开披萨课，把手拍饼教给客人。' },
];

export const VALUES = [
  { it: 'Solo Napoli', cn: '只做那不勒斯的方式', text: '手拍、木柴炉、90 秒。不做芝心饼边，也不放菠萝。' },
  { it: 'Da dove viene', cn: '每样料都说得出来源', text: '番茄来自萨尔诺河谷，芝士来自阿杰罗拉，罗勒来自上海郊区的合作农场。' },
  { it: 'Senza fretta', cn: '不赶时间', text: '面团冷藏发酵 72 小时，提拉米苏冷藏一夜。快的只有入炉那 90 秒。' },
];

export const TEAM = [
  { id: 'chen', name: '陈屿', it: 'Chen Yu', role: '创始人 · 主厨', photo: 'peel',
    bio: '2014 年去那不勒斯学做披萨，在一家老店当了三年学徒。2019 年回上海开了第一家三分焰，现在每天还是自己拍晚市的第一张饼。',
    fact: ['最喜欢的一张', 'Marinara'] },
  { id: 'marco', name: 'Marco', it: 'Marco R.', role: '披萨师傅 · Pizzaiolo', photo: 'team-oven',
    bio: '那不勒斯人，拍饼二十年。2019 年跟着那座木柴炉一起来到上海，负责静安店的炉口和每一位新师傅的训练。',
    fact: ['一晚上最多', '214 张饼'] },
  { id: 'lin', name: '林晚', it: 'Lin Wan', role: '面团房负责人', photo: 'team-dough',
    bio: '每天早上 7 点开始揉面。她管着冷藏柜里三天的面团，也会根据当天的湿度调整含水量。',
    fact: ['含水量', '63–66%'] },
  { id: 'zhou', name: '周叙', it: 'Zhou Xu', role: '侍酒师 · 前厅经理', photo: 'menu-vino',
    bio: '酒单上的 40 款意大利酒都是他挑的，大部分来自坎帕尼亚。点不准的时候，告诉他你点了哪张饼就行。',
    fact: ['酒单', '40 款'] },
];

export const SOURCES = [
  { what: '番茄', it: 'Pomodoro San Marzano', from: '坎帕尼亚 · 萨尔诺河谷', note: '维苏威火山脚下的火山土，果形细长、酸甜平衡。' },
  { what: '鲜马苏里拉', it: 'Fior di latte', from: '坎帕尼亚 · 阿杰罗拉', note: '牛奶做的马苏里拉，每周两次空运。' },
  { what: '水牛马苏里拉', it: 'Mozzarella di bufala', from: '坎帕尼亚', note: '只放在出炉后的饼上，保持冰凉多汁。' },
  { what: '面粉', it: 'Farina tipo 00', from: '那不勒斯 · 百年磨坊', note: '00 号软麦粉，蛋白质 12.5%，适合长时间发酵。' },
  { what: '橄榄油', it: 'Olio extravergine', from: '普利亚', note: '冷榨，带一点青草和杏仁味。' },
  { what: '罗勒', it: 'Basilico', from: '上海 · 青浦合作农场', note: '每天早上送到，叶子大、香味足。' },
];

/* -------------------------------------------------------------- events */
export const EVENTS = [
  {
    id: 'scuola', it: 'Scuola di Pizza', cn: '周六披萨课', photo: 'event-class', price: '¥398 / 人',
    when: '每周六 14:00–17:00', where: '徐汇 · 庭院店',
    lede: '三个小时，从揉面学到入炉。最后吃掉自己拍的那张饼，再带一个面团回家。',
    detail: [
      ['人数', '每班 8 人，满 4 人开课'],
      ['内容', '面团配比、手拍饼、铺料、入炉与转饼'],
      ['包含', '两张披萨、一杯饮品、一个带回家的面团'],
      ['适合', '12 岁以上；不需要任何基础'],
    ],
    cta: '报名',
  },
  {
    id: 'privata', it: 'Cena Privata', cn: '包场与私宴', photo: 'event-dinner', price: '¥288 起 / 人',
    when: '周一至周四晚', where: '徐汇 · 庭院店',
    lede: '院子里的长桌可以整张包下，20 到 40 人。生日、团队聚餐、小型婚宴都办过。',
    detail: [
      ['人数', '20–40 人'],
      ['套餐', '¥288：前菜 + 3 种披萨 + 甜点；¥388：再加酒水搭配'],
      ['可以定制', '菜单、酒单、桌花和一段炉边拍饼表演'],
      ['预约', '至少提前 7 天'],
    ],
    cta: '咨询',
  },
  {
    id: 'regalo', it: 'Carta Regalo', cn: '礼品卡', photo: null, price: '¥200 / ¥500 / ¥1000',
    when: '两家店通用', where: '有效期 12 个月',
    lede: '送一张三分焰的礼品卡，写上一句话，我们打印在卡面上。',
    detail: [
      ['面额', '¥200、¥500、¥1000'],
      ['使用', '堂食、外送、披萨课都可以用'],
      ['有效期', '12 个月，可分多次使用'],
    ],
    cta: '定制',
  },
];

export const SEASON = [
  { date: '11 月', it: 'Mese del Tartufo', cn: '松露月', text: '松露蘑菇披萨回归，周末加一道松露炸饼。' },
  { date: '12 月 24 日', it: 'La Vigilia', cn: '平安夜套餐', text: '两家店都只做套餐，¥328 / 人，需预订。' },
  { date: '每月第一个周日', it: 'Forno Aperto', cn: '开放厨房', text: '下午 3 点，带孩子来看木柴炉怎么生火。免费，不用报名。' },
];

/* ------------------------------------------------------------- journal */
export const POSTS = [
  {
    slug: 'il-cortile-two-years', date: '2026-10-08', cat: '新闻', it: 'Due anni nel cortile', title: '庭院店两周年，和这个秋天的新菜单',
    photo: 'store-courtyard', minutes: 3,
    excerpt: '两年里，院子里那张长桌坐过一千多场生日和聚餐。这个秋天我们换了菜单，也把披萨课固定在了周六下午。',
    body: [
      ['p', '2024 年 10 月，庭院店开业的第一天下了雨，院子里的长桌一个客人都没有。两年后，这张桌子差不多每个周末都被订满。'],
      ['h', '秋天的菜单'],
      ['p', '从 11 月开始，松露蘑菇回到菜单上，一直供应到 2 月。新加的一张是菜园时蔬：合作农场每周送来什么菜，我们就烤什么。这个月是南瓜、西葫芦、甜椒和红洋葱。'],
      ['quote', '一张好的蔬菜披萨，菜要先烤一遍，不然水分会把饼底泡软。', '林晚，面团房负责人'],
      ['h', '披萨课固定在周六'],
      ['p', '试办了半年之后，披萨课固定在每周六下午 2 点到 5 点，每班 8 个人。你会从揉面学起，最后吃掉自己拍的那张饼，再带一个面团回家。'],
      ['facts', [['长桌', '24 人'], ['两年里的生日', '1,140 场'], ['披萨课', '每周六']]],
      ['p', '谢谢每一位来过院子的人。两周年这一周，凡是在庭院店点玛格丽特，都送一份炸饼。'],
    ],
  },
  {
    slug: '72-hours', date: '2026-09-12', cat: '工艺', it: 'Settantadue ore', title: '为什么我们的面团要等 72 小时',
    photo: 'journal-dough', minutes: 5,
    excerpt: '同样是面粉、水、盐和酵母，发酵 8 小时和 72 小时做出来的饼完全是两种东西。',
    body: [
      ['p', '那不勒斯披萨的面团只有四样东西：面粉、水、盐、酵母。配方几乎每家都一样，差别在时间。'],
      ['h', '慢一点，酵母才有时间'],
      ['p', '面团放进 4°C 的冷藏柜之后，酵母的活动会变得很慢。它产生的二氧化碳少了，但面粉里的酶还在工作：把淀粉分解成糖，把蛋白质分解得更短。这两件事决定了饼的味道和口感。'],
      ['p', '糖多了，饼边在炉里更容易上色，烤出那一圈豹纹焦斑；蛋白质分解得更彻底，面就更好消化，吃完一整张也不会觉得撑。'],
      ['facts', [['00 号软麦粉', '1000 g'], ['水', '650 g'], ['海盐', '28 g'], ['鲜酵母', '1 g']]],
      ['h', '1 克酵母'],
      ['p', '一公斤面粉只放 1 克酵母，是为了让它慢慢来。72 小时里面团的体积只长大一倍左右，但气泡又细又匀，拍饼的时候能把空气推到边上，留出 2 厘米的饼边。'],
      ['quote', '面团会告诉你它好了没有。按下去，慢慢弹回来，就可以了。', 'Marco，披萨师傅'],
      ['h', '出餐前的两小时'],
      ['p', '冷藏的面团不能直接拍，要提前两小时拿出来回温。所以晚市 17:30 开炉，面团在 15:30 就已经摆满了台面。'],
    ],
  },
  {
    slug: 'san-marzano', date: '2026-08-20', cat: '食材', it: 'Il viaggio del pomodoro', title: '一颗圣马扎诺番茄的旅程',
    photo: 'journal-tomato', minutes: 4,
    excerpt: '它长在维苏威火山脚下，八月采摘，去皮装罐，再坐船走一个多月才到我们的厨房。',
    body: [
      ['p', '圣马扎诺番茄只长在那不勒斯东南边的萨尔诺河谷。那里的土是维苏威火山喷发留下的火山灰，排水好、矿物质多。'],
      ['h', '长、薄皮、籽少'],
      ['p', '它的果形细长，皮薄，籽很少，果肉厚。酸和甜都比普通番茄更明显，煮不煮都好吃。'],
      ['p', '每年八月是采摘季。番茄当天摘、当天去皮装罐，罐上印着原产地认证的编号，可以查到是哪一片地。'],
      ['facts', [['采摘', '每年 8 月'], ['海运', '约 40 天'], ['每张玛格丽特', '80 g']]],
      ['h', '我们不煮番茄酱'],
      ['p', '番茄开罐之后，我们只用手捏碎，加一点海盐，不煮、不加糖、不放香料。真正的加热只有一次：在 485°C 的炉子里那 90 秒。'],
      ['quote', '番茄酱煮过一次，进炉再烤一次，就只剩下酸了。', '陈屿，主厨'],
    ],
  },
  {
    slug: '485-degrees', date: '2026-07-05', cat: '工艺', it: 'Quattrocentottantacinque', title: '485°C：怎么烧一座木柴炉',
    photo: 'fire-oven', minutes: 4,
    excerpt: '开店前三个小时点火，炉底 430°C、炉顶接近 500°C。一张饼进去，每 30 秒转一次。',
    body: [
      ['p', '静安店那座炉子重 3 吨，是在那不勒斯用耐火砖一块块砌好，再整个运来上海的。'],
      ['h', '提前三个小时'],
      ['p', '晚市 17:30 开炉，下午 2 点半就要点火。先烧旺，把炉膛的砖全部烧透，再把火推到一边，留出放饼的位置。'],
      ['facts', [['炉底', '约 430°C'], ['炉顶', '约 500°C'], ['入炉到出炉', '90 秒']]],
      ['h', '每 30 秒转一次'],
      ['p', '火在炉膛的一侧，靠火的那边会先熟。所以饼进去以后，师傅每 30 秒用小铲转一次，让每一边轮流朝着火。90 秒后，饼边鼓起，烤出一圈焦斑，中心还是软的。'],
      ['quote', '看炉的人不能离开炉口。90 秒，一转身就过了。', 'Marco，披萨师傅'],
      ['h', '果木和余温'],
      ['p', '我们只烧干透的果木，烟少、火稳。打烊后炉子不熄，余温一直到第二天早上，刚好用来烤员工餐的面包。'],
    ],
  },
];

/* ------------------------------------------------------------------- faq */
export const FAQ = [
  ['需要预订吗？', '周末晚市建议提前 2–3 天预订。静安店座位少，只接受 6 人以内预订；更多人请订庭院店。'],
  ['有过敏原信息吗？', '每道菜的详情里都列了过敏原。我们的厨房同时处理麸质、乳制品和坚果，无法保证完全无交叉接触。'],
  ['可以做无麸质的披萨吗？', '目前不能。我们的面团房只做一种面团，用的是 00 号软麦粉。'],
  ['可以带宠物吗？', '庭院店的院子可以带宠物，室内和静安店不可以。'],
  ['外送范围多大？', '两家店都送 3 公里以内，大约 35 分钟送到，满 ¥150 免配送费。'],
  ['可以带酒吗？', '可以，每瓶收 ¥80 开瓶费；在店里点一瓶酒，免一瓶开瓶费。'],
];

/* --------------------------------------------------------------- credits */
export const CREDITS = {
  photos: 'Pexels',
  video: 'Pexels',
  cutouts: 'Pexels（抠图）与 Pixabay',
};
