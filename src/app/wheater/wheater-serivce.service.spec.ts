import { TestBed } from '@angular/core/testing';

import { WheaterSerivceService } from './wheater-serivce.service';

describe('WheaterSerivceService', () => {
  let service: WheaterSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheaterSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
