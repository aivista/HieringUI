import { Component } from '@angular/core';

@Component({
  selector: 'app-recently-applied',
  templateUrl: './recently-applied.component.html',
  styleUrls: ['./recently-applied.component.scss'],
})
export class RecentlyAppliedComponent {
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
}
