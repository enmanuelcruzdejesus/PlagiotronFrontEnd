import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentSubmissionSimilarityComponent } from './assigment-submission-similarity.component';

describe('AssigmentSubmissionSimilarityComponent', () => {
  let component: AssigmentSubmissionSimilarityComponent;
  let fixture: ComponentFixture<AssigmentSubmissionSimilarityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigmentSubmissionSimilarityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigmentSubmissionSimilarityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
