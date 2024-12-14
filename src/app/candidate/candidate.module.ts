import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateLoginComponent } from './components/pages/candidate-login/candidate-login.component';
import { ProfileDetailsComponent } from './components/pages/profile/profile-details/profile-details.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { InterviewInstructionComponent } from './components/pages/interview-instruction/interview-instruction.component';
import { RecentlyAppliedComponent } from './components/pages/profile/recently-applied/recently-applied.component';

@NgModule({
  declarations: [
    CandidateLoginComponent,
    ProfileDetailsComponent,
    ProfileComponent,
    InterviewInstructionComponent,
    RecentlyAppliedComponent,
  ],
  imports: [CommonModule, CandidateRoutingModule],
})
export class CandidateModule {}
