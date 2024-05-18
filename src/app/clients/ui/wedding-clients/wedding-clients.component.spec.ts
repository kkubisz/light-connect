import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingClientsComponent } from './wedding-clients.component';

describe('WeddingClientsComponent', () => {
  let component: WeddingClientsComponent;
  let fixture: ComponentFixture<WeddingClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeddingClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
