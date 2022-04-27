import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsList: TSettingItem[] = [
    {
      name: 'periodCount',
      title: 'Кол-во периодов',
      value: 2,
      description: 'Кол-во периодов в месяце',
      units: '',
    },
    {
      name: 'mainPercent',
      title: 'Обязательный %',
      value: 10,
      description: 'Процент обязательных отчислений с каждого дохода',
      units: '%'
    },
    {
      name: 'dailyPercent',
      title: 'Дневной процент %',
      value: 10,
      description: 'Дневной процент с суммы допустимой для расхода',
      units: '%'
    }
  ];

  constructor() { }

  get list() {
    return this.settingsList;
  }
}

export type TSettingItem = {
  title: string;
  name: string;
  value: string | number;
  units: string;
  description: string;
};
