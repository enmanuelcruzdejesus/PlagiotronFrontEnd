import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorClassListComponent } from './professor-class-list.component';

describe('ProfessorClassListComponent', () => {
  let component: ProfessorClassListComponent;
  let fixture: ComponentFixture<ProfessorClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
