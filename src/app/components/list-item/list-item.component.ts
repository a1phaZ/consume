import { Component, Input } from '@angular/core';
import { TListItem }        from '../list/list.component';
import { TSettingItem }     from '../../services/settings.service';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {

	@Input() item: TListItem | TSettingItem;

	constructor() {
	}

}
