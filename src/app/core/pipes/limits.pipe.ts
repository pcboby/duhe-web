import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'limits'
})
export class LimitsPipe implements PipeTransform {

  transform(value: any, upper?: any, lower?: any, args?: any): any {
    return value;
  }

}
