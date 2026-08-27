import { Gift, StaticPage, AdSettings, FaqItem } from '../types';
import { INITIAL_BLOG_POSTS } from './blogPosts';

export { INITIAL_BLOG_POSTS };
export const SEED_VERSION = 20;
export const ADMIN_HASH = '#gw-admin-2026';
export const AFFILIATE_ENABLED = false; // Currently disabled for 100% non-commercial free fun mode. Toggleable via admin or code flag in the future.

export const PALETTE = [
  '#FF6B6B', '#FFD166', '#06D6A0', '#4CC9F0', '#F72585',
  '#9B5DE5', '#FF9F1C', '#43AA8B', '#FFB4A2', '#90BE6D',
  '#E63946', '#F15BB5', '#00BBF9', '#00F5D4', '#7209B7',
  '#3A86FF', '#FB5607', '#8338EC', '#38B000', '#FF006E'
];

export const INITIAL_GIFTS: Gift[] = [
  // Gadgets & Electronics
  {
    id: 'g1',
    emoji: '🎧',
    name: 'Noise-Cancelling Wireless Headphones',
    desc: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'child', 'friend'],
    occasions: ['birthday', 'christmas', 'graduation', 'anniversary']
  },
  {
    id: 'g2',
    emoji: '⌚',
    name: 'Smart Fitness & Health Tracker',
    desc: 'Waterproof fitness watch tracking heart rate, sleep cycles, steps, and phone notifications with 7-day battery.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'child', 'friend'],
    occasions: ['birthday', 'christmas', 'parentsday', 'anniversary']
  },
  {
    id: 'g3',
    emoji: '📷',
    name: 'Instant Color Print Camera',
    desc: 'Vintage-styled instant camera with automatic exposure, built-in selfie mirror, and included film pack.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties'],
    relationships: ['partner_spouse', 'child', 'friend'],
    occasions: ['birthday', 'graduation', 'christmas']
  },
  {
    id: 'g4',
    emoji: '🔊',
    name: 'Portable Waterproof Bluetooth Speaker',
    desc: 'Rugged, 360-degree punchy bass speaker built for beach trips, shower singalongs, and backyard barbecues.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['friend', 'colleague', 'child', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation', 'housewarming']
  },
  {
    id: 'g5',
    emoji: '🔋',
    name: 'MagSafe Magnetic Fast Power Bank',
    desc: 'Sleek ultra-slim 10,000mAh wireless power bank that snaps onto smartphones for reliable all-day charging on the go.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'parent', 'child'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g6',
    emoji: '🔌',
    name: 'Smart Wi-Fi Plug & Ambience Kit',
    desc: 'Set of 4 voice-compatible smart energy plugs with schedule timers and remote phone automation.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'parent'],
    occasions: ['housewarming', 'christmas', 'birthday']
  },
  {
    id: 'g7',
    emoji: '🕹️',
    name: 'Retro Handheld Mini Arcade Console',
    desc: 'Pocket-sized gaming console loaded with 500+ nostalgic 8-bit classic arcade games and rechargeable battery.',
    budget: '10to30',
    genders: ['any', 'male'],
    ageBands: ['child', 'teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'colleague'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g8',
    emoji: '💡',
    name: 'Customizable Sunset Projection Lamp',
    desc: 'Romantic golden hour ambient sunset lamp with 16 color modes and 360-degree rotatable head for aesthetic rooms.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['friend', 'child', 'partner_spouse'],
    occasions: ['birthday', 'housewarming', 'christmas']
  },
  {
    id: 'g9',
    emoji: '🏷️',
    name: 'Smart Bluetooth Item Finder & Tracker',
    desc: 'Ultra-thin Bluetooth tracker for keys, wallets, and backpacks with worldwide precision location alerts.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'parent', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'parentsday', 'christmas']
  },
  {
    id: 'g10',
    emoji: '📱',
    name: 'Adjustable Aluminum Desk Phone Stand',
    desc: 'Heavy-duty foldable phone & tablet desktop stand with anti-slip rubber pads and cable pass-through.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'child'],
    occasions: ['birthday', 'teachersday', 'christmas']
  },

  // Food, Drink & Gourmet
  {
    id: 'g11',
    emoji: '☕',
    name: 'Artisanal Single-Origin Coffee Box',
    desc: 'Curated box of fresh specialty whole bean coffees roasted by award-winning boutique microroasters.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'colleague', 'friend'],
    occasions: ['birthday', 'housewarming', 'parentsday', 'christmas', 'teachersday']
  },
  {
    id: 'g12',
    emoji: '🍵',
    name: 'Japanese Matcha Ceremony Starter Set',
    desc: 'Authentic organic ceremonial grade matcha powder, handcrafted bamboo whisk (chasen), scoop, and ceramic bowl.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent', 'colleague'],
    occasions: ['birthday', 'housewarming', 'teachersday']
  },
  {
    id: 'g13',
    emoji: '🍫',
    name: 'Luxury Belgian Chocolatier Truffle Box',
    desc: 'Assortment of 24 handcrafted artisanal dark, milk, and salted caramel chocolate truffles in a gold-foil gift box.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'parent', 'colleague', 'friend', 'child'],
    occasions: ['anniversary', 'birthday', 'christmas', 'parentsday', 'teachersday']
  },
  {
    id: 'g14',
    emoji: '🍷',
    name: 'Private Vineyard Wine Tasting Tour Voucher',
    desc: 'Gift voucher for two guests including guided vineyard walk, cellar barrel tasting, and gourmet cheese pairing.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'birthday', 'parentsday']
  },
  {
    id: 'g15',
    emoji: '🫒',
    name: 'Cold-Pressed Extra Virgin Olive Oil & Pourer',
    desc: 'Estate-grown Greek early harvest olive oil bottled in ceramic with a precision brass drizzle pourer.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'parent', 'partner_spouse'],
    occasions: ['housewarming', 'parentsday', 'christmas']
  },
  {
    id: 'g16',
    emoji: '🧀',
    name: 'Bamboo Charcuterie & Cheese Board Set',
    desc: 'Natural organic bamboo serving board with hidden slide-out drawer containing 4 stainless steel cheese knives.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent', 'colleague'],
    occasions: ['housewarming', 'anniversary', 'christmas', 'birthday']
  },
  {
    id: 'g17',
    emoji: '🍯',
    name: 'Wildflower & Lavender Raw Honey Trio',
    desc: 'Raw unfiltered gourmet artisan honey flight sourced from sustainably managed botanical apiaries.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['parent', 'colleague', 'friend'],
    occasions: ['teachersday', 'housewarming', 'parentsday', 'birthday']
  },
  {
    id: 'g18',
    emoji: '🧊',
    name: 'Whiskey Stainless Steel Chilling Stones & Tumblers',
    desc: 'Set of reusable granite cooling stones in wooden storage tray paired with two heavy-base old fashioned glasses.',
    budget: '10to30',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend', 'colleague'],
    occasions: ['birthday', 'anniversary', 'parentsday', 'christmas']
  },
  {
    id: 'g19',
    emoji: '🌶️',
    name: 'Gourmet World Hot Sauce Discovery Pack',
    desc: 'Flight of 6 small-batch artisanal hot sauces ranging from sweet smoky chipotle to habanero ghost pepper heat.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'colleague', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'housewarming']
  },
  {
    id: 'g20',
    emoji: '🧋',
    name: 'DIY Brown Sugar Boba Bubble Tea Kit',
    desc: 'Everything needed to brew 8 authentic boba drinks at home: black tea leaves, chewy tapioca pearls, syrup, and straws.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties'],
    relationships: ['child', 'friend', 'colleague'],
    occasions: ['birthday', 'christmas', 'graduation']
  },

  // Home, Kitchen & Living
  {
    id: 'g21',
    emoji: '🍳',
    name: 'Pre-Seasoned Cast Iron Skillet',
    desc: 'Heavy-duty 10.25-inch cast iron skillet that distributes heat evenly for searing steaks, baking cornbread, and roasting.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['housewarming', 'birthday', 'parentsday', 'anniversary']
  },
  {
    id: 'g22',
    emoji: '🕯️',
    name: 'Luxury Botanical Soy Aromatherapy Candle',
    desc: 'Hand-poured 100% natural soy wax candle infused with cedarwood, amber, and bergamot with a crackling wooden wick.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'friend', 'colleague', 'parent'],
    occasions: ['housewarming', 'birthday', 'teachersday', 'christmas', 'anniversary']
  },
  {
    id: 'g23',
    emoji: '🪴',
    name: 'Living Succulent Trio in Ceramic Pots',
    desc: 'Three hardy, air-purifying mini succulents planted in modern geometric ceramic pots with drainage saucers.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent', 'child'],
    occasions: ['housewarming', 'teachersday', 'birthday']
  },
  {
    id: 'g24',
    emoji: '☕',
    name: 'Smart Temperature Control Heated Mug',
    desc: 'App-controlled ceramic mug that keeps your coffee or tea at your exact preferred drinking temperature for up to 90 min.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'colleague', 'friend'],
    occasions: ['birthday', 'christmas', 'anniversary', 'parentsday']
  },
  {
    id: 'g25',
    emoji: '🚿',
    name: 'Plush Turkish Cotton Bath Towel Set',
    desc: 'Ultra-absorbent, 700 GSM combed Aegean Turkish cotton set of 2 oversized bath sheets with waffle border trim.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['housewarming', 'anniversary', 'parentsday']
  },
  {
    id: 'g26',
    emoji: '💤',
    name: 'Weighted Cooling Calming Blanket',
    desc: '15 lb breathable bamboo weighted blanket engineered for anxiety relief and deeper, restorative sleep.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'child', 'parent', 'friend'],
    occasions: ['birthday', 'christmas', 'parentsday']
  },
  {
    id: 'g27',
    emoji: '🌬️',
    name: 'Ultrasonic Essential Oil Aroma Diffuser',
    desc: 'Whisper-quiet wood grain essential oil diffuser with ambient warm LED light and auto shut-off safety.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'colleague', 'parent', 'partner_spouse'],
    occasions: ['housewarming', 'teachersday', 'birthday', 'christmas']
  },
  {
    id: 'g28',
    emoji: '🍕',
    name: 'Cordierite Outdoor & Oven Pizza Stone',
    desc: 'Thermal shock-resistant baking stone that creates restaurant-crisp pizza crusts in any standard kitchen oven.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['housewarming', 'birthday', 'parentsday']
  },
  {
    id: 'g29',
    emoji: '🌿',
    name: 'Self-Watering Kitchen Herb Garden Kit',
    desc: 'Indoor countertop ceramic planter with organic seeds (basil, mint, rosemary) and automated moisture wicks.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'parent', 'partner_spouse'],
    occasions: ['housewarming', 'teachersday', 'birthday', 'parentsday']
  },
  {
    id: 'g30',
    emoji: '🧣',
    name: 'Cashmere Feel Soft Throw Blanket',
    desc: 'Luxurious brushed microfiber fleece throw blanket with elegant fringe tassel details for cozy living room sofas.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'parent', 'friend', 'colleague'],
    occasions: ['housewarming', 'christmas', 'parentsday', 'birthday']
  },

  // Beauty, Wellness & Self-Care
  {
    id: 'g31',
    emoji: '💆‍♀️',
    name: 'Full Day Luxury Spa & Massage Retreat',
    desc: 'All-inclusive 90-minute aromatherapy massage, customized facial treatment, and botanical sauna access voucher.',
    budget: 'over100',
    genders: ['any', 'female'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'birthday', 'parentsday']
  },
  {
    id: 'g32',
    emoji: '🧴',
    name: 'Organic Hydrating Skincare Trio',
    desc: 'Dermatologist-formulated gentle cleanser, hyaluronic acid moisture serum, and soothing botanical face cream.',
    budget: '30to50',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent'],
    occasions: ['birthday', 'christmas', 'parentsday', 'anniversary']
  },
  {
    id: 'g33',
    emoji: '🪒',
    name: 'Vintage Double-Edge Safety Razor Grooming Set',
    desc: 'Precision chrome safety razor with badger-hair shave brush, sandalwood shave cream, and 20 platinum blades.',
    budget: '30to50',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['birthday', 'parentsday', 'anniversary', 'christmas']
  },
  {
    id: 'g34',
    emoji: '🌸',
    name: 'Botanical Epsom Salt Bath Soak & Fizzer Box',
    desc: 'Dead Sea mineral bath salts infused with organic rose petals, lavender essential oils, and moisturizing cocoa butter.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'friend', 'colleague', 'parent'],
    occasions: ['birthday', 'teachersday', 'parentsday', 'christmas']
  },
  {
    id: 'g35',
    emoji: '🪨',
    name: 'Natural Rose Quartz Face Roller & Gua Sha',
    desc: 'Authentic 100% natural rose quartz facial sculpting tool set for lymphatic drainage, puffiness reduction, and glow.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'partner_spouse', 'colleague', 'child'],
    occasions: ['birthday', 'christmas', 'anniversary']
  },
  {
    id: 'g36',
    emoji: '🪥',
    name: 'Sonic Rechargeable Electric Toothbrush',
    desc: 'High-frequency 40,000 VPM sonic toothbrush with smart interval timer, 4 cleaning modes, and travel case.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'child', 'friend'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g37',
    emoji: '🧖',
    name: '100% Pure Mulberry Silk Sleep Eye Mask',
    desc: 'Ultra-soft hypoallergenic 22 momme pure silk eye mask that blocks light without creasing delicate facial skin.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'friend', 'colleague', 'parent'],
    occasions: ['birthday', 'christmas', 'teachersday', 'parentsday']
  },
  {
    id: 'g38',
    emoji: '💅',
    name: 'Salon Gel Nail Lamp & Starter Polish Kit',
    desc: 'Quick-curing UV LED nail lamp with 6 pastel gel colors, base coat, glossy top coat, and manicure accessories.',
    budget: '30to50',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['friend', 'child', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g39',
    emoji: '🧼',
    name: 'Cold-Process Goat Milk Artisan Soap Bar Pack',
    desc: 'Set of 4 rustic handmade moisturizing soaps enriched with shea butter, colloidal oatmeal, and honey.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent'],
    occasions: ['teachersday', 'housewarming', 'christmas']
  },
  {
    id: 'g40',
    emoji: '👃',
    name: 'Niche Eau De Parfum Discovery Sample Set',
    desc: 'Fragrance sampler featuring 5 luxury travel-sized atomizers ranging from citrus woods to warm amber vanilla.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent'],
    occasions: ['anniversary', 'birthday', 'christmas']
  },

  // Outdoor, Sports & Fitness
  {
    id: 'g41',
    emoji: '🏕️',
    name: 'Ultralight Double Camping Parachute Hammock',
    desc: 'Heavy-duty 210T ripstop nylon hammock supporting up to 500 lbs with tree-friendly adjustable anchor straps.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['partner_spouse', 'friend', 'child'],
    occasions: ['birthday', 'graduation', 'christmas']
  },
  {
    id: 'g42',
    emoji: '🎒',
    name: 'Weatherproof Everyday Commuter Backpack',
    desc: 'Minimalist water-resistant daypack with padded 15.6" laptop sleeve, anti-theft luggage strap, and hidden pockets.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'partner_spouse', 'friend', 'colleague'],
    occasions: ['graduation', 'birthday', 'christmas']
  },
  {
    id: 'g43',
    emoji: '🧗',
    name: 'Indoor Bouldering & Rock Climbing Day Pass',
    desc: 'Climbing gym day pass for two with shoe rentals, chalk bag, and 30-minute safety belay orientation.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['partner_spouse', 'friend', 'child'],
    occasions: ['birthday', 'graduation', 'anniversary']
  },
  {
    id: 'g44',
    emoji: '🧘',
    name: 'Non-Slip Eco-Friendly Natural Rubber Yoga Mat',
    desc: 'Extra-thick 6mm alignment grid yoga and pilates mat with sweat-activated grip and carrying strap.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent'],
    occasions: ['birthday', 'christmas', 'parentsday']
  },
  {
    id: 'g45',
    emoji: '🥤',
    name: 'Vacuum-Insulated 32oz Stainless Steel Tumbler',
    desc: 'Double-walled insulated flask that keeps drinks icy cold for 24 hours or piping hot for 12 hours with straw lid.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'child', 'parent', 'partner_spouse'],
    occasions: ['birthday', 'graduation', 'teachersday', 'christmas']
  },
  {
    id: 'g46',
    emoji: '🚲',
    name: 'Universal Quick-Lock Bicycle Phone Mount',
    desc: 'Shock-absorbing silicone and aluminum handlebar clamp mount for secure GPS navigation while cycling.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'child', 'colleague', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g47',
    emoji: '⛺',
    name: 'Compact Collapsible Camping Lantern & Torch',
    desc: 'Solar and USB rechargeable LED lantern with power bank output for emergency phone charging outdoors.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'parentsday', 'christmas']
  },
  {
    id: 'g48',
    emoji: '🏓',
    name: 'Portable Retractable Table Tennis Ping Pong Set',
    desc: 'Clamp-on expandable net that turns any dining or picnic table into an instant ping-pong arena with 2 paddles & balls.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'colleague'],
    occasions: ['birthday', 'christmas', 'housewarming']
  },
  {
    id: 'g49',
    emoji: '🔪',
    name: '18-in-1 Heavy Duty Stainless Pocket Multitool',
    desc: 'Ergonomic stainless steel multitool with needle-nose pliers, wire cutters, knife blade, can opener, and bit set.',
    budget: '30to50',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'partner_spouse', 'friend'],
    occasions: ['parentsday', 'birthday', 'christmas']
  },
  {
    id: 'g50',
    emoji: '💪',
    name: 'Fabric Non-Slip Resistance Loop Bands Set',
    desc: 'Set of 3 durable graduated tension workout bands for glutes, physical therapy, and home strength exercises.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'colleague', 'child'],
    occasions: ['birthday', 'christmas']
  },

  // Books, Games, Toys & Hobbies
  {
    id: 'g51',
    emoji: '🧩',
    name: '1,000-Piece Botanical Fine Art Jigsaw Puzzle',
    desc: 'High-definition matte-finish art puzzle printed on recycled Dutch blueboard with included reference poster.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'partner_spouse', 'friend', 'colleague'],
    occasions: ['birthday', 'christmas', 'housewarming', 'teachersday']
  },
  {
    id: 'g52',
    emoji: '🏰',
    name: 'Architecture Iconic Landmark LEGO Set',
    desc: 'Detailed 800+ piece architectural building model with historical booklet and display base plate.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'partner_spouse', 'friend'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g53',
    emoji: '🎲',
    name: 'Award-Winning Strategy Board Game (Catan)',
    desc: 'Modern classic tabletop strategy game where players trade resources, build settlements, and claim victory points.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'child', 'partner_spouse', 'colleague'],
    occasions: ['birthday', 'christmas', 'housewarming']
  },
  {
    id: 'g54',
    emoji: '📖',
    name: 'Curated Hardcover International Bestseller Novel',
    desc: 'Critically acclaimed hardcover fiction book with personalized bookmark, embossed cover, and author afterword.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent', 'partner_spouse'],
    occasions: ['birthday', 'teachersday', 'christmas', 'parentsday']
  },
  {
    id: 'g55',
    emoji: '🎨',
    name: 'Complete Acrylic Canvas Painting Starter Kit',
    desc: 'Set of 24 vivid artist acrylic paints, 6 professional nylon brushes, wooden easel, palette, and 2 stretched canvases.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['child', 'friend', 'partner_spouse', 'parent'],
    occasions: ['birthday', 'christmas', 'graduation', 'teachersday']
  },
  {
    id: 'g56',
    emoji: '🌱',
    name: 'Japanese Bonsai Tree Growing Starter Kit',
    desc: 'Complete kit with 4 seed varieties (Japanese Maple, Pine, Birch, Spruce), biodegradable pots, soil discs, and shears.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'colleague', 'friend', 'partner_spouse'],
    occasions: ['housewarming', 'parentsday', 'birthday', 'teachersday']
  },
  {
    id: 'g57',
    emoji: '🪄',
    name: 'Interactive Optical Illusion 3D Wooden Puzzle',
    desc: 'Laser-cut birch wood mechanical kinetic sculpture puzzle that moves smoothly without glue or battery power.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g58',
    emoji: '🃏',
    name: 'Luxury Foil-Embossed Collector Playing Cards',
    desc: 'Custom illustrated poker card deck printed with metallic holographic hot-stamped foil on casino-grade paper.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'colleague', 'child'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g59',
    emoji: '🔭',
    name: 'Beginner Refractor Astronomy Stargazing Telescope',
    desc: '70mm aperture portable telescope with 3 eyepieces, smartphone adapter, and adjustable aluminum tripod.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'partner_spouse', 'parent'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g60',
    emoji: '🧶',
    name: 'Chunky Wool Arm-Knitting Blanket Craft Kit',
    desc: 'Ultra-soft hypoallergenic jumbo vegan chenille yarn balls with step-by-step video guide for making a sofa throw in 2 hours.',
    budget: '30to50',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'parent', 'child'],
    occasions: ['birthday', 'christmas', 'anniversary']
  },

  // Stationery, Office & Work
  {
    id: 'g61',
    emoji: '🖋️',
    name: 'Fine Brass Weighted Executive Fountain Pen',
    desc: 'Heavy solid brass balance fountain pen with iridium nib, piston ink converter, and leather storage pouch.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'parent', 'partner_spouse', 'friend'],
    occasions: ['graduation', 'teachersday', 'birthday', 'parentsday']
  },
  {
    id: 'g62',
    emoji: '📓',
    name: 'Refillable Full-Grain Leather Journal Notebook',
    desc: 'Handmade rustic distressed leather cover bound with 240 pages of bleed-resistant 120gsm archival paper.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'partner_spouse', 'child', 'parent'],
    occasions: ['graduation', 'birthday', 'teachersday', 'christmas']
  },
  {
    id: 'g63',
    emoji: '🖱️',
    name: 'Ergonomic Vertical Wireless Mouse',
    desc: 'Natural handshake position wireless mouse reducing carpal wrist strain with quiet clicks and thumb DPI controls.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'partner_spouse', 'friend', 'parent'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g64',
    emoji: '🪵',
    name: 'Dual-Sided Vegan Leather Desk Mat Pad',
    desc: 'Extra-large 35x17 inch waterproof non-slip desk protector blotter in matching olive green & slate gray.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'partner_spouse', 'child'],
    occasions: ['graduation', 'housewarming', 'birthday', 'christmas']
  },
  {
    id: 'g65',
    emoji: '⏱️',
    name: 'Rotating Gravity Pomodoro Productivity Timer',
    desc: 'Hexagonal flip timer with pre-set countdown digits (5, 10, 25, 30 min) for focus sessions and study blocks.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['colleague', 'child', 'friend'],
    occasions: ['graduation', 'teachersday', 'birthday']
  },

  // Fashion, Jewelry & Accessories
  {
    id: 'g66',
    emoji: '💎',
    name: '14k Gold Vermeil Dainty Solitaire Pendant Necklace',
    desc: 'Hypoallergenic gold plated sterling silver necklace with brilliant round-cut cubic zirconia and adjustable 16-18" chain.',
    budget: '50to100',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'child', 'friend'],
    occasions: ['anniversary', 'birthday', 'parentsday', 'graduation', 'christmas']
  },
  {
    id: 'g67',
    emoji: '👛',
    name: 'Minimalist RFID-Blocking Italian Leather Slim Wallet',
    desc: 'Ultra-thin bifold leather cardholder with quick-thumb access slot and aerospace-grade RFID signal shielding.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'child', 'colleague', 'friend'],
    occasions: ['birthday', 'graduation', 'parentsday', 'anniversary', 'christmas']
  },
  {
    id: 'g68',
    emoji: '🕶️',
    name: 'Polarized Classic Tortoise Sunglasses',
    desc: 'Timeless unisex acetate sunglasses with UV400 anti-glare scratch-resistant polarized lenses and hard case.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'child', 'parent'],
    occasions: ['birthday', 'graduation', 'anniversary']
  },
  {
    id: 'g69',
    emoji: '🧦',
    name: 'Organic Combed Cotton Fun Patterned Socks Gift Set',
    desc: 'Box of 5 cheerful pairs of breathable seamless socks featuring fun geometric designs and reinforced heels.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'child', 'parent', 'partner_spouse'],
    occasions: ['christmas', 'birthday', 'teachersday']
  },
  {
    id: 'g70',
    emoji: '🧣',
    name: '100% Pure Mongolian Cashmere Scarf',
    desc: 'Featherweight, buttery soft pure cashmere winter scarf with hand-twisted fringe edges in classic camel tan.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent'],
    occasions: ['anniversary', 'parentsday', 'birthday', 'christmas']
  },
  {
    id: 'g71',
    emoji: '💍',
    name: 'Minimalist Stacking Wave Ring Set',
    desc: 'Set of 3 sterling silver textured band rings for everyday bohemian layered accessorizing.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['partner_spouse', 'friend', 'child'],
    occasions: ['birthday', 'anniversary', 'graduation']
  },
  {
    id: 'g72',
    emoji: '👔',
    name: 'Stainless Steel Monogram Cufflinks & Tie Bar Set',
    desc: 'Polished silver-tone executive accessories set in velvet display box for formal occasions and interviews.',
    budget: '10to30',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'colleague', 'child'],
    occasions: ['graduation', 'anniversary', 'parentsday', 'birthday']
  },
  {
    id: 'g73',
    emoji: '👜',
    name: 'Convertible Canvas & Leather Weekender Tote',
    desc: 'Spacious 40L duffel bag with separate waterproof shoe compartment and luggage handle sleeve.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['graduation', 'anniversary', 'birthday']
  },
  {
    id: 'g74',
    emoji: '🩴',
    name: 'Memory Foam Cloud Comfort House Slippers',
    desc: 'Cozy plush fleece slip-on slippers with thick cushioned anti-skid rubber soles for chilly mornings.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['parent', 'partner_spouse', 'friend', 'child'],
    occasions: ['christmas', 'parentsday', 'birthday', 'housewarming']
  },
  {
    id: 'g75',
    emoji: '🧢',
    name: 'Unstructured Vintage Washed Cotton Dad Cap',
    desc: 'Classic low-profile baseball cap crafted from garment-dyed breathable twill with brass buckle strap.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['friend', 'child', 'colleague', 'partner_spouse'],
    occasions: ['birthday', 'christmas']
  },

  // Experiences & Vouchers
  {
    id: 'g76',
    emoji: '🎟️',
    name: 'Live Theater & Broadway Musical Tickets for Two',
    desc: 'Premium orchestra seating voucher for top touring musical or theater production with intermission drinks.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'birthday', 'parentsday']
  },
  {
    id: 'g77',
    emoji: '🏺',
    name: 'Private Wheel Pottery & Ceramic Craft Workshop',
    desc: 'Hands-on 2-hour clay throwing lesson with glazing, kiln firing, and 2 finished ceramic bowls to take home.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'child', 'parent'],
    occasions: ['anniversary', 'birthday', 'parentsday']
  },
  {
    id: 'g78',
    emoji: '🍳',
    name: 'Masterclass Artisan Pasta Making Cooking Class',
    desc: 'Interactive culinary workshop led by a native Italian chef, including wine pairing and 3-course dinner.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'birthday', 'housewarming', 'parentsday']
  },
  {
    id: 'g79',
    emoji: '🍿',
    name: 'VIP Deluxe Cinema Experience & Snack Pass',
    desc: 'Two reclining luxury cinema tickets with large gourmet popcorn, artisan candy, and draft sodas.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties'],
    relationships: ['partner_spouse', 'friend', 'child', 'colleague'],
    occasions: ['birthday', 'anniversary', 'graduation', 'christmas']
  },
  {
    id: 'g80',
    emoji: '🏎️',
    name: 'High-Speed Electric Go-Kart Racing Grand Prix Pass',
    desc: 'Adrenaline-packed 3-heat racing experience on a multi-level indoor pro track with telemetry printout.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'graduation']
  },

  // Kids & Baby
  {
    id: 'g81',
    emoji: '🧸',
    name: 'Organic Cotton Soft Musical Plush Bear',
    desc: 'GOTS certified organic cotton plush teddy bear with gentle wind-up Brahms lullaby music box inside.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child'],
    relationships: ['child', 'friend', 'parent'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g82',
    emoji: '🔬',
    name: 'Hands-On STEM Science Experiment Lab Kit',
    desc: '30 thrilling, kid-safe chemistry and physics experiments including erupting volcano, crystal growing, and slime.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child', 'teen'],
    relationships: ['child', 'friend'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g83',
    emoji: '🎨',
    name: 'Mess-Free Water Doodle Magic Drawing Mat',
    desc: 'Extra-large reusable floor drawing mat that reveals colorful pictures with pure water pens—zero stains or mess.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child'],
    relationships: ['child', 'friend'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g84',
    emoji: '🚀',
    name: 'Glow-in-the-Dark Galaxy Bed Canopy & Fort',
    desc: 'Enchanting bedroom play tent canopy studded with glowing stars and moons for magical bedtime reading.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child'],
    relationships: ['child', 'friend', 'parent'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g85',
    emoji: '🦕',
    name: 'Real Dinosaur Fossil Digging Excavation Kit',
    desc: 'Chisel and brush tool set to uncover 12 genuine prehistoric fossils (shark tooth, ammonite, dinosaur bone fragment).',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['child'],
    relationships: ['child', 'friend'],
    occasions: ['birthday', 'christmas']
  },

  // Pets & Animal Lovers
  {
    id: 'g86',
    emoji: '🐕',
    name: 'Interactive Puzzle Treat Dispenser Toy for Dogs',
    desc: 'Level 2 mental enrichment puzzle feeder that challenges pets to slide compartments for hidden kibble rewards.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'partner_spouse', 'parent'],
    occasions: ['birthday', 'christmas', 'housewarming']
  },
  {
    id: 'g87',
    emoji: '🐈',
    name: 'Window Sill Mounted Cat Hammock Perch',
    desc: 'Heavy-duty suction cup sunbathing perch with washable fleece cover that holds up to 40 lbs of feline joy.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'partner_spouse', 'colleague'],
    occasions: ['birthday', 'christmas', 'housewarming']
  },
  {
    id: 'g88',
    emoji: '🚿',
    name: 'Portable Dog Paw Cleaner & Mud Scrubber Cup',
    desc: 'Gentle soft silicone bristle tumbler that cleans muddy paws in seconds before entering the house or car.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'colleague', 'parent'],
    occasions: ['birthday', 'housewarming', 'christmas']
  },

  // Travel & Adventure
  {
    id: 'g89',
    emoji: '🗺️',
    name: 'Deluxe Gold Scratch-Off World Travel Map',
    desc: 'Detailed cartographic world poster with gold foil overlay that scratches off to reveal vibrant colored countries.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'friend', 'child', 'colleague'],
    occasions: ['graduation', 'birthday', 'housewarming', 'anniversary']
  },
  {
    id: 'g90',
    emoji: '🧳',
    name: 'Ultralight Compression Travel Packing Cubes Set',
    desc: 'Set of 6 expandable ripstop nylon organizer cubes with heavy-duty double zippers to save 60% luggage space.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'partner_spouse', 'parent', 'colleague'],
    occasions: ['graduation', 'birthday', 'christmas']
  },
  {
    id: 'g91',
    emoji: '💤',
    name: 'Ergonomic Memory Foam Travel Neck Pillow',
    desc: '360-degree contoured chin support flight pillow with breathable cooling cover and snap storage pouch.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['parent', 'colleague', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'parentsday', 'christmas']
  },
  {
    id: 'g92',
    emoji: '🔌',
    name: 'All-in-One Universal International Travel Adapter',
    desc: 'Covers over 150 countries (US/EU/UK/AU) with 4 USB-A ports and high-speed USB-C PD fast charge port.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['child', 'friend', 'colleague', 'parent'],
    occasions: ['graduation', 'birthday', 'christmas']
  },

  // Luxury & Special Keepsakes
  {
    id: 'g93',
    emoji: '🍾',
    name: 'Vintage Champagne & Crystal Flute Celebration Set',
    desc: 'Bottle of vintage French Brut champagne accompanied by two hand-blown lead-free crystal champagne flutes.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'housewarming', 'graduation', 'birthday']
  },
  {
    id: 'g94',
    emoji: '🎵',
    name: 'Retro Bluetooth Vinyl Record Turntable',
    desc: 'Vintage suitcase 3-speed turntable with built-in stereo speakers, headphone jack, and wireless bluetooth input.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'child', 'friend', 'parent'],
    occasions: ['birthday', 'anniversary', 'christmas', 'graduation', 'housewarming']
  },
  {
    id: 'g95',
    emoji: '🍳',
    name: 'Enameled Cast Iron Dutch Oven (6 Quart)',
    desc: 'Heavyweight porcelain enameled cast iron casserole pot for slow-simmered stews, artisan sourdough, and roasts.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['housewarming', 'anniversary', 'parentsday', 'christmas']
  },
  {
    id: 'g96',
    emoji: '🖼️',
    name: 'Custom Star Map Constellation Night Sky Print',
    desc: 'Personalized framed astronomical map depicting the exact celestial alignment over any chosen date and location.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'parent', 'friend', 'child'],
    occasions: ['anniversary', 'birthday', 'graduation', 'parentsday']
  },
  {
    id: 'g97',
    emoji: '🪴',
    name: 'Indoor Hydroponic Smart Herb Garden System',
    desc: 'LED grow light hydroponic garden with automatic timer and water circulation for growing fresh greens indoors.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'partner_spouse', 'friend', 'colleague'],
    occasions: ['housewarming', 'birthday', 'parentsday', 'christmas']
  },
  {
    id: 'g98',
    emoji: '🪡',
    name: 'Custom Embroidered Pet Portrait Sweatshirt',
    desc: 'Cozy crewneck fleece sweatshirt hand-embroidered with an accurate minimalist line illustration of their pet.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['partner_spouse', 'friend', 'child'],
    occasions: ['birthday', 'christmas', 'anniversary']
  },
  {
    id: 'g99',
    emoji: '🎸',
    name: 'Acoustic Guitar Starter Pack & Clip-On Tuner',
    desc: 'Full-size resonant dreadnought acoustic guitar with padded gig bag, picks, spare nylon strings, and strap.',
    budget: 'over100',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'partner_spouse', 'friend'],
    occasions: ['birthday', 'graduation', 'christmas']
  },
  {
    id: 'g100',
    emoji: '📦',
    name: 'Curated International Snack Mystery Box',
    desc: 'Exciting discovery box packed with 20 rare candies, savory chips, and sweet biscuits from Japan and South Korea.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['child', 'friend', 'colleague', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation']
  },

  // Additional 30+ items to reach ~135 total for thick tag coverage
  {
    id: 'g101',
    emoji: '☕',
    name: 'Handmade Ceramic Speckled Mug',
    desc: 'Wheel-thrown artisanal pottery coffee mug with warm earth glaze and comfortable ergonomic handle.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent'],
    occasions: ['teachersday', 'birthday', 'housewarming', 'christmas']
  },
  {
    id: 'g102',
    emoji: '🪔',
    name: 'Himalayan Pink Rock Salt Natural Lamp',
    desc: 'Hand-carved 100% pure Himalayan salt crystal glowing with a warm soothing amber hue on neem wood base.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'parent', 'colleague', 'partner_spouse'],
    occasions: ['housewarming', 'birthday', 'teachersday', 'christmas']
  },
  {
    id: 'g103',
    emoji: '🌱',
    name: 'Terrarium Miniature DIY Ecosystem Kit',
    desc: 'Glass apothecary jar with activated charcoal, river pebbles, potting soil, moss, and miniature figurines.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'colleague'],
    occasions: ['birthday', 'teachersday', 'housewarming']
  },
  {
    id: 'g104',
    emoji: '🎙️',
    name: 'USB Studio Condenser Podcast & Voice Microphone',
    desc: 'Plug-and-play cardioid microphone with tripod stand, pop filter, and zero-latency headphone monitoring.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'graduation', 'christmas']
  },
  {
    id: 'g105',
    emoji: '🥢',
    name: 'Japanese Hand-Carved Natural Wood Chopsticks Gift Set',
    desc: 'Set of 5 pairs of reusable ebony and rosewood chopsticks with ceramic rests in handmade gift box.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'parent', 'colleague', 'partner_spouse'],
    occasions: ['housewarming', 'birthday', 'anniversary']
  },
  {
    id: 'g106',
    emoji: '🧇',
    name: 'Mini Belgian Waffle Maker & Recipe Book',
    desc: 'Compact non-stick breakfast waffle iron that cooks 4-inch crispy waffles in under 3 minutes.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties'],
    relationships: ['child', 'friend', 'colleague', 'partner_spouse'],
    occasions: ['graduation', 'housewarming', 'birthday', 'christmas']
  },
  {
    id: 'g107',
    emoji: '🧊',
    name: 'Silicone Sphere & Giant Square Ice Cube Molds',
    desc: 'Food-grade silicone molds for making slow-melting 2.5" cocktail ice spheres and cocktail cubes.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'housewarming', 'christmas']
  },
  {
    id: 'g108',
    emoji: '🔖',
    name: 'Vintage Brass Metal Feather Bookmark',
    desc: 'Antique etched brass feather bookmark adorned with a natural 3D butterfly glass pendant.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent'],
    occasions: ['teachersday', 'birthday', 'christmas']
  },
  {
    id: 'g109',
    emoji: '🧶',
    name: 'Beginner Crochet Amigurumi Animal Kit',
    desc: 'Easy-to-learn starter yarn kit with pre-started yarn piece, safety eyes, ergonomic hook, and video tutorials.',
    budget: '10to30',
    genders: ['any', 'female'],
    ageBands: ['child', 'teen', 'twenties', 'thirties'],
    relationships: ['child', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g110',
    emoji: '🍵',
    name: 'Loose Leaf Blooming Flower Tea Assortment',
    desc: 'Tin of 12 hand-tied green tea balls that unfurl into vibrant edible flowers when steeped in hot water.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['parent', 'colleague', 'friend', 'partner_spouse'],
    occasions: ['parentsday', 'teachersday', 'housewarming', 'birthday']
  },
  {
    id: 'g111',
    emoji: '🕯️',
    name: 'Rechargeable Flameless Electric Arc Candle Lighter',
    desc: 'Windproof USB rechargeable plasma lighter with flexible 360-degree neck and LED battery indicator.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent'],
    occasions: ['housewarming', 'christmas', 'birthday']
  },
  {
    id: 'g112',
    emoji: '🛁',
    name: 'Expanding Bamboo Luxury Bathtub Caddy Tray',
    desc: 'Water-resistant bath caddy with book/tablet prop stand, wine glass slot, and soap holder.',
    budget: '30to50',
    genders: ['any', 'female'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'birthday', 'parentsday', 'housewarming']
  },
  {
    id: 'g113',
    emoji: '🥋',
    name: 'Waffle-Weave Unisex Kimono Spa Robe',
    desc: 'Breathable 100% lightweight organic cotton spa robe with deep pockets and waist tie.',
    budget: '30to50',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'parentsday', 'birthday', 'christmas']
  },
  {
    id: 'g114',
    emoji: '🪩',
    name: 'USB Mini Rotating Party Disco Strobe Light',
    desc: 'Sound-activated LED disco ball that syncs light shows to music beats via USB phone or power bank.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties'],
    relationships: ['child', 'friend', 'colleague'],
    occasions: ['birthday', 'christmas']
  },
  {
    id: 'g115',
    emoji: '🗺️',
    name: 'Custom City Map Grid Minimalist Wall Art',
    desc: 'High-resolution monochrome typographic poster mapping their hometown or favorite travel city.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'friend', 'colleague', 'parent'],
    occasions: ['housewarming', 'graduation', 'anniversary', 'birthday']
  },
  {
    id: 'g116',
    emoji: '🕶️',
    name: 'Blue Light Blocking Computer Glasses',
    desc: 'Lightweight TR90 frame eyewear filtering 99% of harmful digital screen blue rays to reduce eyestrain.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'child', 'partner_spouse'],
    occasions: ['graduation', 'birthday', 'teachersday', 'christmas']
  },
  {
    id: 'g117',
    emoji: '☕',
    name: 'Double-Walled Borosilicate Glass Coffee Cups (Set of 4)',
    desc: 'Insulated thermal glasses that keep espresso and lattes hot while remaining cool to the touch.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['colleague', 'friend', 'parent', 'partner_spouse'],
    occasions: ['housewarming', 'teachersday', 'birthday']
  },
  {
    id: 'g118',
    emoji: '🎒',
    name: 'Packable Water-Resistant Hiking Daypack (20L)',
    desc: 'Folds into its own tiny inner pocket for luggage, opening into a tough 20L outdoor backpack.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['friend', 'child', 'colleague', 'partner_spouse'],
    occasions: ['birthday', 'graduation', 'christmas']
  },
  {
    id: 'g119',
    emoji: '🧲',
    name: 'Magnetic Wristband for Screws, Nails & Drill Bits',
    desc: 'Breathable mesh wrist strap fitted with 15 strong neodymium magnets for effortless DIY fixes.',
    budget: 'under10',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'partner_spouse', 'friend'],
    occasions: ['parentsday', 'birthday', 'christmas']
  },
  {
    id: 'g120',
    emoji: '🌱',
    name: 'Microgreens Sprouting Starter Mason Jar Kit',
    desc: 'Two wide-mouth glass jars with stainless steel screen lids and organic broccoli/radish seeds.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'colleague', 'friend'],
    occasions: ['housewarming', 'parentsday', 'birthday']
  },
  {
    id: 'g121',
    emoji: '🧼',
    name: 'Handcrafted Sandalwood Beard Care Grooming Kit',
    desc: 'Organic conditioning beard oil, citrus balm, boar bristle brush, and handmade sandalwood comb.',
    budget: '10to30',
    genders: ['any', 'male'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['birthday', 'parentsday', 'anniversary', 'christmas']
  },
  {
    id: 'g122',
    emoji: '🎨',
    name: 'Custom Illustrated Family / Couple Digital Portrait',
    desc: 'Hand-drawn stylized digital art print crafted from your favorite photograph and framed in oak.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['anniversary', 'parentsday', 'housewarming', 'birthday']
  },
  {
    id: 'g123',
    emoji: '🍿',
    name: 'Silicone Microwave Popcorn Popper Bowl with Lid',
    desc: 'Collapsible silicone bowl for making healthy oil-free popcorn in 2.5 minutes with dishwasher cleanup.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['friend', 'child', 'colleague'],
    occasions: ['birthday', 'housewarming', 'christmas']
  },
  {
    id: 'g124',
    emoji: '🧴',
    name: 'Aromatherapy Lavender Pillow Mist & Sleep Spray',
    desc: 'Natural essential oil pillow mist that relaxes the nervous system for fast and peaceful sleep.',
    budget: 'under10',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'friend', 'parent', 'partner_spouse'],
    occasions: ['teachersday', 'parentsday', 'birthday', 'christmas']
  },
  {
    id: 'g125',
    emoji: '🍫',
    name: 'Single-Estate Dark Chocolate Tasting Flight (85%)',
    desc: 'Set of 5 single-origin chocolate bars sourced from Madagascar, Ecuador, and Ghana with tasting notes.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'colleague', 'friend'],
    occasions: ['anniversary', 'birthday', 'teachersday', 'christmas']
  },
  {
    id: 'g126',
    emoji: '🎵',
    name: 'Kalimba 17-Key Thumb Piano with Songbook',
    desc: 'Solid mahogany handcrafted musical instrument producing tranquil, soothing music effortlessly.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['child', 'teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['child', 'friend', 'partner_spouse'],
    occasions: ['birthday', 'christmas', 'graduation']
  },
  {
    id: 'g127',
    emoji: '📚',
    name: 'Custom Wooden Desktop Book & Tablet Stand',
    desc: 'Hand-finished walnut adjustable easel stand for cookbooks, tablets, and oversized study textbooks.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['colleague', 'parent', 'friend'],
    occasions: ['teachersday', 'graduation', 'birthday', 'housewarming']
  },
  {
    id: 'g128',
    emoji: '🫖',
    name: 'Heat-Resistant Glass Teapot with Removable Infuser',
    desc: 'Stovetop-safe borosilicate glass teapot with laser-etched stainless steel loose leaf tea filter.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'colleague', 'friend', 'partner_spouse'],
    occasions: ['parentsday', 'housewarming', 'teachersday', 'birthday']
  },
  {
    id: 'g129',
    emoji: '🥾',
    name: 'Thermal Merino Wool Hiking Socks (3-Pack)',
    desc: 'Ultra-cushioned moisture-wicking anti-blister merino socks engineered for all-season trail comfort.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['teen', 'twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['parent', 'partner_spouse', 'friend'],
    occasions: ['birthday', 'christmas', 'parentsday']
  },
  {
    id: 'g130',
    emoji: '🧀',
    name: 'Electric Swiss Raclette & Fondue Tabletop Grill',
    desc: '8-person dual-layer non-stick tabletop grill with mini melting pans for interactive dinner parties.',
    budget: '50to100',
    genders: ['any'],
    ageBands: ['twenties', 'thirties', 'forties', 'fifty_plus'],
    relationships: ['partner_spouse', 'parent', 'friend'],
    occasions: ['housewarming', 'christmas', 'anniversary', 'birthday']
  },
  {
    id: 'g131',
    emoji: '🌿',
    name: 'Acoustic White Noise Machine with Nature Sounds',
    desc: 'Compact sound therapy machine featuring 24 soothing soundscapes, warm night light, and sleep timer.',
    budget: '10to30',
    genders: ['any'],
    ageBands: ['any'],
    relationships: ['partner_spouse', 'parent', 'child', 'friend'],
    occasions: ['birthday', 'parentsday', 'christmas', 'housewarming']
  }
];

