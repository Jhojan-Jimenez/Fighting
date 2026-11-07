import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { MockupItem } from '../data/mockups';

interface MockupModalProps {
  item: MockupItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const MockupModal: React.FC<MockupModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Reset zoom on item change
  useEffect(() => {
    setZoomLevel(1);
  }, [item?.id]);

  if (!item) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.image;
    link.download = item.filename;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between z-30 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
            {item.modelCode}
          </span>
          <span className="text-sm font-semibold text-white tracking-wide truncate max-w-xs sm:max-w-md">
            {item.title}
          </span>
        </div>

        {/* Zoom controls & close */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-neutral-900 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-all"
              title="Alejar (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-2 text-neutral-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-all"
              title="Acercar (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 text-rose-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-all"
                title="Restablecer escala"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-xs font-medium text-white transition-all"
            title="Descargar archivo original"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Descargar</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-400 hover:text-white transition-all"
            title="Cerrar modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main modal content container */}
      <div className="w-full h-full pt-16 flex flex-col lg:flex-row overflow-hidden">
        {/* Left / Center: Interactive Canvas with arrows */}
        <div className="relative flex-1 h-[60vh] lg:h-full bg-gradient-to-b from-[#0a0c10] via-black to-[#050608] flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
          {/* Previous item button */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-neutral-900/80 hover:bg-white text-neutral-300 hover:text-black border border-white/10 transition-all shadow-2xl backdrop-blur-md group"
              title="Anterior (Flecha izquierda)"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Next item button */}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-2xl bg-neutral-900/80 hover:bg-white text-neutral-300 hover:text-black border border-white/10 transition-all shadow-2xl backdrop-blur-md group"
              title="Siguiente (Flecha derecha)"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* High-res Image with zoom transform */}
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Bottom badge on canvas */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-950/80 border border-white/10 text-[11px] font-mono text-neutral-400 backdrop-blur-md flex items-center gap-3">
            <span>FRENTE (PECHO / MANGAS)</span>
            <span className="text-white/20">|</span>
            <span>ESPALDA (KANJI / IDENTIDAD)</span>
          </div>
        </div>

        {/* Right Sidebar: Technical Specs & Philosophy */}
        <div className="w-full lg:w-96 lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0c0e14] p-6 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-6">
            {/* Model & Element Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {item.gender}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  SERIE {item.modelCode}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-display leading-tight">
                {item.title}
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Paleta Oficial: {item.colorScheme}
              </p>
            </div>

            {/* Elemental Philosophy Card */}
            <div
              className="p-4 rounded-2xl border relative overflow-hidden backdrop-blur-md"
              style={{
                backgroundColor: item.badgeBg,
                borderColor: item.borderColor,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: item.color }} />
                  <span className="font-bold text-sm tracking-wide" style={{ color: item.color }}>
                    Elemento {item.elementLabel}
                  </span>
                </div>
                <span className="text-2xl font-serif font-extrabold opacity-40 text-white">
                  {item.kanji}
                </span>
              </div>
              <p className="text-xs italic text-neutral-300 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="mt-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                Concepto: {item.elementSublabel}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                Especificaciones de Manufactura
              </h4>
              <ul className="space-y-2">
                {item.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* File Path / Hierarchy Metadata */}
            <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/[0.06] space-y-1.5 font-mono text-[11px]">
              <div className="text-neutral-500 uppercase tracking-wider text-[9px]">Ubicación en Servidor / Drive</div>
              <div className="text-neutral-300 break-all bg-black/40 p-2 rounded border border-white/5">
                01_MOCKUPS / {item.gender} / {item.modelFolder} / {item.element} / {item.filename}
              </div>
              <div className="flex justify-between text-neutral-400 text-[10px] pt-1">
                <span>Formato: PNG 16:9 HD</span>
                <span>Resolución: ~1920×1080</span>
              </div>
            </div>
          </div>

          {/* Action button in sidebar */}
          <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>DESCARGAR MOCKUP ORIGINAL (PNG)</span>
            </button>
            <p className="text-[10px] text-center text-neutral-400 font-mono">
              Presiona [←] o [→] para navegar entre mockups
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
