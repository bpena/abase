import { TestBed, inject } from '@angular/core/testing';

import { AuthI18NService } from './auth-i18n.service';

describe('ConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthI18NService]
    });
  });

  it('should be created', inject([AuthI18NService], (service: AuthI18NService) => {
    expect(service).toBeTruthy();
  }));
});
