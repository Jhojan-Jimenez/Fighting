import React, { useState, useMemo, useEffect } from 'react';
import { MOCKUP_ITEMS, MockupItem } from './data/mockups';
import { Navbar } from './components/Navbar';
import { CollectionBanner } from './components/CollectionBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard, ElementProduct, getElementIcon, getElementTheme } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { WishlistView } from './components/WishlistView';
import { Grid3X3, Grid2X2, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation View Mode ('catalog' | 'wishlist')
  const [viewMode, setViewMode] = useState<'catalog' | 'wishlist'>(() => {
    return window.location.hash === '#wishlist' ? 'wishlist' : 'catalog';
  });

  // State
  const [gender, setGender] = useState<string>('ALL');
  const [selectedElement, setSelectedElement] = useState<string>('ALL');
  const [selectedColorway, setSelectedColorway] = useState<string>('ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [selectedFit, setSelectedFit] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('relevancy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [columns, setColumns] = useState<2 | 3>(2);
  const [activeModalItem, setActiveModalItem] = useState<MockupItem | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Wishlist with localStorage persistence
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tnt_catalog_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tnt_catalog_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, [wishlist]);

  // Sync with browser hash (#wishlist)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#wishlist') {
        setViewMode('wishlist');
      } else {
        setViewMode('catalog');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToView = (mode: 'catalog' | 'wishlist') => {
    setViewMode(mode);
    window.location.hash = mode === 'wishlist' ? 'wishlist' : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Group items by (Gender, Element) into ElementProducts
  const elementProducts = useMemo<ElementProduct[]>(() => {
    const map = new Map<string, ElementProduct>();

    MOCKUP_ITEMS.forEach((item) => {
      const key = `${item.gender}_${item.element}`;
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          element: item.element,
          elementLabel: item.elementLabel,
          elementSublabel: item.elementSublabel,
          kanji: item.kanji,
          quote: item.quote,
          gender: item.gender,
          colorways: [],
        });
      }
      map.get(key)!.colorways.push(item);
    });

    return Array.from(map.values());
  }, []);

  // Products saved in Wishlist
  const wishlistProducts = useMemo(() => {
    return elementProducts.filter((p) => wishlist.includes(p.id));
  }, [elementProducts, wishlist]);

  // Counts for the sidebar and header
  const counts = useMemo(() => {
    return {
      total: elementProducts.length,
      hombre: elementProducts.filter((p) => p.gender === 'HOMBRE').length,
      mujer: elementProducts.filter((p) => p.gender === 'MUJER').length,
      agua: elementProducts.filter((p) => p.element === 'AGUA').length,
      aire: elementProducts.filter((p) => p.element === 'AIRE').length,
      fuego: elementProducts.filter((p) => p.element === 'FUEGO').length,
      tierra: elementProducts.filter((p) => p.element === 'TIERRA').length,
      avatar: elementProducts.filter((p) => p.element === 'AVATAR').length,
    };
  }, [elementProducts]);

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((i) => i !== productId) : [...prev, productId]
    );
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  // Clear all filters
  const handleClearAll = () => {
    setGender('ALL');
    setSelectedElement('ALL');
    setSelectedColorway('ALL');
    setSelectedSize('ALL');
    setSelectedFit('ALL');
    setSortBy('relevancy');
    setSearchQuery('');
  };

  const hasActiveFilters =
    gender !== 'ALL' ||
    selectedElement !== 'ALL' ||
    selectedColorway !== 'ALL' ||
    selectedSize !== 'ALL' ||
    selectedFit !== 'ALL' ||
    sortBy !== 'relevancy' ||
    searchQuery.trim() !== '';

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = elementProducts.filter((prod) => {
      // Gender filter
      if (gender !== 'ALL' && prod.gender !== gender) return false;

      // Element filter
      if (selectedElement !== 'ALL' && prod.element !== selectedElement) return false;

      // Colorway filter (product must have this colorway)
      if (
        selectedColorway !== 'ALL' &&
        !prod.colorways.some((c) => c.modelCode === selectedColorway)
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesProduct =
          prod.element.toLowerCase().includes(q) ||
          prod.elementLabel.toLowerCase().includes(q) ||
          prod.kanji.includes(q) ||
          prod.gender.toLowerCase().includes(q);

        const matchesColorway = prod.colorways.some(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.colorScheme.toLowerCase().includes(q) ||
            c.modelCode.toLowerCase().includes(q)
        );

        if (!matchesProduct && !matchesColorway) return false;
      }

      return true;
    });

    // Sort products
    if (sortBy === 'element-asc') {
      result.sort((a, b) => a.element.localeCompare(b.element));
    } else if (sortBy === 'element-desc') {
      result.sort((a, b) => b.element.localeCompare(a.element));
    } else if (sortBy === 'variants-desc') {
      result.sort((a, b) => b.colorways.length - a.colorways.length);
    }

    return result;
  }, [elementProducts, gender, selectedElement, selectedColorway, searchQuery, sortBy]);

  // Modal navigation across all mockups
  const currentIndex = activeModalItem
    ? MOCKUP_ITEMS.findIndex((m) => m.id === activeModalItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveModalItem(MOCKUP_ITEMS[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < MOCKUP_ITEMS.length - 1) {
      setActiveModalItem(MOCKUP_ITEMS[currentIndex + 1]);
    }
  };

  // Quick categories pills
  const elementsQuickPills = [
    { id: 'ALL', label: 'Todos', kanji: '' },
    { id: 'AGUA', label: 'Agua', kanji: '水' },
    { id: 'AIRE', label: 'Aire', kanji: '気' },
    { id: 'FUEGO', label: 'Fuego', kanji: '火' },
    { id: 'TIERRA', label: 'Tierra', kanji: '土' },
    { id: 'AVATAR', label: 'Avatar', kanji: '全' },
  ];

  const activeModalProductId = activeModalItem
    ? `${activeModalItem.gender}_${activeModalItem.element}`
    : '';

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar
        gender={gender}
        onGenderChange={(g) => {
          setGender(g);
          if (viewMode === 'wishlist') navigateToView('catalog');
        }}
        selectedElement={selectedElement}
        onElementChange={setSelectedElement}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wishlistCount={wishlist.length}
        totalCount={elementProducts.length}
        counts={{
          total: elementProducts.length,
          hombre: counts.hombre,
          mujer: counts.mujer,
        }}
        isWishlistView={viewMode === 'wishlist'}
        onToggleWishlistView={() => navigateToView(viewMode === 'wishlist' ? 'catalog' : 'wishlist')}
        onLogoClick={() => navigateToView('catalog')}
      />

      {/* 2. Main Body: Switch between Wishlist and Catalog */}
      {viewMode === 'wishlist' ? (
        <WishlistView
          wishlistProducts={wishlistProducts}
          onOpenModal={setActiveModalItem}
          onToggleWishlist={handleToggleWishlist}
          onClearWishlist={handleClearWishlist}
          onBackToCatalog={() => navigateToView('catalog')}
          onSelectCategory={(elem) => {
            setSelectedElement(elem);
            navigateToView('catalog');
          }}
        />
      ) : (
        <>
          {/* Full-width Title Banner */}
          <CollectionBanner
            gender={gender}
            selectedElement={selectedElement}
            selectedModel={selectedColorway}
          />

          {/* Mobile Quick Elemental Scroll Pills */}
          <div className="lg:hidden bg-white border-b border-neutral-200 px-3 py-2.5 overflow-x-auto flex items-center gap-2 no-scrollbar">
            {elementsQuickPills.map((elem) => {
              const isSelected = selectedElement === elem.id;
              const theme = elem.id !== 'ALL' ? getElementTheme(elem.id) : null;

              return (
                <button
                  key={elem.id}
                  onClick={() => setSelectedElement(elem.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all border ${
                    isSelected
                      ? elem.id === 'ALL'
                        ? 'bg-black text-white border-black'
                        : `${theme?.activePill} shadow-xs`
                      : elem.id === 'ALL'
                      ? 'bg-neutral-100 text-neutral-800 border-neutral-200'
                      : `${theme?.badgeBg}`
                  }`}
                >
                  {elem.id !== 'ALL' && getElementIcon(elem.id, "w-3 h-3")}
                  <span>{elem.label}</span>
                  {elem.kanji && <span className="font-serif text-[10px] opacity-80">{elem.kanji}</span>}
                </button>
              );
            })}
          </div>

          {/* Main Catalog Section with Left Sidebar & Products Grid */}
          <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 flex-1">
            {/* Mobile Filter & Product Count Bar */}
            <div className="lg:hidden flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-200">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filtros & Orden</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                )}
              </button>
              <span className="text-xs text-neutral-500 font-semibold">
                {filteredProducts.length} productos
              </span>
            </div>

            <div className="flex gap-10 items-start">
              {/* Desktop Left Sidebar */}
              <div className="hidden lg:block shrink-0">
                <FilterSidebar
                  gender={gender}
                  onGenderChange={setGender}
                  selectedElement={selectedElement}
                  onElementChange={setSelectedElement}
                  selectedColorway={selectedColorway}
                  onColorwayChange={setSelectedColorway}
                  selectedSize={selectedSize}
                  onSizeChange={setSelectedSize}
                  selectedFit={selectedFit}
                  onFitChange={setSelectedFit}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                  counts={counts}
                  onClearAll={handleClearAll}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>

              {/* Mobile Drawer Filter Modal */}
              {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                    onClick={() => setIsMobileFilterOpen(false)}
                  />

                  {/* Drawer Content */}
                  <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
                    <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                      <div className="flex items-center gap-2 font-black uppercase text-sm tracking-wider">
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filtros de Catálogo</span>
                      </div>
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-200 transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-5 overflow-y-auto flex-1">
                      <FilterSidebar
                        gender={gender}
                        onGenderChange={setGender}
                        selectedElement={selectedElement}
                        onElementChange={setSelectedElement}
                        selectedColorway={selectedColorway}
                        onColorwayChange={setSelectedColorway}
                        selectedSize={selectedSize}
                        onSizeChange={setSelectedSize}
                        selectedFit={selectedFit}
                        onFitChange={setSelectedFit}
                        sortBy={sortBy}
                        onSortByChange={setSortBy}
                        counts={counts}
                        onClearAll={handleClearAll}
                        hasActiveFilters={hasActiveFilters}
                      />
                    </div>

                    <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center gap-2">
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm"
                      >
                        Ver {filteredProducts.length} Productos
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Right: Products Area */}
              <div className="flex-1 min-w-0">
                {/* Desktop Top Toolbar: Count + Active Tags + Grid Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold uppercase tracking-wider text-black">
                      {filteredProducts.length}{' '}
                      {filteredProducts.length === 1 ? 'Producto' : 'Productos'}
                    </span>
                    <span className="text-neutral-300 hidden sm:inline">|</span>
                    <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                      {selectedElement === 'ALL'
                        ? 'Todos los Elementos'
                        : `Elemento ${selectedElement}`}
                      {gender !== 'ALL' ? ` · ${gender}` : ''}
                      {selectedSize !== 'ALL' ? ` · Talla ${selectedSize}` : ''}
                    </span>

                    {/* Active Filter Chips */}
                    {hasActiveFilters && (
                      <div className="flex items-center gap-1.5 ml-2 flex-wrap">
                        {gender !== 'ALL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 text-[11px] font-semibold text-neutral-700">
                            {gender}
                            <button
                              onClick={() => setGender('ALL')}
                              className="hover:text-black"
                            >
                              ×
                            </button>
                          </span>
                        )}
                        {selectedElement !== 'ALL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 text-[11px] font-semibold text-neutral-700">
                            {selectedElement}
                            <button
                              onClick={() => setSelectedElement('ALL')}
                              className="hover:text-black"
                            >
                              ×
                            </button>
                          </span>
                        )}
                        {selectedColorway !== 'ALL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 text-[11px] font-semibold text-neutral-700">
                            {selectedColorway}
                            <button
                              onClick={() => setSelectedColorway('ALL')}
                              className="hover:text-black"
                            >
                              ×
                            </button>
                          </span>
                        )}
                        {selectedSize !== 'ALL' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black text-white text-[11px] font-semibold">
                            Talla: {selectedSize}
                            <button
                              onClick={() => setSelectedSize('ALL')}
                              className="hover:text-neutral-300"
                            >
                              ×
                            </button>
                          </span>
                        )}
                        <button
                          onClick={handleClearAll}
                          className="text-[11px] font-bold text-neutral-500 hover:text-black ml-1 underline"
                        >
                          Limpiar
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Desktop Grid Switcher */}
                  <div className="hidden sm:flex items-center gap-1 border border-neutral-200 rounded p-0.5">
                    <button
                      onClick={() => setColumns(2)}
                      className={`p-1.5 rounded transition-colors ${
                        columns === 2
                          ? 'bg-black text-white'
                          : 'text-neutral-400 hover:text-black'
                      }`}
                      title="2 Columnas"
                    >
                      <Grid2X2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setColumns(3)}
                      className={`p-1.5 rounded transition-colors ${
                        columns === 3
                          ? 'bg-black text-white'
                          : 'text-neutral-400 hover:text-black'
                      }`}
                      title="3 Columnas"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <div
                    className={`grid gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 ${
                      columns === 2
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
                  >
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        globalColorway={selectedColorway}
                        onOpenModal={setActiveModalItem}
                        isWishlisted={wishlist.includes(prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty state */
                  <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-2xl">
                    <RotateCcw className="w-10 h-10 text-neutral-300 mb-3" />
                    <p className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                      No se encontraron productos con estos filtros
                    </p>
                    <button
                      onClick={handleClearAll}
                      className="mt-4 px-6 py-2.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-800 transition-all"
                    >
                      Restablecer Todos los Filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. Detail Lightbox Modal */}
      <ProductModal
        item={activeModalItem}
        availableColorways={
          activeModalItem
            ? MOCKUP_ITEMS.filter(
                (m) =>
                  m.gender === activeModalItem.gender &&
                  m.element === activeModalItem.element
              )
            : []
        }
        onSelectColorway={setActiveModalItem}
        onClose={() => setActiveModalItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < MOCKUP_ITEMS.length - 1}
        isWishlisted={activeModalProductId ? wishlist.includes(activeModalProductId) : false}
        onToggleWishlist={() => activeModalProductId && handleToggleWishlist(activeModalProductId)}
      />

      {/* 4. Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200 py-8 sm:py-12 mt-16 text-neutral-600 text-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-2xl tracking-wider text-black">
              TNT FIGHT LAB
            </span>
            <span className="text-neutral-400">·</span>
            <span className="font-medium text-neutral-500">
              The Four Elements Combat Collection · 38 Mockups
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 font-bold uppercase text-[10px] sm:text-[11px] text-neutral-800">
            <span>Guía de Tallas Pro</span>
            <span>Cuidado y Lavado</span>
            <a
              href="https://wa.me/573203282014"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black cursor-pointer"
            >
              Contacto WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
