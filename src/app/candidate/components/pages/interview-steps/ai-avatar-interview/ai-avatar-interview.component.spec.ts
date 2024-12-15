import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAvatarInterviewComponent } from './ai-avatar-interview.component';

describe('AiAvatarInterviewComponent', () => {
  let component: AiAvatarInterviewComponent;
  let fixture: ComponentFixture<AiAvatarInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAvatarInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAvatarInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
