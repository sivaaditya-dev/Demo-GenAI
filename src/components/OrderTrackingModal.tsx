import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Order } from '../types/electronics';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.length > 0 ? orders[0] : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase() || o.trackingNumber.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      // Create a mock active order if user tests with random ID
      const mockOrder: Order = {
        id: searchId.trim().toUpperCase(),
        date: 'Today',
        items: [],
        subtotal: 1299,
        discount: 0,
        shipping: 0,
        tax: 107.16,
        total: 1406.16,
        shippingAddress: {
          fullName: 'Customer Verification',
          email: 'customer@volttech.com',
          address: '450 Tech Way',
          city: 'San Jose',
          state: 'CA',
          zip: '95110',
          country: 'United States',
        },
        deliveryMethod: 'VoltTech Priority Express',
        paymentMethod: 'Verified Payment',
        status: 'In Transit' as any,
        estimatedDelivery: 'Tomorrow by 3:00 PM',
        trackingNumber: `1Z8912903847291`,
      };
      setSelectedOrder(mockOrder);
    }
  };

  const steps = [
    { title: 'Order Verified', desc: 'Payment cleared & order logged', done: true },
    { title: 'Cleanroom Packaging', desc: 'ESD-safe packaging & stress pass', done: true },
    { title: 'In Transit', desc: 'Departed regional distribution center', done: true },
    { title: 'Out for Delivery', desc: 'Courier on vehicle route', done: false },
    { title: 'Delivered', desc: 'Direct signature confirmation', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-lg font-bold text-white">
              Shipment Tracking & Logistics
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. VT-123456) or Tracking Number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white uppercase font-mono placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-lg text-xs font-bold transition-colors"
            >
              Track
            </button>
          </form>

          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Status Card */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-white font-bold text-sm">{selectedOrder.id}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-cyan-400">{selectedOrder.trackingNumber}</span>
                  </div>
                  <p className="text-neutral-400 mt-0.5">
                    Carrier: FedEx Priority Express Overnight
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                    STATUS: {selectedOrder.status.toUpperCase()}
                  </span>
                  <div className="text-white font-mono text-xs font-semibold mt-1">
                    ETA: {selectedOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Real-Time Transit Progress
                </h4>

                <div className="relative pl-6 space-y-6 border-l-2 border-neutral-800 ml-2">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          step.done
                            ? 'bg-cyan-500 border-cyan-400 text-neutral-950'
                            : 'bg-neutral-900 border-neutral-700'
                        }`}
                      >
                        {step.done && <CheckCircle2 className="w-3 h-3 fill-current text-neutral-950" />}
                      </div>
                      <div className="text-xs">
                        <div className={`font-semibold ${step.done ? 'text-white' : 'text-neutral-500'}`}>
                          {step.title}
                        </div>
                        <div className="text-[11px] text-neutral-400">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Destination */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Delivery Destination:</span>
                  <span className="text-neutral-400">
                    {selectedOrder.shippingAddress.fullName}, {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-neutral-400">
              No recent orders found. Place an order to see live tracking telemetry.
            </div>
          )}
        </div>

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
