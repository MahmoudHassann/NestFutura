import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Server // ✅ Ensures SSR for product details pages
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
