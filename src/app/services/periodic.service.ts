import { Injectable }      from '@angular/core';
import { TListItem }       from '../components/list/list.component';
import { TSettingItem }    from './settings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodicService {
  private periodicList: BehaviorSubject<TPeriodicItem[]> = new BehaviorSubject<TPeriodicItem[]>([]);

  constructor() {
    this.periodicList.next(periodicList);
  }

  get list() {
    return this.periodicList.asObservable();
  }

  setList(key: string, list: TPeriodicItem | TListItem) {
    const oldList = this.periodicList.value;
    if (key === DEFAULT) {

      this.periodicList.next([...oldList, list] as TPeriodicItem[]);
      return;
    }

    const idx = oldList.findIndex((item) => item.id === key);
    if (idx > -1) {
      oldList[idx].list.push(list as TListItem);
    }
    this.periodicList.next(oldList);
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
}

export type TPeriodicItem = {
  id: string;
  title: string;
  list: TListItem[];
};

const DEFAULT = 'default';

const periodicList: TPeriodicItem[] = [
  {
    id: 'adsf',
    title: 'Подписки',
    list: [
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
    ],
  }, {
    id: 'azxcvz',
    title: 'Кредиты',
    list: [
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
    ]
  }, {
    id: 'zxcvzop2',
    title: 'Коммуналка',
    list: [
      {
        title: 'Вывоз мусора',
        sum: { value: 895.79 },
        date: +new Date(2022, 3, 25),
      },
      {
        title: 'Электричество',
        sum: { value: 5000 },
        date: +new Date(2022, 3, 25),
      }
    ]
  }
  ];
