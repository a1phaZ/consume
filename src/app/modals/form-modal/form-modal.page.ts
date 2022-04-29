import { Component, OnInit }                               from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService }                                    from '../../services/modal.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.page.html',
  styleUrls: ['./form-modal.page.scss']
})
export class FormModalPage implements OnInit {
  formGroup: FormGroup;
  date: any;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      income: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required]),
      daysCount: new FormControl(null, [Validators.required]), // TODO Подставлять кол-во дней исходя из настроек
      date: new FormControl(new Date().toISOString(), [Validators.required]),
    });

  }

  submit(event) {
    event.preventDefault();
  }

  modelChange(event, key) {
    this.formGroup.patchValue({[key]: event.detail.value});
  }

  async close() {
    await this.modalService.dismiss(null);
  }
}
