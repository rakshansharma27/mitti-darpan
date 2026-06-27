import React from 'react';
import { Eye, Star, Sparkles, Scale, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  // Special labels or accent tags depending on size
  const isBestSeller = product.id === 'utsav-multicolor';
  const isPremiumPiece = product.id === 'suryakiran-sunburst';

  return (
    <div 
      className="group relative bg-white border border-earth-200 rounded-sm overflow-hidden clay-shadow-sm hover:clay-shadow-lg transition-all duration-300 flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Visual Badges */}
      {isBestSeller && (
        <span className="absolute top-4 left-4 z-10 bg-gold-600 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-white stroke-none" /> Best Seller
        </span>
      )}
      {isPremiumPiece && (
        <span className="absolute top-4 left-4 z-10 bg-earth-800 text-gold-200 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1 border border-gold-300/20">
          <Sparkles className="w-3 h-3 text-gold-300 animate-pulse" /> Masterpiece
        </span>
      )}

      {/* Product Image Container with Glisten hover and zoom */}
      <div className="relative aspect-square w-full overflow-hidden bg-earth-50 border-b border-earth-100 shimmer-container">
        <a href={`#product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        </a>
        
        {/* Shimmer sweep effect */}
        <div className="shimmer-sheen" />
        
        {/* Simulating glistening mirror effect across the product image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-earth-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-earth-100 rounded-full text-earth-800 clay-shadow-sm hover:scale-110 transition-all cursor-pointer"
            title="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-earth-500 font-sans">
              {product.category}
            </span>
            {product.reviewsCount > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                <span className="text-xs font-bold text-earth-800 font-sans">{product.rating}</span>
                <span className="text-[10px] text-earth-400 font-sans font-sans">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* Title */}
          <a href={`#product/${product.id}`} className="block">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-earth-900 mb-1.5 group-hover:text-earth-700 transition-colors">
              {product.name}
            </h3>
          </a>

          {/* Specifications Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] px-2 py-0.5 bg-earth-50 border border-earth-200/60 rounded-full text-earth-600 font-sans">
              {product.size}
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-gold-50 border border-gold-200/40 rounded-full text-gold-700 font-sans flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> {product.mirrorsUsed}
            </span>
          </div>

          {/* Subtitle / Short Description */}
          <p className="text-xs text-earth-600 font-sans line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action Button */}
        <div>
          {/* Authentic technical specs snippet */}
          <div className="border-t border-dashed border-earth-200/60 pt-3.5 pb-4 flex items-center justify-between text-[10px] text-earth-500 font-sans">
            <span className="flex items-center gap-1">
              <Scale className="w-3 h-3" /> {product.weight}
            </span>
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3" /> {product.clayComposition.split(' ')[0]} mud relief
            </span>
          </div>

          <div className="flex items-center justify-between gap-2.5 pt-1.5">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-earth-400 line-through leading-none mb-0.5 font-sans">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-lg font-bold text-earth-900 leading-none font-sans">
                ₹{product.price}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2.5 bg-earth-800 hover:bg-earth-900 text-white hover:text-gold-100 text-xs uppercase tracking-widest font-semibold rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
