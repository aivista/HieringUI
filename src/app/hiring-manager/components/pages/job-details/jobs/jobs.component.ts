import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HiringManagerService } from '../../../../service/hiring-manager.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  title = 'resourcemanagement';
  JobDetails: any = [];
  jobs = [
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: true,
    },
    {
      title: 'Digital Marketing Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
    {
      title: 'SAS & Communication Manager',
      location: 'Ahmedabad, Gujarat, India',
      active: false,
    },
  ];
  activeIndex: number = 0;
  constructor(
    private router: Router,
    private hiringManagerService: HiringManagerService
  ) {}
  setActiveJob(index: number, job: any): void {
    // Reset all jobs to inactive
    this.activeIndex = index;
    this.hiringManagerService.jobSubscribe.next(job);
  }
  ngOnInit() {
    const response = this.hiringManagerService.getData('hiringManagerDetails');
    if (response) {
      this.getJobDetails(response.email);
    }
  }
  getJobDetails(email: string) {
    this.hiringManagerService.getHiringManagerJobs(email).subscribe(
      (res: any) => {
        console.log('rews', res);
        this.JobDetails = res.result;
        this.hiringManagerService.jobSubscribe.next(this.JobDetails[0]);
      },
      (e) => {}
    );
  }
  openCreateJob() {
    // this.router.navigate(['/job-create']);
    this.router.navigate(['/job-create']);
  }
}
