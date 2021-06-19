import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilaritySubmissionReportComponent } from './similarity-submission-report.component';

describe('SimilaritySubmissionReportComponent', () => {
  let component: SimilaritySubmissionReportComponent;
  let fixture: ComponentFixture<SimilaritySubmissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilaritySubmissionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilaritySubmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
