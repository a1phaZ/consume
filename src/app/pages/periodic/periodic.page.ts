import { Component, OnInit }              from '@angular/core';
import { TListItem }                      from '../../components/list/list.component';
import { TSettingItem }                   from '../../services/settings.service';
import { PeriodicService, TPeriodicItem } from '../../services/periodic.service';
import { Observable }                     from 'rxjs';
import { Store }                          from '@ngrx/store';
import { IPeriodicState }                 from '../../store/periodic/reducer/periodic.reducer';
import * as PeriodicActions               from '../../store/periodic/actions/periodic.actions';
import { v4 as uuidv4 }                   from 'uuid';
import { selectPeriodic }                 from '../../store/periodic/selectors/periodic.selectors';
import { ModalService }            from '../../services/modal.service';
import { EModalTypes, TFormField } from '../../models/TFormField';

@Component({
	selector: 'app-periodic',
	templateUrl: './periodic.page.html',
	styleUrls: ['./periodic.page.scss'],
})
export class PeriodicPage implements OnInit {

	lists: Observable<TPeriodicItem[]>;
	periodic$ = this.store.select(selectPeriodic);
	typeCategory = EModalTypes.category;
	typeItem = EModalTypes.item;

	actionType = null;

	constructor(
		private periodicService: PeriodicService,
		private modalService: ModalService,
		private store: Store<{ periodic: IPeriodicState }>,
	) {
		this.periodic$.subscribe(data => {
			console.log('periodic data', data);
		});

		this.modalService.modalData.subscribe((data) => {
			console.log(data);
			if (!data) {return;}
			if (this.actionType === EModalTypes.category) {this.addGroup(data);}
			if (this.actionType === EModalTypes.item) { this.addItem(data);}
		});
	}

	ngOnInit() {
		// this.lists = this.periodicService.list;
	}

	calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
		return this.periodicService.calcTotal([...list, ...other.flat()]);
	}

	showModal(type: EModalTypes, id = null) {
		console.log(type);
		const fields: TFormField[] = this.modalService.getFields(type);
		if (fields.length > 0) {
			this.actionType = type;
			this.modalService.presentModal(fields, {id});
		}
	}

	addGroup(data) {
		const id = uuidv4();
		console.log('id', id);
		this.store.dispatch(PeriodicActions.addPeriodic({...data, id}));

		// if (key === 'default') {
		//   this.periodicService.setList(key, {
		//     title: 'Подписки',
		//     list: [],
		//     id: 'subscribe',
		//   });
		//
		//   return;
		// }
		// this.periodicService.setList(key, {
		//   title: 'Связь',
		//   sum: {value: 330},
		//   date: +new Date(2022, 3, 23),
		// });
	}

	addItem({id, title, sum}) {
		this.store.dispatch(PeriodicActions.addPeriodicItem({
			periodicId: id,
			id: uuidv4(),
			sum: {
				value: sum,
				income: false
			},
			date: +new Date(),
			title
		}));
	}
}
