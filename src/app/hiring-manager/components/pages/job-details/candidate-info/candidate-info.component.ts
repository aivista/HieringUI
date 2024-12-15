import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HiringManagerService } from '../../../../service/hiring-manager.service';

@Component({
  selector: 'app-candidate-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-info.component.html',
  styleUrl: './candidate-info.component.scss',
})
export class CandidateInfoComponent {
  @Input() candidate: any;
  @Output() close = new EventEmitter<void>();

  isInterviewScheduled: boolean = true;
  isSelected: boolean = true;
constructor(private hiringManagerService:HiringManagerService){}
  closeModal() {
    this.close.emit();
  }

  candidateStatus: string = '';

  ngOnInit() {
    console.log('Hello World', this.candidate);
    this.getcandidateStatus(this.candidate)
    // Store the status in a variable
    if (this.candidate && this.candidate.status) {
      this.candidateStatus = this.candidate.status;
      console.log('Candidate Status:', this.candidateStatus);
    }
    if (this.candidateStatus === 'Interview Scheduled') {
      this.isInterviewScheduled = true;
    } else {
      this.isInterviewScheduled = false;
    }

    if (this.candidateStatus === 'Interview Complited') {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }

    // this.isInterviewScheduled = this.candidateStatus !== 'Interview Complited';
  }
  getcandidateStatus(candidate:any){
this.hiringManagerService.candidateStatus(candidate.jobId,candidate.candidateId).subscribe((res:any)=>{
  if(res.isSuccess){
    console.log("response--->",res);
    
  }
})
  }
}
