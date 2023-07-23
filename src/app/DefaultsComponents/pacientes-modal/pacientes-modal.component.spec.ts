import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesModalComponent } from './pacientes-modal.component';

describe('PacientesModalComponent', () => {
  let component: PacientesModalComponent;
  let fixture: ComponentFixture<PacientesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesModalComponent]
    });
    fixture = TestBed.createComponent(PacientesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
