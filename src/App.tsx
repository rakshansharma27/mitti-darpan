import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Fingerprint, 
  ShieldCheck, 
  Truck, 
  HelpCircle, 
  ArrowRight, 
  Mail, 
  Check, 
  Phone, 
  Lock, 
  Star, 
  Heart,
  Package,
  Info,
  MessageCircle,
  X
} from 'lucide-react';

import { Product, CartItem, CustomOrderRequest } from './types';
import { LIPPAN_PRODUCTS, PROCESS_STEPS } from './data';

import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import kutchEmbroidery from './kutch_embroidery.png';
import CartDrawer from './components/CartDrawer';
import CustomConfigurator from './components/CustomConfigurator';
import InteractiveLippanMandala from './components/InteractiveLippanMandala';
import ProductDetailPage from './components/ProductDetailPage';
import { useCart } from './hooks/useCart';

export default function App() {
  // Custom shopping cart hook
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    clearCart
  } = useCart();
  
  // Coupon/Promo code states
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LAUNCH15') {
      setAppliedCoupon('LAUNCH15');
      setCouponDiscount(0.15);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  // Custom commission modal
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState<boolean>(false);
  
  // Active policy for legal modals
  const [activePolicy, setActivePolicy] = useState<'refund' | 'privacy' | 'terms' | null>(null);
  
  // Quick View selected product
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Dynamic Product Page Routing State
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const id = hash.substring('#product/'.length);
        const found = LIPPAN_PRODUCTS.find(p => p.id === id);
        if (found) {
          setActiveProduct(found);
          setActiveGalleryImage(found.image);
          window.scrollTo(0, 0);
        } else {
          setActiveProduct(null);
        }
      } else {
        setActiveProduct(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [LIPPAN_PRODUCTS]);

  // Interactive Mandala color switcher state in Hero
  const [heroClayColor, setHeroClayColor] = useState<'cream' | 'terracotta' | 'ochre'>('cream');

  // Checkout process simulation states
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'processing' | 'success'>('idle');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '', address: '' });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // General query contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // FAQ toggles
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomRequestSubmit = (request: CustomOrderRequest) => {
    const email = 'rakshansharma644@gmail.com';
    const subject = encodeURIComponent('Custom Lippan Art Commission Request');
    const body = encodeURIComponent(
      `Hi Mitti & Darpan Studio,\n\n` +
      `I would like to request a custom Lippan Art commission with the following specifications:\n\n` +
      `- Shape: ${request.shape}\n` +
      `- Size: ${request.size}\n` +
      `- Color Theme: ${request.colorTheme}\n` +
      `- Mirror Style: ${request.mirrorStyle}\n` +
      (request.customText ? `- Special Instructions: ${request.customText}\n` : '') +
      `- Shipping: ${request.shippingOption}\n\n` +
      `Please let me know the next steps and estimated pricing.\n\n` +
      `Thank you!`
    );
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  // Mock Checkout simulation
  const handleCheckoutTrigger = () => {
    setCheckoutStep('form');
    setIsCheckingOut(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    
    // Simulate gateway handshakes
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2800);
  };

  // Resolve step icon dynamically
  const getProcessIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-gold-600" />;
      case 'Fingerprint': return <Fingerprint className="w-5 h-5 text-gold-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-gold-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-gold-600" />;
      default: return <Sparkles className="w-5 h-5 text-gold-600" />;
    }
  };

  const faqs = [
    {
      q: "What is Lippan Art, and where does it originate?",
      a: "Lippan Art (historically known as Lippan Kaam) is a traditional clay relief and mirror craft from the Kutch desert region of Gujarat, India. Originally used by pastoral communities to insulate the walls of their mud huts (Bhungas), it combines natural soils and straw binders with mirror glass reflections to beautifully scatter scarce light."
    },
    {
      q: "Are the mirrors fragile? How do you guarantee they won't arrive broken?",
      a: "Yes, mirrors are delicate, which is why we offer a 100% Safe-Transit Guarantee. Each wall panel is secured in bespoke, tight-fitting high-density foam padding and shipped within double-wall wooden-fortified cardboard crates. In the rare event of damage, we will ship a replacement immediately at no cost."
    },
    {
      q: "Can I hang these outdoors or in high-moisture bathrooms?",
      a: "Our Lippan panels are triple-sealed with moisture-resistant matte coatings. However, because they are crafted with natural clays, they are designed for indoor display and should avoid direct exposure to continuous water streams or heavy downpours."
    },
    {
      q: "How long do custom commissions take to craft?",
      a: "Custom orders take approximately 7-10 days of hands-on sculpting and slow, natural curing to avoid micro-fractures in the clay outline. Shipping takes an additional 3-5 business days."
    }
  ];

  return (
    <div className="min-h-screen bg-grainy text-earth-900 font-sans antialiased flex flex-col justify-between">
      
      {/* Dynamic Top Announcement Banner */}
      <div className="bg-earth-900 text-gold-100 text-[11px] uppercase tracking-[0.25em] font-semibold py-2 px-4 text-center border-b border-gold-400/20 flex items-center justify-center gap-1.5 flex-wrap">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse animate-duration-1000" />
        <span>🎉 Use code <strong className="text-white font-sans bg-earth-800 border border-gold-400/30 px-1.5 py-0.5 rounded select-all font-bold">LAUNCH15</strong> for 15% off first orders!</span>
        <span className="hidden sm:inline">|</span>
        <span>Premium safe crated fragile shipping on us</span>
      </div>

      {/* Primary Navigation Header */}
      <Navbar 
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
        scrollToSection={scrollToSection}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-grow">
        {activeProduct ? (
          <ProductDetailPage 
            product={activeProduct}
            onBack={() => { window.location.hash = ''; }}
            onAddToCart={handleAddToCart}
            activeImage={activeGalleryImage}
            setActiveImage={setActiveGalleryImage}
            setActivePolicy={setActivePolicy}
          />
        ) : (
          <>
            {/* 1. HERO SECTION */}
        <section id="hero" className="relative py-12 lg:py-24 overflow-hidden border-b border-earth-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Premium Value Proposition Copy */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-earth-200/50 border border-earth-300 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-bold text-earth-800">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
                  Authentic Kutch Clay Heritage
                </div>

                <div className="space-y-4">
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-earth-950 leading-[1.1]">
                    Bring Traditional <br />
                    <span className="text-earth-700 italic">Elegance</span> to <br className="hidden sm:inline" />
                    Modern Spaces
                  </h1>
                  <p className="text-sm sm:text-base text-earth-700 leading-relaxed max-w-xl font-sans">
                    Discover Lippan Kaam—the ancient mud and mirror relief work of Gujarat. Hand-molded clay lines embedded with twinkling hand-cut mirrors that capture, bend, and reflect your room's ambient light.
                  </p>
                </div>

                {/* Bullet USP Indicators */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-earth-700 font-sans">
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-gold-600" />
                    <span>100% Hand-Sculpted Mud</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-gold-600" />
                    <span>Authentic Glass Mirrors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-gold-600" />
                    <span>Seasoned Warp-Proof Base</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-gold-600" />
                    <span>Anti-Breakage Transit Guarantee</span>
                  </div>
                </div>

                {/* Primary Call to Action Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => scrollToSection('shop')}
                    className="px-8 py-4 bg-earth-800 hover:bg-earth-900 text-white hover:text-gold-100 text-xs uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Explore Featured Collection
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Premium Interactive Glistener & Styling Preview */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                
                {/* Simulated frame styling environment container */}
                <div className="relative p-6 sm:p-8 bg-white border border-earth-200/80 rounded-sm clay-shadow-lg flex flex-col items-center w-full max-w-md">
                  
                  {/* Absolute subtle background wall grid */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-earth-50/50 opacity-40 pointer-events-none" />

                  {/* Dynamic interactive mandala preview */}
                  <InteractiveLippanMandala 
                    size={280} 
                    clayColor={heroClayColor} 
                    className="relative z-10 animate-float"
                  />

                  {/* Interactive Clay Color Customization Picker */}
                  <div className="mt-8 w-full border-t border-earth-100 pt-5 z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-earth-500 font-sans flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-earth-400" /> Mud Base Pigment Preview
                      </span>
                      <span className="text-xs font-semibold text-earth-800 font-sans capitalize">
                        {heroClayColor === 'cream' ? 'Sands of Kutch (Cream)' : heroClayColor === 'terracotta' ? 'Earthy Soil (Terracotta)' : 'Harvest Sun (Ochre)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setHeroClayColor('cream')}
                        className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          heroClayColor === 'cream' 
                            ? 'bg-earth-50 border-earth-800 text-earth-900 shadow-xs' 
                            : 'bg-white border-earth-200 text-earth-400 hover:text-earth-700'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#FAF6ED] border border-earth-300" />
                        Cream
                      </button>
                      <button
                        onClick={() => setHeroClayColor('terracotta')}
                        className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          heroClayColor === 'terracotta' 
                            ? 'bg-earth-50 border-earth-800 text-earth-900 shadow-xs' 
                            : 'bg-white border-earth-200 text-earth-400 hover:text-earth-700'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#8C4B27] border border-earth-300" />
                        Terracotta
                      </button>
                      <button
                        onClick={() => setHeroClayColor('ochre')}
                        className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          heroClayColor === 'ochre' 
                            ? 'bg-earth-50 border-earth-800 text-earth-900 shadow-xs' 
                            : 'bg-white border-earth-200 text-earth-400 hover:text-earth-700'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-[#C58C40] border border-earth-300" />
                        Ochre
                      </button>
                    </div>
                  </div>

                </div>

                <p className="text-[10px] text-earth-500 uppercase tracking-widest mt-4 text-center font-sans font-medium">
                  ✨ Drag your mouse over the art above to interact with mirrors
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* 1.5 HERITAGE STORY SECTION */}
        <section id="story" className="py-16 sm:py-24 bg-earth-50 border-b border-earth-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Visual Story Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative overflow-hidden rounded border border-earth-200 shadow-lg group">
                  <img 
                    src={kutchEmbroidery} 
                    alt="Traditional Lippan Art Backdrop" 
                    className="w-full h-80 object-cover filter sepia-[15%] transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-950/60 via-transparent to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">Handcrafted Indian Art</span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">Preserving Culture & Theme</h4>
                  </div>
                </div>
                
                {/* Historical Quote Block */}
                <div className="bg-white/80 border-l-4 border-gold-500 p-4 rounded-r shadow-2xs text-left">
                  <p className="text-xs text-earth-700 font-sans italic leading-relaxed">
                    "The circular mud bhungas are not just homes; they are canvases. When the night falls and the oil lamp is lit, the mirrors reflect a single flame into a thousand stars."
                  </p>
                  <span className="text-[10px] uppercase font-bold text-earth-500 mt-2 block font-sans">— Traditional Lippan Proverb</span>
                </div>
              </div>

              {/* Right Column: Heritage Copy */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
                  The Kutch Origin Story
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-950 leading-tight">
                  A Thousand Years of Clay & Reflections
                </h2>
                <div className="w-16 h-0.5 bg-gold-400" />
                
                <div className="space-y-4 text-xs sm:text-sm text-earth-700 font-sans leading-relaxed">
                  <p>
                    Lippan Kaam (meaning <strong>"clay relief work"</strong>) is a traditional mural craft originating from the salt deserts of Kutch, Gujarat. Historically, the pastoral <em>Rabari</em> and <em>Mutwa</em> communities used this plaster technique to insulate the walls of their circular mud houses—known as <strong>bhungas</strong>—against the intense sun.
                  </p>
                  <p>
                    Artisans combined damp mud with organic binders, forming long circular cords of clay. Meticulously kneading and rolling the clay between their palms, they sculpted patterns representing local peacocks, temples, and cosmological stars directly onto the walls.
                  </p>
                  <p>
                    Before the clay could dry, tiny pieces of hand-cut glass mirrors—called <strong>darpan</strong>—were pressed into the patterns. Originally sourced from reflective glass scraps, these mirrors amplified the light of a single clay oil lamp, illuminating the entire room with dazzling reflections.
                  </p>
                  <p className="font-medium text-earth-900 bg-earth-200/30 p-3 rounded-sm border-l-2 border-earth-600">
                    At Mitti & Darpan, we celebrate this timeless heritage. Every single plaque is lovingly handcrafted by Ruchi Sharma, keeping ancestral clay relief techniques alive while supporting and preserving authentic Indian theme, culture, and craftsmanship.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. THE CRAFTSMANSHIP PROCESS SECTION */}
        <section id="process" className="py-16 sm:py-24 bg-white border-b border-earth-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
                The Heritage Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-950">
                How Traditional Lippan Kaam is Born
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
              <p className="text-sm text-earth-600 leading-relaxed max-w-2xl mx-auto">
                Each masterpiece is hand-molded and cured slowly by Ruchi Sharma. It takes days of precise clay sculpting and individual mirror calculations to produce a single resilient design.
              </p>
            </div>

            {/* 4-Step Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              
              {/* Connecting thread line on desktop */}
              <div className="hidden lg:block absolute top-[43px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-earth-200 z-0" />

              {PROCESS_STEPS.map((step) => (
                <div 
                  key={step.step} 
                  className="relative group bg-earth-50 border border-earth-200/60 p-6 rounded-sm text-left shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full z-10"
                >
                  <div>
                    {/* Badge Number and Icon Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 bg-white border border-earth-200 rounded-full flex items-center justify-center shadow-2xs relative z-10">
                        {getProcessIcon(step.iconName)}
                      </div>
                      <span className="text-3xl font-serif font-extrabold text-earth-300/80 leading-none">
                        0{step.step}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-earth-900 mb-2 group-hover:text-earth-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-earth-600 leading-relaxed font-sans mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Craft texture label tag */}
                  <div className="border-t border-earth-200/60 pt-3 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-earth-400">
                      Craft Phase
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-earth-700 px-2 py-0.5 bg-white border border-earth-200 rounded-sm">
                      {step.clayTextureLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive video snippet disclaimer / bottom tip */}
            <div className="mt-12 bg-earth-50/80 border border-earth-200 rounded p-4 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3.5 text-xs text-earth-700">
              <span className="px-2.5 py-1 bg-earth-800 text-gold-200 text-[10px] uppercase tracking-widest font-bold rounded">
                Heritage Fact
              </span>
              <p className="text-center sm:text-left leading-relaxed">
                Traditional mud relief is historically bound with wild donkey dung or husks which provide high tensile fiber. Ruchi Sharma modernizes this by replacing organic animal material with hypoallergenic cotton fibers and water-resistant resins. <strong>100% scentless, allergy-safe, and infinitely more durable.</strong>
              </p>
            </div>

          </div>
        </section>


        {/* 3. FEATURED COLLECTION */}
        <section id="shop" className="py-16 sm:py-24 border-b border-earth-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="text-left space-y-3 max-w-2xl">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
                  Limited Best Sellers
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-950">
                  Featured Clay & Mirror Pieces
                </h2>
                <div className="w-16 h-0.5 bg-gold-400" />
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans mt-2">
                  Each plaque is a stand-alone design piece, lovingly signed on the reverse by Ruchi Sharma. Perfect as standalone focal accents or nested sets.
                </p>
              </div>

              {/* Filtering summary stats badge */}
              <div className="bg-earth-50 border border-earth-200 rounded p-3 text-xs text-earth-700 flex items-center gap-3 self-start md:self-auto font-sans">
                <div className="flex flex-col">
                  <span className="text-earth-400 text-[10px] uppercase">Active Batch</span>
                  <span className="font-bold">July 2026 Selection</span>
                </div>
                <div className="h-8 w-px bg-earth-200" />
                <div className="flex flex-col">
                  <span className="text-earth-400 text-[10px] uppercase">Available</span>
                  <span className="font-bold text-emerald-700">{LIPPAN_PRODUCTS.length} Units Total</span>
                </div>
              </div>
            </div>

            {/* Product Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LIPPAN_PRODUCTS.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  product={prod} 
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Bottom Special Commission Alert CTA */}
            <div className="mt-16 bg-white border border-earth-200/80 rounded-sm p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 clay-shadow-sm">
              <div className="text-left space-y-1 max-w-2xl">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-earth-950">
                  Need a bespoke size, specific color, or multi-panel gallery wall?
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  Ruchi Sharma frequently designs customized Lippan plaques for homes, yoga spaces, and traditional environments. Reach out to our commission studio to finalize details.
                </p>
              </div>
              <a
                href="https://wa.me/919696866194?text=Hi%20Rakshan,%20I'm%20interested%20in%20a%20custom%20Lippan%20art%20commission!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-widest font-bold rounded-sm shadow hover:shadow-md transition-all flex-shrink-0 cursor-pointer font-sans text-center animate-pulse"
              >
                Discuss on WhatsApp
              </a>
            </div>

          </div>
        </section>


        {/* 4. TRUST & SHIPPING FRAGILE INSURANCE BANNER */}
        <section className="py-12 bg-earth-900 text-white relative overflow-hidden">
          {/* Subtle geometric circles in background */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-white/5 -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full border border-white/5 -ml-20 -mb-20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              {/* Left Title Column with Insured Stamp */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-gold-300 border border-gold-400/30 shrink-0">
                  <Truck className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <span className="text-gold-400 text-[10px] uppercase tracking-widest font-bold block mb-0.5">
                    100% Zero-Risk Courier Pledge
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    Safe & Insured <br />
                    Fragile Shipping
                  </h2>
                </div>
              </div>

              {/* Right Detail Columns */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                <div>
                  <h3 className="font-serif text-sm font-bold text-gold-200 mb-1 flex items-center gap-1.5">
                    <Package className="w-4.5 h-4.5" /> High-Impact Bubble Armor
                  </h3>
                  <p className="text-xs text-earth-200 leading-relaxed font-sans">
                    Each clay panel is enveloped in custom-cut, high-impact foam casings and shipped inside heavy-gauge, double-wall wood-braced cardboard crates to prevent direct vibration impacts.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-gold-200 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5" /> Full Replacement Guarantee
                  </h3>
                  <p className="text-xs text-earth-200 leading-relaxed font-sans">
                    Mirrors are sensitive, but your mind should be at ease. In the rare event a mirror panel is fractured during transit, simply photograph it and we will dispatch a brand new replacement frame for free.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>




        {/* 6. PLEDGE OF AUTHENTICITY & DIRECT CONTACT */}
        <section className="py-16 sm:py-24 bg-white border-b border-earth-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-12">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
                Honest Craftsmanship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-950">
                Our Pledge of Authenticity
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            </div>

            <div className="bg-earth-50 border border-earth-200/80 rounded-sm p-6 sm:p-10 text-center space-y-6 clay-shadow-sm">
              <div className="w-14 h-14 bg-earth-100 rounded-full flex items-center justify-center text-gold-600 mx-auto border border-earth-200 shadow-3xs">
                <Heart className="w-7 h-7 fill-gold-500 text-gold-500" />
              </div>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-earth-900">
                  A Note from Curator Rakshan Sharma
                </h3>
                <p className="text-xs sm:text-sm text-earth-700 leading-relaxed font-sans italic">
                  "Since Mitti & Darpan is a newly curated collection, we don't believe in displaying placeholder reviews. Every single Lippan plaque we deliver is custom handcrafted with natural clay and mirrors by Ruchi Sharma, and inspected by me before it leaves our home."
                </p>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                  We invite you to be part of our journey. Once your customized plaque is hung in your space, we would love to hear your feedback or see pictures of how it illuminates your room! Share your experience with us directly on WhatsApp (+91 96968 66194) or email rakshansharma644@gmail.com.
                </p>
              </div>

              <div className="pt-4 border-t border-earth-200/60 max-w-md mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-semibold">
                <a 
                  href="https://wa.me/919696866194" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded shadow-2xs hover:shadow transition-all cursor-pointer font-sans"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" /> Share Feedback on WhatsApp
                </a>
                <a 
                  href="mailto:rakshansharma644@gmail.com?subject=Inquiry%20about%20Mitti%20%26%20Darpan%20Art"
                  className="flex items-center gap-1.5 px-4 py-2 border border-earth-300 hover:bg-earth-100 text-earth-800 rounded transition-all cursor-pointer font-sans"
                >
                  <Phone className="w-3.5 h-3.5" /> Speak with Curator
                </a>
              </div>
            </div>

          </div>
        </section>


        {/* 7. DETAILED FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="py-16 sm:py-24 bg-earth-50/50 border-b border-earth-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            
            <div className="text-center space-y-4 mb-12">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
                Acquire Knowledge
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-950">
                Frequently Asked Questions
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = faqOpenIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-white border border-earth-200 rounded-sm overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left font-serif font-bold text-earth-900 text-sm sm:text-base flex justify-between items-center hover:bg-earth-50/50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-gold-600 font-sans font-bold text-lg select-none ml-4 leading-none">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-earth-600 leading-relaxed font-sans bg-white border-t border-earth-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

          </>
        )}
      </main>


      {/* FOOTER */}
      <footer className="bg-earth-950 text-earth-200 pt-16 pb-8 border-t border-gold-300/10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-white/10 text-left">
            
            {/* Column 1: Brand pitch */}
            <div className="md:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/10 text-gold-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="font-serif text-lg font-bold tracking-wider text-white block leading-none">
                    MITTI & DARPAN
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-gold-400 block mt-1">
                    Authentic Mud & Mirror Relief Plated Art
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-earth-300 leading-relaxed max-w-xl">
                Each plaque is lovingly handcrafted by Ruchi Sharma to preserve ancestral clay relief methods. We connect the geometric sacred beauty of Indian tradition and culture with contemporary spaces.
              </p>

              <div className="space-y-1.5 text-xs text-earth-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Curator Rakshan: rakshansharma644@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>rakshansharma644@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Column 2: Legal & Informational Links */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-1.5">
                Acquire Support
              </h4>
              <ul className="space-y-2 text-xs text-earth-300">
                <li><button onClick={() => scrollToSection('process')} className="hover:text-gold-200 transition-colors cursor-pointer text-left">Our Craft Process</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-gold-200 transition-colors cursor-pointer text-left">FAQ & Assembly Guide</button></li>
                <li><button onClick={() => setActivePolicy('terms')} className="hover:text-gold-200 transition-colors cursor-pointer text-left">Terms of Service & Privacy Policy</button></li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-earth-400">
            <span>
              © 2026 Mitti & Darpan. All traditional Kutch Lippan artworks are authentically handcrafted by Ruchi Sharma.
            </span>
            <div className="flex gap-4">
              <button onClick={() => setActivePolicy('refund')} className="hover:text-white cursor-pointer transition-colors">Refund Policy</button>
              <button onClick={() => setActivePolicy('privacy')} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</button>
              <span className="hover:text-white cursor-pointer font-bold flex items-center gap-1">
                <Lock className="w-3 h-3 text-gold-500" /> Secure SSL Connection
              </span>
            </div>
          </div>

        </div>
      </footer>


      {/* MODALS & DRAWERS RENDER PLACEMENT */}

      {/* 1. Shopping Cart Slide-out Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutTrigger}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        discountPercent={couponDiscount * 100}
      />



      {/* 3. Product Quick View Specifications Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 4. SSL Checkout Simulation Overlays */}
      {isCheckingOut && (() => {
        const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const discountAmount = subtotal * couponDiscount;
        const grandTotal = subtotal - discountAmount;

        // Construct standard UPI payload
        const upiPayload = `upi://pay?pa=rakshansharma27@sbi&pn=Rakshan%20Sharma&am=${grandTotal.toFixed(2)}&cu=INR&tn=Mitti%20and%20Darpan%20Order%20for%20${encodeURIComponent(customerInfo.name || 'Customer')}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiPayload)}`;

        // Construct WhatsApp confirmation payload
        const itemsList = cart.map(item => `${item.product.name} (Qty: ${item.quantity})`).join(', ');
        const couponText = appliedCoupon ? `\n- *Promo Code Applied*: ${appliedCoupon} (-${couponDiscount * 100}%)` : '';
        const waMessage = `Hi Rakshan, I have completed the UPI payment for my order!\n\n` +
                          `*Order Details*:\n- ${itemsList}\n` +
                          `- *Subtotal*: ₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}${couponText}\n` +
                          `- *Total Paid*: ₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\n` +
                          `*Delivery Details*:\n` +
                          `- *Name*: ${customerInfo.name}\n` +
                          `- *Email*: ${customerInfo.email}\n` +
                          `- *Phone*: ${customerInfo.phone}\n` +
                          `- *Address*: ${customerInfo.address}\n\n` +
                          `I have attached my payment transfer confirmation screenshot here.`;
        const waLink = `https://wa.me/919696866194?text=${encodeURIComponent(waMessage)}`;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-earth-950/65 backdrop-blur-md" />

            <div className="relative bg-white border border-earth-200 max-w-md w-full rounded-sm p-6 sm:p-8 text-left shadow-2xl z-10 animate-scaleIn max-h-[90vh] overflow-y-auto">
              
              {checkoutStep === 'form' ? (
                /* Customer Information Form */
                <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-left">
                  <h3 className="font-serif text-xl font-bold text-earth-950 border-b border-earth-200 pb-2">
                    Secure Checkout Details
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-earth-700 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="E.g., Arjun Singh..."
                      className="w-full p-2.5 bg-white border border-earth-200 rounded text-xs focus:outline-none focus:border-earth-800 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-earth-700 block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="email@example.com..."
                      className="w-full p-2.5 bg-white border border-earth-200 rounded text-xs focus:outline-none focus:border-earth-800 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-earth-700 block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+91 98765 43210..."
                      className="w-full p-2.5 bg-white border border-earth-200 rounded text-xs focus:outline-none focus:border-earth-800 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-earth-700 block">Shipping Address</label>
                    <textarea
                      required
                      rows={3}
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="Enter your full shipping address in India..."
                      className="w-full p-2.5 bg-white border border-earth-200 rounded text-xs focus:outline-none focus:border-earth-800 font-sans"
                    />
                  </div>

                  <div className="bg-earth-50 p-3.5 border border-earth-200 rounded text-xs space-y-1">
                    {appliedCoupon && (
                      <div className="flex justify-between text-earth-600 font-sans">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-755 font-semibold font-sans">
                        <span>Promo Discount ({appliedCoupon}):</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-earth-900 font-serif text-sm border-t border-earth-200/60 pt-1.5 mt-1.5">
                      <span>Total Payable:</span>
                      <span>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckingOut(false);
                        setCheckoutStep('idle');
                      }}
                      className="px-5 py-2.5 border border-earth-300 rounded text-xs uppercase tracking-widest font-bold text-earth-700 hover:bg-earth-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-bold rounded shadow-sm hover:shadow-md transition-all"
                    >
                      Proceed to Pay
                    </button>
                  </div>
                </form>
              ) : checkoutStep === 'processing' ? (
                /* Processing gateway transaction state */
                <div className="py-6 space-y-6 text-center">
                  {/* Custom clay concentric ring loading graphic */}
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-earth-100 border-t-earth-800 animate-spin" />
                    <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-earth-900">
                      Authorizing Secure SSL Transaction
                    </h3>
                    <p className="text-xs text-earth-500 max-w-xs mx-auto leading-relaxed">
                      Registering transit insurance codes for fragile shipping... Please do not close or reload this screen.
                    </p>
                  </div>
                </div>
              ) : (
                /* Success Order State receipt */
                <div className="space-y-5 py-2">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>

                  <div className="space-y-1 text-center">
                    <h3 className="font-serif text-xl font-bold text-earth-900 leading-tight">
                      Order Booked Successfully!
                    </h3>
                    <p className="text-xs text-earth-600 leading-relaxed max-w-xs mx-auto">
                      Thank you for supporting traditional Kutch Lippan heritage, <strong>{customerInfo.name}</strong>! An invoice draft has been sent to <strong>{customerInfo.email}</strong>.
                    </p>
                  </div>

                  {/* Scannable UPI QR Payment Card */}
                  <div className="bg-earth-50/70 border border-gold-400/30 rounded p-4 flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-gold-700 tracking-widest font-sans">Scan QR to Complete Payment</span>
                    <img 
                      src={qrCodeUrl} 
                      alt="UPI Payment QR Code" 
                      className="w-[140px] h-[140px] border border-earth-200 p-1 bg-white rounded shadow-xs" 
                    />
                    <div className="text-center font-sans text-xs text-earth-800 space-y-0.5">
                      <div><strong>Payee Name:</strong> Rakshan Sharma</div>
                      <div><strong>UPI ID:</strong> <span className="font-bold select-all text-earth-950">rakshansharma27@sbi</span></div>
                      <div className="pt-1 font-bold text-gold-800 text-sm">Payable Amount: ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    </div>
                  </div>

                  {/* WhatsApp confirmation redirect */}
                  <div className="pt-1">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4.5 h-4.5 text-white fill-white" />
                      Confirm Order on WhatsApp
                    </a>
                  </div>

                  {/* Shipping details visual stamp */}
                  <div className="bg-white border border-earth-200 rounded p-4 text-left text-xs font-sans text-earth-700 space-y-1 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-earth-400 block mb-1 border-b pb-1">Delivery Protocol Ledger</span>
                    <div><strong>Customer Name:</strong> {customerInfo.name}</div>
                    <div><strong>Contact Phone:</strong> {customerInfo.phone}</div>
                    <div><strong>Destination:</strong> {customerInfo.address}</div>
                    <div><strong>Shipping Speed:</strong> Insured Fragile Courier (Safe Crated)</div>
                    <div><strong>Transit Insurance:</strong> Included (₹0.00 Waived Surcharge)</div>
                    <div><strong>Estimated Arrival:</strong> 4-6 business days</div>
                  </div>

                  <div className="flex justify-center pt-1.5">
                    <button
                      onClick={() => {
                        clearCart();
                        setIsCheckingOut(false);
                        setCheckoutStep('idle');
                        setCustomerInfo({ name: '', email: '', phone: '', address: '' });
                      }}
                      className="w-full py-2.5 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-bold rounded"
                    >
                      Close Invoice & Continue Browsing
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })()}

      {/* 5. Policy Overlay Modal */}
      {activePolicy && (() => {
        let title = '';
        let content = null;

        if (activePolicy === 'refund') {
          title = 'Refund & Replacement Policy';
          content = (
            <div className="space-y-4">
              <p>
                Since each Lippan Kaam piece is custom handcrafted by <strong>Ruchi Sharma</strong>, we cannot offer refunds once the crafting process has commenced.
              </p>
              <p>
                However, to ensure complete peace of mind, we provide a <strong>100% Transit Damage Replacement Guarantee</strong>.
              </p>
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-950 text-[11px] leading-relaxed font-sans">
                <strong>⚠️ Mandate Requirement:</strong> You must record a continuous, unedited <strong>full package opening video</strong> from start to finish. If any transit damage is discovered, this video is strictly required to verify the damage claim; otherwise, no replacement or refund can be processed.
              </div>
              <div className="p-3 bg-earth-50 border-l-4 border-gold-500 rounded text-earth-800 text-[11px] leading-relaxed">
                <strong>How to request a replacement:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Record a continuous unboxing video of the package.</li>
                  <li>Send the video and photos via WhatsApp to <strong className="select-all font-sans font-bold">+91 96968 66194</strong> within 24 hours of delivery.</li>
                  <li>We will immediately schedule a fresh replacement to be handcrafted and shipped to you at no extra cost.</li>
                </ul>
              </div>
            </div>
          );
        } else if (activePolicy === 'privacy') {
          title = 'Privacy Policy';
          content = (
            <div className="space-y-4">
              <p>
                Mitti & Darpan respects your personal privacy. We only collect the information necessary to fulfill your order and handle payments.
              </p>
              <p><strong>Information we collect:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your Name, Email, and Phone Number (for order correspondence).</li>
                <li>Your Shipping Address (for courier delivery).</li>
              </ul>
              <p>
                We do not use tracking cookies, sell or rent your personal data to advertisers, or store payment card details. For any privacy queries, contact us at <a href="mailto:rakshansharma644@gmail.com" className="underline font-bold text-earth-900 font-sans">rakshansharma644@gmail.com</a>.
              </p>
            </div>
          );
        } else if (activePolicy === 'terms') {
          title = 'Terms of Service';
          content = (
            <div className="space-y-4">
              <p>
                By placing an order or commission request on Mitti & Darpan, you agree to the following terms:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Artisan Handcraft:</strong> Every piece is individually hand-molded and mirrors are set by hand by Ruchi Sharma. Minor natural variations in clay outlines or mirror positioning are hallmarks of organic Indian heritage art and are not defects.</li>
                <li><strong>UPI Payment Confirmation:</strong> Orders are booked and processed once payment is confirmed via UPI transfer using the generated QR code or our payee coordinates.</li>
                <li><strong>Curing Timelines:</strong> Customized commissions require 7-10 days of slow, natural curing before they are structurally dry enough to be safely packed and shipped.</li>
              </ul>
            </div>
          );
        }

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-earth-950/65 backdrop-blur-md" onClick={() => setActivePolicy(null)} />

            <div className="relative bg-white border border-earth-200 max-w-md w-full rounded-sm p-6 sm:p-8 text-left shadow-2xl z-10 animate-scaleIn max-h-[85vh] overflow-y-auto">
              <button 
                onClick={() => setActivePolicy(null)} 
                className="absolute top-4 right-4 text-earth-400 hover:text-earth-700 cursor-pointer"
                aria-label="Close policy modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-serif text-lg font-bold text-earth-950 border-b border-earth-200 pb-3 pr-8 mb-4">
                {title}
              </h3>
              
              <div className="font-sans text-xs text-earth-700 leading-relaxed">
                {content}
              </div>

              <div className="mt-6 pt-4 border-t border-earth-100 flex justify-end">
                <button
                  onClick={() => setActivePolicy(null)}
                  className="px-5 py-2 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-bold rounded"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
