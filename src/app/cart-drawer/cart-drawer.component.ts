import { Component, OnInit } from '@angular/core';
import { CartDrawerItemsComponent } from "../cart-drawer-items/cart-drawer-items.component";
import { TooltipModule } from 'primeng/tooltip';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CartDrawerItemsComponent,TooltipModule],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent implements OnInit {

  isCartActive = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartVisible$.subscribe(visible => {
      this.isCartActive = visible;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  closeCart() {
    this.cartService.closeCart();
  }
}
