import { EModalTypes, TFormField } from '../models/TFormField';
import { ModalService }            from '../services/modal.service';
import { Store }                   from '@ngrx/store';
import { Observable }              from 'rxjs';
import { TStore }                  from '../models/store.model';
import { UuidService }             from '../services/uuid.service';

export abstract class BasePageClass {

	abstract actionType: EModalTypes;
	abstract items$: Observable<any>;

	protected constructor(
		public modalService: ModalService,
		public store: Store<TStore>,
		public idService: UuidService,
	) {
		this.modalDataSubscribeHandle();
	}

	showModal(type: EModalTypes, data = {}) {
		const fields: TFormField[] = this.modalService.getFields(type);
		if (fields.length > 0) {
			this.actionType = type;
			this.modalService.presentModal(fields, data);
		}
	}

	abstract init(): void;

	/**
	 * Метод необходим для подписки на данные возвращаемые формой в модальном окне
	 * this.modalService.modalData.subscribe((data: any) => {
	 * 	    ...[Операции с данным которые вернула форма]
	 * });
	 */
	abstract modalDataSubscribeHandle(): void;

	abstract addItem(data): void;
}
