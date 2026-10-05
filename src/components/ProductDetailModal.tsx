import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, Heart, Layers, ShoppingBag, Info } from 'lucide-react';
import { Product, ProductVariant } from '../types/electronics';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: ProductVariant, protection?: boolean, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isWishlisted: boolean;
  isCompared: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isWishlisted,
  isCompared,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [addProtection, setAddProtection] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [justAdded, setJustAdded] = useState(false);

  const protectionPrice = product.price > 2000 ? 199.99 : product.price > 800 ? 99.99 : 49.99;
  const currentPrice = product.price + (selectedVariant ? selectedVariant.priceDelta : 0);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, addProtection, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Visual Showcase & Gallery */}
          <div className="lg:col-span-6 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="uppercase tracking-wider">{product.brand}</span>
                <span>ITEM #{product.id.toUpperCase()}</span>
              </div>

              {/* Main Product Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-cover object-center rounded-lg"
                />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 text-xs font-mono text-cyan-300 bg-neutral-950/90 px-2.5 py-1 rounded border border-cyan-800/50">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Trust Callout Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Free Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{product.warrantyMonths}m Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>30-Day Return</span>
                </div>
              </div>
            </div>

            {/* Quick compare/wishlist footer actions */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-800/80">
              <button
                onClick={() => onToggleCompare(product)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  isCompared
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Comparison List' : 'Compare Product'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'In Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Detail Tabs */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Subtitle */}
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-neutral-300 font-semibold tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-neutral-500">
                  · {product.reviewCount} verified ratings
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-neutral-500 line-through font-mono tabular-nums">
                    ${(product.originalPrice + (selectedVariant ? selectedVariant.priceDelta : 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  In Stock ({product.stockCount} units)
                </span>
              </div>

              {/* Tab Selector */}
              <div className="mt-6 flex border-b border-neutral-800 gap-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-cyan-400 text-cyan-400 font-semibold'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Configuration & Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-cyan-400 text-cyan-400 font-semibold'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-colors border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-cyan-400 text-cyan-400 font-semibold'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Customer Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Variant Selector */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-semibold text-neutral-200 block uppercase tracking-wider font-mono">
                          Select Edition / Specification:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariant(v)}
                              className={`p-3 rounded-lg border text-left text-xs transition-all flex flex-col justify-between ${
                                selectedVariant?.id === v.id
                                  ? 'bg-neutral-800 border-cyan-400 text-white shadow-sm'
                                  : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <span className="font-semibold text-neutral-100">{v.name}</span>
                              <span className="font-mono text-cyan-400 mt-1 tabular-nums">
                                {v.priceDelta > 0
                                  ? `+$${v.priceDelta.toFixed(2)}`
                                  : v.priceDelta < 0
                                  ? `-$${Math.abs(v.priceDelta).toFixed(2)}`
                                  : 'Included Base Price'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* VoltCare Protection Checkbox */}
                    <div className="pt-3">
                      <label className="flex items-start gap-3 p-3 rounded-lg bg-neutral-950/80 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={addProtection}
                          onChange={(e) => setAddProtection(e.target.checked)}
                          className="mt-0.5 rounded border-neutral-700 text-cyan-500 focus:ring-cyan-500 bg-neutral-900"
                        />
                        <div className="text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">Add VoltCare 2-Year Full Hardware Coverage</span>
                            <span className="font-mono text-cyan-400 font-semibold tabular-nums">+${protectionPrice.toFixed(2)}</span>
                          </div>
                          <p className="text-neutral-400 mt-0.5">
                            Covers accidental spills, screen drops, thermal repasting, and instant priority replacement.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    <table className="w-full text-xs text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key} className="border-b border-neutral-800/70">
                            <td className="py-2 pr-4 font-mono uppercase text-neutral-400 w-1/3">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </td>
                            <td className="py-2 text-neutral-200 font-medium font-mono tabular-nums">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white">{rev.author}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-neutral-500 text-[11px] font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-neutral-700'}`} />
                          ))}
                        </div>
                        <h4 className="text-xs font-semibold text-neutral-200">{rev.title}</h4>
                        <p className="text-xs text-neutral-400">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Buy Actions Module */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono text-white font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-cyan-400 text-neutral-950 font-bold hover:bg-cyan-300 active:scale-[0.98] transition-all text-sm shadow-lg shadow-cyan-950/40"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-neutral-950" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-neutral-950" />
                      <span>
                        Add to Bag · ${( (currentPrice + (addProtection ? protectionPrice : 0)) * quantity ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  Order within 2h 45m for delivery tomorrow
                </span>
                <span>Tax calculated at checkout</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
