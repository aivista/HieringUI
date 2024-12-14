import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss']
})
export class CandidateInfoComponent {
  @Input() candidate: any;
  @Output() close = new EventEmitter<void>();

  isInterviewScheduled: boolean = true;
  isSelected : boolean = false;

  closeModal() {
    this.close.emit();
    
  }

  candidateStatus: string = '';

  ngOnInit() {
    console.log('Hello World', this.candidate);

    // Store the status in a variable
    if (this.candidate && this.candidate.status) {
      this.candidateStatus = this.candidate.status;
      console.log('Candidate Status:', this.candidateStatus);
    }
    if (this.candidateStatus === 'Interview Scheduled') {

       this.isInterviewScheduled = true;
       this.isSelected = false;
    } else {
      this.isInterviewScheduled = false;
      this.isSelected = true;
    }
    // this.isInterviewScheduled = this.candidateStatus !== 'Interview Complited';
  }

  
}
