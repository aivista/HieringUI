import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
})
export class EditProfileComponent {
  @Output() cancelEdit = new EventEmitter<void>();
  constructor(private services: CandidateService) {}
  profileData: any;
  titleOptions = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Ms.', value: 'Ms.' },
    { label: 'Mrs.', value: 'Mrs.' },
  ];

  selectedTitle: string = 'Mr.';
  ngOnInit() {
    // console.log('ok all are data in ngOn');
    this.services.$ProfilsdataSubject.subscribe((data: any) => {
      // console.log('services data', data);
      this.profileData = data;
      this.profileData['cert'] =
        this.profileData.certificationsAndTraining.join(',');
      this.profileData['skill'] = this.profileData.certifications.join(',');
    });
  }

  onCancel(): void {
    this.cancelEdit.emit(); // Emit event to exit edit mode
  }

  onSave(): void {
    // Logic to save profile changes
    this.cancelEdit.emit(); // Exit edit mode after saving
  }

  allSkills: string[] = [
    'CCNA',
    'MIS',
    'Management',
    'JavaScript',
    'TypeScript',
    'Angular',
    'React',
    'Node.js',
    'HTML',
    'CSS',
    'Python',
    'Java',
    'C++',
    'C#',
    'SQL',
    'PHP',
    'Ruby',
    'Go',
    'Swift',
    'Kotlin',
  ];

  filteredSkills: string[] = [];
  searchTerm: string = '';
  selectedSkills: string[] = [];

  filterSkills(): void {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.filteredSkills = this.allSkills.filter(
      (skill) =>
        skill.toLowerCase().includes(lowerCaseSearch) &&
        !this.selectedSkills.includes(skill)
    );
  }

  addSkill(skill: string): void {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.searchTerm = '';
      this.filteredSkills = [];
    }
  }

  removeSkill(skill: string): void {
    this.selectedSkills = this.selectedSkills.filter((s) => s !== skill);
    this.filterSkills(); // Refresh filtered list after removal
  }
}
