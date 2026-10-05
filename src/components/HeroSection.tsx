import React from 'react';
import { ArrowRight, SlidersHorizontal, ShieldCheck, Zap, Truck } from 'lucide-react';
import { IMAGES } from '../data/products';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenPCBuilder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenPCBuilder,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800/80 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Quiet 1-line text kicker without pill boxes */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400">
              <span>VOLTTECH ENTERPRISE ELECTRONICS</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">NEXT-GEN HARDWARE</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Flagship gaming, silicon power & custom engineering.
            </h1>

            {/* Description */}
            <p className="max-w-xl text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Direct access to Sony PlayStation 5 Pro, Nintendo Switch OLED, Apple & Samsung flagship devices, high-refresh OLED laptops, and artisan custom liquid-cooled PC configurations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-400 text-neutral-950 font-semibold hover:bg-cyan-300 active:scale-[0.98] transition-all text-sm shadow-lg shadow-cyan-950/40"
              >
                <span>Shop Entire Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenPCBuilder}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white font-medium hover:border-neutral-500 hover:bg-neutral-800/60 active:scale-[0.98] transition-all text-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <span>Custom Rig Builder</span>
              </button>
            </div>

            {/* Quiet Trust Points adjacent to claim */}
            <div className="pt-6 border-t border-neutral-800/70 grid grid-cols-3 gap-4 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-200 block">Express Delivery</span>
                  <span>Free next-day on $500+</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-200 block">Up to 3-Yr Warranty</span>
                  <span>Manufacturer & VoltCare</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-200 block">Zero-Bloatware Rigs</span>
                  <span>72h Stress Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Res Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={IMAGES.hero}
                alt="VoltTech Flagship Electronics Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-[340px] sm:h-[400px] lg:h-[440px] object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />
              
              {/* Subtle overlay caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium text-white">PlayStation 5 Pro & Flagship Mobile Series</span>
                <span className="font-mono text-cyan-400 tabular-nums">IN STOCK 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
