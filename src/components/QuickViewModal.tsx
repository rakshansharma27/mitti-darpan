import { X, Star, Sparkles, Scale, Compass, Check, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto" role="dialog" aria-modal="true">
      {/* Dark backdrop overlay */}
      <div 
        className="fixed inset-0 bg-earth-950/50 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative bg-white max-w-3xl w-full rounded-sm border border-earth-200 shadow-2xl overflow-hidden animate-scaleIn z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/80 md:bg-earth-100 hover:bg-earth-200 text-earth-800 hover:text-black shadow-sm transition-colors cursor-pointer"
          aria-label="Close product quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Beautiful Product Image */}
        <div className="relative w-full md:w-1/2 bg-earth-50 aspect-square md:aspect-auto md:h-full flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-950/30 to-transparent" />
          
          {/* Accent tag in the image container */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-gold-200 block mb-0.5">
              Premium Collection
            </span>
            <span className="font-serif text-lg font-bold">
              100% Hand-Sculpted
            </span>
          </div>
        </div>

        {/* Right: Rich Informational Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-grainy">
          <div>
            {/* Category / Rating */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-earth-100">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-earth-500">
                {product.category}
              </span>
              {product.reviewsCount > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  <span className="text-xs font-bold text-earth-800">{product.rating}</span>
                  <span className="text-[10px] text-earth-400">({product.reviewsCount} verified reviews)</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-earth-900 mb-2 leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-earth-900 font-sans">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-earth-400 line-through font-sans">₹{product.originalPrice}</span>
              )}
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-1 font-sans">
                In Stock
              </span>
            </div>

            {/* Narrative Description */}
            <p className="text-xs text-earth-700 leading-relaxed font-sans mb-5">
              {product.description}
            </p>

            {/* Specifications Details List */}
            <div className="space-y-3 bg-white p-4 rounded border border-earth-200/80 mb-6 shadow-2xs">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-earth-800 mb-2 border-b border-earth-100 pb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-earth-600" /> Technical Dimensions & Crafts Spec
              </h4>
              
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-earth-400 block">Sizing Range</span>
                  <span className="font-semibold text-earth-800">{product.size}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-earth-400 block">Net Weight</span>
                  <span className="font-semibold text-earth-800 flex items-center gap-1">
                    <Scale className="w-3 h-3 text-earth-500" /> {product.weight}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-earth-400 block">Clay Compound</span>
                  <span className="font-semibold text-earth-800">{product.clayComposition}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-earth-400 block">Embedded Mirrors</span>
                  <span className="font-semibold text-earth-800 flex items-center gap-1 text-gold-700">
                    <Sparkles className="w-3 h-3" /> {product.mirrorsUsed}
                  </span>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-xs text-earth-700">
                <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>Dual pre-mounted brass hangers for easy, secure dry-wall mounting.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-earth-700">
                <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>Protected with high-tensile matte sealer; resists dust and minor dampness.</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="border-t border-earth-200/80 pt-4 flex items-center justify-between gap-4">
            <div className="text-[10px] font-sans text-earth-500 leading-tight">
              <HelpCircle className="w-3.5 h-3.5 inline mr-1 text-earth-400" />
              Need custom size?<br />
              <button 
                onClick={onClose} 
                className="underline text-earth-700 hover:text-earth-900 font-semibold"
              >
                Request custom size
              </button>
            </div>
            
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-grow md:flex-grow-0 px-6 py-3 bg-earth-800 hover:bg-earth-900 text-white hover:text-gold-100 text-xs uppercase tracking-widest font-bold rounded-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              Add To Cart (₹{product.price})
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
