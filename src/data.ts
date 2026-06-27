import { Product, ProcessStep, Review } from './types';
import blueMandala1 from './blue_mandala_1.jpg';
import blueMandala2 from './blue_mandala_2.jpg';
import multiColorMandala1 from './multi_color_mandala_1.jpg';
import multiColorMandala2 from './multi_color_mandala_2.jpg';
import mayuraMandala1 from './mayura_mandala_1.jpg';
import mayuraMandala2 from './mayura_mandala_2.jpg';
import celestialMandala1 from './celestial_mandala_1.jpg';
import celestialMandala2 from './celestial_mandala_2.jpg';
import kamalMandala1 from './kamal_mandala_1.jpg';
import kamalMandala2 from './kamal_mandala_2.jpg';
import sunburstGreen1 from './sunburst_green_1.jpg';
import sunburstGreen2 from './sunburst_green_2.jpg';
import pushpaStar1 from './pushpa_star_1.jpg';
import pushpaStar2 from './pushpa_star_2.jpg';

export const LIPPAN_PRODUCTS: Product[] = [
  {
    id: 'blue-kamal',
    name: 'Neel Kamal Mud & Mirror Lippan Art',
    price: 3499,
    originalPrice: 4299,
    size: '14" Diameter (Circular)',
    shape: 'Circle',
    image: blueMandala1,
    rating: 0,
    reviewsCount: 0,
    description: 'A breathtaking royal blue circular mandala panel that brings the radiant energy of traditional mud relief art into your space. Each circular path is hand-sculpted by Ruchi Sharma using a refined ceramic powder clay mix, then painted in rich, deep cobalt blue Fevicryl colours. Glistening geometric mirrors are individually pressed into the clay patterns, creating a mesmerizing sunburst reflection when illuminated by light.',
    clayComposition: 'Ceramic powder mud paste blended with organic structural binders.',
    mirrorsUsed: '144+ hand-cut geometric leaf, diamond, and square mirrors',
    weight: '3.2 lbs',
    inStock: true,
    category: 'Traditional Mandalas',
    gallery: [blueMandala1, blueMandala2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'utsav-multicolor',
    name: 'Utsav Vibrant Multi-Color Lippan Art',
    price: 1299,
    originalPrice: 1699,
    size: '8" Diameter (Circular)',
    shape: 'Circle',
    image: multiColorMandala1,
    rating: 0,
    reviewsCount: 0,
    description: 'A celebration of Kutch\'s festive energy, this multi-colored circular Lippan panel features vibrant concentric scallops and archways painted in rich, cheerful acrylic hues. The center forms a striking diamond motif set with high-relief red clay buttons, while intricate borders of hand-cut leaf and diamond mirrors frame the panel. Sculpted by Ruchi Sharma, it acts as a stunning statement piece that breathes warmth and traditional craftsmanship into any modern living space.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '1.1 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [multiColorMandala1, multiColorMandala2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'suryakiran-sunburst',
    name: 'Surya Kiran Yellow Sunburst Lippan Art',
    price: 1899,
    originalPrice: 2399,
    size: '10" Diameter (Circular)',
    shape: 'Circle',
    image: mayuraMandala1,
    rating: 0,
    reviewsCount: 0,
    description: 'Bask in the radiant warmth of the sun with this exquisite circular Lippan plaque. Painted in a bright marigold yellow and terracotta red palette, it features a central sacred lotus/floral motif hand-sculpted using fine clay outlines. Radiant sunburst petals, embedded with premium diamond and circular mirrors, frame the outer edge, catching the light like sunbeams. A perfect piece to invite positive, solar energy and timeless Kutch heritage into your home.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '1.8 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [mayuraMandala1, mayuraMandala2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'celestial-galaxy',
    name: 'Chandra Celestial Pink & Blue Lippan Art',
    price: 3699,
    originalPrice: 4499,
    size: '14" Diameter (Circular)',
    shape: 'Circle',
    image: celestialMandala1,
    rating: 0,
    reviewsCount: 0,
    description: 'A celebration of celestial bodies and organic rhythms, this circular Lippan plaque features a striking pink-blue celestial starburst motif. Hand-molded using premium Fevicryl Mouldit clay on a sturdy MDF board, it is decorated with glistening diamond and circular mirrors that create a sparkling reflection under lighting.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '3.2 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [celestialMandala1],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'pankhuri-floral',
    name: 'Pankhuri Blue & Pink Floral Lippan Art',
    price: 1199,
    originalPrice: 1499,
    size: '8" Diameter (Circular)',
    shape: 'Circle',
    image: kamalMandala1,
    rating: 0,
    reviewsCount: 0,
    description: 'Enrich your home with the joyful colors and meticulous geometry of this circular Lippan plaque. Painted in a bright royal blue and soft blossom pink palette, it features a central lotus bloom detailed in warm yellow and green tones. Hand-sculpted using professional-grade Fevicryl Mouldit clay on a seasoned MDF board, the design is adorned with shimmering circular and hexagonal mirrors that catch the ambient light from every angle.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '1.1 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [kamalMandala1, kamalMandala2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'pushpa-green',
    name: 'Pushpa Orange & Green Floral Lippan Art',
    price: 449,
    originalPrice: 599,
    size: '4" Diameter (Circular)',
    shape: 'Circle',
    image: sunburstGreen1,
    rating: 0,
    reviewsCount: 0,
    description: 'Bring a splash of natural energy and Kutch heritage to your walls with this gorgeous circular Lippan plaque. Featuring a prominent central flower in fiery orange and sunlit yellow, it is beautifully offset by a lush green outer border and concentric bands of clay relief details. Shimmering diamond and circular mirrors are hand-embedded throughout, casting bright, joyful reflections in any natural or indoor ambient light.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '0.3 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [sunburstGreen1, sunburstGreen2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  },
  {
    id: 'pushpa-star',
    name: 'Pushpa Starburst Orange & Blue Lippan Art',
    price: 449,
    originalPrice: 599,
    size: '4" Diameter (Circular)',
    shape: 'Circle',
    image: pushpaStar1,
    rating: 0,
    reviewsCount: 0,
    description: 'Add a splash of organic symmetry to your space with this circular Lippan plaque. Painted in a bright sunset orange and royal blue color scheme, it features a central starburst blossom pattern detailed with white clay relief lines and highlighted in soft pink. Adorned with hand-cut diamond and micro-circular glass mirrors, it scatters and plays with natural light to illuminate your room.',
    clayComposition: 'Fevicryl Mouldit epoxy clay compound mixed with mineral binders.',
    mirrorsUsed: 'Intricate arrangement of round, diamond, and leaf mirrors',
    weight: '0.3 lbs',
    inStock: true,
    category: 'Contemporary Heritage',
    gallery: [pushpaStar1, pushpaStar2],
    materials: ['MDF Board', 'Mirror', 'Fevicryl Mouldit Epoxy Compound', 'Fevicryl Acrylic Colours'],
    refundPolicy: 'Every Mitti & Darpan artwork is uniquely handcrafted by Ruchi Sharma. Because of the delicate, custom nature of the craft, we do not accept general returns or cancellations once production starts. However, we provide a 100% Safe-Transit Replacement Guarantee. You must record a continuous, unedited unboxing video from package opening to final inspection. If transit damage occurs, send this video and photos to +91 96968 66194 within 24 hours of delivery, and we will ship a replacement free of cost.'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Seasoned Base',
    description: 'We treat seasoned marine-grade birchwood to ensure it is moisture-proof and structurally rigid to prevent any warping under the clay weight over generations.',
    iconName: 'Layers',
    clayTextureLabel: 'Birchwood'
  },
  {
    step: 2,
    title: 'Clay Relief Work',
    description: 'Ruchi Sharma hand-rolls natural clay mixed with organic fiber binders into uniform cords, meticulously sculpting intricate raised outline paths.',
    iconName: 'Fingerprint',
    clayTextureLabel: 'Mud Relieving'
  },
  {
    step: 3,
    title: 'Mirror Embedding',
    description: 'Before the relief outlines dry, individual hand-cut glass mirrors (diamanté, teardrops, rounds) are gently pressed into the moist channels.',
    iconName: 'Sparkles',
    clayTextureLabel: 'Glass Setting'
  },
  {
    step: 4,
    title: 'Matte Sealing',
    description: 'Following a slow natural drying process, we seal the art with premium clay primers and protective eco-friendly matte coatings to secure mirrors forever.',
    iconName: 'ShieldCheck',
    clayTextureLabel: 'Insured Finish'
  }
];

export const CLIENT_REVIEWS: Review[] = [];
