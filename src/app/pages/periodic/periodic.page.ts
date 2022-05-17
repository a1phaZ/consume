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
import { ModalService }                   from '../../services/modal.service';
import { TFormField }                     from '../../models/TFormField';

@Component({
	selector: 'app-periodic',
	templateUrl: './periodic.page.html',
	styleUrls: ['./periodic.page.scss'],
})
export class PeriodicPage implements OnInit {

	lists: Observable<TPeriodicItem[]>;
	periodic$ = this.store.select(selectPeriodic);

	constructor(
		private periodicService: PeriodicService,
		private modalService: ModalService,
		private store: Store<{ periodic: IPeriodicState }>,
	) {
		this.periodic$.subscribe(data => {
			console.log('periodic data', data);
		});

		this.modalService.modalData.subscribe((data) => {
			if (!data) {return;}
			this.addGroup(data);
		});
	}

	ngOnInit() {
		// this.lists = this.periodicService.list;
	}

	calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
		return this.periodicService.calcTotal([...list, ...other.flat()]);
	}

	showModal() {
		const fields: TFormField[] = [
			{
				name: 'title',
				label: 'Название группы',
				placeholder: 'Введите название',
				type: 'text',
				value: null,
			}
		];

		this.modalService.presentModal(fields);
	}

	addGroup(data) {
		const id = uuidv4();
		this.store.dispatch(PeriodicActions.addPeriodic({id, ...data}));

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

	addItem(id: string) {
		this.store.dispatch(PeriodicActions.addPeriodicItem({
			periodicId: id,
			id: uuidv4(),
			sum: {
				value: 1000,
				income: false
			},
			date: +new Date(),
			title: 'test periodic item'
		}));
	}
}
