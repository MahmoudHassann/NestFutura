import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, retry, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';
import { isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private navVisibleSubject = new BehaviorSubject<boolean>(false);
  navVisible$ = this.navVisibleSubject.asObservable();
  private baseURL = environment.apiUrl;


  updateNavVisibility(isVisible: boolean) {
    this.navVisibleSubject.next(isVisible);
  }

  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { 
    console.log('Running on:', isPlatformServer(this.platformId) ? 'Server' : 'Browser');
    console.log('API Base URL:', this.baseURL);
  }

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

  clearCache() {
    this.cache.clear();
  }

}
