import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Products } from '../interface/product';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Variant } from '../interface/variant';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-predictive-search',
  standalone: true,
  imports: [ProductCardComponent, FormsModule,CommonModule],
  templateUrl: './predictive-search.component.html',
  styleUrl: './predictive-search.component.scss'
})
export class PredictiveSearchComponent implements OnInit {
  searchInput: string = '';
  filteredProducts: Products[] = [];
  showPopularSearches: boolean = true;
  showProductSuggestions: boolean = false;
  selectedVariants = new Map<string, Variant>();
  products !: Products[]
  @Output() focusStateChange = new EventEmitter<boolean>();
  @ViewChild('search', { static: false }) searchInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer', { static: false }) searchContainer!: ElementRef;
  private outsideClickListener!: () => void;
  
  constructor(private sanitizer: DomSanitizer,private renderer: Renderer2) {

  }
  popularSearches: string[] = [
    'Smart lighting',
    'Smart home',
    'LED bulbs',
    'Smart switches',
    'Energy-efficient devices'
  ];

  ngOnInit(): void {
    this.outsideClickListener = this.renderer.listen('document', 'mousedown', this.handleOutsideClick.bind(this));
   /*  this.products = [
      {
        name: 'Shelly Dimmer Gen3',
        price: '€46.75',
        totalprice: '€46.75',
        images: {
          default: 'https://www.shelly.com/cdn/shop/files/Shelly-Dimmer-Gen3-main-image_300x.png?v=1734565259',
          hover: 'https://www.shelly.com/cdn/shop/files/HF_Shelly-Dimmer-Gen3_300x.jpg?v=1734565406',
        },
        status: 'new',
        discount: false,
        properties: ['LED strips', 'Dimming', 'Lights'],
        description: 'Smart dimming controller for seamless remote control of dimmable lights and drivers. It can be used with or without a neutral wire. Equipped with our own Shelly chip.',
        connectivity: [
          {
            type: 'wifi', icon: this.sanitizeSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0323 5.13207C8.6125 5.13207 5.46023 6.24102 2.90093 8.11894C2.64889 8.30388 2.29465 8.24949 2.10971 7.99745C1.92478 7.74541 1.97917 7.39116 2.23121 7.20623C4.97783 5.19085 8.3632 4 12.0323 4C15.701 4 19.0337 5.17331 21.7665 7.15715C22.0194 7.3408 22.0756 7.69476 21.892 7.94774C21.7083 8.20072 21.3544 8.25692 21.1014 8.07328C18.5541 6.22411 15.4525 5.13207 12.0323 5.13207Z" fill="#cd9b2e"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0277 9.89965C9.75732 9.89965 7.6477 10.6111 5.91795 11.8215C5.66182 12.0008 5.30889 11.9384 5.12966 11.6823C4.95043 11.4262 5.01277 11.0732 5.2689 10.894C7.18266 9.55484 9.5176 8.76758 12.0277 8.76758C14.5358 8.76758 16.7472 9.51047 18.6326 10.7855C18.8916 10.9607 18.9596 11.3126 18.7844 11.5715C18.6093 11.8305 18.2574 11.8984 17.9985 11.7233C16.2921 10.5694 14.3001 9.89965 12.0277 9.89965Z" fill="#cd9b2e"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0321 14.8137C11.0039 14.8137 10.0355 15.0843 9.20042 15.5547C8.92805 15.7082 8.58287 15.6118 8.42942 15.3394C8.27598 15.0671 8.37238 14.7219 8.64475 14.5684C9.64436 14.0053 10.8035 13.6816 12.0321 13.6816C13.2581 13.6816 14.3455 13.9824 15.3213 14.5125C15.596 14.6618 15.6977 15.0054 15.5485 15.2801C15.3992 15.5548 15.0556 15.6565 14.7809 15.5073C13.9651 15.0641 13.0628 14.8137 12.0321 14.8137Z" fill="#cd9b2e"></path>
  <path d="M11.9889 17.693C11.3171 17.693 10.7744 18.2356 10.7744 18.9075C10.7744 19.5793 11.3171 20.122 11.9889 20.122C12.6608 20.122 13.2034 19.5793 13.2034 18.9075C13.2034 18.2356 12.6608 17.693 11.9889 17.693Z" fill="#cd9b2e"></path>
  </svg>`)
          },
          {
            type: 'bluetooth', icon: this.sanitizeSvg(`<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3706 0.0979155C11.6226 -0.00517332 11.9119 0.0543558 12.1027 0.248559L17.9138 6.1625C18.0412 6.29211 18.1105 6.46786 18.1059 6.64951C18.1013 6.83116 18.0231 7.00315 17.8893 7.12612L12.5037 12.0761L17.8907 17.0561C18.0245 17.1798 18.1022 17.3526 18.106 17.5348C18.1097 17.7169 18.0391 17.8928 17.9104 18.0218L12.0993 23.8508C11.9077 24.043 11.6191 24.1008 11.3683 23.9971C11.1175 23.8934 10.9539 23.6488 10.9539 23.3774V13.5006L6.94652 17.1838C6.67388 17.4344 6.24971 17.4166 5.99911 17.1439C5.74852 16.8713 5.7664 16.4471 6.03904 16.1965L10.5251 12.0733L6.03763 7.92496C5.7657 7.67359 5.74904 7.24937 6.00042 6.97744C6.25179 6.70552 6.67601 6.68886 6.94794 6.94023L10.9539 10.6435V0.718509C10.9539 0.446241 11.1186 0.201004 11.3706 0.0979155ZM12.295 13.7094L16.4691 17.5681L12.295 21.7551V13.7094ZM12.295 10.4466V2.35756L16.4714 6.60791L12.295 10.4466Z" fill="#cd9b2e"></path>
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
        properties: ['LED strips', 'Dimming', 'Lights'],
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
    ]; */
  }

  ngOnDestroy(): void {
    // Remove the global click listener
    if (this.outsideClickListener) {
      this.outsideClickListener();
    }
  }

  isFocused: boolean = false;

  onFocus(): void {
    this.isFocused = true;
    this.focusStateChange.emit(true);
  }
  focusInput(): void {
    this.searchInputElement.nativeElement.focus();
  }

  /* onBlur(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (this.searchContainer.nativeElement.contains(relatedTarget)) {
      // Click is within the container, do not close the predictive search
      return;
    }
    this.isFocused = false;
    this.focusStateChange.emit(false);
  } */
  private sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  onVariantSelected(event: { product: Products; variant: Variant }) {
    console.log('Variant selected:', event);
    this.selectedVariants.set(event.product.title, event.variant);
  }

  onInputChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.searchInput = input;

    // Hide popular searches when user starts typing
    this.showPopularSearches = input.length === 0;

    // Show product suggestions and filter products
    if (input.length > 0) {
      this.showPopularSearches = false;
      this.showProductSuggestions = true;
      this.filterProducts(input);
    } else {
      this.showProductSuggestions = false;
      this.filteredProducts = [];
    }
  }

  onPopularSearchSelect(search: string) {
    this.searchInput = search;
    this.showPopularSearches = false;
    this.showProductSuggestions = true;
    this.filterProducts(search);
  }

  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.searchContainer && this.searchContainer.nativeElement.contains(target)) {
      // Click is inside the search container, do not close
      return;
    }

    // Click is outside the search container
    this.isFocused = false;
    this.focusStateChange.emit(false)
  }

  filterProducts(query: string) {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  onSearch() {
    // Perform search action with this.searchInput
    console.log('Searching for:', this.searchInput);
    // Implement your search logic here
  }

}
