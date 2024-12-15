import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { AssessmentComponent } from './components/pages/assessment/assessment.component';
import { CongratulationComponent } from './components/pages/interview-steps/congratulation/congratulation.component';

@NgModule({
  // declarations: [AssessmentComponent],
  imports: [CommonModule, CandidateRoutingModule, CongratulationComponent],
})
export class CandidateModule {}
