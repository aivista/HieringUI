import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateLoginComponent } from './components/pages/candidate-login/candidate-login.component';
import { ProfileDetailsComponent } from './components/pages/profile/profile-details/profile-details.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

@NgModule({
  declarations: [
    CandidateLoginComponent,
    ProfileDetailsComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, CandidateRoutingModule],
})
export class CandidateModule {}
