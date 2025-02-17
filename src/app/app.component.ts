import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './product.service';
import { CartDrawerComponent } from "./cart-drawer/cart-drawer.component";
import { CartService } from './cart.service';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CartDrawerComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'NestFutura';
  isNavVisible = false;
  isCartVisible = false;

  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit() {
    this.productService.navVisible$.subscribe((isVisible) => {
      this.isNavVisible = isVisible;
    });
    this.cartService.cartVisible$.subscribe(visible => {
      this.isCartVisible = visible;
    });
  }

}
