import { Component, Input, OnInit }                        from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService }                                    from '../../services/modal.service';
import { TFormField }                                      from '../../models/TFormField';

@Component({
	selector: 'app-form-modal',
	templateUrl: './form-modal.page.html',
	styleUrls: ['./form-modal.page.scss']
})
export class FormModalPage implements OnInit {
	@Input() fields: TFormField[];
	formGroup: FormGroup;
	date: any;

	constructor(
		private fb: FormBuilder,
		private modalService: ModalService
	) {
	}

	ngOnInit() {
		// this.formGroup = this.fb.group({
		// 	income: new FormControl(null, [Validators.required]),
		// 	balance: new FormControl(null, [Validators.required]),
		// 	daysCount: new FormControl(null, [Validators.required]), // TODO Подставлять кол-во дней исходя из настроек
		// 	date: new FormControl(new Date().toISOString(), [Validators.required]),
		// });

		console.log(this.fields);
		const controlsConfig = this.fields.reduce(
			(acc, field: TFormField) => ({
					...acc,
					[field.name]: new FormControl(field.value, [Validators.required])
				}
			), {}
		);
		this.formGroup = this.fb.group(controlsConfig);
	}

	async submit(event) {
		event.preventDefault();
		await this.close(this.formGroup.value);
	}

	modelChange(event, key) {
		this.formGroup.patchValue({[key]: event.detail.value});
	}

	async close(value) {
		await this.modalService.dismiss(value);
	}
}
