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
  constructor(private hiringManagerService: HiringManagerService) {}

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
          console.log('response--->', res);

          // Step 1: Order the assessment names to sort them
          const order = ['AI Based Interview', 'AI Based MCQ', 'Teams Meeting'];
          let flag = 0;

          // Step 2: Sort the assessments based on the order
          this.assessmentDetails = res.result.sort((a: any, b: any) => {
            return (
              order.indexOf(a.assessmentName) - order.indexOf(b.assessmentName)
            );
          });

          // Step 3: Identify the first "Pending" step and set it as the component
          res.result.map((item: any) => {
            if (item.status === 'Pending' && flag === 0) {
              flag = 1;
              this.component = item.assessmentName;
            }
          });
        }
      });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit(status: string) {
    const jasonBody = {
      jobId: this.candidate.jobId,
      candidateId: this.candidate.candidateId,
      status: status,
      profileJourney: status,
    };
    console.log('jasonBody', jasonBody);
    this.hiringManagerService.callProfileUpdateJurney(jasonBody).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log('Profile updated successfully');
        } else {
          console.error('Failed to update profile');
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
