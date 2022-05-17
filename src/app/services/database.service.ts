import { Injectable }                                                        from '@angular/core';
import { BehaviorSubject, from, of }                                         from 'rxjs';
import { HttpClient }                                                        from '@angular/common/http';
import { AlertController }                                                   from '@ionic/angular';
import '@capacitor-community/sqlite';
import { catchError, switchMap }                                             from 'rxjs/operators';
import { Storage }                                                           from '@capacitor/storage';
import { Device }                                                            from '@capacitor/device';
import { CapacitorSQLite, JsonSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

// eslint-disable-next-line @typescript-eslint/naming-convention

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	dbReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	dbName = '';

	native: boolean;
	sqlitePlugin: any;
	sqlite: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	isService: boolean;
	private db: SQLiteDBConnection;

	constructor(
		private http: HttpClient,
		private alertCtrl: AlertController
	) {
	}

	async initializePlugin(): Promise<unknown> {
		const info = await Device.getInfo();
		return new Promise(resolve => {
			if (info?.platform === 'ios' || info?.platform === 'android') {
				this.native = true;
			}
			this.sqlitePlugin = CapacitorSQLite;
			this.sqlite.next(new SQLiteConnection(this.sqlitePlugin));
			this.isService = true;
			resolve(true);
		});
	}

	/**
	 * Create a connection to a database
	 *
	 * @param database
	 * @param encrypted
	 * @param mode
	 * @param version
	 */
	async createConnection(database: string, encrypted: boolean,
	                       mode: string, version: number
	): Promise<SQLiteDBConnection> {
		if (this.sqlite.value !== null) {
			try {
				const db: SQLiteDBConnection = await this.sqlite.value.createConnection(
					database, encrypted, mode, version);
				if (db != null) {
					this.db = db;
					return Promise.resolve(db);
				} else {
					return Promise.reject(new Error(`no db returned is null`));
				}
			} catch (err) {
				return Promise.reject(new Error(err));
			}
		} else {
			return Promise.reject(new Error(`no connection open for ${database}`));
		}
	}

	async init(): Promise<void> {
		const info = await Device.getInfo();

		if (info?.platform === 'android') {
			try {
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
					return of({values: []});
				} else {
					const statement = 'SELECT * FROM periodic;';
					console.log('get data');
					return from(this.db.query(statement, []));
				}
			}),
			catchError(err => {
				console.log('getPeriodicList', err);
				return of({values: []});
			})
		);
	}

	async addData() {
		const sqlcmd =
			'INSERT INTO periodic (title) VALUES (?);';
		const values: Array<any> = ['test title'];
		console.log('add data');
		const ret = await this.db.run(sqlcmd, values);
		console.log(ret);
		return true;
	}

	private async setupDatabase(update = false) {

		const dbSetupDone = await Storage.get({key: DB_SETUP_KEY});

		if (!dbSetupDone.value) {
			this.downloadDatabase();
		} else {
			this.dbName = (await Storage.get({key: DB_NAME_KEY})).value;
			await CapacitorSQLite.open({database: `${this.dbName}.db`});
			this.dbReady.next(true);
		}
	}

	private async downloadDatabase(update = false) {
		this.http.get('https://devdactic.fra1.digitaloceanspaces.com/tutorial/db.json').subscribe(async (jsonExport: JsonSQLite) => {
			const jsonstring = JSON.stringify(jsonExport);
			const isValid = await CapacitorSQLite.isJsonValid({jsonstring});

			if (isValid.result) {
				this.dbName = jsonExport.database;
				await Storage.set({key: DB_NAME_KEY, value: this.dbName});
				await CapacitorSQLite.importFromJson({jsonstring});
				await Storage.set({key: DB_SETUP_KEY, value: '1'});

				// Your potential logic to detect offline changes later
				if (!update) {
					await CapacitorSQLite.createSyncTable({});
				} else {
					await CapacitorSQLite.setSyncDate({syncdate: '' + new Date().getTime()});
				}
				this.dbReady.next(true);
			}
		});
	}

}

// eslint-disable
// export const createSchema = `
//     CREATE TABLE IF NOT EXISTS periodic (id CHAR (36) PRIMARY KEY UNIQUE, title STRING, last_modified INTEGER DEFAULT (strftime('%s', 'now')));
//
//     CREATE TABLE IF NOT EXISTS periodic_item (id CHAR (36) PRIMARY KEY UNIQUE, title STRING, value DOUBLE (10, 2), date INTEGER, list_id CHAR (36), last_modified INTEGER DEFAULT (strftime('%s', 'now')));
//
//     CREATE TRIGGER IF NOT EXISTS AutoGenerateGUID
//       AFTER INSERT
//       ON periodic
//       FOR EACH ROW WHEN (NEW.id IS NULL)
//     BEGIN
//       UPDATE periodic
//       SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
//                        substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
//                        substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
//       WHERE rowid = NEW.rowid;
//     END;
//
//     CREATE TRIGGER IF NOT EXISTS AutoGenerateGUID1
//       AFTER INSERT
//       ON periodic_item
//       FOR EACH ROW WHEN (NEW.id IS NULL)
//     BEGIN
//       UPDATE periodic_item
//       SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
//                        substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
//                        substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
//       WHERE rowid = NEW.rowid;
//     END;
//   `;

const DUMP = {
	database: 'consume',
	version: 1,
	encrypted: false,
	mode: 'full',
	tables: []
};
