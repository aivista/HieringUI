import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ai-avatar-interview',
  standalone: true,
  imports: [],
  templateUrl: './ai-avatar-interview.component.html',
  styleUrl: './ai-avatar-interview.component.scss'
})
export class AiAvatarInterviewComponent {

    @Output() showPopupEvent = new EventEmitter<void>();
  
    // Emit event to show popup
    onButtonClick(): void {
      this.showPopupEvent.emit();
    }
}
