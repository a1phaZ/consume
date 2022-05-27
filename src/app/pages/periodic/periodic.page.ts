import {Component} from '@angular/core';
import {TListItem} from '../../components/list/list.component';
import {TSettingItem} from '../../services/settings.service';
import {PeriodicService} from '../../services/periodic.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as PeriodicActions from '../../store/periodic/actions/periodic.actions';
import {selectPeriodic} from '../../store/periodic/selectors/periodic.selectors';
import {ModalService} from '../../services/modal.service';
import {EModalTypes} from '../../models/TFormField';
import {BasePageClass} from '../../_base/base-page.class';
import {TStore} from '../../models/store.model';
import {UuidService} from '../../services/uuid.service';

@Component({
	selector: 'app-periodic',
	templateUrl: './periodic.page.html',
	styleUrls: ['./periodic.page.scss'],
})
export class PeriodicPage extends BasePageClass {

	typeCategory = EModalTypes.category;
	typeItem = EModalTypes.item;

	actionType = null;

	items$: Observable<any> = this.store.select(selectPeriodic);

	constructor(
		public modalService: ModalService,
		public store: Store<TStore>,
		public idService: UuidService,
		private periodicService: PeriodicService,
	) {
		super(modalService, store, idService);
	}

	modalDataSubscribeHandle(): void {
		this.modalService.modalData.subscribe((data) => {
			if (!data) {
				return;
			}
			if (this.actionType === EModalTypes.category) {
				this.addGroup(data);
			}
			if (this.actionType === EModalTypes.item) {
				this.addItem(data);
			}
		});
	}

	init() {
		this.store.dispatch(PeriodicActions.getPeriodic());
	}

	calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
		return this.periodicService.calcTotal([...list, ...other.flat()]);
	}

	addGroup(data) {
		const id = this.idService.uuid;
		this.store.dispatch(PeriodicActions.addPeriodic({...data, id}));
	}

	patchValue(data) {
		return;
	}

	addItem({id, title, sum, income, date}) {
		this.store.dispatch(PeriodicActions.addPeriodicItem({
			periodicId: id,
			id: this.idService.uuid,
			sum: {
				value: sum,
				income: !!income
			},
			date: +new Date(date),
			title
		}));
	}
}
