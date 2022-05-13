import { Injectable }                from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { HttpClient }                from '@angular/common/http';
import { AlertController }           from '@ionic/angular';
import '@capacitor-community/sqlite';
import dbDump                        from '../../assets/dump.json';
import { catchError, switchMap }     from 'rxjs/operators';
import { Storage }                   from '@capacitor/storage';
import { Device }                    from '@capacitor/device';
import { CapacitorSQLite }            from '@capacitor-community/sqlite';

// eslint-disable-next-line @typescript-eslint/naming-convention

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dbName = '';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  async init(): Promise<void> {
    const info = await Device.getInfo();

    if (info?.platform === 'android') {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        console.log(e);
        const alert = await this.alertCtrl.create({
          header: 'No DB access',
          message: 'This app can\'t work without Database access.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }

  getPeriodicList() {
    return this.dbReady.pipe(
      switchMap(isReady => {
        if (!isReady) {
          return of({ values: [] });
        } else {
          const statement = 'SELECT * FROM periodic;';
          return from(CapacitorSQLite.query({ statement, values: [] }));
        }
      }),
      catchError(err => {
        console.log(err);
        return of({values: []});
      })
    );
  }

  private async setupDatabase(update = false) {

    const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });

    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value;
      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
    }
  }

  private async downloadDatabase(update = false) {
    const isValid = await CapacitorSQLite.isJsonValid({ jsonstring: JSON.stringify(dbDump) });
    if (isValid.result) {
      this.dbName = dbDump.name;
      await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
      await CapacitorSQLite.importFromJson({ jsonstring: JSON.stringify(dbDump) });
      await Storage.set({ key: DB_SETUP_KEY, value: '1' });

      // Your potential logic to detect offline changes later
      if (!update) {
        await CapacitorSQLite.createSyncTable({});
      } else {
        await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() });
      }
      this.dbReady.next(true);
    } else {
      this.dbName = 'consume';
      await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
      await CapacitorSQLite.open({ database: this.dbName });
      await Storage.set({ key: DB_SETUP_KEY, value: '1' });

      const statement = `
        CREATE DATABASE consume;
        CREATE TABLE periodic (id CHAR (36) PRIMARY KEY UNIQUE, title STRING);

        CREATE TABLE periodic_item (id CHAR (36) PRIMARY KEY UNIQUE, title STRING, value DOUBLE (10, 2), date INTEGER, list_id CHAR (36));

        CREATE TRIGGER AutoGenerateGUID
          AFTER INSERT
          ON periodic
          FOR EACH ROW WHEN (NEW.id IS NULL)
        BEGIN
          UPDATE periodic
          SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
                           substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
                           substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
          WHERE rowid = NEW.rowid;
        END;

        CREATE TRIGGER AutoGenerateGUID1
          AFTER INSERT
          ON periodic_item
          FOR EACH ROW WHEN (NEW.id IS NULL)
        BEGIN
          UPDATE periodic_item
          SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
                           substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
                           substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
          WHERE rowid = NEW.rowid;
        END;
      `;
      if (!update) {
        await CapacitorSQLite.createSyncTable({});
      } else {
        await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() });
      }
      await CapacitorSQLite.execute({ statements: statement, database: this.dbName });
      this.dbReady.next(true);
    }
  }

}

const DUMP = {
  "database": "consume",
  "version": 1,
  "encrypted": false,
  "mode": "full",
  "tables": []
};
