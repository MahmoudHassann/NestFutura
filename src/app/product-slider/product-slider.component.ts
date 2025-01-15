import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';

interface Product {
  name: string;
  price: string;
  image: string;
  status: 'New' | 'Out of stock';
  properties: string[];
  description: string;
  connectivity: ('wifi' | 'bluetooth' | 'wired')[];
  variants?: { id: string; name: string }[];
}
@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductSliderComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  hoveredProduct: Product | null = null;
  swiperInstance: Swiper | undefined;
  products: Product[] = [
    {
      name: 'Shelly Pro RGgBWW PM',
      price: '€56.75',
      image: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
      status: 'Out of stock',
      properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
      description: 'Professional RGBWW LED controller with power measurement capabilities.',
      connectivity: ['wifi', 'bluetooth', 'wired'],
      variants: [
        { id: '1', name: 'Channel 1' },
        { id: '2', name: 'Channel 2' },
        { id: '3', name: 'Channel 3' }
      ]
    },
    {
      name: 'Shelly Pro RGBfWW PM',
      price: '€56.75',
      image: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
      status: 'Out of stock',
      properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
      description: 'Professional RGBWW LED controller with power measurement capabilities.',
      connectivity: ['wifi', 'bluetooth', 'wired'],
      variants: [
        { id: '4', name: 'Single Output' },
        { id: '5', name: 'Dual Output' }
      ]
    },
    {
      name: 'Shelly Pro RGdBWW PM',
      price: '€56.75',
      image: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
      status: 'Out of stock',
      properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
      description: 'Professional RGBWW LED controller with power measurement capabilities.',
      connectivity: ['wifi', 'bluetooth', 'wired']
    },
    {
      name: 'Shelly Pro RGaBWW PM',
      price: '€56.75',
      image: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
      status: 'Out of stock',
      properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
      description: 'Professional RGBWW LED controller with power measurement capabilities.',
      connectivity: ['wifi', 'bluetooth', 'wired'],
      variants: [
        { id: '6', name: 'High Power' },
        { id: '7', name: 'Low Power' }
      ]
    },
    {
      name: 'Shelly Pro RGsBWW PM',
      price: '€56.75',
      image: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
      status: 'Out of stock',
      properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
      description: 'Professional RGBWW LED controller with power measurement capabilities.',
      connectivity: ['wifi', 'bluetooth', 'wired']
    }
  ];
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object){

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      const swiperEl = this.swiperRef.nativeElement;
     /*  const prevButton = swiperEl.querySelector('.swiper-button-prev');
      const nextButton = swiperEl.querySelector('.swiper-button-next'); */
      Object.assign(swiperEl, {
        slidesPerView: 2.2,
        spaceBetween: 22,
        loop: false,
        breakpoints: {
          989: {
            slidesPerView: 4.5,
            spaceBetween: 22
          }
        },
        observer:true,
        navigation:true,
        on: {
          init() {

          }
        }
      });
      swiperEl.initialize();
    }
  }


}








/* {
          prevEl: prevButton,
          nextEl: nextButton,
        } */