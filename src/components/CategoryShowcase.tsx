import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryId } from '../types/electronics';
import { IMAGES } from '../data/products';

interface CategoryShowcaseProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenPCBuilder: () => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onOpenPCBuilder,
}) => {
  const categories = [
    {
      id: 'gaming-consoles' as CategoryId,
      name: 'Gaming Consoles',
      tagline: 'Sony PS5 Pro & Nintendo Switch OLED',
      itemsCount: '4 Models In Stock',
      image: IMAGES.gamingConsoles,
      onClick: () => onSelectCategory('gaming-consoles'),
    },
    {
      id: 'mobiles' as CategoryId,
      name: 'Flagship Mobiles',
      tagline: 'Apple iPhone 16 Pro, Samsung S25 Ultra, Pixel',
      itemsCount: '4 Flagship Series',
      image: IMAGES.mobiles,
      onClick: () => onSelectCategory('mobiles'),
    },
    {
      id: 'custom-pcs' as CategoryId,
      name: 'Custom Gaming PCs',
      tagline: 'RTX 4090 Rigs & Interactive Rig Studio',
      itemsCount: 'Configurable & Pre-built',
      image: IMAGES.customPcs,
      onClick: () => onSelectCategory('custom-pcs'),
      hasRigAction: true,
    },
    {
      id: 'laptops' as CategoryId,
      name: 'High-Performance Laptops',
      tagline: 'MacBook Pro M4, ASUS ROG, ThinkPad X1, Razer',
      itemsCount: '5 Premium Systems',
      image: IMAGES.laptops,
      onClick: () => onSelectCategory('laptops'),
    },
  ];

  return (
    <section className="py-10 border-b border-neutral-800/80 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono text-red-500 font-semibold">CURATED DEPARTMENTS</span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
              Select Your Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <span>View All Hardware</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-xl overflow-hidden border border-neutral-800/90 bg-neutral-900 transition-all duration-300 hover:border-red-600/40 hover:translate-y-[-2px] flex flex-col"
            >
              {/* Image Container */}
              <div 
                onClick={cat.onClick} 
                className="relative h-44 sm:h-48 w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
                
                {/* Items count overlay */}
                <div className="absolute top-3 right-3 text-[11px] font-mono text-neutral-300 bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-800">
                  {cat.itemsCount}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    onClick={cat.onClick}
                    className="font-display text-base font-semibold text-white group-hover:text-red-500 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-red-500 transition-colors" />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800/60 flex items-center justify-between">
                  <button
                    onClick={cat.onClick}
                    className="text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    Explore Models
                  </button>
                  {cat.hasRigAction && (
                    <button
                      onClick={onOpenPCBuilder}
                      className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors"
                    >
                      Build Rig →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
