import React, { useState, useMemo } from 'react';
import { MOCKUP_ITEMS, MockupItem } from './data/mockups';
import { Navbar } from './components/Navbar';
import { CollectionBanner } from './components/CollectionBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard, ElementProduct, getElementIcon, getElementTheme } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Grid3X3, Grid2X2, SlidersHorizontal, X, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
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
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

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
            c.modelCode.toLowerCase().includes(q) ||
            c.colorScheme.toLowerCase().includes(q) ||
            c.title.toLowerCase().includes(q)
        );

        if (!matchesProduct && !matchesColorway) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'newest') {
      result = [...result].reverse();
    } else if (sortBy === 'price_high') {
      result = [...result].sort((a, b) => b.element.localeCompare(a.element));
    } else if (sortBy === 'price_low') {
      result = [...result].sort((a, b) => a.element.localeCompare(b.element));
    }

    return result;
  }, [elementProducts, gender, selectedElement, selectedColorway, selectedSize, selectedFit, sortBy, searchQuery]);

  // Modal navigation across all 38 mockups
  const currentIndex = activeModalItem
    ? MOCKUP_ITEMS.findIndex((i) => i.id === activeModalItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setActiveModalItem(MOCKUP_ITEMS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < MOCKUP_ITEMS.length - 1) setActiveModalItem(MOCKUP_ITEMS[currentIndex + 1]);
  };

  // Grid columns layout class
  const getGridColsClass = () => {
    switch (columns) {
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
      case 2:
      default:
        return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const elementsQuickPills = [
    { id: 'ALL', label: 'Todos' },
    { id: 'AGUA', label: 'Agua', kanji: '水' },
    { id: 'AIRE', label: 'Aire', kanji: '気' },
    { id: 'FUEGO', label: 'Fuego', kanji: '火' },
    { id: 'TIERRA', label: 'Tierra', kanji: '土' },
    { id: 'AVATAR', label: 'Avatar', kanji: '全' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar
        gender={gender}
        onGenderChange={setGender}
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
      />

      {/* 2. Full-width Title Banner */}
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

      {/* 3. Main Catalog Section with Left Sidebar & Products Grid */}
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
              sortBy={sortBy}
              onSortByChange={setSortBy}
              selectedFit={selectedFit}
              onFitChange={setSelectedFit}
              onClearAll={handleClearAll}
              hasActiveFilters={hasActiveFilters}
              counts={counts}
            />
          </div>

          {/* Mobile Filter Bottom Drawer / Modal */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
              <div className="bg-white w-full max-h-[88vh] rounded-t-2xl flex flex-col shadow-2xl overflow-hidden">
                {/* Drawer Header */}
                <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-black" />
                    <span className="font-montserrat font-bold text-sm uppercase tracking-wider">
                      Filtros & Orden
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Body */}
                <div className="px-5 py-3 overflow-y-auto flex-1">
                  <FilterSidebar
                    gender={gender}
                    onGenderChange={setGender}
                    selectedElement={selectedElement}
                    onElementChange={setSelectedElement}
                    selectedColorway={selectedColorway}
                    onColorwayChange={setSelectedColorway}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                    selectedFit={selectedFit}
                    onFitChange={setSelectedFit}
                    onClearAll={handleClearAll}
                    hasActiveFilters={hasActiveFilters}
                    counts={counts}
                  />
                </div>

                {/* Drawer Sticky Footer */}
                <div className="p-4 border-t border-neutral-200 bg-white flex items-center gap-3 shrink-0">
                  {hasActiveFilters && (
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-3 rounded-lg border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Limpiar</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all text-center shadow-md"
                  >
                    Ver {filteredProducts.length} Productos
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Right Area: Products Grid */}
          <div className="flex-1 w-full">
            {/* Desktop Top Bar above grid */}
            <div className="hidden sm:flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <span className="text-xs font-semibold text-neutral-500 tracking-wider uppercase">
                Mostrando {filteredProducts.length} diseños elementales ({MOCKUP_ITEMS.length} combinaciones de color)
              </span>

              {/* Grid Column Switcher */}
              <div className="flex items-center gap-1 border border-neutral-200 rounded p-0.5">
                <button
                  onClick={() => setColumns(2)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded transition-all ${
                    columns === 2 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                  }`}
                  title="2 Columnas Grandes"
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                  <span>Grande (2 Col)</span>
                </button>
                <button
                  onClick={() => setColumns(3)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded transition-all ${
                    columns === 3 ? 'bg-black text-white' : 'text-neutral-500 hover:text-black'
                  }`}
                  title="3 Columnas Compactas"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span>3 Col</span>
                </button>
              </div>
            </div>

            {/* Products Grid: Responsive 1 col on mobile, 2/3 on tablets & desktop */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12 ${getGridColsClass()}`}>
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
              <div className="py-20 text-center px-4">
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

      {/* 4. Detail Lightbox Modal */}
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
        isWishlisted={activeModalItem ? wishlist.includes(activeModalItem.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 5. Footer */}
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
            <span>Contacto</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
