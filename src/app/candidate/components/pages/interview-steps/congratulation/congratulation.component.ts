import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-congratulation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './congratulation.component.html',
  styleUrl: './congratulation.component.scss'
})
export class CongratulationComponent {

  @Input() isPopupVisible: boolean = false;
  @Input() subHeader: string = '';          // Content for the subheader
  @Input() subSubHeader: string = '';       // Content for the sub-subheader
  @Output() close = new EventEmitter<void>(); // Event to notify parent

  closePopup(): void {
    this.close.emit(); // Notify the parent component to hide the popup
  }

}
