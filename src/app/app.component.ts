import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './product.service';
import { CartDrawerComponent } from "./cart-drawer/cart-drawer.component";
import { CartService } from './cart.service';
import { FooterComponent } from "./footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CartDrawerComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'NestFutura';
  isNavVisible = false;
  isCartVisible = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    translate: TranslateService
  ) {
    translate.onLangChange.subscribe((event) => {
      /* document.documentElement.setAttribute(
        'dir',
        event.lang === 'ar' ? 'rtl' : 'ltr'
      ); */
      document.documentElement.classList.toggle('rtl', event.lang === 'ar');
    });
  }

  ngOnInit() {
    this.productService.navVisible$.subscribe((isVisible) => {
      this.isNavVisible = isVisible;
    });
    this.cartService.cartVisible$.subscribe((visible) => {
      this.isCartVisible = visible;
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          Promise.resolve().then(() => {
            document.documentElement.style.scrollBehavior = 'auto';
            document.documentElement.scrollTop = 0;

            setTimeout(() => {
              document.documentElement.style.scrollBehavior = 'smooth';
            }, 0);
          });
        }
      });
    }
  }
}
