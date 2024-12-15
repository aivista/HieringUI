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
  constructor(private hiringManagerService: HiringManagerService) {}
  // fetchJobs(){
  //   this.hiringManagerService.getHiringManagerJobs(hiringManagerID)
  //   .subscribe({
  //     next: (jobs) => {
  //       console.log('Jobs:', jobs);
  //       // Process the fetched jobs (e.g., display them in the template)
  //     },
  //     error: (error) => {
  //       console.error('Error fetching jobs:', error);
  //       // Handle the error (e.g., display an error message)
  //     }
  //   });
  // }

  ngOnInit(){
    const userdata=this.hiringManagerService.getData("hiringManagerDetails")
    this.jobSucribe= this.hiringManagerService.jobSubscribe.subscribe((res:any)=>{
      this.hiringManagerService.getUpcomingInterview(res.id,userdata.email).subscribe((result:any)=>{
        if(result.isSuccess){
          console.log("upcoming--->",result);
          
        }
      })
    })
  }
}
