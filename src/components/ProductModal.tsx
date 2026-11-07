import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Check, Heart, Ruler } from 'lucide-react';
import { MockupItem } from '../data/mockups';
import { getColorwaySwatch, getElementIcon, getElementTheme, AVAILABLE_SIZES, ProductSize } from './ProductCard';

interface ProductModalProps {
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

export const ProductModal: React.FC<ProductModalProps> = ({
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
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSizeGuide) {
          setShowSizeGuide(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, showSizeGuide]);

  useEffect(() => {
    setZoomLevel(1);
  }, [item?.id]);

  if (!item) return null;

  const currentSwatch = getColorwaySwatch(item.modelCode);
  const theme = getElementTheme(item.element);

  const sizeGuideData = [
    { size: 'S', chest: '88 - 94 cm', length: '65 cm', weight: '55 - 68 kg' },
    { size: 'M', chest: '95 - 102 cm', length: '68 cm', weight: '68 - 78 kg' },
    { size: 'L', chest: '103 - 110 cm', length: '71 cm', weight: '78 - 88 kg' },
    { size: 'XL', chest: '111 - 118 cm', length: '74 cm', weight: '88 - 98 kg' },
    { size: '2XL', chest: '119 - 126 cm', length: '77 cm', weight: '98 - 110 kg' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4 md:p-6">
      {/* Container - Fullscreen on mobile, perfectly proportioned dialog on desktop */}
      <div className="relative w-full h-full sm:h-[90vh] sm:max-h-[860px] max-w-7xl bg-white sm:rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-300/40">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-40 p-2 rounded-full bg-white/95 hover:bg-black hover:text-white text-neutral-800 shadow-md border border-neutral-200 transition-all hover:scale-105"
          title="Cerrar (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Expansive Studio Canvas for Mockup (Seamless Studio Gray Background) */}
        <div className="relative w-full lg:w-[60%] xl:w-[64%] h-[46vh] sm:h-[52vh] lg:h-full bg-[#d0c6c6] flex items-center justify-center p-4 sm:p-8 select-none overflow-hidden shrink-0">
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
        <div className="w-full lg:w-[40%] xl:w-[36%] p-5 sm:p-7 bg-white flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-neutral-200 font-sans flex-1">
          <div className="space-y-4">
            {/* Header info */}
            <div className="pr-12">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                <span>{item.gender} · {item.modelCode}</span>
                <span className="text-black font-semibold">EDICIÓN 2026</span>
              </div>
              <h2 className="font-bebas text-3xl sm:text-4xl tracking-wide uppercase text-black leading-none mt-1 flex items-center gap-2">
                <span className={theme.iconColor}>{getElementIcon(item.element, "w-6 h-6")}</span>
                <span>RASHGUARD ELEMENTO {item.elementLabel}</span>
              </h2>
              <div className="text-lg sm:text-xl font-bold text-black mt-1.5">
                $169.000 COP
              </div>
            </div>

            {/* Interactive Colorways Selector */}
            {availableColorways.length > 1 && (
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-600">
                    Color: <strong className="text-black">{currentSwatch.name}</strong> ({item.modelCode})
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {availableColorways.length} colores
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                  {availableColorways.map((c) => {
                    const isActive = c.modelCode === item.modelCode;
                    const swatch = getColorwaySwatch(c.modelCode);

                    return (
                      <button
                        key={c.id}
                        onClick={() => onSelectColorway(c)}
                        className={`relative w-7 h-7 rounded-md border transition-all flex items-center justify-center overflow-hidden shrink-0 ${
                          isActive
                            ? 'border-black ring-2 ring-black ring-offset-2 scale-110 shadow-md'
                            : 'border-neutral-300 hover:scale-105 hover:border-neutral-700'
                        }`}
                        style={{ backgroundColor: swatch.bg }}
                        title={`${swatch.name} (${c.modelCode})`}
                      >
                        <span
                          className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-tl"
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

            {/* Size Selector Section (S, M, L, XL, 2XL) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-black">
                  Talla: <span className="font-bold text-rose-600">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-neutral-600 hover:text-black underline transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Guía de tallas</span>
                </button>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {AVAILABLE_SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-sm scale-102 ring-1 ring-black'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-neutral-400 italic">
                Ajuste de compresión Pro (Grappling No-Gi). Si prefieres ajuste holgado, pide una talla más.
              </p>
            </div>

            {/* Philosophy Pill */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-between font-bold text-xs uppercase tracking-wider text-black mb-0.5">
                <span>Filosofía ({item.elementSublabel})</span>
                <span className="text-lg font-serif text-neutral-400">{item.kanji}</span>
              </div>
              <p className="text-xs text-neutral-600 italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            {/* Features */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-black">
                Especificaciones de Combate
              </h4>
              <ul className="space-y-1 text-xs text-neutral-600">
                {item.specs.slice(0, 3).map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                    <span className="leading-tight">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-200 mt-4 space-y-2">
            <button
              onClick={() => onToggleWishlist(item.id)}
              className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : ''}`} />
              <span>{isWishlisted ? `Guardado en Favoritos (${selectedSize})` : `Agregar a Favoritos — Talla ${selectedSize}`}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-neutral-100 text-neutral-800 hover:text-black hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Volver al Catálogo
            </button>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Sub-dialog */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-black" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-black">
                  Guía de Tallas Oficial (No-Gi)
                </h3>
              </div>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="p-1 text-neutral-400 hover:text-black rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Medidas recomendadas para ajuste óptimo de compresión sobre el cuerpo en entrenamiento de grappling y Jiu-Jitsu.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2">Talla</th>
                    <th className="p-2">Pecho</th>
                    <th className="p-2">Largo</th>
                    <th className="p-2">Peso Sugerido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {sizeGuideData.map((row) => (
                    <tr
                      key={row.size}
                      className={selectedSize === row.size ? 'bg-neutral-50 font-bold text-black' : 'text-neutral-600'}
                    >
                      <td className="p-2 font-bold">{row.size}</td>
                      <td className="p-2">{row.chest}</td>
                      <td className="p-2">{row.length}</td>
                      <td className="p-2">{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
