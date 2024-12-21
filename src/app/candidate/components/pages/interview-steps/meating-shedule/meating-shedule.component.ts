import { Component } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';
import { Router } from '@angular/router';
import { CongratulationComponent } from '../congratulation/congratulation.component';

@Component({
  selector: 'app-meating-shedule',
  standalone: true,
  imports: [CongratulationComponent],
  templateUrl: './meating-shedule.component.html',
  styleUrl: './meating-shedule.component.scss',
})
export class MeatingSheduleComponent {
  storedCandidateId: any;
  JobId: any;
  button_value: any;
  isPopupVisible: boolean = false;

  constructor(private service: CandidateService, private router: Router) {}

  ngOnInit() {
    this.storedCandidateId = localStorage.getItem('updateByCandidateId');
    this.JobId = localStorage.getItem('JobIdByCandidate');
    this.button_value = localStorage.getItem('button_value');
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
    // this.router.navigate(['/candidate/profile']);
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/candidate/profile']);
  }
}
