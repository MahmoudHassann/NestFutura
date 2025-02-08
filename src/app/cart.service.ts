import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  openCart() {
    this.cartVisible.next(true);
  }

  closeCart() {
    this.cartVisible.next(false);
  }

  addToCart(item: any) {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next([...currentItems, item]);
    this.openCart(); // Open the cart when an item is added
  }
}
