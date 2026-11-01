// English copy, overlaid on data.mjs by content.mjs. Facts shared by both languages (prices, hours, photos, tags) stay in data.mjs.

export const SITE = {
  description: 'Tre Fiamme is a Neapolitan pizzeria in Shanghai. Dough cold-fermented for 72 hours, baked for 90 seconds in a 485°C wood-fired oven.',
};

export const NAV = {
  '/menu': { label: 'Menu' },
  '/craft': { label: 'Craft' },
  '/about': { label: 'About' },
  '/events': { label: 'Events' },
  '/journal': { label: 'Journal' },
  '/locations': { label: 'Locations' },
};

export const STORES = {
  jingan: {
    label: "Jing'an · By the Oven",
    address: "18 Wutong Lane, Jing'an, Shanghai",
    lede: 'Our first room, and home to the three-ton wood oven. Twenty-eight seats gather around its mouth, and from the bar you can watch every pizza get stretched, baked and turned.',
    features: ['Oven-side bar', 'Bookings up to 6', 'Delivery within 3 km', 'Step-free entrance'],
    transport: "8 minutes' walk from the metro. Public parking nearby, about ¥15 an hour in the evening.",
    areas: ['Bar · facing the oven', 'Indoor table'],
  },
  cortile: {
    label: 'Xuhui · The Courtyard',
    address: '7 Tingyuan Lane, Xuhui, Shanghai',
    lede: 'A 24-seat long table in the courtyard of an old villa. On good evenings you eat under the trees. Our Saturday pizza classes happen here too.',
    features: ['Courtyard long table', 'Private hire for 20–40', 'Pets welcome in the courtyard', 'Saturday pizza class'],
    transport: "12 minutes' walk from the metro. Six parking spaces in the courtyard, by reservation.",
    areas: ['Indoors', 'Courtyard table', 'Bar'],
  },
};

export const TAGS = {
  firma: { label: 'Signature' },
  veg: { label: 'Vegetarian' },
  vegan: { label: 'Vegan' },
  hot: { label: 'Spicy' },
  new: { label: 'New' },
  season: { label: 'Autumn–winter' },
  alcol: { label: 'Contains alcohol' },
};

export const MENU_CATS = {
  rosse: { label: 'Red pizzas', note: 'Tomato base · 30 cm · also in 25 or 35 cm' },
  bianche: { label: 'White pizzas', note: 'No tomato · 30 cm' },
  antipasti: { label: 'Fried & starters', note: 'Good for sharing between 2–3' },
  dolci: { label: 'Desserts', note: '' },
  bevande: { label: 'Drinks', note: '' },
};

