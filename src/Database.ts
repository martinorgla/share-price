import {createPool, Pool} from "mysql2";
import {Config} from "./Config";

export class Database extends Config {
    private pool: Pool;

    constructor() {
        super();
        this.init();
    }

    init(): void {
        try {
            this.pool = createPool({
                connectionLimit: this.config.db.connectionLimit,
                host: this.config.db.host,
                user: this.config.db.user,
                password: this.config.db.password,
                database: this.config.db.name,
            });

            console.debug('MySql Adapter Pool generated successfully');
        } catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            throw new Error('failed to initialized pool');
        }
    }

    execute<Type>(query: string, params: string[] | Object): Promise<Type> {
        try {
            if (!this.pool) {
                console.error('Pool was not created. Ensure pool is created when running the app.');
                return;
            }

            return new Promise<Type>((resolve, reject) => {
                this.pool.query(query, params, (error, results) => {
                    if (error) {
                        reject(error);
                    }

                    if (!error) {
                        // @ts-ignore
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            console.error('[mysql.connector][execute][Error]: ', error);
            throw new Error('failed to execute MySQL query');
        }
    }

    insertDailyPrice(inputData: { isin: string, name: string, date: string, "price_close": number }): void {
        if (this.config.env === 'dry-run') {
            return;
        }

        this.execute<any[]>("INSERT INTO `daily_prices` SET ?;", inputData);
        console.log(`Isin ${inputData.isin}, name ${inputData.name}, date ${inputData.date}, close price ${inputData.price_close}`);
    }
}
