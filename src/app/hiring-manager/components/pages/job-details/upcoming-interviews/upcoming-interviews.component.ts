import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upcoming-interviews',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upcoming-interviews.component.html',
  styleUrl: './upcoming-interviews.component.scss',
})
export class UpcomingInterviewsComponent {
  interviews = [
    {
      day: 'Today',
      interviews: [
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
          timeRelative: 'in 33 min',
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
      ],
    },
    {
      day: 'Tomorrow | 1st Nov, 2024',
      interviews: [
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
        {
          startTime: '11:00 AM',
          duration: '40 min',
          name: 'Rohit Sharma',
          role: 'SAS & Communication Manager',
        },
      ],
    },
  ];
}
