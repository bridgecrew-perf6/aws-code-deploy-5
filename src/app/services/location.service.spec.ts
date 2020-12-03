import { LocationService } from './location.service';
import { TestBed } from '@angular/core/testing';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});

