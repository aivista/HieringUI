import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewInstructionComponent } from './interview-instruction.component';

describe('InterviewInstructionComponent', () => {
  let component: InterviewInstructionComponent;
  let fixture: ComponentFixture<InterviewInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewInstructionComponent]
    });
    fixture = TestBed.createComponent(InterviewInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
