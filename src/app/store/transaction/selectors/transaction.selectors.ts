import { TTransaction } from '../../../models/transaction.model';

export const selectTransactionState = (state): TTransaction[] => state.transactions;
