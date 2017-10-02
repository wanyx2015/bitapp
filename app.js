const yargs = require('yargs');
const ax = require('axios');
const async = require('async');

const weather = require('./weather/weather');
const coin = require('./coin/coin');

var argv = yargs.options({
        c: {
            demand: true,
            alias: 'coin',
            describe: 'coin to search',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


console.log(`coin is ${argv.coin}`)
coin.getPrice(argv.coin);

var url = `https://bittrex.com/api/v1.1/public/getticker?market=${argv.coin}`;
var usdt_url = `https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc`;

weather.getWeather((res) => {
    console.log(res.currently.summary);
    console.log(res.hourly.summary);
    console.log(res.daily.summary);
});

// console.log(__dirname);

// async.parallel({
//     sc: (callback) => {
//         ax.get(url)
//             .then((response) => {
//                 if (response.data.success) {
//                     console.log(argv.coin);
//                     console.log('===')
//                     console.log(response.data.result.Last);
//                     console.log();
//                     callback(null, response.data.result.Last);
//                 } else {
//                     throw new Error(response.data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     },

//     btc: (callback) => {
//         ax.get(usdt_url)
//             .then((response) => {
//                 if (response.data.success) {
//                     console.log('usdt-btc');
//                     console.log('===')
//                     console.log(response.data.result.Last);
//                     console.log();
//                     callback(null, response.data.result.Last);
//                 } else {
//                     throw new Error(response.data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     },

//     usd: (callback) => {
//         ax.get('http://api.fixer.io/latest?base=USD')
//             .then((response) => {
//                 console.log('usd-cny');
//                 console.log('===')
//                 console.log(response.data.rates.CNY);
//                 console.log();
//                 callback(null, response.data.rates.CNY);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }

// }, (error, result) => {
//     console.log('cny price');
//     console.log('===');
//     console.log(result.btc * result.sc * result.usd)
// });