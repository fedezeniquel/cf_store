export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_name: string; // 'Sin virola' | 'Virola lisa' | 'Virola cincelada' | 'Estándar', etc.
  price: number;
  stock: number;
  low_stock_threshold: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  variants?: ProductVariant[];
  category?: Category | null;
}

