import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';
import { Tooltip } from 'primeng/tooltip';
import { Profile } from '../../../../interface/Profile';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, Tooltip, ProgressSpinner],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  candidateDetails: any;
  profile: Profile | undefined;
  @Output() edit = new EventEmitter<void>();
  @Output() candidateIdEmitter = new EventEmitter<number>();
  loader: boolean = true;

  constructor(private candidateService: CandidateService) {}

  onEdit(): void {
    // console.log('subject call');
    this.candidateService.$ProfilsdataSubject.next(this.profile);
    this.edit.emit();
  }

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
            const ProfileDetails = response.result;
            const candidateId = ProfileDetails.id;
            this.candidateService.candidateId.next(candidateId);
            this.profile = {
              name: `${ProfileDetails.title || ''} ${
                ProfileDetails.first_name || ''
              } ${ProfileDetails.middleName || ''} ${
                ProfileDetails.last_name || ''
              }`.trim(),
              lname: ProfileDetails.last_name,
              fname: ProfileDetails.first_name,
              mname: ProfileDetails.middleName,
              imageUrl: ProfileDetails.imageUrl || 'assets/icons/darkUser.svg',
              certifications: (ProfileDetails.skills || '').split(','),
              email: ProfileDetails.email || '',
              phone: ProfileDetails.contact || '',
              location: ProfileDetails.address || '',
              latestExperience: {
                company: ProfileDetails.latestrole || '',
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
          },
          () => {
            this.loader = false;
            console.log('data loaded completed ');
          }
        );
    } else {
      console.error('Candidate details not found in session storage');
    }
  }
  getRemainingCertificationsTooltip() {
    const remainingCerts = this.profile?.certifications.slice(2);
    return remainingCerts?.join(', ');
  }
}
