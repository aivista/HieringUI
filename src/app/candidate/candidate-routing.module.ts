import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './components/pages/candidate-login/candidate-login.component';
import { ProfileDetailsComponent } from './components/pages/profile-details/profile-details.component';

const routes: Routes = [
  { path: '', component: CandidateLoginComponent },
  { path: 'profile', component: ProfileDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
