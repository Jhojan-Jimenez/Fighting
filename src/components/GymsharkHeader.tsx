import React from 'react';
import { Search, Heart, Shield } from 'lucide-react';

interface GymsharkHeaderProps {
  gender: string;
  onGenderChange: (g: string) => void;
  selectedElement: string;
  onElementChange: (elem: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wishlistCount: number;
  totalCount: number;
  counts: {
    total: number;
    hombre: number;
    mujer: number;
  };
}

export const GymsharkHeader: React.FC<GymsharkHeaderProps> = ({
  gender,
  onGenderChange,
  selectedElement,
  onElementChange,
  searchQuery,
  onSearchChange,
  wishlistCount,
  counts,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top micro announcement bar */}
      <div className="bg-black text-white text-[10px] sm:text-[11px] font-semibold tracking-wider text-center py-1.5 sm:py-2 px-3 uppercase font-sans truncate">
        COLECCIÓN OFICIAL DE COMBATE · CORTE PRO COMPRESSION · EDICIÓN 2026
      </div>

      {/* Main navigation bar */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 py-2.5 sm:py-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button
            onClick={() => onGenderChange('ALL')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-black rounded shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <span className="font-bebas text-xl sm:text-2xl md:text-3xl tracking-wider text-black block leading-none">
                TNT FIGHT LAB
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-neutral-500 font-bold block">
                AFFINITY BJJ
              </span>
            </div>
          </button>

          {/* Desktop Category Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-4 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => onGenderChange('ALL')}
              className={`pb-1 border-b-2 transition-all ${
                gender === 'ALL' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Todos ({counts.total})
            </button>
            <button
              onClick={() => onGenderChange('HOMBRE')}
              className={`pb-1 border-b-2 transition-all ${
                gender === 'HOMBRE' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Hombre ({counts.hombre})
            </button>
            <button
              onClick={() => onGenderChange('MUJER')}
              className={`pb-1 border-b-2 transition-all ${
                gender === 'MUJER' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
              }`}
            >
              Mujer ({counts.mujer})
            </button>
          </nav>
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Input */}
          <div className="relative w-32 xs:w-40 sm:w-64">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-3 py-1 sm:py-1.5 text-xs bg-neutral-100 rounded-full border border-transparent focus:bg-white focus:border-black focus:outline-none transition-all placeholder:text-neutral-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Wishlist Heart Icon */}
          <div
            className="relative p-1.5 sm:p-2 text-neutral-800 hover:text-black cursor-pointer shrink-0"
            title="Favoritos"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-black text-black' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Quick Navigation Strip (Todos, Hombre, Mujer) */}
      <div className="flex md:hidden items-center gap-1.5 px-3 py-2 overflow-x-auto border-t border-neutral-100 no-scrollbar bg-neutral-50/70">
        <button
          onClick={() => onGenderChange('ALL')}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
            gender === 'ALL'
              ? 'bg-black text-white shadow-xs'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
          }`}
        >
          Todos ({counts.total})
        </button>
        <button
          onClick={() => onGenderChange('HOMBRE')}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
            gender === 'HOMBRE'
              ? 'bg-black text-white shadow-xs'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
          }`}
        >
          Hombre ({counts.hombre})
        </button>
        <button
          onClick={() => onGenderChange('MUJER')}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all ${
            gender === 'MUJER'
              ? 'bg-black text-white shadow-xs'
              : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
          }`}
        >
          Mujer ({counts.mujer})
        </button>
      </div>
    </header>
  );
};
