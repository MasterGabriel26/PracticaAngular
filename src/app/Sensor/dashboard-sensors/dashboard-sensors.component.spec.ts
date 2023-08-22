import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSensorsComponent } from './dashboard-sensors.component';

describe('DashboardSensorsComponent', () => {
  let component: DashboardSensorsComponent;
  let fixture: ComponentFixture<DashboardSensorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardSensorsComponent]
    });
    fixture = TestBed.createComponent(DashboardSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
