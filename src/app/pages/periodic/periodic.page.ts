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
import { EModalTypes, TFormField }        from '../../models/TFormField';
import {DatabaseService}                  from '../../services/database.service';
import { EPeriodicActionsType }           from '../../store/periodic/actions/periodic.actions';

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

	// list$: any = this.dbService.getPeriodicList();

	constructor(
		private periodicService: PeriodicService,
		private modalService: ModalService,
		private store: Store<{ periodic: IPeriodicState }>,
		private dbService: DatabaseService,
	) {
		this.modalService.modalData.subscribe((data) => {
			if (!data) {return;}
			if (this.actionType === EModalTypes.category) {this.addGroup(data);}
			if (this.actionType === EModalTypes.item) { this.addItem(data);}
		});
	}

	ngOnInit() {
		this.init();
	}

	init() {
		this.store.dispatch(PeriodicActions.getPeriodic());
	}

	calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
		return this.periodicService.calcTotal([...list, ...other.flat()]);
	}

	showModal(type: EModalTypes, id = null) {
		const fields: TFormField[] = this.modalService.getFields(type);
		if (fields.length > 0) {
			this.actionType = type;
			this.modalService.presentModal(fields, {id});
		}
	}

	addGroup(data) {
		this.store.dispatch(PeriodicActions.addPeriodic({...data}));
	}

	addItem({id, title, sum, income, date}) {
		this.store.dispatch(PeriodicActions.addPeriodicItem({
			periodicId: id,
			id: uuidv4(),
			sum: {
				value: sum,
				income: !!income
			},
			date: +new Date(date),
			title
		}));
	}
}
