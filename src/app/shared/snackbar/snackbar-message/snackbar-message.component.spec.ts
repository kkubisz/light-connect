import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarMessageComponent } from './snackbar-message.component';

describe('SnackbarMessageComponent', () => {
  let component: SnackbarMessageComponent;
  let fixture: ComponentFixture<SnackbarMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
