import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import { CategoryId } from '../types/electronics';

interface FooterProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenPCBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPCBuilder,
}) => {
  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 text-neutral-400 text-xs">
      {/* 4 Pillars of Confidence */}
      <div className="border-b border-neutral-800/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">Free Express Shipping</h4>
                <p className="text-[11px] text-neutral-400">On all orders over $300</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">Authorized Warranty</h4>
                <p className="text-[11px] text-neutral-400">100% Genuine manufacturer seals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">30-Day Hassle-Free Return</h4>
                <p className="text-[11px] text-neutral-400">Zero restocking fees on sealed items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h4 className="font-semibold text-white text-xs">Specialist Hardware Support</h4>
                <p className="text-[11px] text-neutral-400">Direct technician assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                VoltTech
              </span>
              <span className="h-2 w-2 rounded-full bg-red-600 shadow-sm shadow-red-600/50"></span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Curated boutique store for PlayStation 5, Nintendo Switch, Apple iPhone, Samsung Galaxy, ultra-portable workstation laptops, and artisan custom PC builds.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Fulfillment Hub: San Francisco & Singapore
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase font-mono text-[11px] tracking-wider mb-3">
              Gaming & Consoles
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('gaming-consoles')}
                  className="hover:text-white transition-colors"
                >
                  PlayStation 5 Pro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gaming-consoles')}
                  className="hover:text-white transition-colors"
                >
                  PlayStation 5 Slim
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gaming-consoles')}
                  className="hover:text-white transition-colors"
                >
                  Nintendo Switch OLED
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gaming-consoles')}
                  className="hover:text-white transition-colors"
                >
                  Nintendo Switch Lite
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase font-mono text-[11px] tracking-wider mb-3">
              Mobiles & Laptops
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('mobiles')}
                  className="hover:text-white transition-colors"
                >
                  Apple iPhone 16 Pro Max
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('mobiles')}
                  className="hover:text-white transition-colors"
                >
                  Samsung Galaxy S25 Ultra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('laptops')}
                  className="hover:text-white transition-colors"
                >
                  MacBook Pro M4 Max
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('laptops')}
                  className="hover:text-white transition-colors"
                >
                  ASUS ROG Zephyrus G16
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase font-mono text-[11px] tracking-wider mb-3">
              Custom Rigs
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPCBuilder}
                  className="hover:text-red-400 transition-colors text-red-500 font-semibold"
                >
                  Custom Rig Configurator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('custom-pcs')}
                  className="hover:text-white transition-colors"
                >
                  Volt Omega RTX 4090
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('custom-pcs')}
                  className="hover:text-white transition-colors"
                >
                  Volt Valkyrie 7800X3D
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('custom-pcs')}
                  className="hover:text-white transition-colors"
                >
                  72h Thermal Stress Lab
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 VoltTech Electronics Inc. All registered trademarks, logos and hardware designs are property of their respective owners.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Terms of Sale</span>
            <span>·</span>
            <span className="font-mono">Warranty Coverage</span>
            <span>·</span>
            <span className="font-mono">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
