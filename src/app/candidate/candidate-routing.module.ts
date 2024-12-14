import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './components/pages/candidate-login/candidate-login.component';
import { ProfileDetailsComponent } from './components/pages/profile-details/profile-details.component';
import { InterviewInstructionComponent } from './components/pages/interview-instruction/interview-instruction.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CandidateLoginComponent },
  { path: 'profile', component: ProfileDetailsComponent },
  { path: 'interview-instruction' , component: InterviewInstructionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
