import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let result = value;

    if (args) {
      for (let i=0; i<args.length; i++) {
        result = result.replace(`{${i}}`, args[i]);
      }
    }
    
    return result;
  }

}
