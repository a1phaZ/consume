import { TTransaction }      from '../../../models/transaction.model';
import { createReducer, on } from '@ngrx/store';
import * as TransactionActions from '../actions/transaction.actions';

export const initialState: TTransaction[] = [];

export const transactionReducer = createReducer(
	initialState,
	on(TransactionActions.addTransactions, (state, action) => ([...state, ...action.items])),
	on(TransactionActions.addTransactionSuccess, (state, {type, ...item}) => ([...state, item])),
);
