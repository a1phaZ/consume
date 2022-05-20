import { createAction, props }               from '@ngrx/store';
import { TPeriodicListItem, TPeriodicModel } from '../../../models/TPeriodicModel';

export enum EPeriodicActionsType {
	getAll = '[Periodic] Get All',
	addItem = '[Periodic] Add Item',
	getList = '[Periodic] Get List',
	addListItem = '[Periodic] Add List Item',
}

export const getPeriodic = createAction(
  EPeriodicActionsType.getAll,
);

export const addPeriodic = createAction(
  EPeriodicActionsType.addItem,
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



