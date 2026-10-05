import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types/electronics';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-display text-lg font-bold text-white">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-white font-medium text-sm">Your wishlist is empty</h3>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Click the heart icon on any device to save it for easy access later.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-16 w-16 rounded-lg bg-neutral-900 border border-neutral-800 shrink-0 overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-cover rounded"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">{product.brand}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{product.name}</h4>
                    <span className="font-mono text-xs font-semibold text-neutral-300 tabular-nums">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-300 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Move to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 border border-neutral-800 hover:border-neutral-700 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 text-xs font-semibold text-white hover:bg-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
