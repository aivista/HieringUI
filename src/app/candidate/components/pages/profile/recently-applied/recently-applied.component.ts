import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../../../service/candidate.service';

@Component({
  selector: 'app-recently-applied',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recently-applied.component.html',
  styleUrl: './recently-applied.component.scss',
})
export class RecentlyAppliedComponent {
  recentJobs: any;
  storedCandidateId: any;
  recentApplied: any;

  constructor(
    private router: Router,
    private recentlyAppliedService: CandidateService
  ) {}
  jobs = [
    {
      headerImage: 'assets/icons/adanicon.svg',
      roleTitle: 'Chief Operating Officer - Data Center',
      status: 'AI Based Screening',
      buttonVisible: true,
    },
    {
      headerImage: 'assets/icons/adanicon.svg',
      roleTitle: 'Digital Marketing Officer',
      status: 'Inactive',
      buttonVisible: false,
    },

    {
      headerImage: 'assets/icons/adanicon.svg',
      roleTitle: 'Digital Marketing Officer',
      status: 'Inactive',
      buttonVisible: false,
    },
  ];
  ngOnInit() {
    this.storedCandidateId = localStorage.getItem('candidateId');
    if (this.storedCandidateId) {
      this.fetchRecentlyAppliedJobs();
    }
  }

  fetchRecentlyAppliedJobs() {
    if (this.storedCandidateId) {
      this.recentlyAppliedService
        .getRecentlyAppliedJobs(this.storedCandidateId)
        .subscribe(
          (response: any) => {
            this.recentJobs = response.result;
            if (this.recentJobs.length > 0) {
              this.recentApplied = this.recentJobs.sort(
                (a: any, b: any) => b.jobId - a.jobId
              );
            }
          },
          (error) => {
            console.error('Error fetching recently applied jobs:', error);
          }
        );
    } else {
      console.error('Candidate ID is not available.');
    }
  }
  navigateToInterview(jobId: string) {
    this.router.navigate(['/candidate/interview'], {
      queryParams: { jobId: jobId, candidateId: this.storedCandidateId },
    });
  }
}
