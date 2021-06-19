import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentListComponent } from './assigment-list.component';

describe('AssigmentListComponent', () => {
  let component: AssigmentListComponent;
  let fixture: ComponentFixture<AssigmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
