import { Component }      from '@angular/core';
import { PopoverService } from '../../services/popover.service';
import { ModalService }   from '../../services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private popoverService: PopoverService,
    private modalService: ModalService,
  ) {
    this.popoverService.action$.subscribe((action) => {
      if (action === 'new') {
        return this.modalService.presentModal();
      }
    });
  }

}
