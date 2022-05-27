import { Injectable }      from '@angular/core';
import { DatabaseService } from './database.service';
import { of }              from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
	  private dbService: DatabaseService,
  ) { }

	addTransaction({type, ...item}) {
	  return of(this.dbService.addData('transaction', item));
	}
}
