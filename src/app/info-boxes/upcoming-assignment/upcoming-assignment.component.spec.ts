import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAssignmentComponent } from './upcoming-assignment.component';

describe('UpcomingAssignmentComponent', () => {
  let component: UpcomingAssignmentComponent;
  let fixture: ComponentFixture<UpcomingAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
