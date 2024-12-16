import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';
import { Tooltip } from 'primeng/tooltip';
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
  candidateDetails: any;
  profile: Profile | undefined;
  @Output() edit = new EventEmitter<void>();
  @Output() candidateIdEmitter = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit();
  }

  constructor(private candidateService: CandidateService) {}
  ngOnInit() {
    this.candidateDetails = this.candidateService.getData(
      'candidateServiceDetails'
    );
    console.log('Candidate Details:', this.candidateDetails);

    if (this.candidateDetails && this.candidateDetails.email) {
      // Fetch profile details using the CandidateDetails API
      this.candidateService
        .CandidateDetails({ email: this.candidateDetails.email })
        .subscribe(
          (response: any) => {
            console.log('API Response:', response);
            const ProfileDetails = response.result;
            const candidateId = ProfileDetails.id;
            localStorage.setItem('candidateId', JSON.stringify(candidateId));
            // this.candidateIdEmitter.emit(candidateId);
            // Bind API response to profile
            this.profile = {
              name: `${ProfileDetails.title || ''} ${
                ProfileDetails.firstName || ''
              } ${ProfileDetails.middleName || ''} ${
                ProfileDetails.lastName || ''
              }`.trim(),
              imageUrl:
                ProfileDetails.imageUrl || 'assets/icons/defultProfileIcon.svg',
              certifications: (ProfileDetails.skills || '').split(','),
              email: ProfileDetails.email || '',
              phone: ProfileDetails.contact || '',
              location: ProfileDetails.address || '',
              latestExperience: {
                company: ProfileDetails.latestRole || '',
                employmentType:
                  ProfileDetails.latestExperience?.employmentType || '',
                period: ProfileDetails.latestExperience?.period || '',
                location: ProfileDetails.address || '',
                position: ProfileDetails.designation || '',
              },
              latestEducation: {
                university: ProfileDetails.latestEducation?.university || '',
                degree: ProfileDetails.education || '',
                major: ProfileDetails.major || '',
                period: ProfileDetails.latestEducation?.period || '',
                activities: ProfileDetails.latestEducation?.activities || '',
              },
              certificationsAndTraining: (
                ProfileDetails.certification || ''
              ).split(','),
              // certificationsAndTraining: [],
            };
          },
          (error) => {
            console.error('Error fetching candidate details:', error);
          }
        );
    } else {
      console.error('Candidate details not found in session storage');
    }

    // this.profile = {
    //   name: 'Rajesh Tapadia',
    //   imageUrl: 'assets/icons/profileLogo.svg',
    //   certifications: ['CCNA', 'MIS', 'Management Consulting'],
    //   email: 'rajesh.tapadia@gmail.com',
    //   phone: '+91 9876543210',
    //   location: 'Mumbai, Maharashtra',
    //   latestExperience: {
    //     company: 'Nxtra Data Ltd. (A Bharti Airtel Group Company)',
    //     employmentType: 'Full Time',
    //     period: 'September, 2022-Present',
    //     location: 'Mumbai, Maharashtra',
    //     position: 'Executive Director & COO',
    //   },
    //   latestEducation: {
    //     university: 'Pune University, Maharashtra',
    //     degree: 'Bachelor of Engineering',
    //     major: 'Computer Science',
    //     period: 'Aug 1990 - Jun 1994',
    //     activities: 'football team head',
    //   },
    //   certificationsAndTraining: [],
    // };
  }
}
