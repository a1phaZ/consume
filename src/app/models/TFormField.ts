import { ValidationErrors } from '@angular/forms';

export type TFormField = {
	label: string;
	name: string;
	placeholder: string;
	type: 'text' | 'number' | 'date';
	value: string | number | null;
	validators?: ValidationErrors;
};

export enum EModalTypes {
	category = 'category',
	item = 'item',
	transaction = 'transaction',
}
