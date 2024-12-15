import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CandidateInfoComponent } from '../candidate-info/candidate-info.component';
import { HiringManagerService } from '../../../../service/hiring-manager.service';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, CandidateInfoComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss',
})
export class CandidatesComponent {
  activeTab: string = 'Shortlisted'; // Default active tab
  // shortlistedCandidates = [
  //   {
  //     name: 'John Doe',
  //     rating: 4.5,
  //     status: 'Interview Scheduled',
  //     experience: '5 years of experience',
  //     skills: ['Angular', 'TypeScript', 'SCSS'],
  //   },
  //   {
  //     name: 'Jane Smith',
  //     rating: 4.8,
  //     status: 'Interview Complited',
  //     experience: '3 years of experience',
  //     skills: ['React', 'JavaScript', 'CSS'],
  //   },
  //   {
  //     name: 'John Doe',
  //     rating: 4.5,
  //     status: 'AI Based Screening Pending',
  //     experience: '5 years of experience',
  //     skills: ['Angular', 'TypeScript', 'SCSS'],
  //   },
  //   {
  //     name: 'Jane Smith',
  //     rating: 4.8,
  //     status: 'Selected',
  //     experience: '3 years of experience',
  //     skills: ['React', 'JavaScript', 'CSS'],
  //   },
  // ];
  shortlistedCandidates:any=[]

 
  appliedCandidates:any=[]
  jobSucribe:any
constructor(private hiringManagerService:HiringManagerService){
  this.getShortlisted()
}
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
ngOnInit(){

}
getShortlisted(){
 this.jobSucribe= this.hiringManagerService.jobSubscribe.subscribe((res:any)=>{
   
    this.hiringManagerService.getShortlistedJobs(res.id).subscribe((result:any)=>{
     if(result.isSuccess){
      this.shortlistedCandidates=result.result
     }
     
    })
    this.hiringManagerService.getAppliedJobs(res.id).subscribe((result:any)=>{
      if(result.isSuccess){
       this.appliedCandidates=result.result
      }
      
     }
     
  )
    
  })
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
    this.selectedCandidate = null; // Closes the modal
  }

  ngOnDestroy(){
    if(this.jobSucribe){
      this.jobSucribe.unsubscribe()
    }
  }
}
