import { createAction, props } from '@ngrx/store';
import { TTransaction }        from '../../../models/transaction.model';

export enum ETransactionActionsType {
	getAll = '[Transaction] Get All',
	addAll = '[Transaction] Add All',
	addItem = '[Transaction] Add transaction',
	addItemSuccess = '[Transaction] Add transaction success',
}

export const getTransactions = createAction(
	ETransactionActionsType.getAll,
);

export const addTransactions = createAction(
	ETransactionActionsType.addAll,
	props<{items: TTransaction[]}>()
);

export const addTransaction = createAction(
	ETransactionActionsType.addItem,
	props<TTransaction>()
);

export const addTransactionSuccess = createAction(
	ETransactionActionsType.addItemSuccess,
	props<TTransaction>()
);
