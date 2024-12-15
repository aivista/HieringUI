import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './components/pages/candidate-login/candidate-login.component';
import { InterviewStepsComponent } from './components/pages/interview-steps/interview-steps.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CandidateLoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'interview', component: InterviewStepsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
