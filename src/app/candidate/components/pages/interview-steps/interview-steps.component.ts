import { Component } from '@angular/core';
import { IntroductoryCallComponent } from "./introductory-call/introductory-call.component";
import { CongratulationComponent } from "./congratulation/congratulation.component";
import { AiAvatarInterviewComponent } from "./ai-avatar-interview/ai-avatar-interview.component";

@Component({
  selector: 'app-interview-steps',
  standalone: true,
  imports: [IntroductoryCallComponent, CongratulationComponent, AiAvatarInterviewComponent],
  templateUrl: './interview-steps.component.html',
  styleUrl: './interview-steps.component.scss'
})
export class InterviewStepsComponent {

  isPopupVisible: boolean = false;

  // Function to show popup
  showPopup(): void {
    this.isPopupVisible = true;
  }

  // Function to hide popup
  closePopup(): void {
    this.isPopupVisible = false;
  }

}
