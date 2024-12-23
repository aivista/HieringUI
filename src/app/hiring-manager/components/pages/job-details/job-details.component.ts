import { Component } from '@angular/core';
import { JobsComponent } from './jobs/jobs.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { UpcomingInterviewsComponent } from './upcoming-interviews/upcoming-interviews.component';
import { HiringManagerService } from '../../../service/hiring-manager.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [JobsComponent, CandidatesComponent, UpcomingInterviewsComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  jobSucribe: any;
  isPopupVisible: any;
  header: string = '';
  subheader: string = '';
  status: number = 0;
  constructor(private hiringManagerService: HiringManagerService) {}

  closePopup() {
    // this.isPopupVisible = false;
  }
}
