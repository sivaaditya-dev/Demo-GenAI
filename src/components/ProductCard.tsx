import React from 'react';
import { Heart, Plus, Check, Star, Layers } from 'lucide-react';
import { Product } from '../types/electronics';

interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (p: Product, e: React.MouseEvent) => void;
  onToggleCompare: (p: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  isCompared: boolean;
  isInCart: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isWishlisted,
  isCompared,
  isInCart,
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col rounded-xl border border-neutral-800/90 bg-neutral-900/70 hover:bg-neutral-900 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden shadow-lg shadow-black/40"
    >
      {/* Visual Image Container (takes ~65% visual weight) */}
      <div className="relative h-56 sm:h-64 w-full bg-neutral-950 overflow-hidden flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle top metadata / badge without candy pill styling */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[11px] font-mono text-red-400 bg-neutral-950/90 backdrop-blur-sm px-2 py-0.5 rounded border border-red-900/60 font-semibold">
              {product.badge}
            </span>
          ) : (
            <span className="text-[11px] font-mono text-neutral-400 bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800">
              {product.brand}
            </span>
          )}

          {/* Stock status indicator */}
          <span className="text-[10px] font-mono text-emerald-400 bg-neutral-950/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-emerald-950/50">
            {product.inStock ? `${product.stockCount} in stock` : 'Backorder'}
          </span>
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Compare Button */}
          <button
            onClick={(e) => onToggleCompare(product, e)}
            className={`p-2 rounded-lg border text-xs transition-colors backdrop-blur-sm ${
              isCompared
                ? 'bg-red-600 text-white border-red-500 font-semibold'
                : 'bg-neutral-950/80 text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-500'
            }`}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            aria-label="Compare"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => onToggleWishlist(product, e)}
            className={`p-2 rounded-lg border text-xs transition-colors backdrop-blur-sm ${
              isWishlisted
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-neutral-950/80 text-neutral-300 border-neutral-700 hover:text-red-400 hover:border-neutral-500'
            }`}
            title={isWishlisted ? 'Saved to wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Quiet unboxed brand & rating separator */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-mono text-xs text-neutral-300 tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[11px] text-neutral-500">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-base font-semibold text-white group-hover:text-red-500 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Key Specs Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-neutral-400 mt-2">
            {product.keySpecs.slice(0, 3).map((spec, i) => (
              <React.Fragment key={i}>
                <span>{spec}</span>
                {i < Math.min(product.keySpecs.length, 3) - 1 && (
                  <span className="text-neutral-600" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white font-mono tabular-nums">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                  ${product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 block font-mono">
              Free Express Shipping
            </span>
          </div>

          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
              isInCart
                ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-600 text-white hover:bg-red-500 active:scale-95 shadow-red-950/40'
            }`}
            title="Add to shopping bag"
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
