import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Chip } from 'primeng/chip';
import { HiringManagerService } from '../../../service/hiring-manager.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

// import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    TextareaModule,
    InputTextModule,
    Chip,
    ReactiveFormsModule,
    ProgressSpinner,
  ],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.scss',
})
export class JobCreateComponent {
  jobTitles = ['Chief Operating Officer', 'Data Scientist', 'Project Manager'];
  experienceOptions = [
    '01 - 02 years',
    '02 - 05 years',
    '04 - 07 years',
    '05 - 10 years',
    '08 - 10 years',
    '08 - 14 years',
    '12 - 15 years',
    '12 - 18 years',
    '15 - 20 years',
  ];
  locationOptions = [
    'Jaipur, Rajasthan, India',
    'Kanpur, Uttar Pradesh, India',
    'Ahmedabad, Gujarat, India',
    'Navi Mumbai, Maharashtra, India',
    'Delhi, India',
    'Mangaluru, Karnataka, India',
    'Navi Mumbai, Maharashtra, India',
    'Palanpur, Gujarat, India',
    'Ahmedabad, Gujarat, India',
    'Jaisalmer, Rajasthan, India',
    'Ahmedabad, Gujarat, India',
    'Ahmedabad, Gujarat, India',
    'Barsana, Uttar Pradesh, India',
    'Singrauli, Madhya Pradesh, India',
    'Gurugram, Haryana, India',
  ];
  roleOptions = [
    'Team Member- Terminal Operations',
    'Associate Engineer',
    'Head - Digital Transformation',
    'Planning Manager',
    'Manager - Direct Sales',
    'Duty Manager- Airside Operations',
    'Member O&M (Shift)',
    'Rout Patrolling & Incident Management',
    'Process Design',
    'Senior Officer-Land & Estate',
    'Water and Effluent Treatment Engineer',
    'Draftsman',
    'Assistant Manager',
    'Mining Sirdar',
    'Lead Operations & Supply Management',
  ];
  primarySkills = [
    'SLA Management',
    'VIP Facilitation',
    'Resource Management',
    'Housekeeping Monitoring',
    'Machine Operation',
    'Quality Control',
    'Safety Compliance',
    'SOP Adherence',
    'Project Management',
    'Strategic Planning',
    'Stakeholder Management',
    'Progress Monitoring',
    'Risk Management',
    'Regulatory Compliance',
    'Administrative Support',
    'Presentation Skills',
    'Relationship Management',
    'Sales Reporting',
    'Market Research',
  ];

  secondarySkills = [
    'Communication',
    'Problem Solving',
    'Time Management',
    'Analytical Skills',
    'Adaptability',
    'Team Collaboration',
    'Leadership',
  ];
  newSecondarySkill: string = '';
  newPrimarySkill: string = '';
  newRole: string = '';
  filterRole: string = '';
  filterPrimarySkills: string = '';
  filterSecondarySkills: string = '';
  filterLocation: string = '';

  // Model for form fields
  selectedJobTitle: string | undefined;
  selectedExperience: string | undefined;
  selectedLocation: string | undefined;
  selectedRole: string | undefined;
  selectedPrimarySkills: string[] = [];
  selectedSecondarySkills: string[] = [];
  businessDependencies: string | undefined;
  JDData: any = [];
  profileForm: FormGroup;
  JDResponse: any = [];
  ManagerEmail: string = '';
  newSkillName: string = '';
  filteredSkills: { name: string; value: string }[] = []; // Add this line
  jdloader: boolean = false;
  // Job description placeholder
  jobDescription: string = `
    The Chief Operating Officer (COO) will be responsible for overall operations, management, and execution...
  `;

  roleOverView: any =
    'The Chief Operating Officer (COO) will be responsible for the overall operations, management, and execution of strategies for AdaniConneX’s data centers. The COO will play a critical role in ensuring that the data center operates efficiently, meets the highest standards of uptime, and delivers exceptional service to clients. The ideal candidate will have extensive experience in data center operations, a strong background in leadership, and the ability to drive operational excellence in a fast-growing environment.';
  hiringManagerDetails: any;
  private router = inject(Router);

  constructor(
    private apiService: HiringManagerService,
    private fb: FormBuilder
  ) {
    this.profileForm = new FormGroup({
      jobTitle: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      primarySkills: new FormControl('', Validators.required),
      secondarySkills: new FormControl('', Validators.required),
      businessDependencies: new FormControl('', Validators.required),
    });

    const getHRID: any = sessionStorage.getItem('hiringManagerDetails');
    this.hiringManagerDetails = getHRID ? JSON.parse(getHRID) : null;
    // console.log('getHRID', this.hiringManagerDetails);
  }
  ngOnInit() {
    const response = this.apiService.getData('hiringManagerDetails');
    console.log(response);
    this.ManagerEmail = response.email;
  }

  addPrimarySkill(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSkill = selectElement.value;

    if (selectedSkill && !this.primarySkills.includes(selectedSkill)) {
      this.primarySkills.push(selectedSkill);
    }
  }

