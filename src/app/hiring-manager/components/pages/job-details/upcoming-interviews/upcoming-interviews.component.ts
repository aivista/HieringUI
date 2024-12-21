import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HiringManagerService } from '../../../../service/hiring-manager.service';

@Component({
  selector: 'app-upcoming-interviews',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upcoming-interviews.component.html',
  styleUrl: './upcoming-interviews.component.scss',
})
export class UpcomingInterviewsComponent {
  interviews: any = [];
  jobSucribe: any;
  constructor(private hiringManagerService: HiringManagerService) {}
  ngOnInit() {
    const userdata = this.hiringManagerService.getData('hiringManagerDetails');
    this.jobSucribe = this.hiringManagerService.jobSubscribe.subscribe(
      (res: any) => {
        this.hiringManagerService
          .getUpcomingInterview(res.id, userdata.email)
          .subscribe((result: any) => {
            if (result.isSuccess) {
              this.processData(result.result);
            }
          });
      }
    );
  }

  getRandomValue<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  processData(data: any): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const interviewsmin = ['30 min', '45 min', '60 min'];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const groupedData = {
      today: data.filter((item: any) => {
        const scheduledDate = new Date(item.scheduledTime);
        return scheduledDate >= today && scheduledDate < tomorrow;
      }),
      tomorrow: data.filter((item: any) => {
        const scheduledDate = new Date(item.scheduledTime);
        return scheduledDate >= tomorrow && scheduledDate < dayAfterTomorrow;
      }),
    };

    // Map grouped data to the template structure
    this.interviews = [
      {
        day: 'Today',
        interviews: groupedData.today.map((item: any) => ({
          name: `${item.first_name} ${item.last_name}`,
          role: JSON.parse(item.jobTitle)?.['Job Title'],
          startTime: new Date(item.scheduledTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: this.getRandomValue(interviewsmin), // Placeholder for duration
          timeRelative: 'in 2 hours', // Example relative time, you can calculate this dynamically
        })),
      },
      {
        day: 'Tomorrow',
        interviews: groupedData.tomorrow.map((item: any) => ({
          name: `${item.first_name} ${item.last_name}`,
          role: JSON.parse(item.jobTitle)?.['Job Title'],
          startTime: new Date(item.scheduledTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          duration: this.getRandomValue(interviewsmin), // Placeholder for duration
          timeRelative: null, // No relative time for tomorrow
        })),
      },
    ];
  }
  ngOnDestroy() {
    if (this.jobSucribe) {
      this.jobSucribe.unsubscribe();
    }
  }
}
