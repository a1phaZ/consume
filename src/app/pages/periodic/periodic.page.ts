import { Component, OnInit }              from '@angular/core';
import { TListItem }                      from '../../components/list/list.component';
import { TSettingItem }                   from '../../services/settings.service';
import { PeriodicService, TPeriodicItem } from '../../services/periodic.service';
import { Observable }                     from 'rxjs';

@Component({
  selector: 'app-periodic',
  templateUrl: './periodic.page.html',
  styleUrls: ['./periodic.page.scss'],
})
export class PeriodicPage implements OnInit {

  lists: Observable<TPeriodicItem[]>;

  constructor(
    private periodicService: PeriodicService,
  ) { }

  ngOnInit() {
    this.lists = this.periodicService.list;
  }

  calcTotal(list: TListItem[] | TSettingItem[], ...other): string {
    return this.periodicService.calcTotal([...list, ...other.flat()]);
  }

  addItem(key: string) {
    if (key === 'default') {
      this.periodicService.setList(key, {
        title: 'Подписки',
        list: [],
        id: 'subscribe',
      });

      return;
    }
    this.periodicService.setList(key, {
      title: 'Связь',
      sum: {value: 330},
      date: +new Date(2022, 3, 23),
    });
  }
}
