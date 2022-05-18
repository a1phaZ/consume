import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import '@capacitor-community/sqlite';
import {Device} from '@capacitor/device';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';

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

	constructor() {
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


	async getData(tableName) {
		const statement = `SELECT *
						   FROM ${tableName};`;
		return await this.db.query(statement, []);
	}

	async addData(tableName, values) {
		const sqlcmd =
			`INSERT INTO ${tableName} (${this.getObjectKeys(values).join(',')})
			 VALUES (${this.getObjectKeys(values).length});`;
		await this.db.run(sqlcmd, this.getObjectValues(values));
		return true;
	}

	getObjectKeys(v) {
		return Object.keys(v);
	}

	getObjectValues(v) {
		return this.getObjectKeys(v).map((key) => v[key]);
	}
}

// eslint-disable
export const createSchema = `
	CREATE TABLE IF NOT EXISTS periodic
	(
		id            CHAR(36) PRIMARY KEY UNIQUE,
		title         STRING,
		last_modified INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TABLE IF NOT EXISTS periodic_item
	(
		id            CHAR(36) PRIMARY KEY UNIQUE,
		title         STRING,
		value         DOUBLE(10, 2),
		date          INTEGER,
		list_id       CHAR(36),
		last_modified INTEGER DEFAULT (strftime('%s', 'now'))
	);

	CREATE TRIGGER IF NOT EXISTS AutoGenerateGUID
		AFTER INSERT
		ON periodic
		FOR EACH ROW
		WHEN (NEW.id IS NULL)
	BEGIN
		UPDATE periodic
		SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
						 substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
						 substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
		WHERE rowid = NEW.rowid;
	END;

	CREATE TRIGGER IF NOT EXISTS AutoGenerateGUID1
		AFTER INSERT
		ON periodic_item
		FOR EACH ROW
		WHEN (NEW.id IS NULL)
	BEGIN
		UPDATE periodic_item
		SET id = (select hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' ||
						 substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) ||
						 substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6)))
		WHERE rowid = NEW.rowid;
	END;
`;
