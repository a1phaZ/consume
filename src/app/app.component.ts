import { Component }                   from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { createSchema, DatabaseService } from './services/database.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	initPlugin: any;

	constructor(
		private platform: Platform,
		// private splashScreen: SplashScreen,
		// private statusBar: StatusBar,
		private databaseService: DatabaseService,
		private loadingCtrl: LoadingController
	) {
		this.initializeApp();
	}

	async initializeApp() {
		this.platform.ready().then(async () => {
			const loading = await this.loadingCtrl.create();
			await loading.present();
			this.databaseService.initializePlugin().then(async ret => {
				this.initPlugin = ret;
				await loading.dismiss();
				console.log('>>>> in App  this.initPlugin ' + this.initPlugin);

				await this.initDB();
			});
		});
	}

	async initDB() {
	  try {
	    const db = await this.databaseService
	      .createConnection('consume', false, 'no-encryption', 1);
	    if (db) {
	      await db.open();
	      await db.execute(createSchema);
	      await db.createSyncTable();
	      await db.setSyncDate(new Date().toISOString());
	      this.databaseService.dbReady.next(true);
	    }
	  } catch (e) {
	    console.log('home init', e);
	  }
	}
}
