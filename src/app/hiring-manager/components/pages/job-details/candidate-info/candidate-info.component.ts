import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HiringManagerService } from '../../../../service/hiring-manager.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { DatePipe } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-candidate-info',
  standalone: true,
  imports: [CommonModule, Toast, ProgressSpinner, TooltipModule],
  templateUrl: './candidate-info.component.html',
  styleUrl: './candidate-info.component.scss',
  providers: [MessageService, DatePipe],
})
export class CandidateInfoComponent {
  @Input() candidate: any;
  @Output() close: EventEmitter<string> = new EventEmitter<string>();
  isInterviewScheduled: boolean = true;
  isSelected: boolean = true;
  constructor(
    private hiringManagerService: HiringManagerService,
    private messageService: MessageService,
    private datepipe: DatePipe
  ) {}

  candidateStatus: string = '';
  showHiddenSkills: boolean = false;
  jobSubscribe: any;
  assessmentDetails: any[] = []; // Store the assessment details from the API
  component: string = ''; // Store the name of the pending component
  selectedCandidateDetails: any;
  interviewTime: any;
  loader: boolean = true;

  ngOnInit() {
    this.loader = true;
    //console.log('Hello World', this.candidate);
    this.getcandidateStatus(this.candidate);

    // Store the status in a variable
    if (this.candidate && this.candidate.latestStatus) {
      this.candidateStatus = this.candidate.latestStatus;
      // console.log('Candidate Status:', this.candidateStatus);
    }
    if (this.candidateStatus === 'Interview Scheduled') {
      this.isInterviewScheduled = true;
    } else {
      this.isInterviewScheduled = false;
    }
    // console.log('candidate', this.candidate);

    if (this.candidateStatus === 'Interview Completed') {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }

    const jsonBody = {
      email: this.candidate.email,
    };
    this.hiringManagerService.CandidateDetails(jsonBody).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.selectedCandidateDetails = res.result;
          //  console.log('selected candidate', this.selectedCandidateDetails);
        }
      },
      (err) => {},
      () => {
        this.getInterviewTime(this.candidate.jobId, this.candidate.candidateId);
      }
    );
  }
  getInterviewTime(JobId: any, CandidateId: any) {
    const Jsonobj = {
      jobId: JobId,
      candidateId: CandidateId,
    };
    this.hiringManagerService.getcandidateInterviewtime(Jsonobj).subscribe(
      (data: any) => {
        if (data.isSuccess) {
          this.interviewTime = this.datepipe.transform(
            data?.result['0'].scheduledTime,
            'd MMMM yyyy'
          );
        }
      },
      () => {},
      () => {
        this.loader = false;
      }
    );
  }

  getcandidateStatus(candidate: any) {
    this.hiringManagerService
      .candidateStatus(candidate.jobId, candidate.candidateId)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.assessmentDetails = res.result?.sort((a: any, b: any) => {
            return a.assessmentSqnc - b.assessmentSqnc;
          });

          res.result.map((item: any) => {
            if (item.status === 'Pending') {
              this.component = item.assessmentName;
            }
          });
        }
      });
  }

  closeModal() {
    this.close.emit('');
  }

  onReject() {
    let jobTitle = localStorage.getItem('jobTitle');
    let jobLocation = localStorage.getItem('jobLocation');
    let JObRole = localStorage.getItem('JObRole');
    const jasonBody = {
      jobId: this.candidate.jobId,
      candidateId: this.candidate.candidateId,
      status: 'REJECTED',
      profileJourney: 'SELECTION',
    };

    this.hiringManagerService.callProfileUpdateJurney(jasonBody).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log(response);
          this.jobSubscribe = this.hiringManagerService.jobSubscribe.next({
            id: this.candidate.jobId,
          });
        } else {
          console.error('Failed to update profile');
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );

    this.messageService.add({
      severity: 'warn',
      summary: 'Rejected',
      detail: `Candidate ${this.selectedCandidateDetails?.first_name} Rejected`,
    });
    let jsonObj = {
      to: [
        {
          name:
            this.selectedCandidateDetails?.first_name +
            ' ' +
            this.selectedCandidateDetails?.last_name,
          email: this.selectedCandidateDetails?.email,
        },
      ],
      subject: `Update on Your Application for ${jobTitle}`,
      plainTextBody: `Thank you for your interest in the ${jobTitle} position. We appreciate the time and effort you invested in your application and the opportunity to learn about your skills and experiences. 
                      After careful consideration, we have decided to move forward with other candidates who more closely match our current needs. Please know this decision was not easy due to the high quality of applicants.
                      We encourage you to apply for future openings for which you qualify, as we'd be happy to consider your application again.`,
      htmlBody: `<p>Hello ${
        this.selectedCandidateDetails?.first_name +
        ' ' +
        this.selectedCandidateDetails?.last_name
      },</p><p>Thank you for your interest in the <b>${jobTitle} </b> position. We appreciate the time and effort you invested in your <br/> application and the opportunity to learn about your skills and experiences.</p><br/><br/><br/>
<p>After careful consideration, we have decided to move forward with other candidates who more closely match our <br/>current needs. Please know this decision was not easy due to the high quality of applicants.</p></br></br></br><p>We encourage you to apply for future openings for which you qualify, as we'd be happy to consider your <br/>application again.</p><br/><br/>.</p><p>Best regards,<br>Hiring Platform</p>`,
    };
    this.sendMail_to_candidate(jsonObj);
    this.close.emit(
      this.selectedCandidateDetails?.first_name +
        ' ' +
        this.selectedCandidateDetails?.last_name +
        ' has been Rejected_0'
    );
    // this.refresh.emit();
  }

  onApprove() {
    let jobTitle = localStorage.getItem('jobTitle');
    let jobLocation = localStorage.getItem('jobLocation');
    let JObRole = localStorage.getItem('JObRole');
    const jasonBody = {
      jobId: this.candidate.jobId,
      candidateId: this.candidate.candidateId,
      status: 'SELECTED',
      profileJourney: 'SELECTION',
    };

    this.hiringManagerService.callProfileUpdateJurney(jasonBody).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.jobSubscribe = this.hiringManagerService.jobSubscribe.next({
            id: this.candidate.jobId,
          });
          console.log(response);
        } else {
          console.error('Failed to update profile');
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Candidate ${this.selectedCandidateDetails?.first_name} Approved`,
    });

    let jsonObj = {
      to: [
        {
          name:
            this.selectedCandidateDetails?.first_name +
            ' ' +
            this.selectedCandidateDetails?.last_name,
          email: this.selectedCandidateDetails?.email,
        },
      ],
      subject: `Selected for ${JObRole} Position`,
      plainTextBody: `Congratulations! You have been selected for the ${jobTitle} position at ${jobLocation}. Please log in to the hiring platform for further details.`,
      htmlBody: `<p>Hello ${
        this.selectedCandidateDetails?.first_name +
        ' ' +
        this.selectedCandidateDetails?.last_name
      },</p><p>Congratulations! You have been selected for the  <b>  ${jobTitle} </b>. position at ${jobLocation}. Please log in to the hiring platform for further details.</p><p>Best regards,<br>Hiring Platform</p>`,
    };
    this.sendMail_to_candidate(jsonObj);
    this.close.emit(
      this.selectedCandidateDetails?.first_name +
        ' ' +
        this.selectedCandidateDetails?.last_name +
        ' has been selected_1'
    );
    // this.refresh.emit();
  }

  getImagePath(assessmentName: string): string {
    return `public/assets/icons/${assessmentName}.svg`;
  }
  ngOnDestroy() {
    if (this.jobSubscribe) {
      this.jobSubscribe.unsubcribe();
    }
  }

  sendMail_to_candidate(Jsonobj: any) {
    this.hiringManagerService.sendNotification(Jsonobj).subscribe(
      (data) => {},
      () => {},
      () => {
        console.log('Completed');
      }
    );
  }

  getHiddenSkillsTooltip(candidate: any): string {
    if (candidate?.skills) {
      const allSkills = candidate.skills.split(',');
      const hiddenSkills = allSkills.slice(2);
      return hiddenSkills.join(', '); // Just join the skills with a comma
    }
    return '';
  }
}
