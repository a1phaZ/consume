export type TTransaction = {
	id?: string;
	title: string;
	date: number;
	category?: string;
	sign: ETransactionSign;
	value: number;
	description?: string;
};

export enum ETransactionSign {
	income = 1,
	spend = 2,
	saving = 3
}
