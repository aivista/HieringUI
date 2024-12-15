import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RecentlyAppliedComponent } from './recently-applied/recently-applied.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileDetailsComponent, RecentlyAppliedComponent, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isEditMode = false;

  toggleEditMode(value: boolean): void {
    this.isEditMode = value;
  }
}
