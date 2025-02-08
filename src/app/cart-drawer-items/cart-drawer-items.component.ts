import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-drawer-items',
  imports: [FormsModule],
  templateUrl: './cart-drawer-items.component.html',
  styleUrl: './cart-drawer-items.component.scss'
})
export class CartDrawerItemsComponent {
  @Input() items: any[] = [];
  quantity: number = 1;

  increaseQuantity(): void {
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
