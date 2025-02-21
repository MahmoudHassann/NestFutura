import { SafeHtml } from "@angular/platform-browser";
import { Variant } from "./variant";

export interface Product {
  id?: string;
  name: string;
  price: string;
  totalprice: string;
  images: {
    default: string;
    hover: string;
    white?: string;
    black?: string;
    brown?: string;
  };
  discount: boolean;
  status: string;
  properties: string[];
  description: string;
  connectivity: { type: string; icon: SafeHtml }[];
  variants?: Variant[];
  variantType?: 'color' | 'regular';
}
// interface/product.ts
export interface Productqq {
  id: number;
  title: string;
  desc: string;
  price: string;
  stock: string;
  name: string; // Added for compatibility with existing code
  product_categories: ProductCategory[];
  product_types: ProductType[];
  product_technologies: ProductTechnology[];
  product_using: ProductUsing[];
  filter_by_types: FilterOption[];
  filter_by_technologies: FilterOption[];
  filter_by_using: FilterOption[];
  filter_by_categories: FilterOption[];
  sort_by: string[];
}

interface ProductCategory {
  title: string;
  desc: string;
  icon: string;
}

interface ProductType {
  title: string;
  icon: string;
}

interface ProductTechnology {
  title: string;
  icon: string;
}

interface ProductUsing {
  title: string;
  icon: string;
}

interface FilterOption {
  id: number;
  title: {
    en: string;
    ar: string;
  };
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
