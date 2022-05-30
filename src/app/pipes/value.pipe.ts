import { Pipe, PipeTransform } from '@angular/core';
import { TListItem }           from '../components/list/list.component';
import { ETransactionSign }    from '../models/transaction.model';

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {

  transform(value: TListItem, ...args: unknown[]): unknown {
	  return value.sign === ETransactionSign.income || value.sign === ETransactionSign.saving ? value.value : -1 * value.value;
  }

}
