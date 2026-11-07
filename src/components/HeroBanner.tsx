import React from 'react';
import { Waves, Wind, Flame, Mountain, Sparkles, Layers } from 'lucide-react';

interface HeroBannerProps {
  onSelectElement: (element: string) => void;
  selectedElement: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectElement,
  selectedElement,
}) => {
  const elements = [
    { id: 'AGUA', label: 'Agua', kanji: '水', icon: Waves, color: 'text-sky-400', border: 'hover:border-sky-500/50', desc: 'Fluidez y transición constante' },
    { id: 'AIRE', label: 'Aire', kanji: '気', icon: Wind, color: 'text-slate-300', border: 'hover:border-slate-300/50', desc: 'Libertad y movilidad ingrávida' },
    { id: 'FUEGO', label: 'Fuego', kanji: '火', icon: Flame, color: 'text-rose-400', border: 'hover:border-rose-500/50', desc: 'Fuerza explosiva e implacable' },
    { id: 'TIERRA', label: 'Tierra', kanji: '土', icon: Mountain, color: 'text-emerald-400', border: 'hover:border-emerald-500/50', desc: 'Base sólida y control posicional' },
    { id: 'AVATAR', label: 'Avatar', kanji: '全', icon: Sparkles, color: 'text-purple-400', border: 'hover:border-purple-500/50', desc: 'Equilibrio total de los 4 elementos' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pt-12 pb-16 bg-gradient-to-b from-neutral-950 via-[#0a0c10] to-[#07080b]">
      {/* Background radial spotlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand header kicker */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-rose-500/60" />
          <span className="text-[11px] font-bold tracking-ultra uppercase text-rose-400 font-mono">
            COLLECTION RELEASE 2026 · COMBAT APPAREL
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none mb-4 font-display">
              THE FOUR ELEMENTS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-500 text-3xl sm:text-4xl lg:text-5xl font-light mt-1">
                Rashguard Engineering Showcase
              </span>
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Indumentaria de compresión de alta gama para Jiu-Jitsu Brasileño y deportes de combate. 
              Sublimación de alta densidad, costuras planas anti-fricción e iconografía elemental inspirada en la disciplina marcial.
            </p>
          </div>

          {/* Quick Specifications Pill Bar */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0 bg-neutral-900/50 p-4 rounded-2xl border border-white/[0.08] backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="font-medium text-white">38 Mockups Renderizados</span>
              <span className="text-neutral-500">(Frente & Espalda)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Corte Pro Compresión 4-Way</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Gama Hombre (6 Series) & Mujer (2 Series)</span>
            </div>
          </div>
        </div>

        {/* Interactive Elemental Philosophy Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {elements.map((elem) => {
            const Icon = elem.icon;
            const isSelected = selectedElement === elem.id;
            return (
              <button
                key={elem.id}
                onClick={() => onSelectElement(isSelected ? 'ALL' : elem.id)}
                className={`group text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'bg-neutral-800/90 border-white/40 shadow-lg shadow-black/60 scale-[1.02]'
                    : `bg-neutral-900/40 border-white/[0.06] ${elem.border} hover:bg-neutral-900/80`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-neutral-950/70 border border-white/[0.06] ${elem.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-serif opacity-30 group-hover:opacity-60 text-white transition-opacity font-bold">
                    {elem.kanji}
                  </span>
                </div>
                <div className="font-bold text-sm text-white group-hover:text-white flex items-center justify-between">
                  <span>{elem.label}</span>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                      ACTIVO
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                  {elem.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
