import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recently-applied',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recently-applied.component.html',
  styleUrl: './recently-applied.component.scss',
})
export class RecentlyAppliedComponent {

  constructor(private router: Router) {}
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

  navigateToInterview() {
    this.router.navigate(['/candidate/interview']); 
  }
}
