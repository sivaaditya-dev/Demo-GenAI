import React from 'react';
import { ShoppingBag, Heart, SlidersHorizontal, Search, Monitor, Smartphone, Gamepad2, Laptop, Cpu } from 'lucide-react';
import { CategoryId } from '../types/electronics';

interface HeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenPCBuilder: () => void;
  onOpenTracking: () => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  compareCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeView: 'store' | 'pc-builder';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenPCBuilder,
  onOpenTracking,
  cartCount,
  cartTotal,
  wishlistCount,
  compareCount,
  searchQuery,
  onSearchChange,
  activeView,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md">
      {/* Top 3-Zone Contract */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Title Wordmark (Single text element) */}
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left group"
          >
            <span className="font-display text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              VoltTech
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (1-2 word labels, single line) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-neutral-300">
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('all');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeView === 'store' && activeCategory === 'all'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'hover:text-white hover:bg-neutral-900/40'
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('gaming-consoles');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'store' && activeCategory === 'gaming-consoles'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'hover:text-white hover:bg-neutral-900/40'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
            Consoles
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('mobiles');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'store' && activeCategory === 'mobiles'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'hover:text-white hover:bg-neutral-900/40'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
            Mobiles
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('custom-pcs');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'store' && activeCategory === 'custom-pcs'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'hover:text-white hover:bg-neutral-900/40'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-neutral-400" />
            Gaming PCs
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('laptops');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'store' && activeCategory === 'laptops'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'hover:text-white hover:bg-neutral-900/40'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-neutral-400" />
            Laptops
          </button>
          <button
            onClick={onOpenPCBuilder}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeView === 'pc-builder'
                ? 'text-cyan-400 font-semibold bg-neutral-900/60'
                : 'text-neutral-300 hover:text-cyan-300 hover:bg-neutral-900/40'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            Rig Builder
          </button>
          <button
            onClick={onOpenTracking}
            className="px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-neutral-400 hover:text-white hover:bg-neutral-900/40"
          >
            Track Order
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Compare, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Search Input */}
          <div className="relative hidden md:block w-48 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search PS5, RTX 4090, iPhone..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Compare Button */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 border border-cyan-500/40 text-cyan-300 hover:bg-neutral-800 transition-colors"
              title="Compare selected products"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Compare</span>
              <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded font-mono text-[10px] font-semibold">
                {compareCount}
              </span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500 text-neutral-950 font-semibold hover:bg-cyan-400 active:scale-[0.98] transition-all text-xs sm:text-sm whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-950" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-mono font-bold">
              ({cartCount})
            </span>
            {cartTotal > 0 && (
              <span className="hidden md:inline pl-1.5 border-l border-neutral-950/20 tabular-nums font-mono font-medium">
                ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar if screen is narrow */}
      <div className="md:hidden px-4 py-2 border-t border-neutral-900 bg-neutral-950">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search PS5, Switch, iPhone, Laptops..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
    </header>
  );
};
