import { Pipe, PipeTransform } from '@angular/core';
import { I18NService } from '@core/i18n/service/i18n.service';

@Pipe({
  name: 'i18n'
})
export class I18NPipe implements PipeTransform {

  constructor(private i18n: I18NService) {}

  transform(key: string, section: string, ...args: string[]): string {
    let result = this.i18n.t(section, key);

    if (args) {
      for (let i=0; i<args.length; i++) {
        result = result.replace(`{${i}}`, args[i]);
      }
    }
    
    return result;
  }

}