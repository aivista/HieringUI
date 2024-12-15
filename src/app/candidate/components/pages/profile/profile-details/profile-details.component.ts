import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Profile {
  name: string;
  imageUrl: string;
  certifications: string[];
  email: string;
  phone: string;
  location: string;
  latestExperience: {
    company: string;
    employmentType: string;
    period: string;
    location: string;
    position: string;
  };
  latestEducation: {
    university: string;
    degree: string;
    major: string;
    period: string;
    activities: string;
  };
  certificationsAndTraining: string[]; // Or a more detailed structure if needed
}

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  profile: Profile | undefined;

  ngOnInit() {
    this.profile = {
      name: 'Rajesh Tapadia',
      imageUrl: 'assets/icons/profileLogo.svg',
      certifications: ['CCNA', 'MIS', 'Management Consulting'],
      email: 'rajesh.tapadia@gmail.com',
      phone: '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      latestExperience: {
        company: 'Nxtra Data Ltd. (A Bharti Airtel Group Company)',
        employmentType: 'Full Time',
        period: 'September, 2022-Present',
        location: 'Mumbai, Maharashtra',
        position: 'Executive Director & COO',
      },
      latestEducation: {
        university: 'Pune University, Maharashtra',
        degree: 'Bachelor of Engineering',
        major: 'Computer Science',
        period: 'Aug 1990 - Jun 1994',
        activities: 'football team head',
      },
      certificationsAndTraining: [], // No certifications in this dummy data
    };
  }
}
