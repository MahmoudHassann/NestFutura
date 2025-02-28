import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { Swiper } from 'swiper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Variant } from '../interface/variant';
import { Products } from '../interface/product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  swiperInstance: Swiper | undefined;
  selectedVariants = new Map<string, Variant>();
  products: Products[] = [];
  filteredProducts: Products[] = [];
  availableProperties :any[] =[];
  selectedProperty: string | null = 'null';

  onVariantSelected(event: { product: Products; variant: Variant }) {
    console.log('Variant selected:', event);
    this.selectedVariants.set(event.product.title, event.variant);
  }
  filterProducts(property: string): void {
    this.selectedProperty = property;
    let filtered: Products[];

    if (property === 'new') {
      filtered = this.products.filter(
        (product) => product.stock.toLowerCase() === 'new'
      );
    } else {
      filtered = this.products.filter((product) =>{
             console.log(product.product_types);
             product.product_types.some((type) => type.title === property)
      }
      );
 
      
    }

    this.filteredProducts = filtered;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService:ProductService
  ) {}

  ngOnInit() {
    this.getproductTypes();
    this.filteredProducts = [...this.products];
    this.filterProducts('Smart switches');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, {
        slidesPerView: 2.2,
        spaceBetween: 22,
        loop: false,
        breakpoints: {
          989: {
            slidesPerView: 4.5,
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

getproductTypes(){
  this.productService.getFilters().subscribe((res)=>{
    this.availableProperties = [...res.data.filter_by_types] 
  })
}
}

