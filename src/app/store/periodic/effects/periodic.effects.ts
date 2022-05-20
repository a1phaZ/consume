import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PeriodicService} from '../../../services/periodic.service';
import {addPeriodicAll, EPeriodicActionsType} from '../actions/periodic.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class PeriodicEffects {
	loadPeriodic$ = createEffect(() => this.actions$.pipe(
		ofType(EPeriodicActionsType.getAll),
		mergeMap(() => this.periodicService.getPeriodicParentList().pipe(
			map(items => addPeriodicAll({items}))
			// map(items => ({type: EPeriodicActionsType.addAll, items: [...items]}))
		))
	));

	constructor(
		private actions$: Actions,
		private periodicService: PeriodicService
	) {
	}
}
