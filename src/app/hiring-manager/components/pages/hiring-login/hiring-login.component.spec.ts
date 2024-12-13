import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringLoginComponent } from './hiring-login.component';

describe('HiringLoginComponent', () => {
  let component: HiringLoginComponent;
  let fixture: ComponentFixture<HiringLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HiringLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiringLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
