import { Component, EventEmitter, Output } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';

@Component({
  selector: 'app-ai-avatar-interview',
  standalone: true,
  imports: [],
  templateUrl: './ai-avatar-interview.component.html',
  styleUrl: './ai-avatar-interview.component.scss',
})
export class AiAvatarInterviewComponent {
  @Output() showPopupEvent = new EventEmitter<void>();
  storedCandidateId: any;
  JobId: any;
  constructor(private service: CandidateService) {}
  ngOnInit() {
    this.storedCandidateId = localStorage.getItem('updateByCandidateId');
    this.JobId = localStorage.getItem('JobIdByCandidate');
  }
  // Emit event to show popup
  onButtonClick(): void {
    var josnObject = {
      jobId: this.JobId,
      candidateId: this.storedCandidateId,
      profileJourney: 'AI_SCREENING',
      status: 'COMPLETED',
    };
    this.service
      .UpdateProfileUpdateStatus(josnObject)
      .subscribe((data: any) => {
        console.log('1st interview done');
      });

    this.showPopupEvent.emit();
  }
}
