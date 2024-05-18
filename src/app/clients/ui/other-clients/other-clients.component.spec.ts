import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClientsComponent } from './other-clients.component';

describe('OtherClientsComponent', () => {
  let component: OtherClientsComponent;
  let fixture: ComponentFixture<OtherClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
