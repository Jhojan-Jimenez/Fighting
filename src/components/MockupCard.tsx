import React from 'react';
import { Maximize2, Download, Eye, Sparkles } from 'lucide-react';
import { MockupItem } from '../data/mockups';

interface MockupCardProps {
  item: MockupItem;
  onOpenModal: (item: MockupItem) => void;
}

export const MockupCard: React.FC<MockupCardProps> = ({ item, onOpenModal }) => {
  const getGlowClass = (element: string) => {
    switch (element) {
      case 'AGUA': return 'glow-water';
      case 'AIRE': return 'glow-air';
      case 'FUEGO': return 'glow-fire';
      case 'TIERRA': return 'glow-earth';
      case 'AVATAR': return 'glow-avatar';
      default: return '';
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.image;
    link.download = item.filename;
    link.click();
  };

  return (
    <div
      onClick={() => onOpenModal(item)}
      className={`group relative rounded-2xl overflow-hidden glass-card transition-all duration-300 cursor-pointer flex flex-col ${getGlowClass(
        item.element
      )} hover:-translate-y-1`}
    >
      {/* Top Card Bar */}
      <div className="p-4 pb-3 flex items-center justify-between gap-2 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          {/* Gender tag */}
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase ${
              item.gender === 'HOMBRE'
                ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
            }`}
          >
            {item.gender}
          </span>

          {/* Model ID */}
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            {item.modelCode}
          </span>
        </div>

        {/* Element badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md"
          style={{
            backgroundColor: item.badgeBg,
            borderColor: item.borderColor,
            color: item.color,
          }}
        >
          <span className="font-serif font-bold text-xs">{item.kanji}</span>
          <span className="text-[11px] uppercase tracking-wider">{item.elementLabel}</span>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative aspect-[16/10] bg-gradient-to-b from-neutral-900/60 to-black/90 overflow-hidden flex items-center justify-center p-2">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="text-[11px] font-mono text-neutral-300 tracking-wider">
            FRENTE & ESPALDA
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-neutral-900/90 text-white hover:bg-neutral-800 border border-white/20 transition-all"
              title="Descargar archivo PNG original"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all shadow-lg"
              title="Ver en pantalla completa"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspeccionar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="p-4 pt-3 flex-1 flex flex-col justify-between bg-neutral-950/40">
        <div>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
            Paleta: {item.colorScheme}
          </div>
          <h3 className="font-display font-bold text-sm text-white group-hover:text-rose-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
        </div>

        {/* Japanese philosophy snippet */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-neutral-400">
          <span className="truncate italic">
            "{item.quote.split('·')[1]?.trim() || item.quote}"
          </span>
          <span className="shrink-0 font-mono text-[10px] text-neutral-400 group-hover:text-neutral-400 transition-colors ml-2">
            VER DETALLE →
          </span>
        </div>
      </div>
    </div>
  );
};
