import { TestBed } from '@angular/core/testing';

import { PartcustomconfigService } from './partcustomconfig.service';

describe('PartcustomconfigService', () => {
  let service: PartcustomconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartcustomconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
