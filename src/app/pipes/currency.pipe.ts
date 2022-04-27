import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(value);
  }

}
