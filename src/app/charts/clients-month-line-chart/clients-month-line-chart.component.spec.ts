import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMonthLineChartComponent } from './clients-month-line-chart.component';

describe('ClientsMonthLineChartComponent', () => {
  let component: ClientsMonthLineChartComponent;
  let fixture: ComponentFixture<ClientsMonthLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsMonthLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsMonthLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
