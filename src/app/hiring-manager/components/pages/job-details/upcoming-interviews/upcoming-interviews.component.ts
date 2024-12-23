import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HiringManagerService } from '../../../../service/hiring-manager.service';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-upcoming-interviews',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressSpinner],
  templateUrl: './upcoming-interviews.component.html',
  styleUrl: './upcoming-interviews.component.scss',
  providers: [DatePipe],
})
export class UpcomingInterviewsComponent {
  interviews: any = [];
  jobSucribe: any;
  loaderflag: boolean = true;
  currenttime: any = '';
  jobId: any;
  userdata: any;
  constructor(
    private hiringManagerService: HiringManagerService,
    private datepipe: DatePipe
  ) {}
  ngOnInit() {
    this.currenttime = this.datepipe.transform(
      new Date(),
      "EEEE, MMM d 'at' h:mm a"
    );
    this.loaderflag = true;
    this.userdata = this.hiringManagerService.getData('hiringManagerDetails');
    this.jobSucribe = this.hiringManagerService.jobSubscribe.subscribe(
      (res: any) => {
        this.hiringManagerService
          .getUpcomingInterview(res.id, this.userdata.email)
          .subscribe(
            (result: any) => {
              if (result.isSuccess) {
                this.processData(result.result);
              }
            },
            (e) => {
              console.log(`something is error ${e}`);
            },
            () => {
              this.loaderflag = false;
            }
          );
      }
    );
    this.hiringManagerService.reloadUpcomeingInterview.subscribe((data) => {
      this.loaderflag = true;
      this.refresh_upccomeingInterview(data, this.userdata.email);
    });
  }
  refresh_upccomeingInterview(jobId: any, managerId: any) {
    this.hiringManagerService.getUpcomingInterview(jobId, managerId).subscribe(
      (result: any) => {
        if (result.isSuccess) {
          this.processData(result.result);
        }
      },
      (e) => {
        console.log(`something is error ${e}`);
      },
      () => {
        this.loaderflag = false;
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
