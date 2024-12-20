// import { Routes } from '@angular/router';
// // import { HiringManagerLoginComponent } from './hiring-manager/components/pages/hiring-manager-login/hiring-manager-login.component';

// export const routes: Routes = [
//   // { path: "login", component: HiringManagerLoginComponent },
//   {
//     path: '',
//     loadChildren: () =>
//       import('./hiring-manager/hiring-manager.module').then(
//         (m) => m.HiringManagerModule
//       ),
//   },
//   {
//     path: 'candidate',
//     loadChildren: () =>
//       import('./candidate/candidate.module').then((m) => m.CandidateModule),
//   },
// ];
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./hiring-manager/hiring-manager.module').then(
        (m) => m.HiringManagerModule
      ),
  },
  {
    path: 'test',
    loadChildren: () =>
      import('./test2/test2.module').then((m) => m.Test2Module),
  },
  {
    path: 'cnadidate',
    loadChildren: () =>
      import('./candidate/candidate.module').then((m) => m.CandidateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
