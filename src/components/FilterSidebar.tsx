import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { getElementIcon, getElementTheme, getColorwaySwatch, AVAILABLE_SIZES } from './ProductCard';

interface FilterSidebarProps {
  gender: string;
  onGenderChange: (g: string) => void;
  selectedElement: string;
  onElementChange: (e: string) => void;
  selectedColorway: string;
  onColorwayChange: (m: string) => void;
  selectedSize: string;
  onSizeChange: (s: string) => void;
  sortBy: string;
  onSortByChange: (s: string) => void;
  selectedFit: string;
  onFitChange: (f: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  counts: {
    total: number;
    hombre: number;
    mujer: number;
    agua: number;
    aire: number;
    fuego: number;
    tierra: number;
    avatar: number;
  };
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  gender,
  onGenderChange,
  selectedElement,
  onElementChange,
  selectedColorway,
  onColorwayChange,
  selectedSize,
  onSizeChange,
  sortBy,
  onSortByChange,
  selectedFit,
  onFitChange,
  onClearAll,
  hasActiveFilters,
  counts,
}) => {
  // Accordion open/close states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    element: true,
    size: true,
    colorways: true,
    gender: true,
    sort: false,
    fit: false,
    activity: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const elementsList = [
    { id: 'AGUA', label: 'Agua (Water)', kanji: '水', count: counts.agua },
    { id: 'AIRE', label: 'Aire (Air)', kanji: '気', count: counts.aire },
    { id: 'FUEGO', label: 'Fuego (Fire)', kanji: '火', count: counts.fuego },
    { id: 'TIERRA', label: 'Tierra (Earth)', kanji: '土', count: counts.tierra },
    { id: 'AVATAR', label: 'Avatar (Balance)', kanji: '全', count: counts.avatar },
  ];

  const colorwaysList = [
    { code: 'H01', name: 'Negro / Blanco', gender: 'HOMBRE' },
    { code: 'H02', name: 'Negro / Azul', gender: 'HOMBRE' },
    { code: 'H03', name: 'Negro / Morado', gender: 'HOMBRE' },
    { code: 'H04', name: 'Negro / Marrón', gender: 'HOMBRE' },
    { code: 'H05', name: 'Negro / Rojo', gender: 'HOMBRE' },
    { code: 'H06', name: 'Blanco / Rojo', gender: 'HOMBRE' },
    { code: 'M01', name: 'Blanco / Rosa', gender: 'MUJER' },
    { code: 'M02', name: 'Negro / Rosa', gender: 'MUJER' },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 font-sans text-black">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <h2 className="font-montserrat font-bold text-sm tracking-wider uppercase">
          FILTROS & ORDEN
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold underline text-neutral-800 hover:text-black transition-all"
          >
            Limpiar Todo
          </button>
        )}
      </div>

      <div className="divide-y divide-neutral-200 text-xs">
        {/* 1. FUERZA ELEMENTAL (PRODUCTOS PRINCIPALES) */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('element')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Fuerza Elemental</span>
            {openSections.element ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.element && (
            <div className="space-y-2 pt-1">
              {elementsList.map((elem) => {
                const isSelected = selectedElement === elem.id;
                const theme = getElementTheme(elem.id);

                return (
                  <button
                    key={elem.id}
                    onClick={() => onElementChange(isSelected ? 'ALL' : elem.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all text-left ${
                      isSelected
                        ? `${theme.activePill} font-bold ring-1 ring-offset-1 ring-neutral-400 shadow-sm`
                        : `${theme.badgeBg} font-medium hover:scale-[1.01]`
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-white shadow-xs'}`}>
                        {getElementIcon(elem.id, "w-4 h-4")}
                      </div>
                      <span className="text-xs font-semibold">{elem.label}</span>
                      <span className={`text-xs font-serif ${isSelected ? 'text-white/90' : 'opacity-70'}`}>
                        {elem.kanji}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-white/80 border border-neutral-200 text-neutral-700 font-bold'}`}>
                      {elem.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. TALLA DISPONIBLE (S, M, L, XL, 2XL) */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Talla (Pro Fit)</span>
            {openSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.size && (
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => onSizeChange(isSelected ? 'ALL' : size)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-xs ring-1 ring-black'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. COMBINACIÓN DE COLOR */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('colorways')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Combinación de Color</span>
            {openSections.colorways ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.colorways && (
            <div className="space-y-2 pt-1">
              {colorwaysList
                .filter((c) => gender === 'ALL' || c.gender === gender)
                .map((col) => {
                  const isSelected = selectedColorway === col.code;
                  const swatch = getColorwaySwatch(col.code);

                  return (
                    <button
                      key={col.code}
                      onClick={() => onColorwayChange(isSelected ? 'ALL' : col.code)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all text-left ${
                        isSelected
                          ? 'bg-neutral-900 text-white font-bold border-black'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="relative w-4 h-4 rounded-sm border overflow-hidden shrink-0"
                          style={{ backgroundColor: swatch.bg }}
                        >
                          <span
                            className="absolute bottom-0 right-0 w-2 h-2 rounded-tl"
                            style={{ backgroundColor: swatch.accent }}
                          />
                        </span>
                        <span className="text-xs">{col.name}</span>
                      </div>
                      <span className="font-mono text-[10px] opacity-60">
                        {col.code}
                      </span>
                    </button>
                  );
                })}
            </div>
          )}
        </div>

        {/* 4. GÉNERO / CATEGORÍA */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('gender')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Género</span>
            {openSections.gender ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.gender && (
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={gender === 'HOMBRE'}
                  onChange={() => onGenderChange(gender === 'HOMBRE' ? 'ALL' : 'HOMBRE')}
                  className="brand-checkbox"
                />
                <span className={`text-xs ${gender === 'HOMBRE' ? 'font-bold text-black' : 'text-neutral-700 font-medium'} group-hover:text-black`}>
                  Hombre ({counts.hombre} diseños)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={gender === 'MUJER'}
                  onChange={() => onGenderChange(gender === 'MUJER' ? 'ALL' : 'MUJER')}
                  className="brand-checkbox"
                />
                <span className={`text-xs ${gender === 'MUJER' ? 'font-bold text-black' : 'text-neutral-700 font-medium'} group-hover:text-black`}>
                  Mujer ({counts.mujer} diseños)
                </span>
              </label>
            </div>
          )}
        </div>

        {/* 5. ORDENAR POR */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('sort')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Ordenar</span>
            {openSections.sort ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.sort && (
            <div className="space-y-3 pt-1">
              {[
                { id: 'relevancy', label: 'Relevancia' },
                { id: 'newest', label: 'Más Reciente' },
                { id: 'price_low', label: 'Precio: Menor a Mayor' },
                { id: 'price_high', label: 'Precio: Mayor a Menor' },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === opt.id}
                    onChange={() => onSortByChange(opt.id)}
                    className="brand-radio"
                  />
                  <span className={`text-xs ${sortBy === opt.id ? 'font-bold text-black' : 'text-neutral-700 font-medium'} group-hover:text-black`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 6. FIT & FABRIC */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('fit')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Ajuste & Tejido</span>
            {openSections.fit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.fit && (
            <div className="space-y-3 pt-1">
              {['Pro Compression', '4-Way Stretch', 'Costuras Flatlock'].map((f) => (
                <label key={f} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedFit === f}
                    onChange={() => onFitChange(selectedFit === f ? 'ALL' : f)}
                    className="brand-checkbox"
                  />
                  <span className="text-xs text-neutral-700 font-medium group-hover:text-black">
                    {f}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* 7. DISCIPLINA MARCIAL */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('activity')}
            className="w-full flex items-center justify-between font-bold text-xs tracking-wider uppercase mb-3 hover:text-neutral-600"
          >
            <span>Disciplina</span>
            {openSections.activity ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.activity && (
            <div className="space-y-3 pt-1">
              {['Brazilian Jiu-Jitsu (No-Gi)', 'Grappling & Submission', 'MMA / Acondicionamiento'].map((act) => (
                <label key={act} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="brand-checkbox" />
                  <span className="text-xs text-neutral-700 font-medium group-hover:text-black">
                    {act}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
