import { Component, Input, OnInit }            from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService }                        from '../../services/modal.service';
import { TFormField }                          from '../../models/TFormField';

@Component({
	selector: 'app-form-modal',
	templateUrl: './form-modal.page.html',
	styleUrls: ['./form-modal.page.scss']
})
export class FormModalPage implements OnInit {
	@Input() fields: TFormField[];
	@Input() data: any;
	formGroup: FormGroup;
	date: any;

	constructor(
		private fb: FormBuilder,
		private modalService: ModalService
	) {
	}

	ngOnInit() {
		const controlsConfig = this.fields.reduce(
			(acc, field: TFormField) => ({
					...acc,
					[field.name]: new FormControl(field.value, field.validators)
				}
			), {}
		);
		this.formGroup = this.fb.group(controlsConfig);
	}

	async submit(event) {
		event.preventDefault();
		await this.close(this.formGroup.value);
	}

	async close(value) {
		await this.modalService.dismiss(!value ? null : {...value, ...this.data});
	}
}
