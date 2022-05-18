import { Component, Input, OnInit } from '@angular/core';
import { TListItem }                from '../list/list.component';
import { TSettingItem }             from '../../services/settings.service';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

	@Input() item: TListItem | TSettingItem;

	constructor() {
	}

	ngOnInit() {
	}

	getValue(sumObject) {
		return !!sumObject.income ? sumObject.value : -1 * sumObject.value;
	}

}
