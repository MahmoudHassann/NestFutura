import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
/*   {
    path: 'products/:id',
    renderMode: RenderMode.Server // ✅ Ensures SSR for product details pages
  },
  {
    path:'page/:category',
    renderMode:RenderMode.Server
  }, */
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