export const MENU_ITEMS = {
  margherita: {
    label: 'Tomato & mozzarella',
    desc: 'Our most-ordered pizza, and the one any Neapolitan pizzeria should be judged by.',
    ing: [['San Marzano tomato', 'Campania · DOP'], ['Agerola fresh mozzarella', 'Fior di latte'], ['Basil', 'Added just before serving'], ['Extra virgin olive oil', 'Puglia']],
    allergens: ['Gluten', 'Dairy'],
  },
  marinara: {
    label: 'Tomato & garlic',
    desc: "Naples' oldest pizza. It is named for the sailors who ate it, and despite the name it has no seafood and no cheese.",
    ing: [['San Marzano tomato', 'Crushed by hand, salt only'], ['Garlic', 'Thinly sliced'], ['Sicilian oregano', 'Dried'], ['Extra virgin olive oil', 'Puglia']],
    allergens: ['Gluten'],
  },
  diavola: {
    label: 'Spicy salami',
    desc: 'The salami renders in the oven and its red oil soaks into the base. Medium heat. We can leave off the chilli oil.',
    ing: [['Tomato', 'San Marzano'], ['Mozzarella', 'Fior di latte'], ['Calabrian spicy salami', 'Pork'], ['Chilli oil', 'House-made']],
    allergens: ['Gluten', 'Dairy', 'Pork'],
  },
  bufala: {
    label: 'Buffalo mozzarella',
    desc: 'Whole buffalo mozzarella goes on after the bake, so it stays cold and milky against the hot base.',
    ing: [['Tomato sauce', 'San Marzano'], ['Roasted cherry tomatoes', 'Halved before baking'], ['Buffalo mozzarella', 'Campania · DOP'], ['Basil', 'Fresh']],
    allergens: ['Gluten', 'Dairy'],
  },
  contadina: {
    label: "The farmer's",
    desc: 'Our most loaded pizza: salami, mushrooms and roasted peppers, with a handful of rocket after the bake.',
    ing: [['Tomato', 'San Marzano'], ['Mozzarella', 'Fior di latte'], ['Salami', 'Pork'], ['Mushrooms, roasted peppers', 'Local'], ['Rocket', 'Added after baking']],
    allergens: ['Gluten', 'Dairy', 'Pork'],
  },
  quattro: {
    label: 'Four cheeses',
    desc: 'Each cheese has a job: mozzarella for the stretch, gorgonzola for salt, parmesan for a crisp edge, pecorino to finish.',
    ing: [['Mozzarella', 'Fior di latte'], ['Gorgonzola', 'Dolce'], ['Parmesan', '24 months'], ['Pecorino', 'Romano']],
    allergens: ['Gluten', 'Dairy'],
  },
  salsiccia: {
    label: 'Sausage & mushroom',
    desc: 'House fennel pork sausage, pinched into small pieces and roasted in the oven with mushrooms.',
    ing: [['Mozzarella', 'Fior di latte'], ['Fennel pork sausage', 'Made here daily'], ['Roasted mushrooms', 'Local'], ['Parmesan', '24 months']],
    allergens: ['Gluten', 'Dairy', 'Pork'],
  },
  funghi: {
    label: 'Mushroom & truffle',
    desc: 'Three kinds of mushroom with black truffle paste, served only from November to February.',
    ing: [['Mozzarella', 'Fior di latte'], ['Button, shiitake, oyster mushrooms', 'Local'], ['Black truffle paste', 'Umbria'], ['Thyme', 'Fresh']],
    allergens: ['Gluten', 'Dairy'],
  },
  ortolana: {
    label: 'Market vegetables',
    desc: 'Whatever our partner farm sends that week. In autumn that means pumpkin, courgette, peppers and red onion.',
    ing: [['Mozzarella', 'Fior di latte'], ['Roasted pumpkin, courgette', 'Partner farm'], ['Peppers, red onion', 'Partner farm'], ['Basil oil', 'House-made']],
    allergens: ['Gluten', 'Dairy'],
  },
  montanara: {
    label: 'Fried pizza',
    desc: 'A Naples street snack: a small round of dough is fried, then finished in the oven with tomato and parmesan.',
    ing: [['Pizza dough', '72 hours'], ['Tomato sauce', 'San Marzano'], ['Parmesan', '24 months'], ['Basil', 'Fresh']],
    allergens: ['Gluten', 'Dairy'],
  },
  arancini: {
    label: 'Rice balls · 3 pieces',
    desc: 'Saffron rice around a meat ragù and mozzarella, fried until golden.',
    ing: [['Saffron rice', ''], ['Ragù', 'Beef, pork'], ['Mozzarella', 'Fior di latte'], ['Breadcrumbs', '']],
    allergens: ['Gluten', 'Dairy', 'Egg', 'Pork'],
  },
  burrata: {
    label: 'With warm tomato',
    desc: 'Cut it open and the cream runs out. Served with warm tomato sauce and oven-baked bread.',
    ing: [['Burrata', 'Puglia'], ['Tomato sauce', 'San Marzano'], ['Basil oil', 'House-made'], ['Oven-baked bread', "From the day's dough"]],
    allergens: ['Gluten', 'Dairy'],
  },
  caprese: {
    label: 'Tomato & buffalo',
    desc: 'Tomato, buffalo mozzarella and basil: the three colours of the Italian flag again.',
    ing: [['Seasonal tomatoes', 'Partner farm'], ['Buffalo mozzarella', 'Campania · DOP'], ['Basil', 'Fresh'], ['Olive oil', 'Puglia']],
    allergens: ['Dairy'],
  },
  tiramisu: {
    label: 'Made daily',
    desc: 'We make one tray each afternoon and chill it overnight before cutting. The coffee is our own espresso.',
    ing: [['Mascarpone', ''], ['Ladyfingers', ''], ['Espresso', ''], ['Cocoa powder', '']],
    allergens: ['Gluten', 'Dairy', 'Egg', 'Alcohol'],
  },
  nocciola: {
    label: 'Hazelnut chocolate',
    desc: 'An oven-baked base spread with hazelnut chocolate, topped with toasted hazelnuts and icing sugar. Just right for two.',
    ing: [['Pizza base', '72 hours'], ['Hazelnut chocolate spread', 'House-made'], ['Toasted hazelnuts', 'Piedmont'], ['Icing sugar', '']],
    allergens: ['Gluten', 'Dairy', 'Nuts'],
  },
  gelato: {
    label: 'Milk gelato',
    desc: 'Gelato made only with milk and cream, finished with extra virgin olive oil and sea salt.',
    ing: [['Whole milk', ''], ['Cream', ''], ['Olive oil', 'Puglia'], ['Sea salt', '']],
    allergens: ['Dairy'],
  },
  spritz: {
    label: 'Bitter orange aperitivo',
    desc: 'Italian bitter orange liqueur with Prosecco and soda, and a slice of orange.',
    ing: [['Bitter orange liqueur', ''], ['Prosecco', 'Veneto'], ['Soda water', ''], ['Orange slice', '']],
    allergens: ['Alcohol'],
  },
  vino: {
    label: 'House red · by the glass',
    desc: 'Aglianico from Campania. Soft tannins, and a natural match for a tomato-based pizza.',
    ing: [['Aglianico', 'Campania']],
    allergens: ['Alcohol'],
  },
  limonata: {
    label: 'House lemon soda',
    desc: 'Freshly squeezed Sicilian lemons with a little cane sugar and soda water.',
    ing: [['Sicilian lemon', ''], ['Cane sugar', ''], ['Soda water', '']],
    allergens: [],
  },
  espresso: {
    label: 'After dinner',
    desc: 'One small cup to finish. If you would like milk, ask for a macchiato.',
    ing: [['Coffee beans', 'Dark roast']],
    allergens: [],
  },
};

