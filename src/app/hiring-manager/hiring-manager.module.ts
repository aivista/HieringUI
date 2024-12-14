import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringManagerRoutingModule } from './hiring-manager-routing.module';
import { HiringManagerLoginComponent } from './components/pages/hiring-manager-login/hiring-manager-login.component';
import { FormsModule } from '@angular/forms';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { CandidatesComponent } from './components/pages/job-details/candidates/candidates.component';
import { JobsComponent } from './components/pages/job-details/jobs/jobs.component';
import { UpcomingIterviewsComponent } from './components/pages/job-details/upcoming-iterviews/upcoming-iterviews.component';
import { CandidateInfoComponent } from './components/pages/job-details/candidate-info/candidate-info.component';

@NgModule({
  declarations: [HiringManagerLoginComponent, JobDetailsComponent, CandidatesComponent, JobsComponent, UpcomingIterviewsComponent, CandidateInfoComponent],
  imports: [CommonModule, HiringManagerRoutingModule, FormsModule],
})
export class HiringManagerModule {}
