import { Component, OnInit } from '@angular/core';
import { I18NService } from '@core/i18n/service/i18n.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  currentLang: string;

  constructor(private i18n: I18NService) {
    this.i18n.getLanguage().subscribe(language => this.currentLang = language);
  }

  ngOnInit() {
  }

  changeLanguage() {
    this.i18n.changeLanguage(this.currentLang.toLocaleLowerCase() === 'en' ? 'es' : 'en');
  }
}
