# share-price

share-price is a Node.JS module for fetching stock prices from nasdaqbaltic.com.

#### Run
This project uses nodemon for real time watching
* Run `npm run start` to compile and fetch today prices
* Run `npm run historical` to compile and fetch historical prices

### Config
```
{
  "env": "production",
  "hostname": "nasdaqbaltic.com",
  "db": {
    "host": "",
    "name": "",
    "user": "",
    "password": "",
    "port": 3306,
    "connectionLimit": 5
  },
  "instruments": [
    {
      "name": "Tallink",
      "isin": "EE3100004466"
    },
    {
      "name": "Tallinna Kaubamaja",
      "isin": "EE0000001105"
    }
  ]
}
```

### Build
To build run `npm run build`

### Test
To test run `npm run test`