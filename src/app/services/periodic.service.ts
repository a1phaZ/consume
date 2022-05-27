import { Injectable }      from '@angular/core';
import { TListItem }       from '../components/list/list.component';
import { TSettingItem }    from './settings.service';
import { from, of }        from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root'
})
export class PeriodicService {
	constructor(
		private dbService: DatabaseService,
	) {
	}

	calcTotal(list: TListItem[] | TSettingItem[]): string {
		let total = 0;
		// eslint-disable-next-line no-underscore-dangle
		list.forEach(item => {
			if (item.sum) {
				total += item.sum.value;
			}
		});
		return total.toString();
	}

	getPeriodicParentList() {
		return from(this.dbService.getData('periodic'));
	}

	addPeriodicParent({type, ...item}) {
		return of(this.dbService.addData('periodic', item));
	}
}

export type TPeriodicItem = {
	id: string;
	title: string;
	list: TListItem[];
};
