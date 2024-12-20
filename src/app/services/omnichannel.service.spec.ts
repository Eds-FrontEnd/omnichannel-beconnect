import { TestBed } from '@angular/core/testing';

import { OmnichannelService } from './omnichannel.service';

describe('OmnichannelService', () => {
  let service: OmnichannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmnichannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
