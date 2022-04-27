import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  greeting: string;
  balance: number;
  description: string;


  constructor() {
    this.greeting = 'Привет, Артемий!';
    this.balance = 100;
    this.description = 'Доступный баланс';
  }

  ngOnInit() {}

}
