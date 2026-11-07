import React from 'react';
import { Filter, Grid3X3, Grid2X2, LayoutGrid, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  gender: string;
  onGenderChange: (g: string) => void;
  element: string;
  onElementChange: (e: string) => void;
  modelCode: string;
  onModelCodeChange: (m: string) => void;
  columns: 2 | 3 | 4;
  onColumnsChange: (cols: 2 | 3 | 4) => void;
  availableModels: { code: string; label: string; count: number }[];
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  gender,
  onGenderChange,
  element,
  onElementChange,
  modelCode,
  onModelCodeChange,
  columns,
  onColumnsChange,
  availableModels,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-neutral-950/80 border-b border-white/[0.08] backdrop-blur-md sticky top-20 z-30 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Gender tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-white/10">
            {[
              { id: 'ALL', label: 'Todos' },
              { id: 'HOMBRE', label: 'Hombre (30)' },
              { id: 'MUJER', label: 'Mujer (8)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onGenderChange(tab.id);
                  onModelCodeChange('ALL');
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  gender === tab.id
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Model series pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              Serie:
            </span>
            <button
              onClick={() => onModelCodeChange('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                modelCode === 'ALL'
                  ? 'bg-neutral-200 text-neutral-900 font-bold border-transparent'
                  : 'bg-neutral-900/90 text-neutral-400 border-white/10 hover:text-white'
              }`}
            >
              Todas
            </button>
            {availableModels.map((m) => (
              <button
                key={m.code}
                onClick={() => onModelCodeChange(m.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all shrink-0 border ${
                  modelCode === m.code
                    ? 'bg-rose-500/20 text-rose-300 font-bold border-rose-500/50 shadow-sm'
                    : 'bg-neutral-900/90 text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
                title={m.label}
              >
                {m.code} <span className="opacity-60 text-[10px]">({m.count})</span>
              </button>
            ))}
          </div>

          {/* Right: Layout Switcher & Reset */}
          <div className="flex items-center gap-2 ml-auto">
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-medium transition-all"
                title="Reiniciar todos los filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}

            {/* Column layout buttons */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-neutral-900 border border-white/10">
              <button
                onClick={() => onColumnsChange(2)}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  columns === 2 ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Vista 2 Columnas (Enfoque y detalle)"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onColumnsChange(3)}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  columns === 3 ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Vista 3 Columnas (Editorial estándar)"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onColumnsChange(4)}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  columns === 4 ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="Vista 4 Columnas (Compacta)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
