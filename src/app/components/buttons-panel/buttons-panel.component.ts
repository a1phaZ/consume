import { Component, OnInit }   from '@angular/core';
import { PopoverService }      from '../../services/popover.service';
import { Store }               from '@ngrx/store';
import { TStore }              from '../../models/store.model';
import * as TransactionActions from '../../store/transaction/actions/transaction.actions';
import { UuidService }         from '../../services/uuid.service';

@Component({
  selector: 'app-buttons-panel',
  templateUrl: './buttons-panel.component.html',
  styleUrls: ['./buttons-panel.component.scss'],
})
export class ButtonsPanelComponent implements OnInit {
  buttons: {title: string; icon: string; buttonClass: 'fill' | 'clear'; click?: any}[] = [
    {
      title: 'Send Money',
      icon: 'arrow-up-outline',
      buttonClass: 'fill',
	    click: async () => {
			this.store.dispatch(TransactionActions.addTransaction({
				id: this.id.uuid,
				title: 'test transaction',
				date: +new Date(),
				value: 1000,
				income: true,
			}));
	    }
    },
    {
      title: 'Request Money',
      icon: 'arrow-down-outline',
      buttonClass: 'clear',
    },
    {
      title: '',
      icon: 'ellipsis-vertical-outline',
      buttonClass: 'clear',
      click: async (ev) => {
        ev.stopPropagation();
        await this.popoverService.presentPopover(ev);
      }
    }
  ];

  constructor(
    private popoverService: PopoverService,
    private store: Store<TStore>,
    private id: UuidService,
  ) { }

  ngOnInit() {}

}
