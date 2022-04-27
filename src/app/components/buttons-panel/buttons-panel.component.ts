import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-panel',
  templateUrl: './buttons-panel.component.html',
  styleUrls: ['./buttons-panel.component.scss'],
})
export class ButtonsPanelComponent implements OnInit {

  buttons: {title: string; icon: string; buttonClass: 'fill' | 'clear'}[] = [
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
    }
  ];

  constructor() { }

  ngOnInit() {}

}
