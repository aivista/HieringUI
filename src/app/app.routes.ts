import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./hiring-manager/hiring-manager.module').then(
        (m) => m.HiringManagerModule
      ),
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('./candidate/candidate.module').then((m) => m.CandidateModule),
  },

  { path: '**', redirectTo: '' },
];
