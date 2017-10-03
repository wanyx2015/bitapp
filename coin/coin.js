const ax = require('axios');
const async = require('async');
// const _ = require('lodash');

var coin = '';

var combineObj = function (a, b) {
    var c = {};
    for (var key in a) {
        c[key] = a[key];
    }
    for (var key in b) {
        c[key] = b[key];
    }
    return c;
}


module.exports.getPrice = (inputCoin, callback) => {
    this.coin = inputCoin;
    async.parallel({

        coin: (callback) => {
            var url = `https://bittrex.com/api/v1.1/public/getticker?market=${this.coin}`;
            ax.get(url)
                .then((response) => {
                    if (response.data.success) {
                        console.log(this.coin);
                        console.log('===')
                        console.log(response.data.result.Last);
                        console.log();
                        callback(null, response.data.result.Last);
                    } else {
                        throw new Error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        btc: (callback) => {
            var usdt_url = `https://bittrex.com/api/v1.1/public/getticker?market=usdt-btc`;

            ax.get(usdt_url)
                .then((response) => {
                    if (response.data.success) {
                        console.log('usdt-btc');
                        console.log('===')
                        console.log(response.data.result.Last);
                        console.log();
                        callback(null, response.data.result.Last);
                    } else {
                        throw new Error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        usd: (callback) => {
            ax.get('http://api.fixer.io/latest?base=USD')
                .then((response) => {
                    console.log('usd-cny');
                    console.log('===')
                    console.log(response.data.rates.CNY);
                    console.log();
                    callback(null, response.data.rates.CNY);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, (error, result) => {
        console.log('cny price');
        console.log('===');
        console.log(result.btc * result.coin * result.usd)

        var result = combineObj(result, {
            cny: result.btc * result.coin * result.usd
        })
        callback(result);
    });

}