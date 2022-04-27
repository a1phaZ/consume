import { Component, OnInit } from '@angular/core';
import { TListItem }         from '../../components/list/list.component';
import { TSettingItem }      from '../../services/settings.service';

@Component({
  selector: 'app-periodic',
  templateUrl: './periodic.page.html',
  styleUrls: ['./periodic.page.scss'],
})
export class PeriodicPage implements OnInit {
  subsList: TListItem[];
  loansList: TListItem[]; // Кредиты

  constructor() { }

  ngOnInit() {
    this.subsList = [
      {
        title: 'Связь',
        sum: {value: 330},
        date: +new Date(2022, 3, 23),
      },
      {
        title: 'МегаФон ТВ',
        sum: {value: 299},
        date: +new Date(2022, 3, 21),
      },
      {
        title: 'Yandex.Music',
        sum: {value: 199},
        date: +new Date(2022, 3, 23),
      }
    ];

    this.loansList = [
      {
        title: 'Ипотека. Дом',
        sum: {value: 33395.52},
        date: +new Date(2022, 3, 10),
      },
      {
        title: 'Ипотека. Квартира',
        sum: {value: 3442.75},
        date: +new Date(2022, 3, 23),
      },
      {
        title: 'Кредит. ГазпромБанк',
        sum: {value: 11120},
        date: +new Date(2022, 3, 20),
      }
    ];
  }

  calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
    let total = 0;
    // eslint-disable-next-line no-underscore-dangle
    const _list = [...list, ...other.flat()];
    _list.forEach(item => {
      if (item.sum) {
        total += item.sum.value;
      }
    });
    return total.toString();
  }

}
