import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';




@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private navVisibleSubject = new BehaviorSubject<boolean>(false);
  navVisible$ = this.navVisibleSubject.asObservable();
  private baseURL = environment.apiUrl;

  updateNavVisibility(isVisible: boolean) {
    this.navVisibleSubject.next(isVisible);
  }

  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<any> {
    const cacheKey = `product-${id}`;

    if (!this.cache.has(cacheKey)) {
      const request = this.http.get<any>(`${this.baseURL}products/${id}`).pipe(
        retry(2),
        catchError((error) => {
          console.error('Error fetching product:', error);
          this.cache.delete(cacheKey); // Remove failed request from cache
          throw error;
        }),
        shareReplay(1)
      );
      this.cache.set(cacheKey, request);
    }
    return this.cache.get(cacheKey)!;
  }

  getAllProducts(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseURL}products?page=${page}`);
  }
  getFilteredProducts(
    page: number,
    filters: {
      filter_by_categories?: number[];
      filter_by_types?: number[];
      filter_by_technologies?: number[];
      using?: number[];
      sort?: string;
    }
  ): Observable<any> {
    let params: any = { page };

    if (filters.filter_by_categories?.length) {
      params.filter_by_categories = filters.filter_by_categories.join(',');
    }
    if (filters.filter_by_types?.length) {
      params.filter_by_types = filters.filter_by_types.join(',');
    }
    if (filters.filter_by_technologies?.length) {
      params.filter_by_technologies = filters.filter_by_technologies.join(',');
    }
    if (filters.using?.length) {
      params.using = filters.using.join(',');
    }
    if (filters.sort) {
      params.sort = filters.sort;
    }

    return this.http.get(`${this.baseURL}products`, { params });
  }

  getFilters(): Observable<any> {
    return this.http.get(`${this.baseURL}producs-filter`);
  }

  clearCache() {
    this.cache.clear();
  }
}
