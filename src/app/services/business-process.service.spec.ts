import { TestBed } from '@angular/core/testing';

import { BusinessProcessService } from './business-process.service';

describe('BusinessProcessService', () => {
  let service: BusinessProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
