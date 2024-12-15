// import { Component , EventEmitter, Output} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
// @Component({
//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [CommonModule,FormsModule,DropdownModule],
//   templateUrl: './edit-profile.component.html',
//   styleUrl: './edit-profile.component.scss'
// })
// export class EditProfileComponent {
//   @Output() cancelEdit = new EventEmitter<void>();

//   onCancel(): void {
//     this.cancelEdit.emit(); // Emit event to exit edit mode
//   }

//   onSave(): void {
//     // Logic to save profile changes
//     this.cancelEdit.emit(); // Exit edit mode after saving
//   }
//   allSkills: string[] = [
//     'CCNA',
//     'MIS',
//     'Management',
//     'JavaScript',
//     'TypeScript',
//     'Angular',
//     'React',
//     'Node.js',
//     'HTML',
//     'CSS',
//     'Python',
//     'Java',
//     'C++',
//     'C#',
//     'SQL',
//     'PHP',
//     'Ruby',
//     'Go',
//     'Swift',
//     'Kotlin'
//   ];

//   // Filtered skills to show in dropdown
//   filteredSkills: string[] = [];

//   // Search term for filtering skills
//   searchTerm: string = '';

//   // Selected skills list
//   selectedSkills: string[] = [];

//   /**
//    * Filters skills based on user input.
//    */
//   filterSkills(): void {
//     const lowerCaseSearch = this.searchTerm.toLowerCase();
//     this.filteredSkills = this.allSkills.filter(skill =>
//       skill.toLowerCase().includes(lowerCaseSearch) && !this.selectedSkills.includes(skill)
//     );
//   }

//   /**
//    * Adds a skill to the selected list and clears the search input.
//    * @param skill - Selected skill to be added.
//    */
//   addSkill(skill: string): void {
//     if (!this.selectedSkills.includes(skill)) {
//       this.selectedSkills.push(skill);
//       this.searchTerm = '';
//       this.filteredSkills = [];
//     }
//   }

//   /**
//    * Removes a skill from the selected list.
//    * @param skill - Skill to be removed.
//    */
//   removeSkill(skill: string): void {
//     this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
//     this.filterSkills(); // Refresh filtered list after removal
//   }
// }

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add this line
})
export class EditProfileComponent {
  @Output() cancelEdit = new EventEmitter<void>();

  titleOptions = [
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Ms.', value: 'Ms.' },
    { label: 'Mrs.', value: 'Mrs.' }
  ];

  selectedTitle: string = 'Mr.';

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
    'Kotlin'
  ];

  filteredSkills: string[] = [];
  searchTerm: string = '';
  selectedSkills: string[] = [];

  filterSkills(): void {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.filteredSkills = this.allSkills.filter(skill =>
      skill.toLowerCase().includes(lowerCaseSearch) && !this.selectedSkills.includes(skill)
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
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    this.filterSkills(); // Refresh filtered list after removal
  }
}
