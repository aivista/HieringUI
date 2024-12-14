import { Component } from '@angular/core';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  activeTab: string = 'Shortlisted'; // Default active tab
  shortlistedCandidates = [
    {
      name: 'John Doe',
      rating: 4.5,
      status: 'Shortlisted',
      experience: '5 years of experience',
      skills: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      name: 'Jane Smith',
      rating: 4.8,
      status: 'Shortlisted',
      experience: '3 years of experience',
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      name: 'John Doe',
      rating: 4.5,
      status: 'Shortlisted',
      experience: '5 years of experience',
      skills: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      name: 'Jane Smith',
      rating: 4.8,
      status: 'Shortlisted',
      experience: '3 years of experience',
      skills: ['React', 'JavaScript', 'CSS']
    }
  ];

  appliedCandidates = [
    {
      name: 'Alice Johnson',
      rating: 4.2,
      status: 'Applied',
      experience: '2 years of experience',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Bob Brown',
      rating: 4.7,
      status: 'Applied',
      experience: '4 years of experience',
      skills: ['Vue', 'JavaScript', 'SCSS']
    },
    {
      name: 'Alice Johnson',
      rating: 4.2,
      status: 'Applied',
      experience: '2 years of experience',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Bob Brown',
      rating: 4.7,
      status: 'Applied',
      experience: '4 years of experience',
      skills: ['Vue', 'JavaScript', 'SCSS']
    }
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
