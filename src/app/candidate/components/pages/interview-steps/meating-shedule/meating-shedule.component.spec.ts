import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeatingSheduleComponent } from './meating-shedule.component';

describe('MeatingSheduleComponent', () => {
  let component: MeatingSheduleComponent;
  let fixture: ComponentFixture<MeatingSheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeatingSheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeatingSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
