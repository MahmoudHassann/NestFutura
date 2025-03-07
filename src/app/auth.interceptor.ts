import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let lang = 'en';
   if (typeof window !== 'undefined' && localStorage) {
     lang = localStorage.getItem('language') || 'en';
   }

   // Clone request and append 'Accept-Language' header
   const modifiedReq = req.clone({
     setHeaders: {
       'lang': lang,
     },
   });

   return next(modifiedReq);
};
