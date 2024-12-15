import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAppliedComponent } from './recently-applied.component';

describe('RecentlyAppliedComponent', () => {
  let component: RecentlyAppliedComponent;
  let fixture: ComponentFixture<RecentlyAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyAppliedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
