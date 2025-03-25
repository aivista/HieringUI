import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HiringManagerService } from '../../../../service/hiring-manager.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, ProgressSpinner],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  title = 'resourcemanagement';
  JobDetails: any = [];
  jobs = [];
  activeIndex: number = 0;
  loaderflag: boolean = true;
  constructor(
    private router: Router,
    private hiringManagerService: HiringManagerService
  ) {}
  setActiveJob(index: number, job: any): void {
    // Reset all jobs to inactive
    this.activeIndex = index;
    this.hiringManagerService.jobSubscribe.next(job);
    localStorage.setItem('jobTitle', job.Title);
    localStorage.setItem('jobLocation', job.location);
    localStorage.setItem('JObRole', job.role);
  }
  ngOnInit() {
    const response = this.hiringManagerService.getData('hiringManagerDetails');
    if (response) {
      this.getJobDetails(response.email);
    }
  }
  getJobDetails(email: string) {
    let formatedData = [];
    this.loaderflag = true;
    this.hiringManagerService.getHiringManagerJobs(email).subscribe(
      (res: any) => {
        this.JobDetails = res.result;
        this.JobDetails.forEach((el: any) => {
          el['Title'] = JSON.parse(el['jd'])?.['Job Title'];
        });
        this.JobDetails = this.JobDetails.sort((a: any, b: any) => b.id - a.id);
        //this.JobDetails = this.JobDetails.reverse();
        //console.log(this.JobDetails);
        localStorage.setItem(
          'jobTitle',
          this.JobDetails[this.activeIndex].Title
        );
        localStorage.setItem(
          'jobLocation',
          this.JobDetails[this.activeIndex].location
        );
        localStorage.setItem('JObRole', this.JobDetails[this.activeIndex].role);
        this.hiringManagerService.jobSubscribe.next(this.JobDetails[0]);
      },
      (e) => {},
      () => {
        this.loaderflag = false;
      }
    );
  }

  openCreateJob() {
    this.router.navigate(['/job-create']);
  }
}
