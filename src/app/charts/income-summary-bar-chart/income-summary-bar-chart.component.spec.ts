import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSummaryBarChartComponent } from './income-summary-bar-chart.component';

describe('IncomeSummaryBarChartComponent', () => {
  let component: IncomeSummaryBarChartComponent;
  let fixture: ComponentFixture<IncomeSummaryBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeSummaryBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomeSummaryBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
