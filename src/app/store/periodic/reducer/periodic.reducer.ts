import * as PeriodicActions                  from '../actions/periodic.actions';
import { TPeriodicListItem, TPeriodicModel } from '../../../models/TPeriodicModel';
import { createReducer, on }                 from '@ngrx/store';
import { addPeriodicSuccess }                from '../actions/periodic.actions';

export interface IPeriodicState {
  parents: TPeriodicModel[]; items: TPeriodicListItem[];
}

export const initialState: IPeriodicState = {
  parents: [],
  items: []
};

export const periodicReducer = createReducer(
  initialState,
  on(PeriodicActions.addPeriodicAll, (state, action) => {
	  console.log(action.items);
	  return {...state, parents: [...action.items]};
  }),
  on(PeriodicActions.addPeriodicSuccess, (state, {type, ...item}) => ({...state, parents: [...state.parents, item]})),
  on(PeriodicActions.addPeriodicItem, (state, {type, ...item}) => ({...state, items: [...state.items, item]})),
);
