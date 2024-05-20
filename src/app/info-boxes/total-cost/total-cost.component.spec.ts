import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCostComponent } from './total-cost.component';

describe('TotalCostComponent', () => {
  let component: TotalCostComponent;
  let fixture: ComponentFixture<TotalCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
