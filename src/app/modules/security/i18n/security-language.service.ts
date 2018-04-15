import { Injectable } from '@angular/core';
import { I18NService } from '@core/i18n/service/i18n.service';
import { EN } from './languages/en';
import { ES } from '@security/i18n/languages/es';

@Injectable()
export class SecurityLanguageService {
  private section = 'security';

  constructor(private i18n: I18NService) {
    this.i18n.load(this.section, EN.labels);
  }

  changeLanguage(newLanguage: string) {
    switch(newLanguage.toLowerCase()) {
      case 'en': this.i18n.load(this.section, EN.labels); break;
      case 'es': this.i18n.load(this.section, ES.labels); break;
    }
  }

  t(key: string) {
    return this.i18n.t(this.section, key);
  }

}
