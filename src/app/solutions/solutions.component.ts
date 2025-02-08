import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink],
  templateUrl: './solutions.component.html',
  styleUrl: './solutions.component.scss'
})
export class SolutionsComponent {

  constructor(private cartService:CartService){}
  openCart() {
    this.cartService.openCart();
  }
}
