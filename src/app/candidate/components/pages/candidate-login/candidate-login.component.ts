import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.scss'],
})
export class CandidateLoginComponent {
  isLoginPage: boolean = true;
  userEmail: string = '';
  generatedOtp: string = '';
  timer: number = 30;
  timerSubscription: Subscription | undefined;

  isOtpExpired: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {}


  requestOtp() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    if (emailInput) {
      const enteredEmail = emailInput.value;

      // Basic email validation using a regular expression
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (emailPattern.test(enteredEmail)) {
        // Email is valid, proceed with OTP logic
        this.userEmail = enteredEmail;
        this.generatedOtp = this.generateOtp();
        console.log('Generated OTP:', this.generatedOtp);
        this.isLoginPage = false;
        this.startTimer();
      } else {
        // Email is invalid, show an error message
        alert('Please enter a valid email address.');
      }
    }
  }

  confirmOtp() {
    const otpInput = document.getElementById('otp') as HTMLInputElement;
    if (otpInput) {
      const enteredOtp = otpInput.value;
      if (enteredOtp === this.generatedOtp) {
        this.router.navigate(['/candidate/profile']);
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }
  }

  private generateOtp(): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

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
