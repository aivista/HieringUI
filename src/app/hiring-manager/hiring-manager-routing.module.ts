import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringManagerLoginComponent } from './components/pages/hiring-manager-login/hiring-manager-login.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { JobCreateComponent } from './components/pages/job-create/job-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: HiringManagerLoginComponent },
  { path: 'job-details', component: JobDetailsComponent },
  { path: 'create-job', component: JobCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiringManagerRoutingModule {}
