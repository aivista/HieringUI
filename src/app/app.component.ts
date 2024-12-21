import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide header for specific routes
        const loginPages = [
          '/job-details',
          '/job-create',
          '/candidate/profile',
          '/candidate/interview',
          '/candidate/assessment',
        ];
        this.showHeader = loginPages.some((path) =>
          event.urlAfterRedirects.includes(path)
        );
      }
    });
  }
}
