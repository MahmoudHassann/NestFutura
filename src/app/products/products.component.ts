import { Component } from '@angular/core';
import { FilterProductsComponent } from "../filter-products/filter-products.component";

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [FilterProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
