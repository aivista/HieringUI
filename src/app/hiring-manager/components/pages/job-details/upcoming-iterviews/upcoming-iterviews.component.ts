import { Component } from '@angular/core';

@Component({
  selector: 'app-upcoming-iterviews',
  templateUrl: './upcoming-iterviews.component.html',
  styleUrls: ['./upcoming-iterviews.component.scss']
})
export class UpcomingIterviewsComponent {
  interviews = [
    {
      day: 'Today',
      interviews: [
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
          timeRelative: 'in 33 min'
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        }
      ]
    },
    {
      day: 'Tomorrow | 1st Nov, 2024',
      interviews: [
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager'
        }
      ]
    }
  ];
}
