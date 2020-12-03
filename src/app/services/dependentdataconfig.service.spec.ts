import { TestBed } from '@angular/core/testing';

import { DependentdataconfigService } from './dependentdataconfig.service';

describe('DependentdataconfigService', () => {
  let service: DependentdataconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentdataconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
