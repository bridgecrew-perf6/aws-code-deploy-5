import { TestBed } from '@angular/core/testing';

import { TicketcustomconfigService } from './ticketcustomconfig.service';

describe('TicketcustomconfigService', () => {
  let service: TicketcustomconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketcustomconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
