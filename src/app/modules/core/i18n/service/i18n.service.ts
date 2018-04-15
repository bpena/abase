import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isNullOrUndefined } from 'util';

@Injectable()
export class I18NService {
  private language: string = 'EN';
  private language$: BehaviorSubject<string>;
  private attributeLabels: any = {};

  constructor() {
    this.language$ = new BehaviorSubject(this.language);
  }

  getLanguage(): BehaviorSubject<string> {
    return this.language$;
  }

  changeLanguage(newLanguage: string) {
    this.language = newLanguage;
    this.language$.next(this.language);
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
