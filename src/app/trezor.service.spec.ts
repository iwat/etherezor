import { TestBed, inject } from '@angular/core/testing';

import { TrezorService } from './trezor.service';

describe('TrezorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrezorService]
    });
  });

  it('should be created', inject([TrezorService], (service: TrezorService) => {
    expect(service).toBeTruthy();
  }));
});
