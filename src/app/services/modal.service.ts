import { Injectable }      from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormModalPage }   from '../modals/form-modal/form-modal.page';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	modalData: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(
		private modalCtrl: ModalController,
	) {}

	async presentModal(fields = [], component = FormModalPage) {
		const modal = await this.modalCtrl.create({
			component,
			cssClass: 'my-custom-class',
			mode: 'ios',
			canDismiss: true,
			componentProps: {
				fields
			}
		});
		modal.onWillDismiss()
			.then(({data})=> {
				this.modalData.next(data);
			});
		return await modal.present();
	}

	async dismiss(data) {
		return this.modalCtrl.dismiss(data);
	}
}
