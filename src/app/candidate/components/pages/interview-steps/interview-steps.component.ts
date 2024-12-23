import { Component } from '@angular/core';
import { IntroductoryCallComponent } from './introductory-call/introductory-call.component';
import { CongratulationComponent } from './congratulation/congratulation.component';
import { AiAvatarInterviewComponent } from './ai-avatar-interview/ai-avatar-interview.component';
import { CandidateService } from '../../../service/candidate.service';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from '../assessment/assessment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MeatingSheduleComponent } from './meating-shedule/meating-shedule.component';
import { CircularProgressBar2Component } from './circular-progress-bar2/circular-progress-bar2.component';

@Component({
  selector: 'app-interview-steps',
  standalone: true,
  imports: [
    IntroductoryCallComponent,
    AiAvatarInterviewComponent,
    CommonModule,
    AssessmentComponent,
    CongratulationComponent,
    MeatingSheduleComponent,
    CircularProgressBar2Component,
  ],
  templateUrl: './interview-steps.component.html',
  styleUrl: './interview-steps.component.scss',
})
export class InterviewStepsComponent {
  isPopupVisible: boolean = false;
  comoponent: any = '';
  candidateId: any;
  jobId: any;
  assessmentDetails: any;
  totalTime: number = 1;
  remainingTime: number = 1;
  JobDetails: any;
  interviewassessment: string = '';

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.candidateId = params['candidateId'];
      this.jobId = params['jobId'];
      this.getstepperdata(this.candidateId, this.jobId);
    });
    // this.candidateService.$jobDetailsSubject.subscribe((data) => {
    //   console.log('service data', data);
    //   this.JobDetails = data;
    // });
    try {
      this.JobDetails = JSON.parse(localStorage.getItem('selected_job') || '');
    } catch {
      console.log('somethigs is error');
    }
  }

  getstepperdata(candidateId: any, jobId: any) {
    //console.log('getstepperdata called');

    const data = {
      jobid: jobId,
      candidateid: candidateId,
    };
    this.candidateService.getsteppardata(data).subscribe((res: any) => {
      this.assessmentDetails = res.result?.sort((a: any, b: any) => {
        return a.assessmentSqnc - b.assessmentSqnc;
      });
      for (let i = 0; i < res.result.length; i++) {
        if (res.result[i].status == 'Pending') {
          this.comoponent = res.result[i].assessmentName;
          if (res.result[i].assessmentName === 'AI Based Assessment') {
            this.candidateService.assessmentId.next(res.result[i].id);
            this.candidateService.setData('assessmentId', res.result[i].id);
          }
          this.interviewassessment = res.result[i].assessmentName;
          break;
        }
      }

      // this.comoponent = 'AI Screening';
    });
  }

  showAiavatar() {
    this.comoponent = 'Aiavatar';
  }
  // Function to show popup

  showPopup(): void {
    this.isPopupVisible = true;
  }

  // Function to hide popup
  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/candidate/profile']);
  }
  goBack() {
    this.router.navigate(['/candidate/profile']);
  }
}
