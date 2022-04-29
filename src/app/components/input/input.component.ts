import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }                from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {}

}
