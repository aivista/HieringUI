import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate/components/pages/candidate-login/candidate-login.component';

const routes: Routes = [{ path: '', component: CandidateLoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
