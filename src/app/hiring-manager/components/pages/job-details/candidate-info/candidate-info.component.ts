import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HiringManagerService } from '../../../../service/hiring-manager.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-candidate-info',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './candidate-info.component.html',
  styleUrl: './candidate-info.component.scss',
  providers: [MessageService],
})
export class CandidateInfoComponent {
  @Input() candidate: any;
  @Output() close: EventEmitter<void> = new EventEmitter();
  // @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  isInterviewScheduled: boolean = true;
  isSelected: boolean = true;
  constructor(
    private hiringManagerService: HiringManagerService,
    private messageService: MessageService
  ) {}

  candidateStatus: string = '';
  showHiddenSkills: boolean = false;

  assessmentDetails: any[] = []; // Store the assessment details from the API
  component: string = ''; // Store the name of the pending component
  selectedCandidateDetails: any;

  ngOnInit() {
    console.log('Hello World', this.candidate);
    this.getcandidateStatus(this.candidate);

    // Store the status in a variable
    if (this.candidate && this.candidate.latestStatus) {
      this.candidateStatus = this.candidate.latestStatus;
      console.log('Candidate Status:', this.candidateStatus);
    }
    if (this.candidateStatus === 'Interview Scheduled') {
      this.isInterviewScheduled = true;
    } else {
      this.isInterviewScheduled = false;
    }
    console.log('candidate', this.candidate);

    if (this.candidateStatus === 'Interview Completed') {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }

    const jsonBody = {
      email: this.candidate.email,
    };
    this.hiringManagerService
      .CandidateDetails(jsonBody)
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.selectedCandidateDetails = res.result;
          console.log('selected candidate', this.selectedCandidateDetails);
        }
      });
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
    this.close.emit();
  }

  onReject() {
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
    alert(`Candidate ${this.selectedCandidateDetails?.first_name} Rejected`);
    this.close.emit();
    // this.refresh.emit();
  }

  onApprove() {
    const jasonBody = {
      jobId: this.candidate.jobId,
      candidateId: this.candidate.candidateId,
      status: 'SELECTED',
      profileJourney: 'SELECTION',
    };

    this.hiringManagerService.callProfileUpdateJurney(jasonBody).subscribe(
      (response: any) => {
        if (response.isSuccess) {
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
    alert(`Candidate ${this.selectedCandidateDetails?.first_name} Approved`);
    this.close.emit();
    // this.refresh.emit();
  }

  getImagePath(assessmentName: string): string {
    return `public/assets/icons/${assessmentName}.svg`;
  }
}
