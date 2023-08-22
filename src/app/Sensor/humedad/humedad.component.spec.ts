import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumedadComponent } from './humedad.component';

describe('HumedadComponent', () => {
  let component: HumedadComponent;
  let fixture: ComponentFixture<HumedadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumedadComponent]
    });
    fixture = TestBed.createComponent(HumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
