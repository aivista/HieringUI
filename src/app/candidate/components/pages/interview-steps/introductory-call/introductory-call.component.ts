import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-introductory-call',
  standalone: true,
  imports: [],
  templateUrl: './introductory-call.component.html',
  styleUrl: './introductory-call.component.scss'
})
export class IntroductoryCallComponent {

  @Output() showAiAvatar = new EventEmitter<void>();

  // Emit event to show popup
  onButtonClick(): void {
    this.showAiAvatar.emit();
  }

}
