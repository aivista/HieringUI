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
      status: 'Interview Scheduled',
      experience: '5 years of experience',
      skills: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      name: 'Jane Smith',
      rating: 4.8,
      status: 'Interview Complited',
      experience: '3 years of experience',
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      name: 'John Doe',
      rating: 4.5,
      status: 'AI Based Screening Pending',
      experience: '5 years of experience',
      skills: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      name: 'Jane Smith',
      rating: 4.8,
      status: 'Selected',
      experience: '3 years of experience',
      skills: ['React', 'JavaScript', 'CSS']
    }
  ];

  appliedCandidates = [
    {
      name: 'Alice Johnson',
      experience: '2 years of experience',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Bob Brown',
      experience: '4 years of experience',
      skills: ['Vue', 'JavaScript', 'SCSS']
    },
    {
      name: 'Alice Johnson',
      experience: '2 years of experience',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'Bob Brown',
      experience: '4 years of experience',
      skills: ['Vue', 'JavaScript', 'SCSS']
    }
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Interview Scheduled':
        return 'status-interview-scheduled';
      case 'Interview Complited':
        return 'status-interview-completed';
      case 'AI Based Screening Pending':
        return 'status-ai-screening-pending';
      case 'Selected':
        return 'status-selected';
      default:
        return ''; 
    }
  }

  selectedCandidate: any = null;

  openModal(candidate: any) {
    this.selectedCandidate = candidate;
  }

  closeModal() {
    this.selectedCandidate = null;
  }

  isCandidateSelected(candidate: any): boolean {
    return this.selectedCandidate === candidate; // Check if the candidate is selected
  }


  closeModall(event: Event): void {
    this.selectedCandidate = null;// Closes the modal
  }
}
