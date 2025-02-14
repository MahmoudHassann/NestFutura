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
    if (!this.cache.has(id)) {
      // If not in cache, make the HTTP request and cache it
      const request = this.http.get<any>(`${this.baseURL}products/${id}`).pipe(
        shareReplay(1)
      );
      this.cache.set(id, request);
    }
    return this.cache.get(id)!;
  }
}
