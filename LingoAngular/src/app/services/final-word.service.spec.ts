import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { FinalWordService } from './final-word.service';

describe('FinalWordService', () => {
  let service: FinalWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FinalWordService ],
      imports: [ ToastrModule.forRoot() ]
    });
    service = TestBed.inject(FinalWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
