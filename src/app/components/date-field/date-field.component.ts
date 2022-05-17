import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TFormField} from '../../models/TFormField';

@Component({
	selector: 'app-date-field',
	templateUrl: './date-field.component.html',
	styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent implements OnInit {

	@Input() formGroup: FormGroup;
	@Input() field: TFormField;

	constructor() {
	}

	ngOnInit() {
	}

}
