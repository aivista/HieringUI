import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringManagerLoginComponent } from './hiring-manager-login.component';

describe('HiringManagerLoginComponent', () => {
  let component: HiringManagerLoginComponent;
  let fixture: ComponentFixture<HiringManagerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiringManagerLoginComponent]
    });
    fixture = TestBed.createComponent(HiringManagerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
