import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, Palette, Grid3X3, Ruler, CheckCircle, HeartHandshake, X } from 'lucide-react';
import { CustomOrderRequest } from '../types';

interface CustomConfiguratorProps {
  onSubmitRequest: (request: CustomOrderRequest) => void;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export default function CustomConfigurator({ onSubmitRequest, isOpenAsModal = false, onCloseModal }: CustomConfiguratorProps) {
  // Configurator state
  const [shape, setShape] = useState<CustomOrderRequest['shape']>('Circle');
  const [size, setSize] = useState<CustomOrderRequest['size']>('18" Diameter');
  const [colorTheme, setColorTheme] = useState<string>('Warm Ivory & Cream');
  const [mirrorStyle, setMirrorStyle] = useState<CustomOrderRequest['mirrorStyle']>('Traditional Radial Mandala');
  const [customText, setCustomText] = useState<string>('');
  const [shippingOption, setShippingOption] = useState<string>('Standard Safe-Crate (Insured)');
  
  const [priceEstimate, setPriceEstimate] = useState<number>(13997);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Dynamic price estimation calculation
  useEffect(() => {
    let basePrice = 7999; // Default base 12" circular

    // Size increments
    if (size.includes('18"')) basePrice += 4999;
    else if (size.includes('24"')) basePrice += 9999;

    // Shape multipliers
    if (shape === 'Octagon') basePrice += 1999;
    else if (shape === 'Square') basePrice += 999;

    // Mirror style increments
    if (mirrorStyle === 'Intricate Geometric') basePrice += 2499;
    else if (mirrorStyle === 'Traditional Radial Mandala') basePrice += 999;

    setPriceEstimate(basePrice);
  }, [shape, size, mirrorStyle]);

  // Adjust size choices based on shape
  useEffect(() => {
    if (shape === 'Circle') {
      setSize('18" Diameter');
    } else {
      setSize('18"x18" Square');
    }
  }, [shape]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequest({
      shape,
      size,
      colorTheme,
      mirrorStyle,
      customText,
      shippingOption,
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setShape('Circle');
    setSize('18" Diameter');
    setColorTheme('Warm Ivory & Cream');
    setMirrorStyle('Traditional Radial Mandala');
    setCustomText('');
  };

  const shapesList: { name: CustomOrderRequest['shape']; desc: string; svg: React.ReactNode }[] = [
    { 
      name: 'Circle', 
      desc: 'Traditional Aura', 
      svg: <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" /> 
    },
    { 
      name: 'Square', 
      desc: 'Modern Border', 
      svg: <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" /> 
    },
    { 
      name: 'Octagon', 
      desc: 'Sacred Geometry', 
      svg: <polygon points="15,5 25,5 35,15 35,25 25,35 15,35 5,25 5,15" fill="none" stroke="currentColor" strokeWidth="2.5" /> 
    },
  ];

  const colorsList = [
    { name: 'Warm Ivory & Cream', hex: '#FAF6ED', desc: 'Sands of Kutch' },
    { name: 'Traditional Terracotta', hex: '#8C4B27', desc: 'Earthy Red Mud' },
    { name: 'Golden Ochre Sun', hex: '#C58C40', desc: 'Rich Harvest Hue' },
    { name: 'Charcoal Graphite', hex: '#341A09', desc: 'Soot & Night Mud' },
  ];

  const sizeOptions = shape === 'Circle' 
    ? ['12" Diameter', '18" Diameter', '24" Diameter'] as CustomOrderRequest['size'][]
    : ['12"x12" Square', '18"x18" Square', '24"x24" Square'] as CustomOrderRequest['size'][];

  const mirrorStylesList: { name: CustomOrderRequest['mirrorStyle']; desc: string }[] = [
    { name: 'Minimalist Elegant', desc: 'Spacious mud textures with focused star clusters.' },
    { name: 'Traditional Radial Mandala', desc: 'Classic concentric patterns of hand-cut mirrors.' },
    { name: 'Intricate Geometric', desc: 'High-density mosaic borders and micro-triangle reflections.' },
  ];

  const configuratorLayout = (
    <div className="bg-white rounded-sm border border-earth-200 shadow-xl overflow-hidden text-left max-w-5xl mx-auto">
      {/* Form Title & intro header */}
      <div className="bg-earth-800 text-gold-50 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gold-300/10">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400 block mb-1">
            Custom Commission Studio
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tailor a Lippan Art Plate
          </h2>
          <p className="text-xs text-earth-200 mt-1 font-sans max-w-xl">
            Co-design your relief work. Choose mud tones, dimensions, and mirror setups to complement your physical space perfectly.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-earth-900/50 border border-gold-400/20 rounded">
          <HeartHandshake className="w-5 h-5 text-gold-300" />
          <span className="text-xs font-semibold text-gold-200 uppercase tracking-widest font-sans">
            Crafted with Care
          </span>
        </div>
      </div>

      {isSubmitted ? (
        /* Success State View */
        <div className="p-8 sm:p-12 text-center max-w-xl mx-auto animate-scaleIn">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-5 border border-emerald-200">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-earth-900 mb-2">Commission Request Logged!</h3>
          <p className="text-xs text-earth-600 leading-relaxed font-sans mb-6">
            We have registered your configuration. Our master coordinator, <strong>Rakshan Sharma</strong>, will email you at <strong>{`rakshansharma644@gmail.com`}</strong> within 12 hours with a design sketch blueprint and accurate shipping timeline.
          </p>
          <div className="bg-earth-50 rounded border border-earth-200 p-4 mb-8 text-left space-y-1.5 text-xs font-sans text-earth-700">
            <div className="font-bold uppercase tracking-wider text-[10px] text-earth-400 mb-1 border-b pb-1">Ordered Blueprint Summary</div>
            <div><strong>Canvas Shape:</strong> {shape}</div>
            <div><strong>Desired Size:</strong> {size}</div>
            <div><strong>Base Pigment:</strong> {colorTheme}</div>
            <div><strong>Mirror Density:</strong> {mirrorStyle}</div>
            {customText && <div><strong>Custom Notes:</strong> "{customText}"</div>}
            <div className="pt-1 text-earth-900 font-bold"><strong>Estimated Commission:</strong> ₹{priceEstimate}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 border border-earth-300 rounded text-xs uppercase tracking-widest font-semibold text-earth-700 hover:bg-earth-100 transition-colors"
            >
              Configure Another
            </button>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="px-6 py-2.5 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-semibold rounded"
              >
                Close Studio
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Configurator Form */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col lg:flex-row gap-8">
          
          {/* Left panel: Controls (Inputs) */}
          <div className="flex-1 space-y-6">
            
            {/* Step 1: Shape */}
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-earth-800 flex items-center gap-1.5 mb-3">
                <Grid3X3 className="w-4 h-4 text-earth-500" /> 1. Select Board Shape
              </label>
              <div className="grid grid-cols-3 gap-3">
                {shapesList.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setShape(item.name)}
                    className={`flex flex-col items-center p-3 sm:p-4 rounded border text-center transition-all cursor-pointer ${
                      shape === item.name 
                        ? 'border-earth-800 bg-earth-50 shadow-sm text-earth-900' 
                        : 'border-earth-200 hover:border-earth-400 text-earth-500 hover:text-earth-800'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center mb-1.5">
                      {item.svg}
                    </div>
                    <span className="text-xs font-bold leading-none">{item.name}</span>
                    <span className="text-[9px] text-earth-400 mt-1 hidden sm:block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sizing Options */}
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-earth-800 flex items-center gap-1.5 mb-3">
                <Ruler className="w-4 h-4 text-earth-500" /> 2. Determine Dimensions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSize(opt)}
                    className={`p-3 rounded border text-center transition-all cursor-pointer ${
                      size === opt 
                        ? 'border-earth-800 bg-earth-50 shadow-sm text-earth-900 font-bold' 
                        : 'border-earth-200 hover:border-earth-400 text-earth-500 hover:text-earth-800 text-xs'
                    }`}
                  >
                    <span className="text-xs block mb-0.5">{opt.split(' ')[0]}</span>
                    <span className="text-[9px] text-earth-400 block leading-none">{opt.includes('12') ? 'Accents' : opt.includes('18') ? 'Standard' : 'Statement'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Clay Pigment selection */}
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-earth-800 flex items-center gap-1.5 mb-3">
                <Palette className="w-4 h-4 text-earth-500" /> 3. Organic Clay Base Color
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colorsList.map((themeItem) => (
                  <button
                    key={themeItem.name}
                    type="button"
                    onClick={() => setColorTheme(themeItem.name)}
                    className={`flex flex-col items-center p-3 rounded border text-center transition-all cursor-pointer ${
                      colorTheme === themeItem.name 
                        ? 'border-earth-800 bg-earth-50 shadow-sm text-earth-900' 
                        : 'border-earth-200 hover:border-earth-400 text-earth-500 hover:text-earth-800'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-earth-300 shadow-2xs mb-2 flex items-center justify-center text-white"
                      style={{ backgroundColor: themeItem.hex }}
                    >
                      {colorTheme === themeItem.name && (
                        <span className="text-[10px] font-bold mix-blend-difference">✓</span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold leading-none">{themeItem.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-earth-400 mt-1 block">{themeItem.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Mirror Complexity */}
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-earth-800 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-earth-500" /> 4. Mirror Geometry Arrangement
              </label>
              <div className="space-y-2">
                {mirrorStylesList.map((styleObj) => (
                  <button
                    key={styleObj.name}
                    type="button"
                    onClick={() => setMirrorStyle(styleObj.name)}
                    className={`w-full p-3.5 rounded border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      mirrorStyle === styleObj.name 
                        ? 'border-earth-800 bg-earth-50 shadow-sm text-earth-900' 
                        : 'border-earth-200 hover:border-earth-400 text-earth-500 hover:text-earth-800'
                    }`}
                  >
                    <input 
                      type="radio" 
                      checked={mirrorStyle === styleObj.name} 
                      onChange={() => {}} // Controlled by button click
                      className="mt-1 accent-earth-800" 
                    />
                    <div>
                      <span className="text-xs font-bold block">{styleObj.name}</span>
                      <span className="text-[11px] text-earth-500 leading-normal mt-0.5 block">{styleObj.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Custom Notes */}
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-earth-800 block mb-2">
                5. Special Requests / Custom Motifs (Optional)
              </label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="E.g., 'Please include a central Sanskrit Om symbol in the relief work', 'I would love mostly teardrop mirrors', or describe your custom dimensions..."
                rows={3}
                className="w-full p-3 border border-earth-200 focus:outline-none focus:border-earth-800 rounded text-xs font-sans placeholder-earth-400 focus:ring-1 focus:ring-earth-800"
              />
            </div>

          </div>

          {/* Right panel: Live estimation card */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-earth-50 border border-earth-200 rounded p-6 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-earth-900 border-b border-earth-200 pb-2 flex items-center gap-1.5">
                <HeartHandshake className="w-5 h-5 text-gold-600" />
                Your Live Estimate
              </h3>

              {/* Specs parameters visual ledger */}
              <div className="space-y-3.5 text-xs font-sans text-earth-700">
                <div className="flex justify-between border-b border-earth-200/50 pb-1.5">
                  <span className="text-earth-400">Geometry</span>
                  <span className="font-semibold">{shape}</span>
                </div>
                <div className="flex justify-between border-b border-earth-200/50 pb-1.5">
                  <span className="text-earth-400">Dimensions</span>
                  <span className="font-semibold">{size}</span>
                </div>
                <div className="flex justify-between border-b border-earth-200/50 pb-1.5">
                  <span className="text-earth-400">Base Clay Color</span>
                  <span className="font-semibold">{colorTheme.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-earth-400">Mirror Density</span>
                  <span className="font-semibold">{mirrorStyle.split(' ')[0]}</span>
                </div>
              </div>

              {/* Estimate highlight box */}
              <div className="bg-earth-100 border border-earth-200 p-4 rounded text-center">
                <span className="text-[10px] uppercase tracking-widest text-earth-500 font-bold block mb-1">
                  Estimated Pricing
                </span>
                <span className="text-3xl font-serif font-bold text-earth-950">
                  ₹{priceEstimate}
                </span>
                <p className="text-[9px] text-earth-400 mt-2 font-sans">
                  Includes custom framing, secure crate-packing, and insured fragile transit.
                </p>
              </div>

              {/* Guarantee points */}
              <div className="space-y-2 bg-white/70 p-3.5 border border-earth-200 rounded text-[11px] text-earth-600 leading-relaxed font-sans">
                <div className="flex gap-1.5">
                  <span className="text-gold-600">✓</span>
                  <span><strong>12-Hour Callback:</strong> Design sketch approval before any clay relief work begins.</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-gold-600">✓</span>
                  <span><strong>Timeframe:</strong> 7-10 days of hand-sculpting and natural curing.</span>
                </div>
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                className="w-full py-3 bg-earth-800 hover:bg-earth-900 text-white text-xs uppercase tracking-widest font-bold rounded shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
                Submit Commission Request
              </button>

              <p className="text-[10px] text-center text-earth-400 leading-tight">
                No upfront payment required! Our designers review first and coordinate the details directly with you.
              </p>
            </div>
          </div>

        </form>
      )}
    </div>
  );

  // Return formatted either as modal layout or stand-alone block
  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-earth-950/50 backdrop-blur-sm transition-opacity duration-300" 
          onClick={onCloseModal} 
        />
        
        {/* Container */}
        <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded shadow-2xl border border-earth-200 z-10 animate-scaleIn">
          <button
            onClick={onCloseModal}
            className="absolute top-5 right-5 z-20 p-2 rounded-full bg-earth-900 text-gold-200 hover:bg-black transition-colors shadow"
            aria-label="Close custom studio modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          {configuratorLayout}
        </div>
      </div>
    );
  }

  return configuratorLayout;
}
