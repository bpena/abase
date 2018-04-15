import { TestBed, inject } from '@angular/core/testing';

import { SecurityLanguageService } from './security-language.service';

describe('ConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityLanguageService]
    });
  });

  it('should be created', inject([SecurityLanguageService], (service: SecurityLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
