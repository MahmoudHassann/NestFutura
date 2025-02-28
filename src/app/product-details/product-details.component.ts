import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener,Inject,OnInit,PLATFORM_ID,ViewChild, ViewEncapsulation } from '@angular/core';
import { Product } from '../interface/product';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import {  Meta, Title } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { firstValueFrom } from 'rxjs';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from "../project-card/project-card.component";
import { Project } from '../interface/project';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-details',
  imports: [
    RouterLink,
    RouterLinkActive,
    ImageViewerComponent,
    TooltipModule,
    FormsModule,
    ProjectCardComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  isNavVisible = false;
  isOpenArticle = false;
  project: Project[] = [];
  projects: Project[] = [];
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  @ViewChild('featuresWrapper') featuresWrapper!: ElementRef;
  private lastScrollTop = 0;
  product!: Product;
  productImages = [''];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this.productService.navVisible$.subscribe((isVisible) => {
      this.isNavVisible = isVisible;
    });

    this.project = [
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
      {
        name: 'Smart Electric Car Charger',
        author: 'Mark Boyle 🇬🇧',
        desc: 'I automated my EV charger using a Shelly 1 to control charging times based on my night-time tariff, optimizing energy use for my Nissan Leaf.',
        img: 'https://www.shelly.com/cdn/shop/articles/shelly-ev-charger_500x.webp?v=1726740958',
      },
    ];
    this.projects = [...this.project];
    // If product not in state, fetch it
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['product']) {
      this.product = navigation.extras.state['product'];
      this.productImages = [...this.product.images];
      this.updateMetaTags();
    } else {
      // If product is not in state, fetch it using the route ID
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.loadProduct(productId);
      }
    }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        loop: false,
        breakpoints: {
          989: {
            spaceBetween: 22,
          },
        },
        observer: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init() {},
        },
      });
      swiperEl.initialize();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (!this.featuresWrapper) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementTop =
      this.featuresWrapper.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the features wrapper is in view
    const isFeatureWrapperVisible =
      elementTop <= windowHeight &&
      elementTop + this.featuresWrapper.nativeElement.offsetHeight >= 0;

    if (isFeatureWrapperVisible) {
      const isScrollingDown = scrollTop > this.lastScrollTop;
      this.productService.updateNavVisibility(isScrollingDown);
    } else {
      this.productService.updateNavVisibility(false);
    }

    this.lastScrollTop = scrollTop;
  }
  quantity: number = 1;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  openArticle(){
    this.isOpenArticle = !this.isOpenArticle;
  }

  private async loadProduct(id: string) {
    try {
      // Using firstValueFrom instead of toPromise
      const response = await firstValueFrom(this.productService.getProduct(id));
      this.product = response.data
      this.productImages = [...this.product.images];
      this.updateMetaTags();
    } catch (error) {
      console.error('Error loading product:', error);
      this.router.navigate(['/not-found']);
    }
  }

  private updateMetaTags() {
    if (this.product) {
      this.title.setTitle(`${this.product.title} - Nestfuturra`);
      this.meta.updateTag({
        name: 'description',
        content: this.product.desc,
      });
      // Add more meta tags as needed
    }
  }
}
