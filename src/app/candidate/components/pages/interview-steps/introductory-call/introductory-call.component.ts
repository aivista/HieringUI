import { Component, EventEmitter, Output } from '@angular/core';
import { CandidateService } from '../../../../service/candidate.service';

@Component({
  selector: 'app-introductory-call',
  standalone: true,
  imports: [],
  templateUrl: './introductory-call.component.html',
  styleUrl: './introductory-call.component.scss',
})
export class IntroductoryCallComponent {
  @Output() showAiAvatar = new EventEmitter<void>();
  button_value: any;

  // Emit event to show popup
  onButtonClick(): void {
    this.showAiAvatar.emit();
  }
  constructor(private candidateService: CandidateService) {}
  ngOnInit() {
    this.button_value = localStorage.getItem('button_value');
    this.candidateService.assessmentId.subscribe((ass: any) => {
      console.log('assessmentId', ass);
    });
  }
}
