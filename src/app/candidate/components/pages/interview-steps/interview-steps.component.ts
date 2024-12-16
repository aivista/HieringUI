import { Component } from '@angular/core';
import { IntroductoryCallComponent } from "./introductory-call/introductory-call.component";
import { CongratulationComponent } from "./congratulation/congratulation.component";
import { AiAvatarInterviewComponent } from "./ai-avatar-interview/ai-avatar-interview.component";
import { CandidateService } from '../../../service/candidate.service';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from '../assessment/assessment.component';
import { Router } from '@angular/router';
import { MeatingSheduleComponent } from './meating-shedule/meating-shedule.component';

@Component({
  selector: 'app-interview-steps',
  standalone: true,
  imports: [IntroductoryCallComponent, AiAvatarInterviewComponent, CommonModule, AssessmentComponent, CongratulationComponent,MeatingSheduleComponent],
  templateUrl:'./interview-steps.component.html',
  styleUrl:'./interview-steps.component.scss'
})
export class InterviewStepsComponent {

  isPopupVisible: boolean = false;
  comoponent:any='';
  constructor(private candidateService:CandidateService,private router: Router){}
    
 
    ngOnInit(){
      
      this.getstepperdata()
      
      
      
       
     }

     getstepperdata()
     {
      console.log('getstepperdata called');
      
      const data={
        jobid:1,
        candidateid:1
      }
      this.candidateService.getsteppardata(data).subscribe((res:any)=>{
        console.log("api res: ",res)
        let flag=0
        res.result.map((item:any)=>{
          if(item.status=='Pending' && flag==0)
          {
            flag=1;
            // this.comoponent=item.assessmentName;
            this.comoponent='AI Based MCQ'
          }
          console.log('component name',this.comoponent);
          
        })
      },
      (e)=>{
    
      }
    )
     }

     showAiavatar(){
  this.comoponent='Aiavatar'
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

}
