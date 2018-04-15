import { Injectable } from '@angular/core';
import { I18NService } from '@core/i18n/service/i18n.service';
import { EN } from '@security/auth/i18n/languages/en';
import { ES } from '@security/auth/i18n/languages/es';

@Injectable()
export class AuthI18NService {
  private section = 'auth';

  constructor(private i18n: I18NService) {
    this.i18n.getLanguage().subscribe(language => this.changeLanguage(language, this));
  }

  changeLanguage(newLanguage: string, that: any) {
    switch(newLanguage.toLowerCase()) {
      case 'en': that.i18n.load(that.section, EN.labels); break;
      case 'es': that.i18n.load(that.section, ES.labels); break;
    }
  }

  t(key: string) {
    return this.i18n.t(this.section, key);
  }

}
