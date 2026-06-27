import React from 'react';
import { ArrowLeft, Star, Sparkles, Scale, Info, Check, MessageCircle, AlertCircle, ShoppingCart, Fingerprint } from 'lucide-react';
import { Product } from '../types';
import mdfBoardImg from '../mdf_board.jpg';
import ceramicPowderImg from '../ceramic_powder.png';
import mirrorsBoxImg from '../mirrors_box.jpg';
import fevicrylColoursImg from '../fevicryl_colours.jpg';
import fevicrylMoulditImg from '../fevicryl_mouldit.jpg';
import fevicrylPaintsImg from '../fevicryl_paints.jpg';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  activeImage: string;
  setActiveImage: (image: string) => void;
  setActivePolicy: (policy: 'refund' | 'privacy' | 'terms') => void;
}

export default function ProductDetailPage({
  product,
  onBack,
  onAddToCart,
  activeImage,
  setActiveImage,
  setActivePolicy
}: ProductDetailPageProps) {
  const finalPrice = product.price;
  const originalPrice = product.originalPrice;
  const discountPercent = originalPrice ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

  return (
    <div className="bg-grainy py-8 sm:py-12 animate-fadeIn font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-6 sm:mb-8 text-left">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-earth-600 hover:text-earth-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery Viewer */}
          <div className="lg:col-span-7 space-y-4">
            {/* Active Display Panel */}
            <div className="aspect-square w-full rounded-sm overflow-hidden bg-white border border-earth-200/80 shadow-sm relative shimmer-container">
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="shimmer-sheen" />
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-gold-600 text-white text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-sm shadow-sm">
                  {discountPercent}% OFF Launch Offer
                </span>
              )}
            </div>

            {/* Gallery Thumbnail Selector */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 justify-start overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, idx) => {
                  const isActive = (activeImage || product.image) === imgUrl;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden border-2 bg-white transition-all cursor-pointer ${
                        isActive ? 'border-gold-500 scale-95 shadow-sm' : 'border-earth-200 hover:border-earth-400'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} gallery ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Checkout copy & Specs */}
          <div className="lg:col-span-5 text-left space-y-6 sm:space-y-8">
            
            {/* Category / Star Ratings */}
            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-extrabold text-gold-600 block">
                {product.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-earth-950 leading-tight">
                {product.name}
              </h1>
              
              {product.reviewsCount > 0 ? (
                <div className="flex items-center gap-2 pt-1 border-b border-earth-200/60 pb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-gold-500 text-gold-500' 
                            : 'text-earth-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-earth-800 font-sans">
                    {product.rating} Rating
                  </span>
                  <span className="text-xs text-earth-400 font-sans">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>
              ) : (
                <div className="border-b border-earth-200/60 pb-2" />
              )}
            </div>

            {/* Pricing Section */}
            <div className="bg-white border border-earth-200/80 rounded-sm p-5 space-y-3.5 clay-shadow-sm">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-earth-950 font-sans">
                  ₹{finalPrice.toLocaleString('en-IN')}
                </span>
                {originalPrice && (
                  <span className="text-sm sm:text-base text-earth-400 line-through font-sans">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-earth-600 leading-relaxed font-sans">
                Authentically handcrafted artwork. Secure crate packing and safe-transit insurance are fully covered.
              </p>

              {/* Add to Cart Controls */}
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-3.5 bg-earth-800 hover:bg-earth-900 text-white hover:text-gold-100 text-xs sm:text-sm uppercase tracking-widest font-bold rounded-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> Add To Shopping Cart
              </button>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-earth-950 uppercase tracking-wider">
                Artwork Description
              </h4>
              <p className="text-xs sm:text-sm text-earth-700 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

            {/* Materials & Process Specs */}
            <div className="space-y-3.5">
              <h4 className="font-serif text-sm font-bold text-earth-950 uppercase tracking-wider border-b border-earth-200 pb-1.5">
                Craft Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-earth-700 font-sans">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-gold-500 shrink-0" />
                  <span><strong>Weight:</strong> {product.weight}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-gold-500 shrink-0" />
                  <span><strong>Size:</strong> {product.size}</span>
                </div>
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <Fingerprint className="w-4 h-4 text-gold-500 shrink-0" />
                  <span><strong>Clay outlines:</strong> {product.clayComposition}</span>
                </div>
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                  <span><strong>Mirror arrangement:</strong> {product.mirrorsUsed}</span>
                </div>
              </div>
            </div>

            {/* Products used list */}
            {product.materials && (
              <div className="space-y-2">
                <h4 className="font-serif text-xs font-bold text-earth-400 uppercase tracking-wider">
                  Materials Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1 bg-earth-200/50 border border-earth-300 text-earth-800 rounded-sm font-sans"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Return & Refund mandate card */}
            <div className="bg-red-50 border border-red-200/60 rounded-sm p-4 sm:p-5 space-y-3.5">
              <h4 className="font-serif text-xs sm:text-sm font-bold text-red-950 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4.5 h-4.5 text-red-600" /> Return & Refund Policy
              </h4>
              <p className="text-xs text-red-900 leading-relaxed font-sans">
                {product.refundPolicy || "Since Mitti & Darpan products are custom handcrafted, we do not accept returns. In the event of transit damage, my mother will craft and ship a replacement. An unboxing video is strictly required."}
              </p>
              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => setActivePolicy('refund')}
                  className="text-xs font-bold text-red-700 underline hover:text-red-900 cursor-pointer font-sans"
                >
                  View full unboxing guidelines
                </button>
              </div>
            </div>

            {/* Direct Curator WhatsApp Consult */}
            <div className="bg-white border border-earth-200 rounded-sm p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-earth-900">Need specific custom adjustments?</div>
                <div className="text-[11px] text-earth-500">Coordinate dimensions, color tones, and layouts with Rakshan.</div>
              </div>
              <a
                href={`https://wa.me/919696866194?text=Hi%20Rakshan,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" /> WhatsApp Consult
              </a>
            </div>

          </div>

        </div>

        {/* Behind the Materials Section */}
        <div className="mt-16 pt-12 border-t border-earth-200 space-y-10 text-left">
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-gold-600 block">
              Pure Ingredients
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-950">
              Behind the Materials
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 max-w-2xl font-sans leading-relaxed">
              Every Lippan artwork is made with highly resilient, premium craft ingredients. We prioritize long-term durability and brilliant light reflections, ensuring the art doesn't crack or discolor over generations.
            </p>
          </div>

          <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-thin">
            {/* MDF BOARD */}
            <div className="bg-white border border-earth-200/80 rounded-sm overflow-hidden clay-shadow-sm flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
              <div className="aspect-video w-full overflow-hidden bg-earth-50 border-b border-earth-100 flex items-center justify-center p-2">
                <img
                  src={ceramicPowderImg}
                  alt="MDF Wood Board Base"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
              <div className="p-5 flex-grow space-y-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-earth-900">
                  1. MDF Board Canvas
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  We use a sturdy, seasoned MDF board as the base panel. It provides a solid, warp-proof foundation to support the heavy clay layers and mirror glass segments perfectly over time.
                </p>
              </div>
            </div>

            {/* MIRROR */}
            <div className="bg-white border border-earth-200/80 rounded-sm overflow-hidden clay-shadow-sm flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
              <div className="aspect-video w-full overflow-hidden bg-earth-50 border-b border-earth-100 flex items-center justify-center p-2">
                <img
                  src={mirrorsBoxImg}
                  alt="Intricate Craft Mirrors"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
              <div className="p-5 flex-grow space-y-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-earth-900">
                  2. Glistening Glass Mirrors
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  Assorted shapes (diamonds, teardrops, rounds, and leaves) of genuine hand-set micro glass mirrors are carefully pressed into the moist clay, catching and scattering light in all directions.
                </p>
              </div>
            </div>

            {/* Fevicryl Mouldit Epoxy Compound */}
            <div className="bg-white border border-earth-200/80 rounded-sm overflow-hidden clay-shadow-sm flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
              <div className="aspect-video w-full overflow-hidden bg-earth-50 border-b border-earth-100 flex items-center justify-center p-2">
                <img
                  src={fevicrylMoulditImg}
                  alt="Fevicryl Mouldit Epoxy Compound"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
              <div className="p-5 flex-grow space-y-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-earth-900">
                  3. Fevicryl Mouldit Epoxy Compound
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  The backbone of every raised relief line. Fevicryl Mouldit is a professional-grade epoxy clay compound that we hand-roll into uniform cords, sculpting intricate patterns that stay permanently bonded to the MDF base without cracking.
                </p>
              </div>
            </div>

            {/* Fevicryl Acrylic Colours */}
            <div className="bg-white border border-earth-200/80 rounded-sm overflow-hidden clay-shadow-sm flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start flex-shrink-0">
              <div className="aspect-video w-full overflow-hidden bg-earth-50 border-b border-earth-100 flex items-center justify-center p-2">
                <img
                  src={fevicrylPaintsImg}
                  alt="Fevicryl Acrylic Colours"
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                />
              </div>
              <div className="p-5 flex-grow space-y-2">
                <h3 className="font-serif text-sm sm:text-base font-bold text-earth-900">
                  4. Fevicryl Acrylic Colours
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed font-sans">
                  Painted in rich, fade-resistant Fevicryl acrylic colours and metallic highlights, then finished with a protective matte varnish sealant to keep the colours vibrant forever.
                </p>
              </div>
            </div>
          </div>

          {/* Non-Sponsorship Disclosure Badge */}
          <div className="bg-earth-50 border border-earth-200/80 rounded-sm p-4 text-xs text-earth-500 font-sans leading-relaxed max-w-3xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
            <div>
              <strong>Non-Sponsorship Disclosure:</strong> Brand names like <em>Fevicryl</em> are mentioned solely to maintain transparency with buyers regarding the actual raw materials we use for quality assurance. This storefront is completely independent and has no official sponsorship, commercial association, or endorsement from these brands.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
