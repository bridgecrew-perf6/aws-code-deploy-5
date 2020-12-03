import { TestBed } from '@angular/core/testing';

import { DependentshowhideService } from './dependentshowhide.service';

describe('DependentshowhideService', () => {
  let service: DependentshowhideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentshowhideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
