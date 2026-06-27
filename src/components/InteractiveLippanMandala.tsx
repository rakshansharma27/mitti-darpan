import React, { useState, useRef } from 'react';

interface InteractiveLippanMandalaProps {
  size?: number;
  className?: string;
  clayColor?: string; // 'cream' | 'terracotta' | 'ochre'
}

export default function InteractiveLippanMandala({ 
  size = 400, 
  className = '', 
  clayColor = 'cream' 
}: InteractiveLippanMandalaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightOffset, setHighlightOffset] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHighlightOffset({ x, y });
  };

  // Clay color configurations
  const clayPalette = {
    cream: {
      bg: '#FAF6ED',
      border: '#EADFC7',
      outline: '#DFD2B4',
      relief: '#CDBE9C',
      accent: '#BCA882',
    },
    terracotta: {
      bg: '#7B4E28',
      border: '#623B1B',
      outline: '#553215',
      relief: '#8E5A30',
      accent: '#DF9254',
    },
    ochre: {
      bg: '#C58C40',
      border: '#A36F2E',
      outline: '#906024',
      relief: '#DFAA60',
      accent: '#FFE5A3',
    }
  }[clayColor];

  // Helper arrays for generating mirrors in concentric rings
  const ring1Count = 8;
  const ring2Count = 16;
  const ring3Count = 24;
  const ring4Count = 32;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHighlightOffset({ x: 50, y: 50 });
      }}
      className={`relative cursor-crosshair select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic light reflection glow that follows the cursor */}
      {isHovered && (
        <div 
          className="absolute rounded-full pointer-events-none blur-3xl opacity-15"
          style={{
            left: `${highlightOffset.x}%`,
            top: `${highlightOffset.y}%`,
            width: size * 0.7,
            height: size * 0.7,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #FFF9DB 0%, rgba(197, 140, 64, 0.4) 60%, transparent 100%)',
            zIndex: 1,
          }}
        />
      )}

      {/* SVG Canvas for the Lippan Art */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        className="w-full h-full filter drop-shadow-[0_20px_25px_rgba(52,26,9,0.18)]"
      >
        <defs>
          {/* Mirror Glass Gradient: dynamic light focus */}
          <radialGradient id={`mirror-grad-${clayColor}`} cx={`${highlightOffset.x}%`} cy={`${highlightOffset.y}%`} r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#EBF4F6" />
            <stop offset="55%" stopColor="#CBDADC" />
            <stop offset="85%" stopColor="#7E9BA2" />
            <stop offset="100%" stopColor="#556E74" />
          </radialGradient>

          {/* Clay Roughness Pattern (simulating hand-crafted mud texture) */}
          <pattern id="clay-texture" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={clayPalette.bg} />
            <path d="M 0 10 Q 10 5 20 10 T 40 10" fill="none" stroke={clayPalette.outline} strokeWidth="0.5" opacity="0.15" />
            <path d="M 0 30 Q 10 25 20 30 T 40 30" fill="none" stroke={clayPalette.outline} strokeWidth="0.5" opacity="0.15" />
            <circle cx="5" cy="15" r="0.5" fill={clayPalette.relief} opacity="0.3" />
            <circle cx="25" cy="35" r="0.8" fill={clayPalette.relief} opacity="0.2" />
          </pattern>

          {/* Depth shadow for clay relief cylinders */}
          <filter id="clay-depth" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#341A09" floodOpacity="0.25" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="1" floodColor="#FFFFFF" floodOpacity="0.15" />
          </filter>

          {/* Soft mirror reflection shadow */}
          <filter id="mirror-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. Main Mud Plate Base */}
        <circle 
          cx="250" 
          cy="250" 
          r="230" 
          fill="url(#clay-texture)" 
          stroke={clayPalette.border} 
          strokeWidth="6" 
        />
        
        {/* Subtle circular clay concentric rings under the mud (relief-lines) */}
        <circle cx="250" cy="250" r="215" fill="none" stroke={clayPalette.outline} strokeWidth="3" opacity="0.4" />
        <circle cx="250" cy="250" r="170" fill="none" stroke={clayPalette.outline} strokeWidth="2.5" opacity="0.4" />
        <circle cx="250" cy="250" r="120" fill="none" stroke={clayPalette.outline} strokeWidth="2.5" opacity="0.4" />
        <circle cx="250" cy="250" r="70" fill="none" stroke={clayPalette.outline} strokeWidth="2" opacity="0.4" />

        {/* 2. Clay Relief Hand-Molded Lines (Intricate patterns) */}
        <g filter="url(#clay-depth)" stroke={clayPalette.border} fill="none" strokeLinecap="round">
          {/* Outer Border Sculpted Petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <path
                key={`outer-petal-${i}`}
                d="M 250 35 C 210 35, 210 75, 250 85 C 290 75, 290 35, 250 35"
                transform={`rotate(${angle} 250 250)`}
                strokeWidth="4"
                fill={clayColor === 'cream' ? '#FCF9F2' : clayPalette.relief}
                opacity="0.95"
              />
            );
          })}

          {/* Star-shaped inner network lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <line
                key={`star-line-${i}`}
                x1="250"
                y1="85"
                x2="250"
                y2="170"
                transform={`rotate(${angle} 250 250)`}
                strokeWidth="4.5"
              />
            );
          })}

          {/* Geometric diamond paths connecting rings */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <polygon
                key={`middle-diamond-${i}`}
                points="250,120 280,145 250,170 220,145"
                transform={`rotate(${angle} 250 250)`}
                strokeWidth="3.5"
                fill="none"
              />
            );
          })}

          {/* Inner ring scroll motifs */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            return (
              <path
                key={`inner-scroll-${i}`}
                d="M 250 170 Q 230 190 250 210 Q 270 190 250 170"
                transform={`rotate(${angle} 250 250)`}
                strokeWidth="4.5"
              />
            );
          })}

          {/* Central Mandala Flower base */}
          <circle cx="250" cy="250" r="50" fill="none" strokeWidth="5" />
          <circle cx="250" cy="250" r="22" fill={clayColor === 'cream' ? '#FAF6ED' : clayPalette.border} strokeWidth="4.5" />
        </g>

        {/* 3. The Embedded Shimmering Mirrors (Geometric Glass elements) */}
        <g filter="url(#mirror-depth)">
          
          {/* CENTER MIRROR: Huge central circular glass */}
          <circle 
            cx="250" 
            cy="250" 
            r="15" 
            fill={`url(#mirror-grad-${clayColor})`} 
            stroke="#FFFFFF" 
            strokeWidth="1" 
          />
          <circle 
            cx="250" 
            cy="250" 
            r="15" 
            fill="#FFFFFF" 
            opacity={isHovered ? 0.15 : 0.05} 
          />

          {/* RING 1 (Inner): 8 Circular mirrors around the center */}
          {Array.from({ length: ring1Count }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / ring1Count;
            const r = 36;
            const cx = 250 + r * Math.sin(angle);
            const cy = 250 - r * Math.cos(angle);
            return (
              <circle
                key={`mirror-r1-${i}`}
                cx={cx}
                cy={cy}
                r="6"
                fill={`url(#mirror-grad-${clayColor})`}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                className="transition-all duration-300"
              />
            );
          })}

          {/* RING 2: 16 Diamond/Square shaped mirrors */}
          {Array.from({ length: ring2Count }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / ring2Count;
            const r = 95;
            const cx = 250 + r * Math.sin(angle);
            const cy = 250 - r * Math.cos(angle);
            
            // Generate diamond points
            const dSize = 7;
            const points = `
              ${cx},${cy - dSize} 
              ${cx + dSize},${cy} 
              ${cx},${cy + dSize} 
              ${cx - dSize},${cy}
            `;
            
            return (
              <polygon
                key={`mirror-r2-${i}`}
                points={points}
                fill={`url(#mirror-grad-${clayColor})`}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                transform={`rotate(${(i * 360) / ring2Count} ${cx} ${cy})`}
              />
            );
          })}

          {/* RING 3: 24 Triangles pointing outwards */}
          {Array.from({ length: ring3Count }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / ring3Count;
            const r = 145;
            const cx = 250 + r * Math.sin(angle);
            const cy = 250 - r * Math.cos(angle);

            // Triangle pointing outward
            const tSize = 6;
            const points = `
              ${cx},${cy - tSize}
              ${cx + tSize * 0.9},${cy + tSize}
              ${cx - tSize * 0.9},${cy + tSize}
            `;

            return (
              <polygon
                key={`mirror-r3-${i}`}
                points={points}
                fill={`url(#mirror-grad-${clayColor})`}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                transform={`rotate(${(i * 360) / ring3Count + 90} ${cx} ${cy})`}
              />
            );
          })}

          {/* RING 4 (Outer Border): 32 Teardrop/Almond shaped mirrors inside the outer border arcs */}
          {Array.from({ length: ring4Count }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / ring4Count;
            const r = 205;
            const cx = 250 + r * Math.sin(angle);
            const cy = 250 - r * Math.cos(angle);

            // Oval / Marquise shaped mirror
            return (
              <ellipse
                key={`mirror-r4-${i}`}
                cx={cx}
                cy={cy}
                rx="4"
                ry="8"
                fill={`url(#mirror-grad-${clayColor})`}
                stroke="#FFFFFF"
                strokeWidth="0.8"
                transform={`rotate(${(i * 360) / ring4Count + 90} ${cx} ${cy})`}
              />
            );
          })}
        </g>
      </svg>

      {/* Decorative center mirror glint overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] opacity-90 transition-all duration-300"
          style={{
            transform: `translate(${(highlightOffset.x - 50) * 0.2}px, ${(highlightOffset.y - 50) * 0.2}px)`,
          }}
        />
      </div>

      {/* Micro instructions overlay on corner */}
      <div className="absolute bottom-2 right-4 text-[10px] uppercase tracking-widest text-earth-500 font-medium opacity-60 pointer-events-none hidden sm:block">
        Hover to Glisten ✨
      </div>
    </div>
  );
}
