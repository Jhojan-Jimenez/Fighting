import React from 'react';
import { Heart, ArrowLeft, MessageSquare, Trash2, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { ElementProduct, getElementTheme } from './ProductCard';
import { ProductCard } from './ProductCard';
import { MockupItem } from '../data/mockups';

interface WishlistViewProps {
  wishlistProducts: ElementProduct[];
  onOpenModal: (item: MockupItem) => void;
  onToggleWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onBackToCatalog: () => void;
  onSelectCategory?: (element: string) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistProducts,
  onOpenModal,
  onToggleWishlist,
  onClearWishlist,
  onBackToCatalog,
  onSelectCategory,
}) => {
  // Generate WhatsApp bulk inquiry message
  const handleBulkWhatsAppInquiry = () => {
    if (wishlistProducts.length === 0) return;

    let message = `¡Hola TNT Fight Lab! Me gustaría cotizar las prendas que guardé en mi Lista de Deseos:\n\n`;
    wishlistProducts.forEach((prod, index) => {
      const activeColor = prod.colorways[0]?.colorScheme || 'Original';
      message += `${index + 1}. Rashguard ${prod.elementLabel} (${prod.gender}) — Combinación: ${activeColor}\n`;
    });
    message += `\n¿Tienen disponibilidad y me podrían confirmar los precios y opciones de envío?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573203282014?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full flex-1 bg-white">
      {/* 1. Breadcrumbs & Top Navigation Bar */}
      <div className="bg-neutral-50/80 border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver al Catálogo</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>Catálogo</span>
            <span>/</span>
            <span className="font-bold text-black">Lista de Deseos</span>
          </div>
        </div>
      </div>

      {/* 2. Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-widest mb-2.5">
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>Mis Favoritos Guardados</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black flex items-center gap-3">
              <span>Lista de Deseos</span>
              <span className="text-base sm:text-xl font-normal text-neutral-400">
                ({wishlistProducts.length} {wishlistProducts.length === 1 ? 'artículo' : 'artículos'})
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Guarda tus combinaciones de elementos y colorways favoritos para cotizarlos o revisarlos cuando quieras.
            </p>
          </div>

          {/* Action buttons if items exist */}
          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={onClearWishlist}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-rose-600 border border-neutral-200 hover:border-rose-200 rounded-lg transition-all"
                title="Vaciar toda la lista"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar lista</span>
              </button>

              <button
                onClick={handleBulkWhatsAppInquiry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Cotizar Lista en WhatsApp</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="max-w-2xl mx-auto py-12 sm:py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 flex items-center justify-center mb-6 text-neutral-400 border border-neutral-200 shadow-inner">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 mb-2">
              Tu lista de deseos está vacía
            </h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8 leading-relaxed">
              Explora nuestra colección The Elements y haz clic en el corazón de cualquier rashguard para guardarla aquí y comparar diseños o cotizar tus favoritos.
            </p>

            <button
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explorar Colección Completa</span>
            </button>

            {/* Quick shortcuts to elements */}
            <div className="mt-14 w-full pt-8 border-t border-neutral-100">
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Explorar por elemento:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: 'AGUA', label: 'Agua', color: 'hover:border-sky-500 hover:text-sky-600' },
                  { id: 'AIRE', label: 'Aire', color: 'hover:border-slate-500 hover:text-slate-700' },
                  { id: 'FUEGO', label: 'Fuego', color: 'hover:border-rose-500 hover:text-rose-600' },
                  { id: 'TIERRA', label: 'Tierra', color: 'hover:border-emerald-500 hover:text-emerald-600' },
                  { id: 'AVATAR', label: 'Avatar', color: 'hover:border-purple-500 hover:text-purple-600' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(item.id);
                      }
                      onBackToCatalog();
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all ${item.color} cursor-pointer`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 4. Products Grid in Wishlist */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {wishlistProducts.map((product) => {
                const theme = getElementTheme(product.element);
                return (
                  <div key={product.id} className="relative flex flex-col">
                    <ProductCard
                      product={product}
                      globalColorway="ALL"
                      onOpenModal={onOpenModal}
                      isWishlisted={true}
                      onToggleWishlist={onToggleWishlist}
                    />

                    {/* Secondary remove button for explicit clarity */}
                    <div className="mt-2.5 flex items-center justify-between text-xs px-1">
                      <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${theme.badgeBg} px-2 py-0.5 rounded`}>
                        <Sparkles className="w-3 h-3" />
                        Guardado en Favoritos
                      </span>
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="text-neutral-400 hover:text-rose-600 text-[11px] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom summary and conversion card */}
            <div className="mt-12 p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>¿Listo para ordenar o necesitas asesoría personalizada?</span>
                </div>
                <p className="text-xs text-neutral-500 max-w-xl">
                  Fabricamos bajo pedido con los más altos estándares de compresión 4-way stretch y costuras flatlock para deportes de combate y BJJ.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onBackToCatalog}
                  className="flex-1 sm:flex-none px-4 py-3 border border-neutral-300 hover:border-black rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black transition-all text-center"
                >
                  Seguir Viendo
                </button>
                <button
                  onClick={handleBulkWhatsAppInquiry}
                  className="flex-1 sm:flex-none px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pedir Cotización</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
