import {Component} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {DatabaseService} from '../../services/database.service';
import {Store} from '@ngrx/store';
import {TStore} from '../../models/store.model';
import * as TransactionActions from '../../store/transaction/actions/transaction.actions';
import {UuidService} from '../../services/uuid.service';
import {selectTransactionState} from '../../store/transaction/selectors/transaction.selectors';
import {Observable}                       from 'rxjs';
import { ETransactionSign, TTransaction } from '../../models/transaction.model';
import {BasePageClass}                    from '../../_base/base-page.class';
import {EModalTypes} from '../../models/TFormField';

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
	}

	addItem(data: TTransaction): void {
		this.store.dispatch(TransactionActions.addTransaction(data));
	}

	patchValue(data) {
		this.store.dispatch(TransactionActions.patchTransaction(data));
	}

	init(): void {
		console.log('home init');
	}

	modalDataSubscribeHandle(): void {
		this.modalService.modalData.subscribe((data: TTransaction) => {
			if (!data) {
				return;
			}
			const {id, title, value, sign = ETransactionSign.spend, date, description, category} = data;
			if (!id) {
				this.addItem({id: this.idService.uuid, title, value, sign, date, description, category});
				return;
			}
			this.patchValue({id, title, value, sign, date, description, category});
		});
	}
}
