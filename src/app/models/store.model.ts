import { IPeriodicState } from '../store/periodic/reducer/periodic.reducer';
import { TTransaction }   from './transaction.model';

export type TStore = {
	periodic: IPeriodicState;
	transactions: TTransaction[];
};
