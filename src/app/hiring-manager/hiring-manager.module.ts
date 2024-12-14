import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiringManagerRoutingModule } from './hiring-manager-routing.module';
import { HiringManagerLoginComponent } from './components/pages/hiring-manager-login/hiring-manager-login.component';
import { FormsModule } from '@angular/forms';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';

@NgModule({
  declarations: [HiringManagerLoginComponent, JobDetailsComponent],
  imports: [CommonModule, HiringManagerRoutingModule, FormsModule],
})
export class HiringManagerModule {}
