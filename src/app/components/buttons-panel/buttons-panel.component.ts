import { Component, OnInit } from '@angular/core';
import { PopoverService }    from '../../services/popover.service';

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
        console.log(ev);
        ev.stopPropagation();
        await this.popoverService.presentPopover(ev);
      }
    }
  ];

  constructor(
    private popoverService: PopoverService
  ) { }

  ngOnInit() {}

}
