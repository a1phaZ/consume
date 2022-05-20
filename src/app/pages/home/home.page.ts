import { Component }       from '@angular/core';
import { PopoverService }  from '../../services/popover.service';
import { ModalService }    from '../../services/modal.service';
import { DatabaseService } from '../../services/database.service';
import { Store }           from '@ngrx/store';
import { IPeriodicState }  from '../../store/periodic/reducer/periodic.reducer';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(
		private popoverService: PopoverService,
		private modalService: ModalService,
		private databaseService: DatabaseService,
		private store: Store<{ periodic: IPeriodicState }>,
	) {
		this.popoverService.action$.subscribe((action) => {
			if (action === 'new') {
				return this.modalService.presentModal();
			}
		});

		this.store.subscribe((data) => {
			console.log('store', data);
		});
	}

}
