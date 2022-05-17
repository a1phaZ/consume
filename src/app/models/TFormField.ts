export type TFormField = {
	label: string;
	name: string;
	placeholder: string;
	type: 'text' | 'number';
	value: string | number | null;
};

export enum EModalTypes {
	category = 'category',
	item = 'item'
}
