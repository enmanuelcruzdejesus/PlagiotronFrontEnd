import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentSubmssionListComponent } from './assigment-submssion-list.component';

describe('AssigmentSubmssionListComponent', () => {
  let component: AssigmentSubmssionListComponent;
  let fixture: ComponentFixture<AssigmentSubmssionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentSubmssionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentSubmssionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
