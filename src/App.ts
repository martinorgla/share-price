import {Fetch} from "./Fetch";

const fetch = new Fetch();
fetch.init();

const fetchHistoricalPrices = process.argv.find(arg => arg === 'fetchHistoricalPrices');

if (fetchHistoricalPrices) {
    fetch.handleHistoricalPrices();
}

if (!fetchHistoricalPrices) {
    fetch.handle();
}
