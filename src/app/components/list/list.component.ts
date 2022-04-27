import { Component, Input, OnInit } from '@angular/core';
import { TSettingItem }             from '../../services/settings.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() list: TListItem[] | TSettingItem[] = [];

  constructor() {
    this.list = [];
    // this.list = [
    //   {
    //     title: 'Mike Rine',
    //     date: +new Date(),
    //     sum: {
    //       value: 1000,
    //       income: false
    //     },
    //     icon: 'logo-steam'
    //   },
    //   {
    //     title: 'Mike Rine',
    //     date: +new Date(),
    //     sum: {
    //       value: 1000,
    //       income: true
    //     },
    //     icon: 'logo-javascript'
    //   }
    // ];
  }

  ngOnInit() {}

  showAll() {
    throw new Error('shaw all method');
  }
}

export type TListItem = {
  title: string;
  date: number;
  sum: { value: number; income?: boolean };
  icon?: string;
};
