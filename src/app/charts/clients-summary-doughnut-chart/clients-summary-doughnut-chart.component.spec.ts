import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsSummaryDoughnutChartComponent } from './clients-summary-doughnut-chart.component';

describe('ClientsSummaryDoughnutChartComponent', () => {
  let component: ClientsSummaryDoughnutChartComponent;
  let fixture: ComponentFixture<ClientsSummaryDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsSummaryDoughnutChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsSummaryDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
