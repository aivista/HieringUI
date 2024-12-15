import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStepsComponent } from './interview-steps.component';

describe('InterviewStepsComponent', () => {
  let component: InterviewStepsComponent;
  let fixture: ComponentFixture<InterviewStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
