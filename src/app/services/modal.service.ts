import { Injectable }              from '@angular/core';
import { ModalController }         from '@ionic/angular';
import { FormModalPage }           from '../modals/form-modal/form-modal.page';
import { BehaviorSubject }         from 'rxjs';
import { EModalTypes, TFormField } from '../models/TFormField';
import { Validators }              from '@angular/forms';

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
				validators: [Validators.required],
			}
		],
		[EModalTypes.item]: [
			{
				name: 'title',
				label: 'Название',
				placeholder: 'Введите название',
				type: 'text',
				value: null,
				validators: [Validators.required],
			},
			{
				name: 'sum',
				label: 'Сумма',
				placeholder: 'Введите сумму',
				type: 'number',
				value: null,
				validators: [Validators.required],
			},
			{
				name: 'date',
				label: 'Дата платежа',
				placeholder: null,
				type: 'date',
				value: null,
				validators: [Validators.required],
			}
		],
		[EModalTypes.transaction]: [ //{id, title, sum, income, date, description, category}
			{
				name: 'title',
				label: 'Название',
				placeholder: 'Введите название',
				type: 'text',
				value: null,
				validators: [Validators.required],
			},
			{
				name: 'value',
				label: 'Сумма',
				placeholder: 'Введите сумму',
				type: 'number',
				value: null,
				validators: [Validators.required],
			},
			{
				name: 'date',
				label: 'Дата платежа',
				placeholder: null,
				type: 'date',
				value: null,
				validators: [Validators.required],
			},
			{
				name: 'description',
				label: 'Описание',
				placeholder: 'Введите описание',
				type: 'text',
				value: null,
				validators: [],
			},
			{
				name: 'category',
				label: 'Категории',
				placeholder: 'Введите категорию',
				type: 'text',
				value: null,
				validators: [],
			},
			{
				name: 'sign',
				label: 'Признак',
				placeholder: 'Выберите признак',
				type: 'select',
				value: null,
				values: [{id: 1, name: 'Доход'}, {id: 2, name: 'Расход'}, {id: 3, name: 'Сбережения'}],
				validators: [Validators.required],
			}
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
