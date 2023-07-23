import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasModalComponent } from './consultas-modal.component';

describe('ConsultasModalComponent', () => {
  let component: ConsultasModalComponent;
  let fixture: ComponentFixture<ConsultasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasModalComponent]
    });
    fixture = TestBed.createComponent(ConsultasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