export const TIMELINE = [
  { year: 2014, place: 'Napoli', text: 'Chen Yu eats his first real Margherita in Naples. A month later he is an apprentice at an old pizzeria.' },
  { year: 2017, place: 'Napoli', text: 'In his third year as an apprentice, his master lets him run the oven alone for the first time.' },
  { year: 2019, place: "Jing'an", text: 'The first Tre Fiamme opens: 28 seats and a three-ton wood oven shipped from Naples.' },
  { year: 2021, place: 'Dough room', text: 'We build our own dough room and 4°C proving room, making up to 120 dough balls a day.' },
  { year: 2024, place: 'Xuhui', text: 'Our second restaurant, The Courtyard, opens with a 24-seat table under the trees.' },
  { year: 2026, place: 'Courtyard', text: 'Saturday afternoon pizza classes begin, teaching guests to stretch dough by hand.' },
];

export const VALUES = [
  { it: 'Solo Napoli', label: 'Only the Neapolitan way', text: 'Stretched by hand, wood-fired, 90 seconds. No stuffed crusts and no pineapple.' },
  { it: 'Da dove viene', label: 'We can name every source', text: 'Tomatoes from the Sarno valley, cheese from Agerola, basil from a partner farm on the edge of Shanghai.' },
  { it: 'Senza fretta', label: 'No hurrying', text: 'Dough ferments for 72 hours, tiramisù chills overnight. The only fast part is the 90 seconds in the oven.' },
];

