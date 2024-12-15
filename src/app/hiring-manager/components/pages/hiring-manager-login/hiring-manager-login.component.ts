import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HiringManagerService } from '../../../service/hiring-manager.service';


@Component({
  selector: 'app-hiring-manager-login',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './hiring-manager-login.component.html',
  styleUrl: './hiring-manager-login.component.scss',
})
export class HiringManagerLoginComponent {
  email: string = ''; 

  constructor(private router: Router,
    private hiringManagerService: HiringManagerService
  ) {}

 
  login() {
    if (!this.email) {
      return;
    }

    const loginData = {
      email: this.email
    };

    this.hiringManagerService.login(loginData).subscribe(
      (response: any) => {
        console.log("response",response);
        
        if (response && response.isSuccess) {
          // alert('Login successful!');
          this.hiringManagerService.setData("hiringManagerDetails",response.result);
          this.router.navigate(['/job-details']); 
        } else {
          alert(response.message || 'Login failed. Please try again.');
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again later.');
      }
    );
  }

}
