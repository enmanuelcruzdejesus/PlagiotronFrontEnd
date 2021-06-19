import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAssignmentListComponent } from './class-assignment-list.component';

describe('ClassAssignmentListComponent', () => {
  let component: ClassAssignmentListComponent;
  let fixture: ComponentFixture<ClassAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAssignmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
