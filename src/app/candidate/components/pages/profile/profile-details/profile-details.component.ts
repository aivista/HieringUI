import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
 @Output() edit = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit(); // Emit event to trigger edit mode
  }
}
