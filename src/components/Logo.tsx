import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
}

export function Logo({ className = '', showText = true, lightText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Abia State Seal SVG */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background base */}
        <circle cx="50" cy="55" r="32" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="55" r="28" fill="#F8FAFC" stroke="#008641" strokeWidth="1" />
        
        {/* Shield in center */}
        <path
          d="M38 45 C38 45 38 65 50 72 C62 65 62 45 62 45 Z"
          fill="#B51025"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        {/* Shield partition */}
        <path d="M50 45 V72" stroke="#D4AF37" strokeWidth="1" />
        <path d="M38 56 H62" stroke="#D4AF37" strokeWidth="1" />
        
        {/* Shield icons (simplified) */}
        {/* Top-left: red area, mechanical arm (yellow) */}
        <circle cx="44" cy="50" r="3" fill="#F59E0B" />
        <line x1="44" y1="50" x2="47" y2="53" stroke="#F59E0B" strokeWidth="1" />
        
        {/* Top-right: gold area, book */}
        <path d="M53 49 H57 V53 H53 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
        
        {/* Bottom-left: palm tree or cocoa */}
        <path d="M42 63 C42 63 44 58 46 63" stroke="#008641" strokeWidth="1.5" />
        
        {/* Bottom-right: palm tree */}
        <path d="M54 63 C54 63 56 58 58 63" stroke="#008641" strokeWidth="1.5" />
        
        {/* Eagle on top */}
        <path
          d="M50 25 C45 25 40 20 40 18 C43 20 47 22 50 22 C53 22 57 20 60 18 C60 20 55 25 50 25 Z"
          fill="#D4AF37"
          stroke="#9A3412"
          strokeWidth="0.5"
        />
        {/* Eagle Head */}
        <circle cx="50" cy="16" r="2.5" fill="#D4AF37" />
        <path d="M49.5 16.5 L47 16" fill="#F59E0B" />
        {/* Eagle wings */}
        <path
          d="M40 18 C30 14 28 8 28 8 C32 12 36 15 45 18 Z"
          fill="#D4AF37"
          stroke="#9A3412"
          strokeWidth="0.5"
        />
        <path
          d="M60 18 C70 14 72 8 72 8 C68 12 64 15 55 18 Z"
          fill="#D4AF37"
          stroke="#9A3412"
          strokeWidth="0.5"
        />
        
        {/* Leopard on left */}
        <path
          d="M26 42 C22 42 16 46 16 54 C16 62 24 66 26 66 C26 66 24 58 26 50 Z"
          fill="#C2410C"
          stroke="#9A3412"
          strokeWidth="0.5"
        />
        <circle cx="19" cy="50" r="1" fill="#000" />
        
        {/* Elephant on right */}
        <path
          d="M74 42 C78 42 84 46 84 54 C84 62 76 66 74 66 C74 66 76 58 74 50 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="0.5"
        />
        {/* Trunk */}
        <path d="M82 54 C85 54 87 50 86 46" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Cocoa Pods/Greens at bottom */}
        <ellipse cx="38" cy="80" rx="6" ry="3" fill="#008641" />
        <ellipse cx="62" cy="80" rx="6" ry="3" fill="#008641" />
        
        {/* Banner at bottom */}
        <path
          d="M20 78 C35 83 65 83 80 78 C75 84 25 84 20 78 Z"
          fill="#F1F5F9"
          stroke="#475569"
          strokeWidth="1"
        />
        <text
          x="50"
          y="81.5"
          fontSize="3.5"
          fontWeight="bold"
          fill="#0f172a"
          textAnchor="middle"
        >
          PROSPERITY THROUGH ENTERPRISE
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`text-xs font-bold uppercase tracking-wider leading-none ${lightText ? 'text-slate-200' : 'text-slate-900'}`}>
            Abia State Government
          </span>
          <span className={`text-sm font-extrabold tracking-tight leading-tight mt-0.5 ${lightText ? 'text-white' : 'text-slate-900'}`}>
            Ministry of Lands & Housing
          </span>
        </div>
      )}
    </div>
  );
}
