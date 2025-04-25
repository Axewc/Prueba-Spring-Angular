import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'empleados/editar/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Simulación de parámetros para prerenderizado
      return Promise.resolve([{ id: '1' }, { id: '2' }, { id: '3' }]);
    }
  }
];
