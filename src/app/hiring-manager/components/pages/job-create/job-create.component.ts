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
  ],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.scss',
})
export class JobCreateComponent {
  jobTitles = ['Chief Operating Officer', 'Data Scientist', 'Project Manager'];
  experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];
  locationOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Mundra', 'Remote'];
  roleOptions = [
    'Chief Operating Officer',
    'Data Scientist',
    'Project Manager',
    'Software Developer',
  ];
  primarySkills = ['Management Consulting', 'MS Office', 'Leadership'];

  secondarySkills = ['DevOps', 'Agile Methodologies', 'Technical Writing'];
  // secondarySkills = [
  //   { label: 'DevOps', value: 'DevOps' },
  //   { label: 'Agile Methodologies', value: 'Agile Methodologies' },
  //   { label: 'Technical Writing', value: 'Technical Writing' },
  // ];
  newSecondarySkill: string = '';
  newPrimarySkill: string = '';

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
    console.log(jsonBody);

    this.apiService.getJobsDesc(jsonBody).subscribe((res: any) => {
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
    });
  }

  addUser() {
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.profileForm.valid) {
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

      console.log('json body', JSON.stringify(jsonBody));
      this.apiService.createJobs(jsonBody).subscribe((res: any) => {
        if (res.isSuccess === true) {
          this.router.navigate(['/job-details']);
        }
      });
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
  addNewSecondarySkill(): void {
    const newSecondarySkill = prompt('Enter a new skill:');
    if (newSecondarySkill && newSecondarySkill.trim()) {
      this.secondarySkills.push(newSecondarySkill);
      // this.newSecondarySkill = '';  No need to reset here
    }
  }

  addNewPrimarySkill(): void {
    const newPrimarySkill = prompt('Enter a new skill:');
    if (newPrimarySkill && newPrimarySkill.trim()) {
      this.primarySkills.push(newPrimarySkill);
      // this.newPrimarySkill = '';
    }
  }
}
