import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {
  transform(value: any, args ? : any): any {
    const weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    if (value) {
      return weekArray[new Date(value).getDay()];
    }
  }

}
