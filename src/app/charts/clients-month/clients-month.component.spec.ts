import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMonthComponent } from './clients-month.component';

describe('ClientsMonthComponent', () => {
  let component: ClientsMonthComponent;
  let fixture: ComponentFixture<ClientsMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
