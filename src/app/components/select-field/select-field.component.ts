import { Component, Input, OnInit }                          from '@angular/core';
import { FormGroup }                                         from '@angular/forms';
import { TFormField }                                        from '../../models/TFormField';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';

interface IOption {
	readonly id: number;
	readonly name: string;
}

@Component({
	selector: 'app-select-field',
	templateUrl: './select-field.component.html',
	styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent implements OnInit {

	@Input() formGroup: FormGroup;
	@Input() field: TFormField;

	constructor() {
	}

	@tuiPure
	stringify(
		items: readonly IOption[],
	): TuiStringHandler<TuiContextWithImplicit<number>> {
		const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));

		return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
	}

	ngOnInit() {
	}


}
