import { Injectable }      from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormModalPage }   from '../modals/form-modal/form-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: FormModalPage,
      cssClass: 'my-custom-class',
      mode: 'ios',
      canDismiss: true,
    });
    return await modal.present();
  }

  async dismiss(data) {
    return this.modalCtrl.dismiss(data);
  }
}
