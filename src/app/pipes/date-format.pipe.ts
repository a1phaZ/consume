import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return Intl.DateTimeFormat('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(value));
  }

}
