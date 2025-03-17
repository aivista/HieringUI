import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../../../service/candidate.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-recently-applied',
  standalone: true,
  imports: [CommonModule, ProgressSpinner],
  templateUrl: './recently-applied.component.html',
  styleUrl: './recently-applied.component.scss',
})
export class RecentlyAppliedComponent {
  recentJobs: any;
  storedCandidateId: any;
  recentApplied: any;
  loaderflag: boolean = false;

  constructor(
    private router: Router,
    private recentlyAppliedService: CandidateService
  ) {}
  jobs = [
    {
      headerImage: 'assets/icons/adanicon1.svg',
      roleTitle: 'Chief Operating Officer - Data Center',
      status: 'AI Based Screening',
      buttonVisible: true,
    },
    {
      headerImage: 'assets/icons/adanicon1.svg',
      roleTitle: 'Digital Marketing Officer',
      status: 'Inactive',
      buttonVisible: false,
    },

    {
      headerImage: 'assets/icons/adanicon1.svg',
      roleTitle: 'Digital Marketing Officer',
      status: 'Inactive',
      buttonVisible: false,
    },
  ];
  ngOnInit() {
    // this.storedCandidateId = localStorage.getItem('candidateId');
    // if (this.storedCandidateId) {
    //   this.fetchRecentlyAppliedJobs();
    // }
    this.recentlyAppliedService.candidateId.subscribe((candidateId) => {
      if (candidateId) {
        console.log('Received candidateId:', candidateId);
        this.storedCandidateId = candidateId;
        this.fetchRecentlyAppliedJobs(candidateId);
      }
    });
  }

  fetchRecentlyAppliedJobs(id: any) {
    this.recentlyAppliedService.getRecentlyAppliedJobs(id).subscribe(
      (response: any) => {
        this.recentJobs = response.result;
        if (this.recentJobs.length > 0) {
          this.recentApplied = this.recentJobs.sort(
            (a: any, b: any) => b.jobId - a.jobId
          );
          this.recentApplied.forEach((el: any) => {
            el['Title'] = JSON.parse(el['jd'])?.['Job Title'];
          });
        }
      },
      (error) => {
        console.error('Error fetching recently applied jobs:', error);
      },
      () => {
        this.loaderflag = true;
      }
    );
  }

  navigateToInterview(job: any) {
    localStorage.setItem('JobIdByCandidate', job?.jobId);
    localStorage.setItem('updateByCandidateId', job?.candidateId);
    localStorage.setItem('button_value', job.button_value);
    let jobdetails = {
      jobTitle: JSON.parse(job.jd)?.['Job Title'],
      location: JSON.parse(job.jd)?.['Location'],
    };
    localStorage.setItem('selected_job', JSON.stringify(jobdetails));
    //console.log('job details', JSON.parse(job.jd));
    // this.recentlyAppliedService.$jobDetailsSubject.next(jobdetails);
    this.router.navigate(['/candidate/interview'], {
      queryParams: { jobId: job.jobId, candidateId: this.storedCandidateId },
    });
  }
}
