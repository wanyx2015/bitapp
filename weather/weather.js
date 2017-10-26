const ax = require('axios');


module.exports.getWeather = getWeather;

var data = {};
var clientIp;

function getWeather(ip, callback) {

    this.clientIp = ip;
    ax.get('https://api.ipify.org?format=json')
        .then(function (response) {
            console.log(response.data.ip)
            data.ip = response.data.ip;
            return response.data.ip;
        })
        .then((res) => {
            console.log("client ip:", this.clientIp);
            data.ip = this.clientIp;
            ax.get(`https://freegeoip.net/json/${this.clientIp}`)
                .then((res) => {
                    console.log(res.data.city);
                    data.city = res.data.city;
                    data.lat = res.data.latitude;
                    data.lng = res.data.longitude;
                    return (res.data);
                })
                .then((res) => {
                    // console.log(res);

                    ax.get(`https://api.darksky.net/forecast/896a0f9f0608b93708f4ef63ed9f7de6/${res.latitude},${res.longitude}?lang=zh&unit=si`)
                        .then((res) => {
                            // console.log(res.data.currently.summary);
                            // console.log(res.data.hourly.summary);
                            // console.log(res.data.daily.summary);

                            data.summarycurrent = res.data.currently.summary;
                            data.summaryhourly = res.data.hourly.summary;
                            data.summarydaily = res.data.daily.summary;
                            callback(data)
                            // return (res);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });

        })
        .catch((error) => {
            console.log(error);
        });

}