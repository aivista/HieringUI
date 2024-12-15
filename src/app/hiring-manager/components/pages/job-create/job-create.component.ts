import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './job-create.component.html',
  styleUrl: './job-create.component.scss',
})
export class JobCreateComponent {
  jobTitles = ['Chief Operating Officer', 'Data Scientist', 'Project Manager'];
  experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];
  locationOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Remote'];
  primarySkills = ['Management Consulting', 'MS Office', 'Leadership'];
  secondarySkills = ['DevOps', 'Agile Methodologies', 'Technical Writing'];

  // Model for form fields
  selectedJobTitle: string | undefined;
  selectedExperience: string | undefined;
  selectedLocation: string | undefined;
  selectedPrimarySkills: string[] = [];
  selectedSecondarySkills: string[] = [];
  businessDependencies: string | undefined;

  // Job description placeholder
  jobDescription: string = `
    The Chief Operating Officer (COO) will be responsible for overall operations, management, and execution...
  `;
  // Selected Skills Logic
  addPrimarySkill(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedSkill = selectElement.value;

    if (selectedSkill && !this.primarySkills.includes(selectedSkill)) {
      this.primarySkills.push(selectedSkill);
    }
  }
}
