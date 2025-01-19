import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { Swiper } from 'swiper';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Variant {
  id: string;
  name: string;
  color?: string;
  image?: string;
}
interface Product {
  name: string;
  price: string;
  totalprice: string;
  images: {
    default: string;
    hover: string;
    white?: string;
    black?: string;
    brown?: string;
  };
  discount: boolean;
  status: string;
  properties: string[];
  description: string;
  connectivity: { type: string; icon: SafeHtml }[];
  variants?: Variant[];
  variantType?: 'color' | 'regular';
}

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductSliderComponent implements AfterViewInit, OnInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  hoveredProduct: Product | null = null;
  swiperInstance: Swiper | undefined;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  availableProperties = ['new', 'Dimming', 'Heat', 'Power measurement', 'LED strips'];
  selectedProperty: string | null = 'new';



  constructor(@Inject(PLATFORM_ID) private platformId: Object, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {


    this.products = [
      {
        name: 'Shelly Pro RGBWW PM',
        price: '€56.75',
        totalprice: '€56.75',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Pro-RGBWW-PM_500x.jpg?v=1734564749',
        },
        status: 'Out of stock',
        discount: false,
        properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'wired', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
        ],
        variants: [
          { id: '1', name: 'Channel 1' },
          { id: '2', name: 'Channel 2' },
          { id: '3', name: 'Channel 3' },
        ],
      },
      {
        name: 'Shelly Pro RGBfWW PM',
        price: '€56.75',
        totalprice: '€40.00',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Pro-RGBWW-PM_500x.jpg?v=1734564749',
        },
        status: 'Out of stock',
        discount: true,
        properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'wired', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
        ],
        variants: [
          { id: '4', name: 'Single Output' },
          { id: '5', name: 'Dual Output' },
        ],
      },
      {
        name: 'Shelly Pro RGdBWW PM',
        price: '€56.75',
        totalprice: '€56.75',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Pro-RGBWW-PM_500x.jpg?v=1734564749',
        },
        status: 'Out of stock',
        discount: false,
        properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'wired', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
        ],
      },
      {
        name: 'Shelly Pro RGaBWW PM',
        price: '€56.75',
        totalprice: '€40.00',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Pro-RGBWW-PM_500x.jpg?v=1734564749',
        },
        status: 'new',
        discount: true,
        properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'wired', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
        ],
        variants: [
          { id: '6', name: 'High Power' },
          { id: '7', name: 'Low Power' },
        ],
      },
      {
        name: 'Shelly Pro RGsBWW PM',
        price: '€56.75',
        totalprice: '€56.75',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Pro-RGBWW-PM-main-image_500x.png?v=1734563380',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Pro-RGBWW-PM_500x.jpg?v=1734564749',
        },
        status: 'new',
        discount: false,
        properties: ['LED strips', 'Power measurement', 'Dimming', 'Color'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
          {
            type: 'wired', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M1.91992 3.74099C1.91992 3.41832 2.1815 3.15674 2.50417 3.15674H21.3357C21.6583 3.15674 21.9199 3.41832 21.9199 3.74099V14.7436C21.9199 15.0662 21.6583 15.3278 21.3357 15.3278H18.0826V20.1186C18.0826 20.4413 17.821 20.7029 17.4983 20.7029H6.34151C6.01884 20.7029 5.75726 20.4413 5.75726 20.1186V15.3278H2.50417C2.1815 15.3278 1.91992 15.0662 1.91992 14.7436V3.74099ZM3.08842 4.32524V14.1593H6.34151C6.66418 14.1593 6.92576 14.4209 6.92576 14.7436V19.5344H16.9141V14.7436C16.9141 14.4209 17.1756 14.1593 17.4983 14.1593H20.7514V4.32524H3.08842Z"
                                              fill="#cd9b2e"></path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.15483 3.74097V8.49441H6.98633V3.74097H8.15483Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M12.5015 3.74097V8.49441H11.333V3.74097H12.5015Z" fill="#cd9b2e">
                                          </path>
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M16.8667 3.74097V8.49441H15.6982V3.74097H16.8667Z" fill="#cd9b2e">
                                          </path>
                                      </svg>`)
          },
        ],
      },
    ];

    this.filteredProducts = [...this.products];
    this.filterProducts('new')

    this.products.forEach(product => {
      if (product.variants && product.variants.length > 0) {
        this.selectVariant(product, product.variants[0]);
      }
    });
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
            spaceBetween: 22
          }
        },
        observer: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        on: {
          init() {

          }
        }
      });
      swiperEl.initialize();
    }
  }

  ngOnChanges() {
    this.filteredProducts = [...this.products];
    if (this.selectedProperty) {
      this.filterProducts(this.selectedProperty);
    }
  }


  private sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  selectedVariants = new Map<string, Variant>();
  selectVariant(product: Product, variant: Variant): void {
    this.selectedVariants.set(product.name, variant);
  }

  isVariantSelected(product: Product, variant: Variant): boolean {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant?.id === variant.id;
  }

  getProductDisplayName(product: Product): string {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant
      ? `${product.name} - ${selectedVariant.name}`
      : product.name;
  }

  getProductImage(product: Product): string {
    const selectedVariant = this.selectedVariants.get(product.name);
    return selectedVariant?.image || product.images.default;
  }

  filterProducts(property: string): void {
    this.selectedProperty = property;
    let filtered: Product[];

    if (property === 'new') {
      // Filter by status for 'new'
      filtered = this.products.filter(product =>
        product.status.toLowerCase() === 'new'
      );
    } else {
      // Filter by properties for other filters
      filtered = this.products.filter(product =>
        product.properties.includes(property)
      );
    }
    this.filteredProducts = filtered

  }


}

