import { EModalTypes, TFormField } from '../models/TFormField';
import { ModalService }            from '../services/modal.service';
import { Store }                   from '@ngrx/store';
import { Observable }              from 'rxjs';
import { TStore }                  from '../models/store.model';
import { UuidService }             from '../services/uuid.service';
import {OnInit} from '@angular/core';

export abstract class BasePageClass implements OnInit {

	abstract actionType: EModalTypes;
	abstract items$: Observable<any>;

	protected constructor(
		public modalService: ModalService,
		public store: Store<TStore>,
		public idService: UuidService,
	) {
		this.modalDataSubscribeHandle();
	}

	ngOnInit() {
		this.init();
	}

	showModal(type: EModalTypes, data = {}) {
		const fields: TFormField[] = this.modalService.getFields(type);
		if (fields.length > 0) {
			this.actionType = type;
			this.modalService.presentModal(fields, data);
		}
	}

	editClick(item: any) {
		this.showEditModal(this.actionType, item);
	}

	showEditModal(type: EModalTypes, item) {
		const fields: TFormField[] = this.modalService.getFields(type);
		if (fields.length > 0) {
			const editFields = fields.map((field) => ({...field, value: item[field.name]}));
			this.modalService.presentModal(editFields, {id: item.id});
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

	abstract patchValue(data): void;
}
