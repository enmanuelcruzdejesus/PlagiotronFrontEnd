import { TestBed } from '@angular/core/testing';

import { ClassassignmentService } from './classassignment.service';

describe('ClassassignmentService', () => {
  let service: ClassassignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassassignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
