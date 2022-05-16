import {AfterViewInit, Component} from '@angular/core';
import { PopoverService }  from '../../services/popover.service';
import { ModalService }    from '../../services/modal.service';
import {createSchema, DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  constructor(
    private popoverService: PopoverService,
    private modalService: ModalService,
    private databaseService: DatabaseService
  ) {
    this.popoverService.action$.subscribe((action) => {
      if (action === 'new') {
        return this.modalService.presentModal();
      }
    });

    this.databaseService.getPeriodicList().subscribe(data => {
      console.log(data);
    });
  }

  async ngAfterViewInit() {
    this.databaseService.sqlite.subscribe((_sqlite) => {
      console.log('ngAfterViewInit', _sqlite);
      this.init();
    });
    // await this.init();
  }

  async init() {
    try {
      const db = await this.databaseService
        .createConnection('consume', false, 'no-encryption', 1);
      if (db) {
        await db.open();
        const ret: any = await db.execute(createSchema);
        await db.createSyncTable();
        await db.setSyncDate(new Date().toISOString());
        await this.databaseService.addData();
        this.databaseService.dbReady.next(true);
        console.log(ret);
      }
    } catch (e) {
      console.log('home init', e);
    }
  }

}
