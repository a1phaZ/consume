import { Component, Input, OnInit } from '@angular/core';
import { FormGroup }                from '@angular/forms';
import { TFormField }               from '../../models/TFormField';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() formGroup: FormGroup;

  @Input() field: TFormField;

  constructor() { }

  ngOnInit() {}

}
