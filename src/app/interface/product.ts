import { SafeHtml } from "@angular/platform-browser";
import { Variant } from "./variant";

/* export interface Product {
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
} */
// interface/product.ts
export interface Products {
  id: number;
  title: string;
  desc: string;
  price: string;
  discount: boolean;
  variants?: Variant[];
  variantType?: 'color' | 'regular';
  stock: string;
  product_categories: Category[];
  product_types: Type[];
  product_technologies: Technology[];
  product_using: Usage[];
  snippet_image: string;
  images: string[];
}
export interface Product {
  id: number;
  title: string;
  desc: string;
  long_desc: string;
  price: string;
  stock: string;  
  created_at: string;
  updated_at: string;
  product_categories: Category[];
  product_types: Type[];
  product_technologies: Technology[];
  product_using: Usage[];
  features: Feature[];
  articles: Article[];
  snippet_image: string;
  images: string[];
}

export interface Category {
  title: string;
  desc: string;
  icon: string | null;
}

export interface Type {
  title: string;
  icon: string | null;
}

export interface Technology {
  title: string;
  icon: string | null;
}

export interface Usage {
  title: string;
  icon: string | null;
}

export interface ApiResponse {
  data: Products[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Feature {
  title: string;
}
export interface Article {
  title: string;
  desc:string;
}

