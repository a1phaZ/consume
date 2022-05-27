import { Pipe, PipeTransform } from '@angular/core';
import { TListItem }           from '../components/list/list.component';

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {

  transform(value: TListItem, ...args: unknown[]): unknown {
	  return !!value.income ? value.value : -1 * value.value;
  }

}
