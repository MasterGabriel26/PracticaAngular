import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalModalComponent } from './hospital-modal.component';

describe('HospitalModalComponent', () => {
  let component: HospitalModalComponent;
  let fixture: ComponentFixture<HospitalModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalModalComponent]
    });
    fixture = TestBed.createComponent(HospitalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
