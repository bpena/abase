import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isNullOrUndefined } from 'util';

@Injectable()
export class I18NService {
  private language: string = 'EN';
  private attributeLabels: any = {};

  constructor() { }

  changeLanguage(newLanguage: string) {
    this.language = newLanguage;
  }

  t(section: string, key: string) {
    return (!isNullOrUndefined(section)) ? (this.attributeLabels[section].get(key) || key) : key;
  }

  load(section: string, attrLabels: Map<string, string>) {
    this.attributeLabels[section] = new Map<string, string>();

    attrLabels.forEach((value: string, key: string) =>  {
      this.attributeLabels[section].set(key, !isNullOrUndefined(value) ? value : key);
    })
  }

}
