import { Injectable }                    from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PeriodicService }               from '../../../services/periodic.service';
import { EPeriodicActionsType }          from '../actions/periodic.actions';
import { mergeMap }                      from 'rxjs/operators';

@Injectable()
export class PeriodicEffects {
	// loadPeriodic$ = createEffect(() => this.actions$.pipe(
	// 	ofType(EPeriodicActionsType.getAll),
	// 	mergeMap(() => this.periodicService.getPeriodicParentList())
	// ))

	constructor(
		private actions$: Actions,
		private periodicService: PeriodicService
	) {
	}
}
