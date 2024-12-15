import { Component } from '@angular/core';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RecentlyAppliedComponent } from './recently-applied/recently-applied.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileDetailsComponent, RecentlyAppliedComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
