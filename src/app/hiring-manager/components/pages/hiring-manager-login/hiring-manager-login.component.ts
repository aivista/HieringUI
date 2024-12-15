import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hiring-manager-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hiring-manager-login.component.html',
  styleUrl: './hiring-manager-login.component.scss',
})
export class HiringManagerLoginComponent {
  email: string = ''; // To store the entered email

  constructor(private router: Router) {}

  login() {
    // **1. Dummy Email Check:**
    const dummyEmail = 'test@example.com'; // Replace with your actual dummy email
    if (this.email !== dummyEmail) {
      // Handle invalid email (e.g., show an error message)
      alert('Invalid email. Please enter the correct email.');
      return;
    } else {
      this.router.navigate(['/job-details']);
    }

    // **2. Simulate OTP Validation (Since you don't want a form):**
    // In a real scenario, you would send an OTP to the email and validate it.
    const isValidOTP = true; // Replace with actual OTP validation logic

    if (isValidOTP) {
      this.router.navigate(['/job-details']);
    } else {
      // Handle invalid OTP
    }
  }
}
