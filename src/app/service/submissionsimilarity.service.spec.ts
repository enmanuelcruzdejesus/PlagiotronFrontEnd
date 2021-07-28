import { TestBed } from '@angular/core/testing';

import { SubmissionsimilarityService } from './submissionsimilarity.service';

describe('SubmissionsimilarityService', () => {
  let service: SubmissionsimilarityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionsimilarityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
