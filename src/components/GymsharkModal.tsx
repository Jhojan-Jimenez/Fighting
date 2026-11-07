import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Check, Heart } from 'lucide-react';
import { MockupItem } from '../data/mockups';
import { getColorwaySwatch, getElementIcon, getElementTheme } from './GymsharkCard';

interface GymsharkModalProps {
  item: MockupItem | null;
  availableColorways: MockupItem[];
  onSelectColorway: (item: MockupItem) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const GymsharkModal: React.FC<GymsharkModalProps> = ({
  item,
  availableColorways,
  onSelectColorway,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    setZoomLevel(1);
  }, [item?.id]);

  if (!item) return null;

  const currentSwatch = getColorwaySwatch(item.modelCode);
  const theme = getElementTheme(item.element);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4 md:p-6">
      {/* Container - Fullscreen on mobile, perfectly proportioned dialog on desktop */}
      <div className="relative w-full h-full sm:h-[88vh] sm:max-h-[840px] max-w-7xl bg-white sm:rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-300/40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-40 p-2 rounded-full bg-white/95 hover:bg-black hover:text-white text-neutral-800 shadow-md border border-neutral-200 transition-all hover:scale-105"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Expansive Studio Canvas for Mockup (Seamless Studio Gray Background) */}
        <div className="relative w-full lg:w-[62%] xl:w-[65%] h-[48vh] sm:h-[54vh] lg:h-full bg-[#d0c6c6] flex items-center justify-center p-4 sm:p-8 select-none overflow-hidden shrink-0">
          {/* Arrow Left */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-black hover:text-white text-black shadow-lg transition-all group hover:scale-105"
              title="Anterior (←)"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Arrow Right */}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-black hover:text-white text-black shadow-lg transition-all group hover:scale-105"
              title="Siguiente (→)"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Zoom controls */}
          <div className="absolute bottom-3.5 left-4 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-neutral-300 rounded-full px-2.5 py-1 shadow-md text-xs font-semibold">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-1 hover:text-black text-neutral-600 transition-colors"
              title="Alejar"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] sm:text-[11px] px-1 font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="p-1 hover:text-black text-neutral-600 transition-colors"
              title="Acercar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 text-black ml-0.5 hover:opacity-70 transition-opacity"
                title="Resetear escala"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Product Image Canvas */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              key={item.image}
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-sm select-none"
            />
          </div>
        </div>

        {/* Right: Technical Details Sidebar */}
        <div className="w-full lg:w-[38%] xl:w-[35%] p-6 sm:p-8 bg-white flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-neutral-200 font-sans flex-1">
          <div className="space-y-4 sm:space-y-5">
            {/* Header info with comfortable right padding so it never collides with the close button */}
            <div className="pr-12">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                <span>{item.gender} · {item.modelCode}</span>
                <span className="text-black font-semibold">EDICIÓN 2026</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase text-black leading-none mt-1 flex items-center gap-2">
                <span className={theme.iconColor}>{getElementIcon(item.element, "w-6 h-6")}</span>
                <span>RASHGUARD ELEMENTO {item.elementLabel}</span>
              </h2>
              <div className="text-lg sm:text-xl font-bold text-black mt-2">
                $169.000 COP
              </div>
            </div>

            {/* Interactive Colorways Selector in the Modal */}
            {availableColorways.length > 1 && (
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-600">
                    Color: <strong className="text-black">{currentSwatch.name}</strong> ({item.modelCode})
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {availableColorways.length} colores
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-0.5 flex-wrap">
                  {availableColorways.map((c) => {
                    const isActive = c.modelCode === item.modelCode;
                    const swatch = getColorwaySwatch(c.modelCode);

                    return (
                      <button
                        key={c.id}
                        onClick={() => onSelectColorway(c)}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-md border transition-all flex items-center justify-center overflow-hidden shrink-0 ${
                          isActive
                            ? 'border-black ring-2 ring-black ring-offset-2 scale-110 shadow-md'
                            : 'border-neutral-300 hover:scale-105 hover:border-neutral-700'
                        }`}
                        style={{ backgroundColor: swatch.bg }}
                        title={`${swatch.name} (${c.modelCode})`}
                      >
                        <span
                          className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-tl"
                          style={{ backgroundColor: swatch.accent }}
                        />
                        {swatch.isLight && (
                          <span className="absolute inset-0 border border-neutral-300 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Philosophy Pill */}
            <div className="p-3.5 sm:p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between font-bold text-xs uppercase tracking-wider text-black mb-1">
                <span>Filosofía ({item.elementSublabel})</span>
                <span className="text-xl font-serif text-neutral-400">{item.kanji}</span>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                Características de Combate
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs text-neutral-600">
                {item.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 sm:pt-6 border-t border-neutral-200 mt-4 sm:mt-6 space-y-2">
            <button
              onClick={() => onToggleWishlist(item.id)}
              className="w-full py-3 sm:py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : ''}`} />
              <span>{isWishlisted ? 'Guardado en Favoritos' : 'Agregar a Favoritos'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 sm:py-3 bg-neutral-100 text-neutral-800 hover:text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
