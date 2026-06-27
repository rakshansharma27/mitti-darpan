import { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenCustomOrder: () => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ cart, onOpenCart, onOpenCustomOrder, scrollToSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Shop Collection', id: 'shop' },
    { name: 'Our Craftsmanship', id: 'process' },
    { name: 'Custom Creations', id: 'custom-config' },
    { name: 'Heritage Story', id: 'story' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-earth-50/90 backdrop-blur-md border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => scrollToSection('hero')}
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-earth-800 text-gold-200 shadow-sm">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-gold-300/30 animate-slow-spin" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-earth-900 block leading-none">
                MITTI & DARPAN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-earth-600 block mt-1 font-medium font-sans">
                Handcrafted Lippan Relief
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-sans text-sm font-medium text-earth-700 hover:text-earth-900 hover:underline hover:underline-offset-8 decoration-gold-500 decoration-2 transition-all cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenCustomOrder}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-earth-300 rounded-sm text-earth-800 hover:bg-earth-100 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Custom Order
            </button>

            <button
              onClick={() => scrollToSection('shop')}
              className="px-5 py-2.5 text-xs uppercase tracking-widest font-semibold bg-earth-800 text-white hover:bg-earth-900 rounded-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Shop Now
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-earth-800 hover:text-earth-900 hover:bg-earth-100 rounded-full transition-all cursor-pointer"
              aria-label="Shopping Cart"
              id="cart-trigger"
            >
              <ShoppingBag className="w-6 h-6 stroke-[2]" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs font-bold font-sans rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions and Hamburger Menu */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Cart Button Mobile */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-earth-800 hover:bg-earth-100 rounded-full"
              aria-label="Shopping Cart Mobile"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-earth-800 hover:bg-earth-100 rounded-full"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-earth-200 bg-earth-50 animate-fadeIn shadow-lg">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 font-serif text-base font-semibold text-earth-800 hover:bg-earth-100 hover:text-earth-900 rounded-md"
              >
                {link.name}
              </button>
            ))}
            
            <div className="pt-4 pb-2 border-t border-earth-200 px-4 space-y-3">
              <button
                onClick={() => {
                  onOpenCustomOrder();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs uppercase tracking-widest font-semibold border border-earth-300 rounded-sm text-earth-800 hover:bg-earth-100"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Custom Commission
              </button>
              
              <button
                onClick={() => {
                  scrollToSection('shop');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-center px-4 py-3 text-xs uppercase tracking-widest font-semibold bg-earth-800 text-white rounded-sm hover:bg-earth-900 shadow-sm"
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
