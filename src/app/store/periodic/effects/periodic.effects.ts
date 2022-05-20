import { Injectable }                                               from '@angular/core';
import { Actions, createEffect, ofType }                            from '@ngrx/effects';
import { PeriodicService }                                          from '../../../services/periodic.service';
import { addPeriodicAll, addPeriodicSuccess, EPeriodicActionsType } from '../actions/periodic.actions';
import { exhaustMap, map }                                          from 'rxjs/operators';

@Injectable()
export class PeriodicEffects {
	loadPeriodic$ = createEffect(() => this.actions$.pipe(
		ofType(EPeriodicActionsType.getAll),
		exhaustMap(() => this.periodicService.getPeriodicParentList().pipe(
			map(items => addPeriodicAll({items}))
		))
	));

	addPeriodic$ = createEffect(() => this.actions$.pipe(
		ofType(EPeriodicActionsType.addItem),
		exhaustMap((item) => this.periodicService.addPeriodicParent(item).pipe(
			map(() => addPeriodicSuccess(item))
		))
	));

	constructor(
		private actions$: Actions,
		private periodicService: PeriodicService
	) {
	}
}
