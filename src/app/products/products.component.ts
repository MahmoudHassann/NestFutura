import { Component, OnInit } from '@angular/core';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FilterProductsComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  categories: any[] = [];
  activeCategoryId: number | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private _router:Router
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('filter_by_categories');
      this.activeCategoryId = id ? Number(id) : null;
      
    });
  }

  getCategories() {
    this.productService.getFilters().subscribe((res) => {
      this.categories = [...res.data.filter_by_categories];
    });
  }

  selectCategory(id: string): void {
    this._router.navigate([], {
      queryParams: { filter_by_categories: id },
      queryParamsHandling: 'merge',
    });
  }
}
