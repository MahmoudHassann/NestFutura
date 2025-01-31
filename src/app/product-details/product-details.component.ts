import { Component, Input, signal } from '@angular/core';
import { Product } from '../interface/product';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { firstValueFrom } from 'rxjs';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink,RouterLinkActive,ImageViewerComponent,TooltipModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product!: Product;
  productImages = [
    'https://www.shelly.com/cdn/shop/files/Shelly-2PM-Gen3-main-image.png?v=1727359896&width=1100',
    'https://www.shelly.com/cdn/shop/files/2pmphoto3.webp?v=1727356333&width=1100',
    'https://www.shelly.com/cdn/shop/files/2pmproduct2.webp?v=1727356333&width=1100',
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private title: Title,
    private meta: Meta
  ) {
    // Try to get product from navigation state
   /*  const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['product']) {
      this.product = navigation.extras.state?.['product'];
      this.updateMetaTags();
    } */
  }

  ngOnInit() {
    // If product not in state, fetch it
    /* if (!this.product) {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.loadProduct(productId);
      }
    } */
  }

  private async loadProduct(id: string) {
    try {
      // Using firstValueFrom instead of toPromise
      this.product = await firstValueFrom(this.productService.getProduct(id));
      this.updateMetaTags();
    } catch (error) {
      console.error('Error loading product:', error);
      this.router.navigate(['/not-found']);
    }
  }

  private updateMetaTags() {
    if (this.product) {
      this.title.setTitle(`${this.product.name} - Your Store`);
      this.meta.updateTag({ name: 'description', content: this.product.description });
      // Add more meta tags as needed
    }
  }


}
