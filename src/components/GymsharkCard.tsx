import React, { useState, useEffect } from 'react';
import { Heart, Maximize2, Waves, Wind, Flame, Mountain, Sparkles } from 'lucide-react';
import { MockupItem } from '../data/mockups';

export interface ElementProduct {
  id: string; // e.g. "HOMBRE_AGUA"
  element: 'AGUA' | 'AIRE' | 'FUEGO' | 'TIERRA' | 'AVATAR';
  elementLabel: string;
  elementSublabel: string;
  kanji: string;
  quote: string;
  gender: 'HOMBRE' | 'MUJER';
  colorways: MockupItem[]; // All color variants of this element
}

interface GymsharkCardProps {
  product: ElementProduct;
  globalColorway: string;
  onOpenModal: (item: MockupItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const getElementTheme = (element: string) => {
  switch (element) {
    case 'AGUA':
      return {
        name: 'Agua',
        color: '#0284c7',
        iconColor: 'text-sky-500',
        badgeBg: 'bg-sky-50 text-sky-700 border-sky-300',
        activePill: 'bg-sky-500 text-white border-sky-600',
      };
    case 'AIRE':
      return {
        name: 'Aire',
        color: '#475569',
        iconColor: 'text-slate-500',
        badgeBg: 'bg-slate-100 text-slate-700 border-slate-300',
        activePill: 'bg-slate-800 text-white border-slate-900',
      };
    case 'FUEGO':
      return {
        name: 'Fuego',
        color: '#e11d48',
        iconColor: 'text-rose-500',
        badgeBg: 'bg-rose-50 text-rose-700 border-rose-300',
        activePill: 'bg-rose-600 text-white border-rose-700',
      };
    case 'TIERRA':
      return {
        name: 'Tierra',
        color: '#059669',
        iconColor: 'text-emerald-500',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
        activePill: 'bg-emerald-600 text-white border-emerald-700',
      };
    case 'AVATAR':
      return {
        name: 'Avatar',
        color: '#7c3aed',
        iconColor: 'text-purple-500',
        badgeBg: 'bg-purple-50 text-purple-700 border-purple-300',
        activePill: 'bg-purple-600 text-white border-purple-700',
      };
    default:
      return {
        name: element,
        color: '#111111',
        iconColor: 'text-black',
        badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-200',
        activePill: 'bg-black text-white border-black',
      };
  }
};

export const getElementIcon = (element: string, className = "w-3.5 h-3.5") => {
  switch (element) {
    case 'AGUA': return <Waves className={className} />;
    case 'AIRE': return <Wind className={className} />;
    case 'FUEGO': return <Flame className={className} />;
    case 'TIERRA': return <Mountain className={className} />;
    case 'AVATAR': return <Sparkles className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const getColorwaySwatch = (modelCode: string) => {
  switch (modelCode) {
    case 'H01':
      return { bg: '#111111', accent: '#ffffff', name: 'Negro / Blanco' };
    case 'H02':
      return { bg: '#111111', accent: '#2563eb', name: 'Negro / Azul' };
    case 'H03':
      return { bg: '#111111', accent: '#9333ea', name: 'Negro / Morado' };
    case 'H04':
      return { bg: '#111111', accent: '#78350f', name: 'Negro / Marrón' };
    case 'H05':
      return { bg: '#111111', accent: '#dc2626', name: 'Negro / Rojo' };
    case 'H06':
      return { bg: '#ffffff', accent: '#dc2626', name: 'Blanco / Rojo', isLight: true };
    case 'M01':
      return { bg: '#ffffff', accent: '#f43f5e', name: 'Blanco / Rosa', isLight: true };
    case 'M02':
      return { bg: '#111111', accent: '#f43f5e', name: 'Negro / Rosa' };
    default:
      return { bg: '#111111', accent: '#ffffff', name: modelCode };
  }
};

export const GymsharkCard: React.FC<GymsharkCardProps> = ({
  product,
  globalColorway,
  onOpenModal,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedModelCode, setSelectedModelCode] = useState<string>(
    product.colorways[0]?.modelCode || 'H01'
  );

  // Sync with global colorway filter if active and available in this element
  useEffect(() => {
    if (globalColorway !== 'ALL' && product.colorways.some((c) => c.modelCode === globalColorway)) {
      setSelectedModelCode(globalColorway);
    }
  }, [globalColorway, product.colorways]);

  // Current active colorway item for this element
  const currentItem =
    product.colorways.find((c) => c.modelCode === selectedModelCode) || product.colorways[0];

  const theme = getElementTheme(product.element);
  const currentSwatch = getColorwaySwatch(currentItem.modelCode);

  return (
    <div
      className="group flex flex-col font-sans select-none cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(currentItem)}
    >
      {/* 1. Main Image Box - Clean 3:2 landscape */}
      <div className="relative aspect-[3/2] bg-[#dcd7d4] rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 border border-neutral-200 group-hover:border-neutral-400 group-hover:shadow-md">
        {/* Top Right: Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm text-neutral-500 hover:text-black hover:bg-white transition-all shadow-sm"
          title="Guardar en favoritos"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-black text-black' : 'hover:scale-110'
            }`}
          />
        </button>

        {/* Product Mockup Image */}
        <img
          key={currentItem.image}
          src={currentItem.image}
          alt={currentItem.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />

        {/* Quick View Button on Hover (Desktop) / Indicator on Mobile */}
        <div
          className={`absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-6 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(currentItem);
            }}
            className="w-full py-2 sm:py-2.5 bg-black text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider rounded shadow-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Ver en Pantalla Completa & Zoom</span>
          </button>
        </div>
      </div>

      {/* 2. Colorways Swatches Row (Change the color of this Element) */}
      <div className="flex items-center gap-2 sm:gap-2 mt-3 mb-1 flex-wrap">
        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mr-0.5">
          Colores ({product.colorways.length}):
        </span>
        {product.colorways.map((c) => {
          const isActive = c.modelCode === selectedModelCode;
          const swatch = getColorwaySwatch(c.modelCode);

          return (
            <button
              key={c.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedModelCode(c.modelCode);
              }}
              className={`relative w-6 h-6 sm:w-5 sm:h-5 rounded-sm border transition-all flex items-center justify-center overflow-hidden shrink-0 ${
                isActive
                  ? 'border-black ring-2 ring-black ring-offset-1 scale-110 shadow-sm'
                  : 'border-neutral-300 hover:scale-105 hover:border-neutral-600'
              }`}
              style={{ backgroundColor: swatch.bg }}
              title={`${swatch.name} (${c.modelCode})`}
            >
              {/* Secondary color accent */}
              <span
                className="absolute bottom-0 right-0 w-3 h-3 sm:w-2.5 sm:h-2.5 rounded-tl"
                style={{ backgroundColor: swatch.accent }}
              />
              {swatch.isLight && (
                <span className="absolute inset-0 border border-neutral-300 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Product Info */}
      <div className="space-y-0.5 mt-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-black group-hover:underline flex items-center gap-1.5">
            <span className={theme.iconColor}>{getElementIcon(product.element, "w-4 h-4")}</span>
            <span>RASHGUARD ELEMENTO {product.elementLabel} ({product.kanji})</span>
          </h3>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            {product.gender}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-0.5">
          <p className="text-neutral-500 font-medium">
            Color: <span className="text-black font-semibold">{currentSwatch.name}</span>{' '}
            <span className="text-neutral-400 font-mono text-[10px]">({currentItem.modelCode})</span>
          </p>
          <span className="font-bold text-xs sm:text-sm text-black">
            $169.000 COP
          </span>
        </div>

        {/* Martial quote snippet */}
        <p className="text-[11px] text-neutral-400 italic truncate pt-0.5">
          "{product.quote.split('·')[1]?.trim() || product.quote}"
        </p>
      </div>
    </div>
  );
};
