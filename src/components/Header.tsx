import React from 'react';
import { Shield, Sparkles, FolderTree, LayoutGrid, Search } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  isTreeViewOpen: boolean;
  onToggleTreeView: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  filteredCount,
  isTreeViewOpen,
  onToggleTreeView,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/[0.08] backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/20 via-neutral-900 to-sky-500/20 border border-white/10 flex items-center justify-center shadow-lg shadow-black/40">
            <Shield className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-widest text-sm text-white font-display">TNT FIGHT LAB</span>
              <span className="text-white/20">×</span>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">AFFINITY BJJ</span>
              <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                PRO COMBAT
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block tracking-wide">
              The Elements Collection · Catálogo Oficial de Mockups
            </p>
          </div>
        </div>

        {/* Search bar & Tree View toggle */}
        <div className="flex items-center gap-3">
          {/* Quick search input */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por modelo, color, elemento..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Folder Hierarchy Toggle */}
          <button
            onClick={onToggleTreeView}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
              isTreeViewOpen
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-md shadow-rose-950/40'
                : 'bg-neutral-900/60 border-white/10 text-neutral-300 hover:text-white hover:border-white/20'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span className="hidden sm:inline">Estructura Carpetas</span>
          </button>

          {/* Counter pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/70 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">{filteredCount}</span>
            <span className="text-neutral-500">/ {totalCount} items</span>
          </div>
        </div>
      </div>
    </header>
  );
};
