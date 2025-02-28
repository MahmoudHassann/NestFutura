import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Products } from '../interface/product';
import { Variant } from '../interface/variant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Products;
  @Input() selectedVariants: Map<string, Variant> = new Map();
  /* @Input() products: Product[] = []; */
  @Input() selectedProperty: string = '';

  @Output() variantSelected = new EventEmitter<any>();
  @Output() filterUpdated = new EventEmitter<any>();

  hoveredProduct: Products | null = null;

  ngOnInit(): void {}

  isVariantSelected(product: Products, variant: Variant): boolean {
    const selectedVariant = this.selectedVariants.get(product.title);
    return selectedVariant?.id === variant.id;
  }

  getProductDisplayName(product: Products): string {
    const selectedVariant = this.selectedVariants.get(product.title);
    return selectedVariant
      ? `${product.title} - ${selectedVariant.name}`
      : product.title;
  }

  getProductImage(product: Products): string {
    const selectedVariant = this.selectedVariants.get(product.title);
    return selectedVariant?.image || product.snippet_image;
  }

  selectVariant(product: Products, variant: Variant): void {
    this.variantSelected.emit({ product, variant });
  }
}
