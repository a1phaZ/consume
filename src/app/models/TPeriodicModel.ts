export type TPeriodicModel = {
  id?: string;
  title: string;
  list?: TPeriodicListItem[];
};

export type TPeriodicListItem = {
  id?: string;
  title: string;
  date: number;
  sum: { value: number; income?: boolean };
  icon?: string;
  periodicId: string;
};
