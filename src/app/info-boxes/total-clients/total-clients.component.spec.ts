import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalClientsComponent } from './total-clients.component';

describe('TotalClientsComponent', () => {
  let component: TotalClientsComponent;
  let fixture: ComponentFixture<TotalClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
