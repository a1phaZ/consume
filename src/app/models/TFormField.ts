import { ValidationErrors } from '@angular/forms';

export type TFormField = {
	label: string;
	name: string;
	placeholder: string;
	type: 'text' | 'number' | 'date' | 'select';
	value: string | number | null;
	values?: any[];
	validators?: ValidationErrors;
};

export enum EModalTypes {
	category = 'category',
	item = 'item',
	transaction = 'transaction',
}
