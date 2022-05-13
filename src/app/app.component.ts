import { Component }                   from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService }             from './services/database.service';
import { catchError }                  from 'rxjs/operators';
import { of }                          from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
      await this.databaseService.init();
      this.databaseService.dbReady
      .pipe(
        catchError(err => {
          console.log(err);
          loading.dismiss();
          return of(err);
        })
      ).subscribe(isReady => {
        if (isReady) {
          loading.dismiss();
          // this.statusBar.styleDefault();
          // this.splashScreen.hide();
        }
      });
    });
  }
}
