import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderInfoComponent } from './user-header-info.component';

describe('UserHeaderInfoComponent', () => {
  let component: UserHeaderInfoComponent;
  let fixture: ComponentFixture<UserHeaderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
