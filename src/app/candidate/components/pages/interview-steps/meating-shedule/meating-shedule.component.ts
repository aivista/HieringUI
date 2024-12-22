import { Component } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';
import { Router } from '@angular/router';
import { CongratulationComponent } from '../congratulation/congratulation.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meating-shedule',
  standalone: true,
  imports: [CongratulationComponent, DatePipe],
  templateUrl: './meating-shedule.component.html',
  styleUrl: './meating-shedule.component.scss',
  providers: [DatePipe],
})
export class MeatingSheduleComponent {
  storedCandidateId: any;
  JobId: any;
  button_value: any;
  isPopupVisible: boolean = false;
  interviewTime: any;

  constructor(
    private service: CandidateService,
    private router: Router,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.storedCandidateId = localStorage.getItem('updateByCandidateId');
    this.JobId = localStorage.getItem('JobIdByCandidate');
    this.button_value = localStorage.getItem('button_value');
    ////console.log(this.storedCandidateId, this.JobI
    if (this.storedCandidateId && this.JobId) {
      this.getInterviewSchedule(this.storedCandidateId, this.JobId);
    }
  }

  getInterviewSchedule(candidateId: any, Jobid: any) {
    const Jsonobj = {
      jobId: Jobid,
      candidateId: candidateId,
    };
    this.service.getcandidateInterviewtime(Jsonobj).subscribe((data: any) => {
      if (data.isSuccess) {
        this.interviewTime = this.datepipe.transform(
          data?.result['0'].scheduledTime,
          'd MMMM yyyy'
        );
      }
    });
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
