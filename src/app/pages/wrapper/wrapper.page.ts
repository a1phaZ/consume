import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs }                      from '@ionic/angular';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.page.html',
  styleUrls: ['./wrapper.page.scss'],
})
export class WrapperPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;

  tabsList: {id: string; title: string}[];

  constructor() {
    this.tabsList = [
      {
        id: 'home',
        title: 'Главная',
      },
      {
        id: 'settings',
        title: 'Настройки'
      },
      {
        id: 'periodic',
        title: 'Абон. платежи'
      }
    ];
  }

  ngOnInit() {
    if (this.tabs) {
      this.tabs.select('home');
    }
  }

}
