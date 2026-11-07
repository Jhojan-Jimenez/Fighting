import React from 'react';
import { Search, Heart, Shield, ArrowLeft } from 'lucide-react';

interface NavbarProps {
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
  isWishlistView?: boolean;
  onToggleWishlistView?: () => void;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  gender,
  onGenderChange,
  searchQuery,
  onSearchChange,
  wishlistCount,
  counts,
  isWishlistView = false,
  onToggleWishlistView,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      {/* Top announcement bar */}
      <div className="bg-black text-white text-[10px] sm:text-[11px] font-semibold tracking-wider text-center py-1.5 sm:py-2 px-3 uppercase font-sans truncate">
        COLECCIÓN OFICIAL DE COMBATE · CORTE PRO COMPRESSION · EDICIÓN 2026
      </div>

      {/* Main navigation bar */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 py-2.5 sm:py-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button
            onClick={() => {
              if (onLogoClick) onLogoClick();
              else onGenderChange('ALL');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="TNT Fight Lab — Ir al inicio"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black text-white flex items-center justify-center font-black rounded shrink-0 transition-transform group-hover:scale-105">
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
          {!isWishlistView ? (
            <nav className="hidden md:flex items-center gap-6 ml-4 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => onGenderChange('ALL')}
                className={`pb-1 border-b-2 transition-all cursor-pointer ${
                  gender === 'ALL' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                Todos ({counts.total})
              </button>
              <button
                onClick={() => onGenderChange('HOMBRE')}
                className={`pb-1 border-b-2 transition-all cursor-pointer ${
                  gender === 'HOMBRE' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                Hombre ({counts.hombre})
              </button>
              <button
                onClick={() => onGenderChange('MUJER')}
                className={`pb-1 border-b-2 transition-all cursor-pointer ${
                  gender === 'MUJER' ? 'border-black text-black' : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                Mujer ({counts.mujer})
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2 ml-4">
              <button
                onClick={onToggleWishlistView}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Catálogo</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Input (Hidden in Wishlist on small screens to save space) */}
          {!isWishlistView && (
            <div className="relative w-28 xs:w-36 sm:w-60">
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
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Wishlist Heart Icon & Button */}
          <button
            onClick={onToggleWishlistView}
            className={`relative p-2 sm:px-3 sm:py-1.5 rounded-full transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              isWishlistView
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
            title={isWishlistView ? 'Regresar al catálogo' : 'Ver lista de deseos'}
            aria-label="Ver lista de deseos"
          >
            <Heart
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                isWishlistView
                  ? 'fill-rose-500 text-rose-500'
                  : wishlistCount > 0
                  ? 'fill-black text-black'
                  : 'text-neutral-600'
              }`}
            />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
              {isWishlistView ? 'Catálogo' : 'Wishlist'}
            </span>
            {wishlistCount > 0 && !isWishlistView && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick Navigation Strip (Only when not in wishlist) */}
      {!isWishlistView && (
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
      )}
    </header>
  );
};
