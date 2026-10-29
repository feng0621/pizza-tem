// Small markup pieces used on more than one page.

export const giftCard = (amount = 500, name = '给你') => `<div class="giftcard" aria-hidden="true">
  <span class="gc-top"><b>TRE FIAMME</b><i>Carta Regalo</i></span>
  <span class="gc-amt">¥<b>${amount}</b></span>
  <span class="gc-to">${name}</span>
  <svg class="gc-flame" viewBox="0 0 32 32"><path d="M9 28c-4-3-3-8 0-11 0 3 2 4 2 4-1-5 2-9 5-11-1 4 1 6 3 8 1-2 1-4 0-6 4 3 6 8 4 13-1 2-2 3-3 3z" fill="#e3452b"/><path d="M13 28c-2-2-1-5 1-7 0 2 1 3 2 3 0-3 1-5 3-6-1 3 2 5 1 8-1 1-2 2-3 2z" fill="#ff9b3d"/></svg>
</div>`;
