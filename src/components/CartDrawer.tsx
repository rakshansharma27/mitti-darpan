import { X, Plus, Minus, Trash2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  discountPercent: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  discountPercent
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Custom calculations
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingGuaranteeFee = 0.00; // Free for premium launch, normally ₹1,500
  const grandTotal = subtotal - discountAmount + shippingGuaranteeFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-earth-950/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          {/* Cart Panel content */}
          <div className="pointer-events-auto w-screen max-w-md bg-earth-50 border-l border-earth-200 shadow-2xl flex flex-col h-full animate-slideIn">
            
            {/* Header */}
            <div className="px-6 py-5 bg-earth-100 border-b border-earth-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-serif font-bold text-earth-900" id="slide-over-title">
                  Your Sacred Space Bag
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 bg-earth-800 text-white rounded-full">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="p-1 rounded-full text-earth-500 hover:text-earth-900 hover:bg-earth-200 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                  <div className="w-16 h-16 bg-earth-200 rounded-full flex items-center justify-center text-earth-500 mb-4 animate-float">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-earth-900 mb-1.5">Your bag is empty</h3>
                  <p className="text-xs text-earth-500 max-w-xs leading-relaxed mb-6">
                    Our traditional Lippan clay relief mirrors are waiting to bring reflective light and positive energy into your modern spaces.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Safeties notice */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded p-3 flex gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider font-bold text-emerald-800">
                        Fragile Safe-Travel Guard
                      </h4>
                      <p className="text-[11px] text-emerald-700 leading-relaxed mt-0.5">
                        Each piece is custom crate-packed in specialized high-impact bubble armor. 100% replacement guarantee if damaged.
                      </p>
                    </div>
                  </div>

                  {/* List of Cart Items */}
                  <div className="divide-y divide-earth-200/60">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex py-4 gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-earth-200 bg-white">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-full w-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between text-sm font-semibold text-earth-900 font-serif">
                              <h4>{item.product.name}</h4>
                              <p className="ml-4 font-sans font-bold">₹{item.product.price * item.quantity}</p>
                            </div>
                            <p className="mt-1 text-[11px] text-earth-500 font-sans">{item.product.size}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity (Only 1 unique unit in stock) */}
                            <span className="text-xs text-earth-500 font-sans">
                              Qty: 1 <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded ml-2 font-semibold">Unique Piece</span>
                            </span>

                            {/* Remove button */}
                            <button 
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-earth-400 hover:text-red-600 p-1.5 rounded hover:bg-earth-200/50 transition-colors cursor-pointer"
                              title="Remove item"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-earth-200 px-6 py-6 bg-earth-100 space-y-4">
                {/* Coupon Code Section */}
                <div className="border-b border-earth-200/60 pb-3 font-sans">
                  {appliedCoupon ? (
                    <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded px-3 py-2 text-xs">
                      <span className="text-emerald-800 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Code Applied: {appliedCoupon} (-{discountPercent}%)
                      </span>
                      <button
                        onClick={onRemoveCoupon}
                        className="text-earth-400 hover:text-red-650 font-semibold cursor-pointer underline text-[10px] uppercase hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const code = formData.get('couponCode') as string;
                        if (code) {
                          const success = onApplyCoupon(code);
                          if (!success) {
                            alert('Invalid coupon code. Try "LAUNCH15"!');
                          } else {
                            e.currentTarget.reset();
                          }
                        }
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        name="couponCode"
                        placeholder="Promo Code (e.g. LAUNCH15)"
                        className="flex-1 px-3 py-1.5 bg-white border border-earth-200 rounded text-xs focus:outline-none focus:border-earth-800 placeholder:text-earth-400 uppercase font-sans"
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-1.5 bg-earth-800 text-white text-[11px] font-bold rounded uppercase tracking-wider hover:bg-earth-900 transition-colors cursor-pointer font-sans"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-earth-600 font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-earth-800">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-emerald-700">
                    <span className="flex items-center gap-1">
                      Safe Fragile Insured Shipping 
                      <AlertCircle className="w-3 h-3" title="Special crate protective shipping waiver" />
                    </span>
                    <span className="font-bold">FREE</span>
                  </div>
                </div>

                <div className="border-t border-earth-200/80 pt-3 flex justify-between font-serif text-base font-bold text-earth-900">
                  <span>Grand Total</span>
                  <span className="font-sans font-extrabold text-lg text-earth-950">₹{grandTotal.toFixed(2)}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onCheckout}
                    className="w-full py-3.5 bg-earth-800 hover:bg-earth-900 text-white hover:text-gold-100 text-sm uppercase tracking-widest font-bold rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4.5 h-4.5" />
                    Secure Checkout
                  </button>
                </div>
                
                <div className="text-center">
                  <span className="text-[10px] text-earth-500 tracking-wider">
                    💳 SSL Encrypted Transaction Gateway
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
