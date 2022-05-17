import * as PeriodicActions                  from '../actions/periodic.actions';
import { TPeriodicListItem, TPeriodicModel } from '../../../models/TPeriodicModel';
import { createReducer, on }                 from '@ngrx/store';

export interface IPeriodicState {
  parents: TPeriodicModel[]; items: TPeriodicListItem[];
}

export const initialState: IPeriodicState = {
  parents: [],
  items: []
};

export const periodicReducer = createReducer(
  initialState,
  on(PeriodicActions.addPeriodic, (state, {type, ...item}) => ({...state, parents: [...state.parents, item]})),
  on(PeriodicActions.addPeriodicItem, (state, {type, ...item}) => ({...state, items: [...state.items, item]})),
);
