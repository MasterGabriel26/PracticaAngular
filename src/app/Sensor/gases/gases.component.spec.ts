import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasesComponent } from './gases.component';

describe('GasesComponent', () => {
  let component: GasesComponent;
  let fixture: ComponentFixture<GasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GasesComponent]
    });
    fixture = TestBed.createComponent(GasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
