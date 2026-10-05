import React from 'react';
import { X, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types/electronics';

interface ProductComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  onAddToCart: (p: Product) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  products,
  onClose,
  onRemoveProduct,
  onClearAll,
  onAddToCart,
}) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-6xl rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div>
            <span className="text-xs font-mono text-red-500 font-semibold">SIDE-BY-SIDE MATRIX</span>
            <h2 className="font-display text-xl font-bold text-white">
              Hardware Specification Comparison
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Content Table / Grid */}
        <div className="overflow-x-auto p-6 flex-1">
          <div className="min-w-[700px]">
            {/* Header Product Columns */}
            <div className={`grid grid-cols-${products.length + 1} gap-4 pb-6 border-b border-neutral-800`} style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
              {/* Corner Cell */}
              <div className="text-xs text-neutral-500 font-mono flex items-end">
                SPECIFICATION
              </div>

              {/* Product Cards */}
              {products.map((p) => (
                <div key={p.id} className="relative p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between">
                  <button
                    onClick={() => onRemoveProduct(p.id)}
                    className="absolute top-2 right-2 text-neutral-500 hover:text-red-400 p-1 rounded-full transition-colors"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-28 w-full flex items-center justify-center p-2 mb-2 bg-neutral-900 rounded-lg">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-cover rounded"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-red-500 uppercase font-semibold">{p.brand}</span>
                    <h3 className="font-display text-xs font-semibold text-white line-clamp-2 mt-0.5">
                      {p.name}
                    </h3>
                    <div className="mt-2 text-sm font-bold font-mono text-white tabular-nums">
                      ${p.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(p)}
                    className="mt-3 w-full py-1.5 px-2 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-red-500 transition-colors shadow-md shadow-red-950/40"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Spec Rows */}
            <div className="space-y-4 pt-4 text-xs">
              {/* Category */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Category</span>
                {products.map((p) => (
                  <span key={p.id} className="text-white capitalize">
                    {p.category.replace('-', ' ')}
                  </span>
                ))}
              </div>

              {/* Processor */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Processor</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.processor}
                  </span>
                ))}
              </div>

              {/* Graphics */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Graphics Engine</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.graphics}
                  </span>
                ))}
              </div>

              {/* Memory */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">System Memory</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.memory}
                  </span>
                ))}
              </div>

              {/* Storage */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Storage Drive</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.storage}
                  </span>
                ))}
              </div>

              {/* Display */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Display / Video Output</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.display || 'External monitor required'}
                  </span>
                ))}
              </div>

              {/* Battery / Power */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Battery / Power</span>
                {products.map((p) => (
                  <span key={p.id} className="text-neutral-200 font-mono text-[11px]">
                    {p.specs.batteryLife || 'Standard AC Power'}
                  </span>
                ))}
              </div>

              {/* Warranty */}
              <div className="grid gap-4 py-2 border-b border-neutral-800/60" style={{ gridTemplateColumns: `180px repeat(${products.length}, minmax(200px, 1fr))` }}>
                <span className="font-mono text-neutral-400 font-medium">Included Warranty</span>
                {products.map((p) => (
                  <span key={p.id} className="text-emerald-400 font-mono text-[11px]">
                    {p.warrantyMonths} Months Official Coverage
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex justify-between items-center text-xs text-neutral-400">
          <span>Comparing {products.length} devices simultaneously</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
