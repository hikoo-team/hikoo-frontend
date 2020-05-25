import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertEventDialogComponent } from './alert-event-dialog.component';

describe('AlertEventDialogComponent', () => {
  let component: AlertEventDialogComponent;
  let fixture: ComponentFixture<AlertEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
