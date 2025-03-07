import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Set default language
    if (isPlatformBrowser(this.platformId)){
      this.translate.setDefaultLang('en');

      // Use saved language or default to English
      const savedLang = localStorage.getItem('language') || 'en';
      this.translate.use(savedLang);
    } 
  }
}
