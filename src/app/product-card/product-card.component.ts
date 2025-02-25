import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { Product, Productqq } from '../interface/product';
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
  @Input() product!: Product;
  @Input() selectedVariants: Map<string, Variant> = new Map();
  /* @Input() products: Product[] = []; */
  @Input() selectedProperty: string = '';

  @Output() variantSelected = new EventEmitter<any>();
  @Output() filterUpdated = new EventEmitter<any>();

  hoveredProduct: Product | null = null;

  ngOnInit(): void {}

  isVariantSelected(product: Product, variant: Variant): boolean {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant?.id === variant.id;
  }

  getProductDisplayName(product: Product): string {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant
      ? `${product.name} - ${selectedVariant.name}`
      : product.name;
  }

  getProductImage(product: Product): string {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant?.image || product.images.default;
  }

  selectVariant(product: Product, variant: Variant): void {
    this.variantSelected.emit({ product, variant });
  }
}
