import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor() {}
  private lang = 'en'; // Default language

  setLanguage(lang: 'en' | 'ar') {
    this.lang = lang;
    localStorage.setItem('language', lang); // Store in localStorage
  }

  getLanguage(): string {
    return localStorage.getItem('language') || this.lang;
  }
}
