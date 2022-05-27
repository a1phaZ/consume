import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TransactionService} from '../../../services/transaction.service';
import {addTransactionSuccess, ETransactionActionsType, patchTransactionSuccess} from '../actions/transaction.actions';
import {exhaustMap, map} from 'rxjs/operators';

@Injectable()
export class TransactionEffects {
	addTransactions$ = createEffect(() => this.actions$.pipe(
		ofType(ETransactionActionsType.addItem),
		exhaustMap(item => this.transactionService.addTransaction(item).pipe(
			map(() => addTransactionSuccess(item))
		))
	));

	patchTransaction$ = createEffect(() => this.actions$.pipe(
		ofType(ETransactionActionsType.patchItem),
		exhaustMap(item => this.transactionService.patchTransaction(item).pipe(
			map(() => patchTransactionSuccess(item))
		))
	));

	constructor(
		private actions$: Actions,
		private transactionService: TransactionService,
	) {
	}
}
