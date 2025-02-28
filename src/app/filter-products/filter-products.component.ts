import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { AccordionModule } from 'primeng/accordion';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Products } from '../interface/product';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Variant } from '../interface/variant';
import { AnimateOnScrollModule,AnimateOnScroll  } from 'primeng/animateonscroll';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'app-filter-products',
  standalone: true,
  imports: [
    FontAwesomeModule,
    AccordionModule,
    ProductCardComponent,
    PaginationComponent,
    AnimateOnScrollModule,
    AnimateOnScroll,
  ],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.scss',
})
export class FilterProductsComponent implements OnInit {
  currentPage = 1;
  lastPage = 1;
  links: any[] = [];
  showFilter: boolean = false;
  faAngleDown = faAngleDown;
  sortOptions: string[] = [''];
  filterByTypes: any[] = [];
  filterByTechnology: any[] = [];
  filterByUsing: any[] = [];
  filterByCategory: any[] = [];
  selectedOption: string = 'title-ascending';
  activeFilters = {
    categories: [] as number[],
    types: [] as number[],
    technologies: [] as number[],
    using: [] as number[],
  };
  activeSort: string | null = null;
  products: Products[] = [];
  filteredProducts: Products[] = [];
  selectedVariants = new Map<string, Variant>();
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private _router: Router,
    private productService: ProductService
  ) {}



  ngOnInit() {
    this.getProducts(this.currentPage);
    this.filteredProducts = [...this.products];
  }

  getProducts(page: number): void {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts(page).subscribe({
      next: (response) => {
        this.products = response.products.data;
        this.filteredProducts = [...this.products];
        this.sortOptions = [...response.filter.sort_by];
        this.filterByTypes = [...response.filter.filter_by_types];
        this.filterByCategory = [...response.filter.filter_by_categories];
        this.filterByUsing = [...response.filter.filter_by_using];
        this.filterByTechnology = [...response.filter.filter_by_technologies];
        this.currentPage = response.products.meta.current_page;
        this.lastPage = response.products.meta.last_page;
        this.links = response.products.meta.links;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        console.error('Error loading products:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  onPageChange(page: number): void {
    this.getProducts(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectOption(option: string, event: Event): void {
    event.preventDefault();
    this.selectedOption = option;
    this.applyFilters();
  }
  applyFilters(): void {
    this.loading = true;
    const filters = {
      ...this.activeFilters,
      sort: this.selectedOption,
    };

    this.productService
      .getFilteredProducts(this.currentPage, filters)
      .subscribe({
        next: (response) => {
          this.products = response.products.data;
          this.filteredProducts = [...this.products];
          this.currentPage = response.products.meta.current_page;
          this.lastPage = response.products.meta.last_page;
          this.links = response.products.meta.links;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to apply filters. Please try again.';
          this.loading = false;
          console.error('Error applying filters:', err);
        },
      });
  }

  onVariantSelected(event: { product: Products; variant: Variant }) {
    console.log('Variant selected:', event);
    this.selectedVariants.set(event.product.title, event.variant);
  }

  openfilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
}
