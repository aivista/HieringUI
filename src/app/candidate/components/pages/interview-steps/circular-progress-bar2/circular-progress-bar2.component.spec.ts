import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularProgressBar2Component } from './circular-progress-bar2.component';

describe('CircularProgressBar2Component', () => {
  let component: CircularProgressBar2Component;
  let fixture: ComponentFixture<CircularProgressBar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularProgressBar2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularProgressBar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
