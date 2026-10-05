import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types/electronics';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
  promoDiscount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  promoDiscount,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
    const protectionCost = item.warrantyProtectionAdded
      ? item.product.price > 2000 ? 199.99 : item.product.price > 800 ? 99.99 : 49.99
      : 0;
    return acc + (itemPrice + protectionCost) * item.quantity;
  }, 0);

  const discountAmount = (subtotal * promoDiscount);
  const shipping = subtotal > 300 || appliedPromo === 'FREESHIP' ? 0 : 25;
  const estimatedTax = (subtotal - discountAmount) * 0.0825;
  const total = Math.max(0, subtotal - discountAmount + shipping + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoMessage({ text: `Code '${promoInput.toUpperCase()}' applied!`, success: true });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "TECH10" or "FREESHIP"', success: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="font-display text-lg font-bold text-white">
                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">Your bag is empty</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                    Explore our collection of PlayStation 5, Switch, flagship mobiles, or custom rigs.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-colors shadow-md shadow-red-950/40"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemBasePrice = item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
                const protectionCost = item.warrantyProtectionAdded
                  ? item.product.price > 2000 ? 199.99 : item.product.price > 800 ? 99.99 : 49.99
                  : 0;
                const unitTotal = itemBasePrice + protectionCost;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                            title="Remove from bag"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <div className="text-[11px] font-mono text-red-400 font-semibold mt-0.5">
                            Edition: {item.selectedVariant.name}
                          </div>
                        )}

                        {item.warrantyProtectionAdded && (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono mt-0.5">
                            <ShieldCheck className="w-3 h-3" /> VoltCare 2-Year Full Coverage (+${protectionCost.toFixed(2)})
                          </div>
                        )}

                        {item.customRigSpecs && (
                          <div className="mt-1 text-[10px] text-neutral-400 font-mono space-y-0.5 border-t border-neutral-800/60 pt-1">
                            <div>CPU: {item.customRigSpecs['Processor']?.split(' ')[0]} {item.customRigSpecs['Processor']?.split(' ')[2]}</div>
                            <div>GPU: {item.customRigSpecs['Graphics']?.split(' ')[1]} {item.customRigSpecs['Graphics']?.split(' ')[2]}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Price Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800/50">
                      <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-mono text-sm font-bold text-white tabular-nums">
                        ${(unitTotal * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with promo and checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. TECH10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white uppercase placeholder-neutral-500 font-mono focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-mono font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] font-mono ${promoMessage.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Order calculation lines */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Express Courier Delivery
                  </span>
                  <span className="font-mono text-white tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono text-white tabular-nums">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-white">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-mono text-xl font-extrabold text-red-500 tabular-nums">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-red-950/50"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
