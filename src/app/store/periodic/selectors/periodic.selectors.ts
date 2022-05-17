import { IPeriodicState } from '../reducer/periodic.reducer';
import { createSelector } from '@ngrx/store';

export const selectState = (state) => state.periodic;

export const selectPeriodic = createSelector(
	selectState,
	(_state: IPeriodicState) => _state.parents.map((_parent) => {
			const p = {..._parent};
			p.list = _state.items.filter((item) => item.periodicId === _parent.id);
			return p;
		})
);
