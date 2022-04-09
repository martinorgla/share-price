import {Instrument} from './interfaces/Instrument';
import {Config} from "./interfaces/Config";
import * as https from "https";

let config: Config = require('./config.json');


let instruments: Instrument[] = config.instruments;

// POC
instruments.forEach((share) => {
    // TODO: Prepare options
    // TODO: GET data
    // TODO: Save data to DB

    const options = {
        hostname: 'nasdaqbaltic.com',
        path: `/statistics/et/instrument/${share.isin}/trading/chart_price_json?start=2022-04-08&end=2022-04-08&historical=0`,
        headers: {
            referer: `https://nasdaqbaltic.com/statistics/et/instrument/${share.isin}/trading?date=2022-04-08`
        }
    };

    https.get(options, (response) => {
        let result: string = '';
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {
            let responseData = JSON.parse(result);
            const lastPrice = responseData.data.data[responseData.data.data.length-1][1];
            console.log(share.name + ' last price ' + lastPrice);
        });
    });
});