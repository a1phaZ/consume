import { Component }              from '@angular/core';
import { ModalService }           from '../../services/modal.service';
import { DatabaseService }        from '../../services/database.service';
import { Store }                  from '@ngrx/store';
import { TStore }                 from '../../models/store.model';
import * as TransactionActions    from '../../store/transaction/actions/transaction.actions';
import { UuidService }            from '../../services/uuid.service';
import { selectTransactionState } from '../../store/transaction/selectors/transaction.selectors';
import { Observable }             from 'rxjs';
import { TTransaction }           from '../../models/transaction.model';
import { BasePageClass }          from '../../_base/base-page.class';
import { EModalTypes }            from '../../models/TFormField';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePageClass {

	transactions$: Observable<TTransaction[]>;
	actionType: EModalTypes = EModalTypes.transaction;
	items$: Observable<any> = this.store.select(selectTransactionState);

	constructor(
		public modalService: ModalService,
		public databaseService: DatabaseService,
		public store: Store<TStore>,
		public idService: UuidService,
	) {
		super(modalService, store, idService);

		this.store.subscribe((data) => {
			console.log('store', data);
		});
	}

	addItem(data: TTransaction): void {
		this.store.dispatch(TransactionActions.addTransaction(data));
	}

	init(): void {
	}

	modalDataSubscribeHandle(): void {
		this.modalService.modalData.subscribe((data: TTransaction) => {
			if (!data) {
				return;
			}
			const {id = this.idService.uuid, title, value, income = false, date, description, category} = data;
			this.addItem({id, title, value, income, date, description, category});
		});
	}


}
