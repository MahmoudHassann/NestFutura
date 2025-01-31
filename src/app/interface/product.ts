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