// INITIAL_BLOG_POSTS is imported and re-exported from ./blogPosts

export const INITIAL_STATIC_PAGES: Record<string, StaticPage> = {
  about: {
    title: 'About Wheel of Gift Idea',
    content: `<h2>About Wheel of Gift Idea</h2>
<p>Wheel of Gift Idea was born out of real frustration with endless, sponsored search engine listicles and decision fatigue. Whenever a birthday, holiday, or anniversary approaches, people spend hours scrolling through generic "50 Best Gifts" articles only to feel more overwhelmed than when they started.</p>
<p>We built <strong>Wheel of Gift Idea</strong> (wheelofgiftidea.com) as a <strong>100% free, non-commercial, and fun discovery tool</strong> to make finding thoughtful gift ideas delightful and effortless. By gathering a few key facts about who you are shopping for—such as their age, relationship, occasion, and your budget constraint—our smart matching algorithm curates a tight pool of ideas and lets fate make the final exciting pick via our spinning wheel!</p>
<p>Our catalog is continuously curated to highlight genuine quality, durability, uniqueness, and value across dozens of categories with zero sales pressure.</p>
<h3>Get in Touch & Suggest an Idea</h3>
<p>Have general feedback, technical inquiries, or an incredible gift suggestion you'd love to see added to our interactive wheel? We welcome your input!</p>
<p><strong>Official Contact Email:</strong> <a href="mailto:contact@wheelofgiftidea.com" class="text-[#4CC9F0] hover:underline font-mono">contact@wheelofgiftidea.com</a></p>`
  },
  contact: {
    title: 'Contact Us',
    content: `<h2>Contact Us</h2>
<p>Have a question, feedback, or a unique gift suggestion you think we should feature in the Wheel of Gift Idea catalog?</p>
<p>We would love to hear from you! Our team is dedicated to keeping our suggestions fresh, high quality, and delight-inducing.</p>
<p><strong>General Inquiries & Feedback:</strong> <a href="mailto:contact@wheelofgiftidea.com" class="text-[#4CC9F0] hover:underline font-mono">contact@wheelofgiftidea.com</a></p>
<p>We typically respond within 1–2 business days.</p>`
  },
  privacy: {
    title: 'Privacy Policy',
    content: `<p class="text-xs text-slate-400 font-mono mb-4">Last Updated: August 2026</p>
<p>At <strong>Wheel of Gift Idea</strong> (wheelofgiftidea.com), accessible from our website, safeguarding the privacy and personal integrity of our visitors is one of our fundamental commitments. This Privacy Policy outlines the categories of data handled by Wheel of Gift Idea, how local technologies are utilized, and the measures in place to ensure your privacy.</p>

<h3>1. Frictionless, Non-Commercial & Account-Free Architecture</h3>
<p>Wheel of Gift Idea is engineered as an open, non-commercial gift-discovery utility. <strong>You are never required to register, create an account, log in, or disclose Personally Identifiable Information (PII)</strong>—such as your full name, home address, phone number, email, or financial account details—to access our gift-matching engine, browse curated buying guides, or spin the interactive wheel.</p>

<h3>2. Browser Local Storage & Device Preferences</h3>
<p>To deliver a smooth and responsive experience without storing your personal habits on external cloud databases, Wheel of Gift Idea relies on standard browser <strong>LocalStorage</strong> and session storage on your device. This technology is used strictly to:</p>
<ul>
  <li>Retain your active gift filter criteria (e.g., recipient gender, age group, relationship, occasion, and budget constraint).</li>
  <li>Maintain your interactive wheel spin tally and celebratory award state.</li>
  <li>Cache catalog data locally to ensure instant page transitions and high-performance animation rendering.</li>
</ul>
<p>This information remains exclusively within your local web browser sandbox. We never harvest, sell, rent, or trade your local preference configurations with third-party data brokers.</p>

<h3>3. Third-Party Advertising & Google AdSense Disclosures</h3>
<p>To support server hosting and maintain Wheel of Gift Idea as a 100% free utility for everyone, we may display advertisements served through third-party advertising networks, such as <strong>Google AdSense</strong>. Third-party ad networks and ad servers may employ cookies, JavaScript, and Web Beacons to measure advertising effectiveness and personalize ad content based on your prior browsing history across the internet.</p>
<ul>
  <li><strong>DoubleClick DART Cookies:</strong> Google uses DART cookies to serve contextual and interest-based ads to visitors based on their visit to Wheel of Gift Idea and other websites on the internet.</li>
  <li><strong>Opt-Out Options:</strong> You may opt out of personalized advertising at any time by configuring your preferences at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-[#4CC9F0] underline">Google Ads Settings</a>, or via the <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" class="text-[#4CC9F0] underline">Network Advertising Initiative (NAI)</a> opt-out tool.</li>
</ul>

<h3>4. Server Log Files & Diagnostic Telemetry</h3>
<p>In accordance with standard internet infrastructure protocols, our hosting infrastructure may automatically record non-personal technical telemetry from incoming HTTP requests (such as generic browser type, operating system version, referring/exit URLs, and coarse server request timestamps). This diagnostic data is utilized strictly for uptime monitoring, denial-of-service protection, and server capacity planning.</p>

<h3>5. International Data Rights (GDPR, UK GDPR & CCPA/CPRA)</h3>
<p>Under global data protection standards (including the EU GDPR, UK GDPR, and California Consumer Privacy Act):</p>
<ul>
  <li><strong>Right to Know & Access:</strong> You have the right to know what personal data is maintained. Because Wheel of Gift Idea does not maintain user account databases, no personal profiles exist on our servers.</li>
  <li><strong>Right to Erasure:</strong> You can completely erase all locally stored data, spin history, and active filter preferences at any time by clearing your browser cache and site data or selecting &ldquo;Reset&rdquo; within the filter interface.</li>
  <li><strong>Do Not Sell or Share My Information:</strong> Wheel of Gift Idea does not sell or share personal information with third parties for commercial remuneration.</li>
</ul>

<h3>6. Children's Online Privacy Protection (COPPA)</h3>
<p>Wheel of Gift Idea is intended for general audiences and does not knowingly collect or solicit personal information from children under the age of 13. If you believe that a minor has provided personal details through our website, please notify us so that we can immediately purge any associated diagnostic logs.</p>

<h3>7. Changes to this Policy</h3>
<p>We reserve the right to revise this Privacy Policy periodically to reflect technological advancements, legal updates, or service enhancements. The current version will always be accessible on this page with an updated timestamp.</p>`
  },
  terms: {
    title: 'Terms of Service',
    content: `<p class="text-xs text-slate-400 font-mono mb-4">Last Updated: August 2026</p>
<p>Welcome to <strong>Wheel of Gift Idea</strong> (wheelofgiftidea.com). By accessing, browsing, or utilizing this website, including its interactive spinning wheel, algorithmic recommendation filters, and editorial gift guides, you acknowledge that you have read, understood, and agreed to be bound by the following Terms of Service ("Terms"). If you do not accept these Terms, please do not use the website.</p>

<h3>1. Free Inspirational & Entertainment Purpose</h3>
<p>Wheel of Gift Idea operates as a 100% free, non-commercial algorithmic gift idea curator and interactive discovery game. All gift suggestions, categorized lists, milestone buying guides, price ranges, and wheel results are generated for <strong>inspirational, educational, and entertainment purposes only</strong>.</p>
<p>Wheel of Gift Idea is not a direct merchant, manufacturer, distributor, or commercial fulfillment store. We do not sell items directly, process payments, or collect billing credentials.</p>

<h3>2. Intellectual Property & Permitted Personal Use</h3>
<p>All original creative assets on Wheel of Gift Idea—including site layout, wheel mechanics, curated editorial reviews, custom algorithms, illustrations, branding, and styling—are the intellectual property of Wheel of Gift Idea and protected by applicable copyright and unfair competition laws.</p>
<p>You agree to use Wheel of Gift Idea only for lawful, personal, and non-commercial gift discovery. You agree NOT to:</p>
<ul>
  <li>Extract, harvest, or scrape catalog data, editorial text, or algorithms using automated scripts, spiders, or scrapers without prior written consent.</li>
  <li>Interfere with, overburden, or compromise the stability and security of Wheel of Gift Idea's servers or network infrastructure.</li>
  <li>Reproduce, duplicate, copy, or redistribute our editorial articles or proprietary code for commercial gain without explicit authorization.</li>
</ul>

<h3>3. Disclaimer of Warranties</h3>
<p>Wheel of Gift Idea is provided strictly on an <strong>&ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis</strong>. We make no express or implied warranties, representations, or endorsements whatsoever regarding the accuracy, completeness, reliability, fitness for a particular purpose, or uninterrupted availability of the site or any featured ideas.</p>

<h3>4. Limitation of Liability</h3>
<p>To the maximum extent permitted by applicable law, Wheel of Gift Idea and its developers, operators, and contributors shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your access to, use of, or inability to use this website, or reliance on any gift recommendations provided herein.</p>

<h3>5. Amendments to Terms</h3>
<p>We reserve the right to modify, amend, or replace these Terms of Service at our sole discretion at any time. Changes take effect immediately upon posting to this page. Your continued use of Wheel of Gift Idea following any modifications indicates your acceptance of the revised Terms.</p>`
  }
};

