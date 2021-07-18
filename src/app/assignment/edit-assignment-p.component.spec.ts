import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentPComponent } from './edit-assignment-p.component';

describe('EditAssignmentPComponent', () => {
  let component: EditAssignmentPComponent;
  let fixture: ComponentFixture<EditAssignmentPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssignmentPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
