import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { CandidateService } from '../../../service/candidate.service';

@Component({
  selector: 'app-candidate-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-login.component.html',
  styleUrl: './candidate-login.component.scss',
  
})
export class CandidateLoginComponent {
  isLoginPage: boolean = true;
  userEmail: string = '';
  generatedOtp: string = '';
  timer: number = 30;
  timerSubscription: Subscription | undefined;

  isOtpExpired: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private candidateService: CandidateService) {}

  requestOtp() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    if (emailInput) {
      const enteredEmail = emailInput.value;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailPattern.test(enteredEmail)) {
        this.userEmail = enteredEmail;
        // this.generatedOtp = this.generateOtp();
        // console.log('Generated OTP:', this.generatedOtp);
        
        // Call the API to send OTP to the user
        this.candidateService.Candidatelogin({ email: this.userEmail }).subscribe(
          (response: any) => {
            if (response.isSuccess) {
            console.log('successfully!', response.message);
            this.isLoginPage = false;
            this.startTimer();
          }
          else {
            console.error('Failed to send OTP:', response.message);
          }
        },
          (error) => {
            console.error('Error sending OTP:', error);
            alert('Failed to send OTP. Please try again.');
          }
        );
      } else {
        alert('Please enter a valid email address.');
      }
    }
  }

  confirmOtp() {
    const otpInput = document.getElementById('otp') as HTMLInputElement;
    if (otpInput) {
      const enteredOtp = otpInput.value;
      // if (enteredOtp === this.generatedOtp) {
        if (enteredOtp) {
        this.router.navigate(['/candidate/profile']);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }
  }

  // private generateOtp(): string {
  //   const digits = '0123456789';
  //   let otp = '';
  //   for (let i = 0; i < 6; i++) {
  //     otp += digits[Math.floor(Math.random() * 10)];
  //   }
  //   return otp;
  // }

  startTimer() {
    this.timer = 30;
    this.isOtpExpired = false;

    this.timerSubscription = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.timerSubscription?.unsubscribe();
        this.isOtpExpired = true;
        console.log('OTP expired!');
        this.cdRef.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}
