import { Component } from '@angular/core';
import { FilterProductsComponent } from "../filter-products/filter-products.component";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [FilterProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  categories:any[]=[];
  constructor(private productService:ProductService)
  {
    this.getCategories()
  }

  getCategories()
  {
    this.productService.getFilters().subscribe((res)=>{
      this.categories = [...res.data.filter_by_categories];
    })
  }

}