export const TEAM = {
  chen: {
    name: 'Chen Yu', role: 'Founder · Head chef',
    bio: 'Chen Yu went to Naples in 2014 and spent three years as an apprentice at an old pizzeria, then came home to open the first Tre Fiamme in 2019. He still stretches the first pizza of every dinner service himself.',
    fact: ['Favourite pizza', 'Marinara'],
  },
  marco: {
    name: 'Marco R.', role: 'Pizzaiolo',
    bio: "Marco is from Naples and has been stretching dough for twenty years. He came to Shanghai with the wood oven in 2019, and now runs the oven in Jing'an and trains every new pizzaiolo.",
    fact: ['Most in one night', '214 pizzas'],
  },
  lin: {
    name: 'Lin Wan', role: 'Head of the dough room',
    bio: "Lin Wan starts mixing at 7 every morning. She looks after three days' worth of dough in the cold room and adjusts the hydration to suit the day's humidity.",
    fact: ['Hydration', '63–66%'],
  },
  zhou: {
    name: 'Zhou Xu', role: 'Sommelier · Front of house',
    bio: 'Zhou Xu chose all 40 Italian wines on the list, most of them from Campania. If you are not sure what to order, just tell him which pizza you are having.',
    fact: ['Wine list', '40 labels'],
  },
};

export const SOURCES = [
  { what: 'Tomatoes', it: 'Pomodoro San Marzano', from: 'Campania · Sarno valley', note: 'Grown in volcanic soil below Vesuvius. Long fruit with balanced acidity and sweetness.' },
  { what: 'Fresh mozzarella', it: 'Fior di latte', from: 'Campania · Agerola', note: "Cow's milk mozzarella, flown in twice a week." },
  { what: 'Buffalo mozzarella', it: 'Mozzarella di bufala', from: 'Campania', note: 'Added only after the bake, so it stays cold and milky.' },
  { what: 'Flour', it: 'Farina tipo 00', from: 'Naples · a century-old mill', note: 'Soft 00 flour with 12.5% protein, well suited to long fermentation.' },
  { what: 'Olive oil', it: 'Olio extravergine', from: 'Puglia', note: 'Cold-pressed, with a hint of cut grass and almond.' },
  { what: 'Basil', it: 'Basilico', from: 'Shanghai · partner farm in Qingpu', note: 'Delivered every morning. Large leaves and a strong scent.' },
];

export const EVENTS = {
  scuola: {
    label: 'Saturday pizza class', price: '¥398 / person',
    when: 'Saturdays 14:00–17:00', where: 'Xuhui · The Courtyard',
    lede: 'Three hours, from mixing dough to working the oven. You eat the pizza you made and take a dough ball home.',
    detail: [
      ['Class size', '8 per class, runs with at least 4'],
      ['You learn', 'Dough ratios, hand stretching, topping, baking and turning'],
      ['Included', 'Two pizzas, one drink, one dough ball to take home'],
      ['Who for', 'Ages 12 and up; no experience needed'],
    ],
    cta: 'Sign up', submit: 'Confirm sign-up',
  },
  privata: {
    label: 'Private dining', price: '¥288+ / person',
    when: 'Monday–Thursday evenings', where: 'Xuhui · The Courtyard',
    lede: 'Book the whole courtyard table for 20 to 40 guests. It has hosted birthdays, team dinners and small weddings.',
    detail: [
      ['Guests', '20–40'],
      ['Menus', '¥288: starter + 3 pizzas + dessert; ¥388: adds wine pairing'],
      ['Can be tailored', 'Menu, wine list, table flowers and an oven-side stretching show'],
      ['Booking', 'At least 7 days ahead'],
    ],
    cta: 'Enquire', submit: 'Send enquiry',
  },
  regalo: {
    label: 'Gift card',
    when: 'Valid at both restaurants', where: 'Lasts 12 months',
    lede: 'Give someone a Tre Fiamme gift card. Add a message and we will print it on the card.',
    detail: [
      ['Values', '¥200, ¥500, ¥1000'],
      ['Use it for', 'Dining in, delivery and pizza classes'],
      ['Validity', '12 months; can be used across several visits'],
    ],
    cta: 'Customise', submit: 'Buy gift card',
  },
};

