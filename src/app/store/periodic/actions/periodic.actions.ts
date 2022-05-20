import { createAction, props }               from '@ngrx/store';
import { TPeriodicListItem, TPeriodicModel } from '../../../models/TPeriodicModel';

export enum EPeriodicActionsType {
	getAll = '[Periodic] Get All',
	addAll = '[Periodic] Add All',
	addItem = '[Periodic] Add Item',
	addItemSuccess = '[Periodic] Add Item Success',
	getList = '[Periodic] Get List',
	addListItem = '[Periodic] Add List Item',
}

export const getPeriodic = createAction(
  EPeriodicActionsType.getAll,
);

export const addPeriodicAll = createAction(
	EPeriodicActionsType.addAll,
	props<{ items: TPeriodicModel[] }>()
);

export const addPeriodic = createAction(
  EPeriodicActionsType.addItem,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  props<TPeriodicModel>()
);

export const addPeriodicSuccess = createAction(
	EPeriodicActionsType.addItemSuccess,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	props<TPeriodicModel>()
);

export const getPeriodicListItems = createAction(
  EPeriodicActionsType.getList,
  props<{id: string}>()
);

export const addPeriodicItem = createAction(
  EPeriodicActionsType.addListItem,
  props<TPeriodicListItem>()
);