export const INITIAL_AD_SETTINGS: AdSettings = {
  enabled: false,
  clientCode: '<!-- Google AdSense Unit Placeholder -->\n<div class="text-xs text-slate-500 font-mono">Ad slot active: client-ca-pub-000000000000</div>'
};

// Active FAQ items for current 100% free non-commercial discovery mode
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is Wheel of Gift Idea completely free to use, and do I need to create an account?',
    answer: 'Wheel of Gift Idea is 100% free with zero sign-up or registration required. You can choose recipient criteria, spin the wheel unlimited times, and explore in-depth buying guides immediately without sharing any personal information or making any purchases.'
  },
  {
    question: 'How does the gift matching algorithm work?',
    answer: 'Our engine matches 5 key criteria: Recipient Gender, Age Group, Relationship, Occasion, and Budget. If a specific narrow combination has fewer matching items, our system progressively relaxes non-critical filters (Occasion → Relationship → Age → Gender) while strictly preserving your Budget constraint, ensuring you always get realistic, top-rated recommendations.'
  },
  {
    question: 'Why use an interactive wheel instead of a regular listicle?',
    answer: 'Standard search results and 50-item listicles trigger severe decision fatigue and cognitive overload. Wheel of Gift Idea narrows down your best tailored options into an engaging, visual format that brings back serendipity, excitement, and quick confidence to your gift shopping.'
  },
  {
    question: 'What should I do if the wheel lands on an item that isn\'t quite right?',
    answer: 'You can tap the golden center "SPIN!" button to spin again instantly, adjust any filter in the criteria panel (like switching the budget bracket or occasion), or browse our detailed editorial guides in the Blog section for deep-dive category breakdowns.'
  },
  {
    question: 'How are gift items selected and vetted for the catalog?',
    answer: 'Every gift is researched and hand-curated by our editorial team. We prioritize practical utility, verified high customer ratings (4.5+ stars), build quality, and aesthetic appeal across all price points ($10 budget finds to $100+ milestone keepsakes).'
  }
];

// Archived FAQ items for future affiliate monetization (can be restored when affiliate links are activated)
export const FUTURE_AFFILIATE_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can I purchase gifts directly through Wheel of Gift Idea?',
    answer: 'Wheel of Gift Idea is an independent curator and recommendation engine. When you click "View & Buy" on a recommended gift, you are directed securely to official retailers (like Amazon or brand storefronts) to complete your purchase at standard retail prices with zero added fees.'
  },
  {
    question: 'Are product prices and availability guaranteed?',
    answer: 'Third-party merchants manage real-time inventory and pricing dynamically. While our budget categories accurately reflect typical retail price ranges, prices and stock levels on retailer sites may fluctuate during sales and holiday seasons.'
  }
];
