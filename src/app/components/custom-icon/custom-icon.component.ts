import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-icon',
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss'],
})
export class CustomIconComponent implements OnInit {

  @Input() icon: string;

  constructor() { }

  ngOnInit() {}

}
