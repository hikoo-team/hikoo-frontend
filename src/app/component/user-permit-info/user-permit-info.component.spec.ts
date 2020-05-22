import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermitInfoComponent } from './user-permit-info.component';

describe('UserPermitInfoComponent', () => {
  let component: UserPermitInfoComponent;
  let fixture: ComponentFixture<UserPermitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPermitInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
