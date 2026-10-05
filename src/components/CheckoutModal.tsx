import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, ShieldCheck, Truck, ArrowLeft, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { CartItem, Order } from '../types/electronics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [deliveryMethod, setDeliveryMethod] = useState({
    id: 'express',
    name: 'VoltTech Priority Courier (Next Business Day)',
    price: 0,
    eta: 'Tomorrow by 4:00 PM',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    exp: '09/28',
    cvv: '883',
    nameOnCard: 'Alex Morgan',
  });

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const shippingCost = deliveryMethod.price;
  const tax = (subtotal - discount) * 0.0825;
  const grandTotal = Math.max(0, subtotal - discount + shippingCost + tax);

  const fillDemoAddress = () => {
    setFormData({
      fullName: 'Alex Morgan',
      email: 'alex.morgan@volttech-demo.com',
      phone: '+1 (555) 438-9201',
      address: '742 Evergreen Terrace, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States',
    });
  };

  const handlePlaceOrder = () => {
    const orderId = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
    const tracking = `1Z999AA101${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...items],
      subtotal,
      discount,
      shipping: shippingCost,
      tax,
      total: grandTotal,
      shippingAddress: formData,
      deliveryMethod: deliveryMethod.name,
      paymentMethod: paymentMethod === 'card' ? 'Visa ending in 4242' : paymentMethod === 'applepay' ? 'Apple Pay' : '0% APR Installments',
      status: 'Processing',
      estimatedDelivery: deliveryMethod.eta,
      trackingNumber: tracking,
    };

    setPlacedOrder(newOrder);
    onOrderComplete(newOrder);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-white">
              VoltTech Secure Checkout
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50">
              <ShieldCheck className="w-3 h-3" /> 256-Bit Encrypted
            </div>
          </div>

          {step < 4 && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-neutral-950/50 border-b border-neutral-800/60 flex items-center justify-between text-xs font-mono">
            <span className={step >= 1 ? 'text-cyan-400 font-semibold' : 'text-neutral-500'}>
              1. Delivery Address
            </span>
            <span className="text-neutral-700">───</span>
            <span className={step >= 2 ? 'text-cyan-400 font-semibold' : 'text-neutral-500'}>
              2. Shipping Speed
            </span>
            <span className="text-neutral-700">───</span>
            <span className={step >= 3 ? 'text-cyan-400 font-semibold' : 'text-neutral-500'}>
              3. Payment & Review
            </span>
          </div>
        )}

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Address */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-white">
                  Where should we send your hardware?
                </h3>
                <button
                  type="button"
                  onClick={fillDemoAddress}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Fill Demo Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Email for Tracking Receipt</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 mb-1 font-mono">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Silicon Boulevard, Apt 4B"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="San Francisco"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="CA"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      placeholder="94107"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.fullName || !formData.address) fillDemoAddress();
                    setStep(2);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-300 transition-colors"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Methods */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-display text-base font-bold text-white">
                Select Courier Shipping Speed
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 'express',
                    name: 'VoltTech Priority Courier (Free on $300+)',
                    price: 0,
                    eta: 'Tomorrow by 4:00 PM',
                    badge: 'Recommended',
                  },
                  {
                    id: 'overnight',
                    name: 'Guaranteed Priority Overnight Air',
                    price: 19.99,
                    eta: 'Tomorrow by 10:30 AM',
                    badge: 'Fastest',
                  },
                  {
                    id: 'whiteglove',
                    name: 'White-Glove In-Home Rig Setup & Desk Placement',
                    price: 49.99,
                    eta: 'Scheduled Delivery Window',
                    badge: 'Premium',
                  },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setDeliveryMethod(opt)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      deliveryMethod.id === opt.id
                        ? 'bg-neutral-850 border-cyan-400'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{opt.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-neutral-900 px-1.5 py-0.2 rounded border border-neutral-800">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">Estimated Arrival: {opt.eta}</p>
                    </div>

                    <span className="font-mono text-xs font-bold text-white tabular-nums">
                      {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-lg bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-300 transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Summary */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left: Payment Form */}
                <div className="space-y-4">
                  <h3 className="font-display text-base font-bold text-white">
                    Select Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-lg border text-center text-xs font-mono font-medium transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-cyan-400 bg-neutral-800 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-2.5 rounded-lg border text-center text-xs font-mono font-medium transition-colors ${
                        paymentMethod === 'applepay'
                          ? 'border-cyan-400 bg-neutral-800 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('installments')}
                      className={`p-2.5 rounded-lg border text-center text-xs font-mono font-medium transition-colors ${
                        paymentMethod === 'installments'
                          ? 'border-cyan-400 bg-neutral-800 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                      }`}
                    >
                      0% Installments
                    </button>
                  </div>

                  {paymentMethod === 'card' ? (
                    <div className="space-y-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono">Card Number</label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-neutral-400 mb-1 font-mono">Expires</label>
                          <input
                            type="text"
                            value={cardData.exp}
                            onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-neutral-400 mb-1 font-mono">CVV Security</label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ) : paymentMethod === 'applepay' ? (
                    <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 text-center text-xs text-neutral-300 space-y-2">
                      <p>Touch ID / Face ID prompt will trigger on order placement.</p>
                      <span className="font-mono text-cyan-400 text-sm block">Apple Pay One-Touch Ready</span>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                      <p className="font-bold text-white">4 Interest-Free Payments of ${(grandTotal / 4).toFixed(2)}</p>
                      <p className="text-neutral-400">Due every 2 weeks. No credit check or fees.</p>
                    </div>
                  )}
                </div>

                {/* Right: Order Summary Breakdown */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                  <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
                    Order Receipt Summary
                  </h4>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between text-neutral-300">
                        <span className="truncate mr-2">{i.quantity}x {i.product.name}</span>
                        <span className="font-mono text-white tabular-nums shrink-0">
                          ${(i.product.price * i.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-neutral-800 space-y-1 text-neutral-400">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount:</span>
                        <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="font-mono text-white tabular-nums">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8.25%):</span>
                      <span className="font-mono text-white tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-white text-sm">
                      <span>Total:</span>
                      <span className="font-mono text-cyan-400 tabular-nums">
                        ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-xl bg-cyan-400 text-neutral-950 font-extrabold text-sm hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/40"
                >
                  Complete Order (${grandTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation */}
          {step === 4 && placedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono text-cyan-400">TRANSACTION CONFIRMED</span>
                <h3 className="font-display text-2xl font-extrabold text-white mt-1">
                  Thank You For Your Order!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  We are preparing your shipment at our primary cleanroom fulfillment hub.
                </p>
              </div>

              {/* Order Details Receipt Box */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Order Reference:</span>
                  <span className="text-white font-bold">{placedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Tracking Code:</span>
                  <span className="text-cyan-400">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Estimated Delivery:</span>
                  <span className="text-white">{placedOrder.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Ship To:</span>
                  <span className="text-white truncate">{placedOrder.shippingAddress.fullName}, {placedOrder.shippingAddress.city}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-neutral-400">Charged Amount:</span>
                  <span className="text-emerald-400 tabular-nums">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-cyan-400 text-neutral-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
