import { Injectable }        from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent }  from '../components/popover/popover.component';
import { BehaviorSubject }   from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  action$: BehaviorSubject<'new'> = new BehaviorSubject<'new'>(null);

  constructor(
    private popoverCtrl: PopoverController,
  ) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      // dismissOnSelect: true
    });
    await popover.present();

    const { data: { action } } = await popover.onDidDismiss();

    console.log(action);

    this.action$.next(action);
  }
}
