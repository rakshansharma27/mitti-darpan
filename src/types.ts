export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  shape: 'Circle' | 'Square' | 'Rectangle';
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  clayComposition: string; // Detail about craft
  mirrorsUsed: string; // Mirror details e.g., "120+ micro-mirrors"
  weight: string;
  inStock: boolean;
  category: string;
  gallery?: string[];
  materials?: string[];
  refundPolicy?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomOrderRequest {
  shape: 'Circle' | 'Square' | 'Octagon';
  size: '12" Diameter' | '18" Diameter' | '24" Diameter' | '12"x12" Square' | '18"x18" Square' | '24"x24" Square';
  colorTheme: string;
  mirrorStyle: 'Minimalist Elegant' | 'Intricate Geometric' | 'Traditional Radial Mandala';
  customText?: string;
  shippingOption: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
  clayTextureLabel: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
