import {Fetch} from '../src/Fetch';
import {Instrument} from "../src/interfaces/Instrument";

describe('testing Fetch class', () => {
    test('options should return path and referer', () => {
        const fetch = new Fetch();
        const instrument: Instrument = {
            name: 'test-instrument',
            isin: 'EE-TEST-INSTRUMENT'
        };
        const startDate: string = '2022-04-08';
        const endDate: string = '2022-04-10';

        expect(fetch.options(instrument, startDate, endDate)).toHaveProperty('hostname');

        expect(fetch.options(instrument, startDate, endDate)).toHaveProperty(
            'path',
            '/statistics/et/instrument/EE-TEST-INSTRUMENT/trading/chart_price_json?start=2022-04-08&end=2022-04-10&historical=0'
        );

        expect(fetch.options(instrument, startDate, endDate)).toHaveProperty(
            'headers.Host',
            'nasdaqbaltic.com'
        );

        expect(fetch.options(instrument, startDate, endDate)).toHaveProperty(
            'headers.referer',
            'https://nasdaqbaltic.com/statistics/et/instrument/EE-TEST-INSTRUMENT/trading?date=2022-04-10'
        );
    });
});
