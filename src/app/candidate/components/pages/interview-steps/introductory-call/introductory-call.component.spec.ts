import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductoryCallComponent } from './introductory-call.component';

describe('IntroductoryCallComponent', () => {
  let component: IntroductoryCallComponent;
  let fixture: ComponentFixture<IntroductoryCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductoryCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductoryCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