  removeFromSelection(genre: string): void {
    this.selectedPrimarySkills = this.selectedPrimarySkills.filter(
      (item) => item !== genre
    );
  }
  removeFromSelectionSecondary(genre: string): void {
    this.selectedSecondarySkills = this.selectedSecondarySkills.filter(
      (item) => item !== genre
    );
  }

  getJobDetails() {
    //this.jdloader = true;
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
    if (this.profileForm.valid) {
      this.jdloader = true;
      this.JDData = [];
      this.JDResponse = [];
      const jsonBody = {
        jobTitle: this.profileForm.value.jobTitle,
        jobExperienceRequired: this.profileForm.value.experience,
        jobLocation: this.profileForm.value.location,
        jobPrimarySkills: this.profileForm.value.primarySkills,
        jobSecondarySkills: this.profileForm.value.secondarySkills,
        jobEducationalQualifications: ['Master', 'Bachelor', '10th/12th'],
        jobBusinessDependencies: this.profileForm.value.businessDependencies,
        jobRole: this.profileForm.value.role,
        jobType: 'Fulltime',
      };
      // console.log(jsonBody);

      this.apiService.getJobsDesc(jsonBody).subscribe(
        (res: any) => {
          if (res.isSuccess === true) {
            let subObj = {};
            this.JDResponse = res.result;
            for (const [key, value] of Object.entries(res.result)) {
              if (Array.isArray(value)) {
                subObj = { Title: key, Description: value.join('\n') };
              } else {
                subObj = { Title: key, Description: value };
              }
              this.JDData.push(subObj);
            }
            console.log(this.JDData);
          }
        },
        (error) => {
          console.log('somethings is error');
        },
        () => {
          this.jdloader = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  addJD() {
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.profileForm.valid) {
      this.jdloader = true;
      let jsonBody = {
        jobTitle: this.profileForm.value.jobTitle,
        jobExperienceRequired: this.profileForm.value.experience,
        jobLocation: this.profileForm.value.location,
        jobPrimarySkills: this.profileForm.value.primarySkills,
        jobSecondarySkills: this.profileForm.value.secondarySkills,
        jobEducationalQualifications: ['Master', 'Bachelor', '10th/12th'],
        jobRole: this.profileForm.value.role,
        jobType: 'Fulltime',
        jobHiringManager: this.ManagerEmail,
        jobDescriptionText: this.JDResponse,
      };

      // console.log('json body', JSON.stringify(jsonBody));
      this.apiService.createJobs(jsonBody).subscribe(
        (res: any) => {
          if (res.isSuccess === true) {
            this.router.navigate(['/job-details']);
          }
        },
        (error) => {
          console.log(`something is error${error}`);
        },
        () => {
          this.jdloader = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  getRowSize(value: any) {
    const rowSize = Math.round(value / 80) + 1;
    return rowSize;
  }

  goBack() {
    this.router.navigate(['/job-details']);
  }

  onFilterSecondarySkill(event: any) {
    this.filterSecondarySkills = event.filter;
  }

  addNewSecondarySkill(): void {
    const newSecondarySkill = this.filterSecondarySkills.trim();
    if (
      newSecondarySkill &&
      !this.secondarySkills.includes(newSecondarySkill)
    ) {
      this.secondarySkills.push(newSecondarySkill);
      this.selectedSecondarySkills.push(newSecondarySkill);
      this.profileForm
        .get('secondarySkills')
        ?.setValue(this.selectedSecondarySkills);
      this.newSecondarySkill = '';
    }
  }
  onFilterPrimarySkill(event: any) {
    this.filterPrimarySkills = event.filter;
  }

  addNewPrimarySkill() {
    const newPrimarySkill = this.filterPrimarySkills.trim();
    if (newPrimarySkill && !this.primarySkills.includes(newPrimarySkill)) {
      this.primarySkills.push(newPrimarySkill);
      this.selectedPrimarySkills.push(newPrimarySkill);
      this.profileForm
        .get('primarySkills')
        ?.setValue(this.selectedPrimarySkills);
      this.filterPrimarySkills = '';
    }
  }

  onFilterRole(event: any) {
    this.filterRole = event.filter;
  }

  addNewRole() {
    const newRole = this.filterRole.trim();
    if (newRole && newRole.trim() && !this.roleOptions.includes(newRole)) {
      this.roleOptions.push(newRole);
      this.profileForm.get('role')?.setValue(newRole);
      this.filterRole = '';
    }
  }

  onFilterLocation(event: any) {
    this.filterLocation = event.filter;
  }
  addNewLocation() {
    const newLocation = this.filterLocation.trim();
    if (
      newLocation &&
      newLocation.trim() &&
      !this.locationOptions.includes(newLocation)
    ) {
      this.locationOptions.push(newLocation);
      this.profileForm.get('location')?.setValue(newLocation);
      this.filterLocation = '';
    }
  }
}
