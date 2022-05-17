import { createAction, props }               from '@ngrx/store';
import { TPeriodicListItem, TPeriodicModel } from '../../../models/TPeriodicModel';

export const getPeriodic = createAction(
  '[Periodic] Get All',
);

export const addPeriodic = createAction(
  '[Periodic] Add Item',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  props<TPeriodicModel>()
);

export const getPeriodicListItems = createAction(
  '[Periodic] Get List',
  props<{id: string}>()
);

export const addPeriodicItem = createAction(
  '[Periodic] Add List Item',
  props<TPeriodicListItem>()
);