export const SEASON = [
  { date: 'November', it: 'Mese del Tartufo', label: 'Truffle month', text: 'The mushroom and truffle pizza returns, with truffle montanara on weekends.' },
  { date: 'December 24', it: 'La Vigilia', label: 'Christmas Eve menu', text: 'Both restaurants serve a set menu only, ¥328 per person. Booking required.' },
  { date: 'First Sunday of each month', it: 'Forno Aperto', label: 'Open kitchen', text: 'At 3 pm, bring the kids to see how the wood oven gets lit. Free, no sign-up needed.' },
];

export const POSTS = {
  'il-cortile-two-years': {
    cat: 'News', title: 'Two years in the courtyard, and a new autumn menu',
    excerpt: 'In two years, the long table has hosted more than a thousand birthdays and get-togethers. This autumn we changed the menu and settled pizza classes on Saturday afternoons.',
    body: [
      ['p', 'It rained on the day The Courtyard opened in October 2024, and nobody sat at the long table. Two years later, it is booked out almost every weekend.'],
      ['h', 'The autumn menu'],
      ['p', 'From November the mushroom and truffle pizza is back, and it stays until February. The new addition is the Ortolana: we bake whatever our partner farm delivers that week. This month that means pumpkin, courgette, peppers and red onion.'],
      ['quote', 'A good vegetable pizza needs the vegetables roasted first. Otherwise the water makes the base soggy.', 'Lin Wan, head of the dough room'],
      ['h', 'Pizza class, every Saturday'],
      ['p', 'After a six-month trial, pizza class now runs every Saturday from 2 to 5 pm, with 8 people in each class. You start by mixing dough, eat the pizza you made, and take a dough ball home.'],
      ['facts', [['Long table', '24 seats'], ['Birthdays in two years', '1,140'], ['Pizza class', 'Saturdays']]],
      ['p', 'Thank you to everyone who has come to the courtyard. During our anniversary week, every Margherita ordered at The Courtyard comes with a free montanara.'],
    ],
  },
  '72-hours': {
    cat: 'Craft', title: 'Why our dough waits 72 hours',
    excerpt: 'Flour, water, salt and yeast. Ferment them for 8 hours or for 72 and you get two completely different pizzas.',
    body: [
      ['p', 'Neapolitan pizza dough has only four ingredients: flour, water, salt and yeast. Almost every pizzeria uses the same recipe. The difference is time.'],
      ['h', 'Slow down, and the yeast has time'],
      ['p', 'At 4°C, yeast slows right down. It makes less carbon dioxide, but the enzymes in the flour keep working, breaking starch into sugar and proteins into shorter chains. Those two things decide how a pizza tastes and feels.'],
      ['p', 'More sugar means the rim colours faster in the oven and picks up its leopard spots. Better-broken-down protein means the dough is easier to digest, so a whole pizza does not leave you feeling stuffed.'],
      ['facts', [['Soft 00 flour', '1000 g'], ['Water', '650 g'], ['Sea salt', '28 g'], ['Fresh yeast', '1 g']]],
      ['h', 'One gram of yeast'],
      ['p', 'We use just one gram of yeast per kilo of flour so that it takes its time. Over 72 hours the dough only about doubles, but the bubbles stay fine and even, and when you stretch it the air moves to the edge and leaves a 2 cm rim.'],
      ['quote', 'The dough tells you when it is ready. Press it, and if it springs back slowly, it is done.', 'Marco, pizzaiolo'],
      ['h', 'The two hours before service'],
      ['p', 'Cold dough cannot be stretched straight away, so it comes out two hours early to warm up. Dinner service starts at 17:30, which means the counters are full of dough by 15:30.'],
    ],
  },
  'san-marzano': {
    cat: 'Ingredients', title: 'The journey of a San Marzano tomato',
    excerpt: 'It grows at the foot of Vesuvius, gets picked in August, peeled and canned, then spends more than a month at sea on its way to our kitchen.',
    body: [
      ['p', 'San Marzano tomatoes grow only in the Sarno valley, southeast of Naples. The soil there is volcanic ash from Vesuvius, which drains well and is rich in minerals.'],
      ['h', 'Long, thin-skinned, few seeds'],
      ['p', 'The fruit is long and slender with thin skin, few seeds and thick flesh. Both its acidity and its sweetness are stronger than in an ordinary tomato, and it tastes good cooked or raw.'],
      ['p', 'Harvest comes every August. The tomatoes are picked, peeled and canned the same day, and each can carries a certified origin number that traces it back to the field.'],
      ['facts', [['Harvest', 'Every August'], ['At sea', 'About 40 days'], ['Per Margherita', '80 g']]],
      ['h', 'We do not cook our sauce'],
      ['p', 'Once a can is open, we crush the tomatoes by hand and add a little sea salt. No cooking, no sugar, no herbs. The only heat they ever get is those 90 seconds in the 485°C oven.'],
      ['quote', 'Cook the sauce once and bake it again in the oven, and all you have left is the sourness.', 'Chen Yu, head chef'],
    ],
  },
  '485-degrees': {
    cat: 'Craft', title: '485°C: how to fire a wood oven',
    excerpt: 'We light it three hours before opening. The floor reaches 430°C and the dome nearly 500°C. Once a pizza goes in, it gets turned every 30 seconds.',
    body: [
      ['p', "The oven in Jing'an weighs three tons. It was built in Naples, one firebrick at a time, then shipped to Shanghai in one piece."],
      ['h', 'Three hours ahead'],
      ['p', 'Dinner service starts at 17:30, so the fire gets lit at 2:30 in the afternoon. It burns high until the bricks are heated through, then gets pushed to one side to make room for the pizzas.'],
      ['facts', [['Floor', 'About 430°C'], ['Dome', 'About 500°C'], ['In to out', '90 seconds']]],
      ['h', 'A turn every 30 seconds'],
      ['p', 'The fire sits on one side of the oven, so the side nearest it cooks first. The pizzaiolo turns each pizza with a small peel every 30 seconds so that every side takes its turn facing the flames. After 90 seconds the rim has risen and charred in spots, and the centre is still soft.'],
      ['quote', 'Whoever is watching the oven cannot leave it. Turn around, and 90 seconds are gone.', 'Marco, pizzaiolo'],
      ['h', 'Fruitwood and leftover heat'],
      ['p', 'We burn only well-seasoned fruitwood, which gives little smoke and a steady flame. The oven stays warm after closing, right through to the next morning, which is just enough to bake bread for the staff meal.'],
    ],
  },
};

export const FAQ = [
  ['Do I need to book?', "For weekend dinners, we suggest booking 2–3 days ahead. Jing'an is small and only takes bookings of up to 6. For larger groups, please book The Courtyard."],
  ['Do you have allergen information?', 'Every dish lists its allergens on its detail page. Our kitchen handles gluten, dairy and nuts together, so we cannot rule out cross-contact.'],
  ['Can you make gluten-free pizza?', 'Not at the moment. Our dough room makes one dough, using soft 00 flour.'],
  ['Can I bring my pet?', "Pets are welcome in the courtyard at The Courtyard, but not indoors or at Jing'an."],
  ['How far do you deliver?', 'Both restaurants deliver within 3 km in about 35 minutes. Delivery is free on orders over ¥150.'],
  ['Can I bring my own wine?', 'Yes, with ¥80 corkage per bottle. Order a bottle from us and we waive corkage on one of yours.'],
];
