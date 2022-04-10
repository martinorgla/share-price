import * as https from "https";
import {Instrument} from "./interfaces/Instrument";
import {Database} from "./Database";

export class Fetch extends Database {
    handle(): void {
        this.config.instruments.forEach((instrument) => {
            const currentDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            // this.fetchDailyPrices(instrument, currentDate, currentDate);
            // this.fetchHistoricalPrices(instrument);
        });
    }

    fetchDailyPrices(instrument: Instrument, startDate: string, endDate: string): void {
        const options = this.options(instrument, startDate, endDate);

        https.get(options, (response) => {
            let result: string = '';
            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
                const responseData = JSON.parse(result);
                if (!responseData.data.data.length) {
                    return;
                }

                const lastPrice = responseData.data.data[responseData.data.data.length - 1];
                const date = new Date(lastPrice[0]).toISOString().slice(0, 10).replace('T', ' ');
                const priceClose = lastPrice[1];

                console.log(instrument.name + ' last price ' + priceClose + ' -> ' + date);

                this.insertDailyPrice({
                    name: instrument.name,
                    isin: instrument.isin,
                    date: date,
                    "price_close": priceClose
                });
            });
        });
    }

    fetchHistoricalPrices(instrument: Instrument): void {
        const historyStartDate = new Date(1589760000000).toISOString().slice(0, 10).replace('T', ' ');
        const endDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
        const options = this.options(instrument, historyStartDate, endDate);

        https.get(options, (response) => {
            let result: string = '';
            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', () => {
                const responseData = JSON.parse(result);

                if (!responseData.data.data.length) {
                    return;
                }

                responseData.data.data.forEach((lastPrice: any) => {
                    const date = new Date(lastPrice[0]).toISOString().slice(0, 10).replace('T', ' ');
                    const priceClose = lastPrice[1];

                    this.insertDailyPrice({
                        name: instrument.name,
                        isin: instrument.isin,
                        date: date,
                        "price_close": priceClose
                    });
                });


            });
        });
    }

    options(instrument: Instrument, startDate: string, endDate: string): any {
        return {
            hostname: this.config.hostname,
            path: `/statistics/et/instrument/${instrument.isin}/trading/chart_price_json?start=${startDate}&end=${endDate}&historical=0`,
            headers: {
                referer: `https://nasdaqbaltic.com/statistics/et/instrument/${instrument.isin}/trading?date=2022-04-08`
            }
        };
    }
}
