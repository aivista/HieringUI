import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  private router = inject(Router);
  title = 'resourcemanagement';
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

  setActiveJob(index: number): void {
    // Reset all jobs to inactive
    this.jobs.forEach((job, i) => {
      job.active = false;
    });
    // Set clicked job to active
    this.jobs[index].active = true;
  }

  openCreateJob() {
    this.router.navigate(['/create-job']);
  }
}
