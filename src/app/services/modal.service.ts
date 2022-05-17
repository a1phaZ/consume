import { Injectable }      from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormModalPage }   from '../modals/form-modal/form-modal.page';
import { BehaviorSubject }         from 'rxjs';
import { EModalTypes, TFormField } from '../models/TFormField';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	modalData: BehaviorSubject<any> = new BehaviorSubject(null);

	private modalTypes: {[key: string]: TFormField[]} = {
		[EModalTypes.category]: [
			{
				name: 'title',
				label: 'Название группы',
				placeholder: 'Введите название',
				type: 'text',
				value: null,
			}
		],
		[EModalTypes.item]: [
			{
				name: 'title',
				label: 'Название',
				placeholder: 'Введите название',
				type: 'text',
				value: null,
			},
			{
				name: 'sum',
				label: 'Сумма',
				placeholder: 'Введите сумму',
				type: 'number',
				value: null,
			}
		// export type TPeriodicListItem = {
		// 	id?: string;
		// 	title: string;
		// 	date: number;
		// 	sum: { value: number; income?: boolean };
		// 	icon?: string;
		// 	periodicId: string;
		// };
		]
	};

	constructor(
		private modalCtrl: ModalController,
	) {}

	async presentModal(fields = [], _data = {}, component = FormModalPage) {
		const modal = await this.modalCtrl.create({
			component,
			cssClass: 'my-custom-class',
			mode: 'ios',
			canDismiss: true,
			componentProps: {
				fields,
				data: _data
			}
		});
		modal.onWillDismiss()
			.then(({data})=> {
				this.modalData.next(data);
			});
		return await modal.present();
	}

	async dismiss(data) {
		return this.modalCtrl.dismiss(data);
	}

	getFields(type: EModalTypes) {
		return this.modalTypes[type];
	}
}
