// Site content for a language. English is the default and lives at the bare routes; Chinese lives under /zh.
import * as en from './data.en.mjs';
import * as zh from './data.mjs';

export const LANGS = ['en', 'zh'];
export const HTML_LANG = { en: 'en', zh: 'zh-CN' };
export const prefix = lang => lang === 'zh' ? '/zh' : '';
export const translator = lang => (cn, english) => lang === 'zh' ? cn : english;

const over = (list, copy, key = 'id') => list.map(x => ({ ...x, ...copy[x[key]] }));
const overMap = (map, copy) => Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { ...v, ...copy[k] }]));

const MENU = zh.MENU.map(c => ({ ...c, ...en.MENU_CATS[c.id], items: over(c.items, en.MENU_ITEMS) }));
const english = {
  ...zh,
  SITE: { ...zh.SITE, ...en.SITE },
  NAV: over(zh.NAV, en.NAV, 'href'),
  STORES: over(zh.STORES, en.STORES),
  TAGS: overMap(zh.TAGS, en.TAGS),
  MENU,
  MENU_ITEMS: MENU.flatMap(c => c.items.map(i => ({ ...i, cat: c.id }))),
  TIMELINE: en.TIMELINE,
  VALUES: en.VALUES,
  TEAM: over(zh.TEAM, en.TEAM),
  SOURCES: en.SOURCES,
  EVENTS: over(zh.EVENTS, en.EVENTS),
  SEASON: en.SEASON,
  POSTS: over(zh.POSTS, en.POSTS, 'slug'),
  FAQ: en.FAQ,
};

export const content = lang => lang === 'zh' ? zh : english;
