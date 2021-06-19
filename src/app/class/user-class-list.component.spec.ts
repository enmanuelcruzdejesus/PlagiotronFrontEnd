import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClassListComponent } from './user-class-list.component';

describe('UserClassListComponent', () => {
  let component: UserClassListComponent;
  let fixture: ComponentFixture<UserClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
