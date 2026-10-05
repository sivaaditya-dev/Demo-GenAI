export type CategoryId = 'all' | 'gaming-consoles' | 'mobiles' | 'custom-pcs' | 'laptops';

export type BrandName = 
  | 'Sony' 
  | 'Nintendo' 
  | 'Apple' 
  | 'Samsung' 
  | 'Google' 
  | 'ASUS ROG' 
  | 'Razer' 
  | 'Lenovo' 
  | 'Volt Custom';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Space Black - 512GB" or "White OLED Edition"
  storage?: string;
  color?: string;
  ram?: string;
  memory?: string;
  priceDelta: number;
}

export interface TechnicalSpecs {
  processor: string;
  graphics: string;
  memory: string;
  storage: string;
  display?: string;
  batteryLife?: string;
  weight?: string;
  ports?: string;
  connectivity?: string;
  os?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  brand: BrandName;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string; // e.g. "Flagship 2026", "Best Seller", "Pro Grade"
  image: string;
  fallbackIcon: string;
  shortDescription: string;
  description: string;
  keySpecs: string[]; // 3-4 bullet tags for cards
  specs: TechnicalSpecs;
  variants?: ProductVariant[];
  warrantyMonths: number;
  reviews: ProductReview[];
  isCustomRig?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  warrantyProtectionAdded?: boolean;
  customRigSpecs?: Record<string, string>;
}

export interface PCComponent {
  id: string;
  type: 'cpu' | 'gpu' | 'motherboard' | 'ram' | 'storage' | 'cooler' | 'psu' | 'case';
  name: string;
  brand: string;
  price: number;
  wattage: number;
  specsSummary: string;
  recommendedFor: string;
  image?: string;
}

export interface CustomPCSelection {
  cpu: PCComponent | null;
  gpu: PCComponent | null;
  motherboard: PCComponent | null;
  ram: PCComponent | null;
  storage: PCComponent | null;
  cooler: PCComponent | null;
  psu: PCComponent | null;
  case: PCComponent | null;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  status: 'Processing' | 'Assembling' | 'In Transit' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}
