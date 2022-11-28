import { TestBed } from '@angular/core/testing';

import { SharedGameService } from './shared-dashboard.service';

describe('SharedGameService', () => {
  let service: SharedGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
