import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from './product.service';
import { inject, Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { SolutionsComponent } from './solutions/solutions.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'page/:category', component: SolutionsComponent },
    {
        path: 'product/:id', component: ProductDetailsComponent, resolve: {
          product: (route: ActivatedRouteSnapshot) => {
            const id = route.paramMap.get('id');
            if (!id) {
              return throwError(() => new Error('Product ID is required'));
            }
            const injector = inject(Injector);
            const productService = injector.get(ProductService); // ✅ Correctly use Injector.get()
            return productService.getProduct(id);
          }
        }
      }
];
