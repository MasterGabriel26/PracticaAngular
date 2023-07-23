import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosModalComponent } from './departamentos-modal.component';

describe('DepartamentosModalComponent', () => {
  let component: DepartamentosModalComponent;
  let fixture: ComponentFixture<DepartamentosModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartamentosModalComponent]
    });
    fixture = TestBed.createComponent(DepartamentosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
