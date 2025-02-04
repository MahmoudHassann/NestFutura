import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'NestFutura';
  isNavVisible = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.navVisible$.subscribe((isVisible) => {
      this.isNavVisible = isVisible;
    });
  }

}
