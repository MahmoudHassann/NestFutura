import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { environment } from '../environments/environment';


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

  constructor(private http: HttpClient) { }

  getProduct(id: string): Observable<any> {
    console.log('Product ID:', id);
    // Check cache first
    if (!this.cache.has(id)) {
      console.log('Cache miss for ID:', id);
      // If not in cache, make the HTTP request and cache it
      const request = this.http.get<any>(`${this.baseURL}products/${id}`).pipe(
        shareReplay(1)
      );
      this.cache.set(id, request);
    }
    console.log('Cache hit for ID:', id);
    return this.cache.get(id)!;
  }
}
