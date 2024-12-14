import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingIterviewsComponent } from './upcoming-iterviews.component';

describe('UpcomingIterviewsComponent', () => {
  let component: UpcomingIterviewsComponent;
  let fixture: ComponentFixture<UpcomingIterviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingIterviewsComponent]
    });
    fixture = TestBed.createComponent(UpcomingIterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
