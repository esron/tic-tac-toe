import { TestBed, inject } from '@angular/core/testing';

import { Player2Service } from './player-2.service';

describe('Player2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Player2Service]
    });
  });

  it('should be created', inject([Player2Service], (service: Player2Service) => {
    expect(service).toBeTruthy();
  }));
});
