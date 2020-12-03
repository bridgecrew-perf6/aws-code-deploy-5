import { TestBed } from '@angular/core/testing';

import { TaskcustomconfigService } from './taskcustomconfig.service';

describe('TaskcustomconfigService', () => {
  let service: TaskcustomconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskcustomconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
