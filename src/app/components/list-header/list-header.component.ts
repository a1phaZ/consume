import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
})
export class ListHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() buttonTitle: string;
  @Input() mainHeader = true;
  @Input() total: string;

  @Output() buttonClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  _buttonClick($event) {
    console.log($event);
    this.buttonClick.emit($event);
  }
}
