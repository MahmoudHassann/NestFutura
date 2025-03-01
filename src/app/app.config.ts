import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { register } from 'swiper/element/bundle';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
register()
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideAnimationsAsync(),provideHttpClient(withFetch()),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),{ provide: LocationStrategy, useClass: HashLocationStrategy },],
};
