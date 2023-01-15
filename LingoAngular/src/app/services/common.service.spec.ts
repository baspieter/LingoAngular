import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CommonService ],
      imports: [ ToastrModule.forRoot() ]
    });
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
