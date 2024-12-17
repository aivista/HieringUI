import { Component } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';

@Component({
  selector: 'app-meating-shedule',
  standalone: true,
  imports: [],
  templateUrl: './meating-shedule.component.html',
  styleUrl: './meating-shedule.component.scss',
})
export class MeatingSheduleComponent {
  storedCandidateId: any;
  JobId: any;

  constructor(private service: CandidateService) {}

  ngOnInit() {
    this.storedCandidateId = localStorage.getItem('updateByCandidateId');
    this.JobId = localStorage.getItem('JobIdByCandidate');
  }

  InterviewDone() {
    var josnObject = {
      jobId: this.JobId,
      candidateId: this.storedCandidateId,
      profileJourney: 'INTERVIEW',
      status: 'COMPLETED',
    };
    this.service
      .UpdateProfileUpdateStatus(josnObject)
      .subscribe((data: any) => {
        console.log('interview third step done ', data);
      });
  }
}
