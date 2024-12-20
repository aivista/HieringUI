import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Test2RoutingModule {}
