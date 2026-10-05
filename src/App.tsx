import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { CustomPCBuilder } from './components/CustomPCBuilder';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryId, BrandName, CartItem, Order, ProductVariant } from './types/electronics';
import { SlidersHorizontal, Check, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation & View
  const [activeView, setActiveView] = useState<'store' | 'pc-builder'>('store');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  // User State
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Seed with 1 initial completed order so tracking feature is immediately interactive
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'VT-842910',
      date: 'Yesterday',
      items: [
        {
          id: 'seed-item-1',
          product: PRODUCTS[0], // PS5 Pro
          quantity: 1,
          warrantyProtectionAdded: true,
        },
      ],
      subtotal: 799.98,
      discount: 0,
      shipping: 0,
      tax: 65.99,
      total: 865.97,
      shippingAddress: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@volttech-demo.com',
        address: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'United States',
      },
      deliveryMethod: 'VoltTech Priority Courier',
      paymentMethod: 'Visa ending in 4242',
      status: 'In Transit',
      estimatedDelivery: 'Tomorrow by 4:00 PM',
      trackingNumber: '1Z999AA1018492048',
    },
  ]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Management
  const handleAddToCart = (
    product: Product,
    variant?: ProductVariant,
    protection?: boolean,
    quantity = 1,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    const cartItemId = `${product.id}-${variant?.id || 'standard'}-${protection ? 'prot' : 'none'}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedVariant: variant,
          quantity,
          warrantyProtectionAdded: protection,
        },
      ];
    });

    showToast(`Added ${product.name} to shopping bag`);
  };

  const handleAddCustomRigToCart = (product: Product, rigSpecs: Record<string, string>) => {
    const customItemId = `custom-rig-${Date.now()}`;
    setCart((prev) => [
      ...prev,
      {
        id: customItemId,
        product,
        quantity: 1,
        customRigSpecs: rigSpecs,
        warrantyProtectionAdded: true,
      },
    ]);
    setActiveView('store');
    setIsCartOpen(true);
    showToast(`Custom PC Rig added to shopping bag!`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleApplyPromo = (code: string): boolean => {
    if (code === 'TECH10') {
      setAppliedPromo('TECH10');
      setPromoDiscount(0.10);
      return true;
    } else if (code === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      setPromoDiscount(0);
      return true;
    }
    return false;
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Compare toggle
  const handleToggleCompare = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Maximum 4 devices can be compared at once.');
        return prev;
      }
      showToast(`Added to comparison matrix`);
      return [...prev, product];
    });
  };

  // Order Placement
  const handleOrderComplete = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setAppliedPromo('');
    setPromoDiscount(0);
    showToast(`Order #${order.id} confirmed!`);
  };

  // Available brands derived from products
  const availableBrands = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.brand));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Brand match
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) {
        return false;
      }
      // In stock
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchesSpecs = item.keySpecs.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesSubtitle && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, selectedBrand, inStockOnly, searchQuery, sortBy]);

  // Cart Totals for Header
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
    const prot = item.warrantyProtectionAdded
      ? item.product.price > 2000 ? 199.99 : item.product.price > 800 ? 99.99 : 49.99
      : 0;
    return acc + (itemPrice + prot) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-mono shadow-2xl animate-fade-in">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveView('store');
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenPCBuilder={() => setActiveView('pc-builder')}
        onOpenTracking={() => setIsTrackingOpen(true)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        compareCount={comparisonList.length}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activeView !== 'store') setActiveView('store');
        }}
        activeView={activeView}
        onNavigateHome={() => {
          setActiveView('store');
          setActiveCategory('all');
          setSelectedBrand('all');
          setSearchQuery('');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'pc-builder' ? (
          <CustomPCBuilder
            onAddCustomRigToCart={handleAddCustomRigToCart}
            onClose={() => setActiveView('store')}
          />
        ) : (
          <>
            {/* Hero Section */}
            {searchQuery === '' && activeCategory === 'all' && (
              <>
                <HeroSection
                  onExploreCatalog={() => {
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenPCBuilder={() => setActiveView('pc-builder')}
                />
                
                {/* Category Showcase Grid */}
                <CategoryShowcase
                  onSelectCategory={(cat) => {
                    setActiveCategory(cat);
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenPCBuilder={() => setActiveView('pc-builder')}
                />
              </>
            )}

            {/* Catalog Section */}
            <section id="catalog-section" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Category Filter Tabs & Bar */}
              <div className="flex flex-col gap-4 border-b border-neutral-800 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-cyan-400">HARDWARE VAULT</span>
                    <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                      {activeCategory === 'all'
                        ? 'Full Hardware Catalog'
                        : activeCategory === 'gaming-consoles'
                        ? 'PlayStation 5 & Nintendo Switch'
                        : activeCategory === 'mobiles'
                        ? 'Flagship Smartphones'
                        : activeCategory === 'custom-pcs'
                        ? 'Gaming PCs & Workstations'
                        : 'High-Performance Laptops'}
                    </h2>
                  </div>

                  {/* Rig Configurator Button */}
                  <button
                    onClick={() => setActiveView('pc-builder')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Launch Custom Rig Studio</span>
                  </button>
                </div>

                {/* Primary Category Switcher Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {[
                    { id: 'all', label: 'All Hardware' },
                    { id: 'gaming-consoles', label: 'Gaming Consoles' },
                    { id: 'mobiles', label: 'Smartphones' },
                    { id: 'custom-pcs', label: 'Custom PCs' },
                    { id: 'laptops', label: 'Laptops' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as CategoryId)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        activeCategory === cat.id
                          ? 'bg-cyan-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Secondary Filters Bar: Brand Chips, Stock toggle, Sort dropdown */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  {/* Brand Filter */}
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
                    <span className="text-neutral-500 font-mono text-[11px] shrink-0">Brand:</span>
                    {availableBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors shrink-0 ${
                          selectedBrand === brand
                            ? 'bg-neutral-800 text-cyan-300 border border-neutral-700 font-medium'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                        }`}
                      >
                        {brand === 'all' ? 'All Brands' : brand}
                      </button>
                    ))}
                  </div>

                  {/* Stock Toggle & Sort */}
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-400 hover:text-white">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded border-neutral-700 bg-neutral-900 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span>In Stock Only</span>
                    </label>

                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-500 font-mono text-[11px]">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Active Results Count */}
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Showing {filteredProducts.length} hardware products</span>
                {(selectedBrand !== 'all' || inStockOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedBrand('all');
                      setInStockOnly(false);
                      setSearchQuery('');
                    }}
                    className="text-cyan-400 hover:underline"
                  >
                    Reset Active Filters
                  </button>
                )}
              </div>

              {/* Product Grid (3 columns on desktop per guidelines) */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center space-y-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
                  <p className="text-neutral-400 text-sm">No hardware matched your criteria.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedBrand('all');
                      setSearchQuery('');
                      setInStockOnly(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-cyan-400 text-neutral-950 font-bold text-xs hover:bg-cyan-300"
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p, e) => handleAddToCart(p, undefined, false, 1, e)}
                      onToggleWishlist={handleToggleWishlist}
                      onToggleCompare={handleToggleCompare}
                      isWishlisted={wishlist.some((w) => w.id === product.id)}
                      isCompared={comparisonList.some((c) => c.id === product.id)}
                      isInCart={cart.some((c) => c.product.id === product.id)}
                    />
                  ))}
                </div>
              )}

            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActiveView('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPCBuilder={() => {
          setActiveView('pc-builder');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, variant, protection, qty) => {
          handleAddToCart(p, variant, protection, qty);
        }}
        onToggleWishlist={handleToggleWishlist}
        onToggleCompare={handleToggleCompare}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        isCompared={selectedProduct ? comparisonList.some((c) => c.id === selectedProduct.id) : false}
      />

      {/* Comparison Modal */}
      {isCompareOpen && (
        <ProductComparisonModal
          products={comparisonList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveProduct={(id) => setComparisonList((prev) => prev.filter((p) => p.id !== id))}
          onClearAll={() => setComparisonList([])}
          onAddToCart={(p) => handleAddToCart(p)}
        />
      )}

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        promoDiscount={promoDiscount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartTotal}
        discount={cartTotal * promoDiscount}
        onOrderComplete={handleOrderComplete}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
      />

    </div>
  );
}
