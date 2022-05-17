import { AfterViewInit, Component } from '@angular/core';
import { PopoverService }           from '../../services/popover.service';
import { ModalService }             from '../../services/modal.service';
import { DatabaseService }          from '../../services/database.service';
import { Store }                    from '@ngrx/store';
import { IPeriodicState }           from '../../store/periodic/reducer/periodic.reducer';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

	// periodic$ = this.store.select(selectPeriodic);

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

		// this.databaseService.getPeriodicList().subscribe(data => {
		//   console.log(data);
		// });

		this.store.subscribe((data) => {
			console.log('store', data);
		});
	}

	async ngAfterViewInit() {
		// this.databaseService.sqlite.subscribe((_sqlite) => {
		//   console.log('ngAfterViewInit', _sqlite);
		//   this.init();
		// });
		// await this.init();
		// const id = uuidv4();
		// this.store.dispatch(PeriodicActions.addPeriodic({id, title: 'test periodic add'}));
		// this.store.dispatch(PeriodicActions.addPeriodicItem({
		// 	periodicId: id,
		// 	id: uuidv4(),
		// 	sum: {
		// 		value: 1000,
		// 		income: false
		// 	},
		// 	date: +new Date(),
		// 	title: 'test periodic item'
		// }));
		//
		// this.periodic$.subscribe(data => {
		// 	console.log('periodic data', data);
		// });
	}

	// async init() {
	//   try {
	//     const db = await this.databaseService
	//       .createConnection('consume', false, 'no-encryption', 1);
	//     if (db) {
	//       await db.open();
	//       const ret: any = await db.execute(createSchema);
	//       await db.createSyncTable();
	//       await db.setSyncDate(new Date().toISOString());
	//       await this.databaseService.addData();
	//       this.databaseService.dbReady.next(true);
	//       console.log(ret);
	//     }
	//   } catch (e) {
	//     console.log('home init', e);
	//   }
	// }

}
