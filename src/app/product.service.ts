import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  getProduct(id: string): Observable<any> {
    // Check cache first
    if (!this.cache.has(id)) {
      // If not in cache, make the HTTP request and cache it
      const request = this.http.get<any>(`/api/products/${id}`).pipe(
        shareReplay(1)
      );
      this.cache.set(id, request);
    }
    return this.cache.get(id)!;
  }
}
