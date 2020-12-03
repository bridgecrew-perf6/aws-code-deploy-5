import { TestBed } from '@angular/core/testing';

import { CustomercustomconfigService } from './customercustomconfig.service';

describe('CustomercustomconfigService', () => {
  let service: CustomercustomconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomercustomconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
