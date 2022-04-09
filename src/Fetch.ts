import * as https from "https";
import {Instrument} from "./interfaces/Instrument";
import {Config} from "./interfaces/Config";

export class Fetch {
    public config: Config = require('./config.json');

    handle(): void {
        this.config.instruments.forEach((instrument) => {
            // TODO: Prepare options
            // TODO: GET data
            // TODO: Save data to DB

            const options = this.options(instrument);
            https.get(options, (response) => {
                let result: string = '';
                response.on('data', function (chunk) {
                    result += chunk;
                });

                response.on('end', function () {
                    let responseData = JSON.parse(result);
                    const lastPrice = responseData.data.data[responseData.data.data.length-1][1];
                    console.log(instrument.name + ' last price ' + lastPrice);
                });
            });
        });
    }

    options(instrument: Instrument): any {
        return {
            hostname: this.config.hostname,
            path: `/statistics/et/instrument/${instrument.isin}/trading/chart_price_json?start=2022-04-08&end=2022-04-08&historical=0`,
            headers: {
                referer: `https://nasdaqbaltic.com/statistics/et/instrument/${instrument.isin}/trading?date=2022-04-08`
            }
        };
    }
}
