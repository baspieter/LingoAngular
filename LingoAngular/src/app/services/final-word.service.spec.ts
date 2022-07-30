import { TestBed } from '@angular/core/testing';

import { FinalWordService } from './final-word.service';

describe('FinalWordService', () => {
  let service: FinalWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
