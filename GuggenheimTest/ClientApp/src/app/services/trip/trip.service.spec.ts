/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripService } from './trip.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Trip', () => {
  const baseUrl = document.getElementsByTagName('base')[0].href;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripService, { provide: 'BASE_URL', baseUrl }]
    });
  });

  it('should ...', inject([TripService], (service: TripService) => {
    expect(service).toBeTruthy();
  }));
});
