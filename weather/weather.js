const ax = require('axios');


module.exports.getWeather = getWeather;


function getWeather(callback) {

    ax.get('https://api.ipify.org?format=json')
        .then(function (response) {
            console.log(response.data.ip)
            return response.data.ip;
        })
        .then((res) => {
            // console.log(res);
            ax.get(`https://freegeoip.net/json/${res}`)
                .then((res) => {
                    console.log(res.data.city);
                    return (res.data);
                })
                .then((res) => {
                    // console.log(res);

                    ax.get(`https://api.darksky.net/forecast/896a0f9f0608b93708f4ef63ed9f7de6/${res.latitude},${res.longitude}?lang=zh&unit=si`)
                        .then((res) => {
                            // console.log(res.data.currently.summary);
                            // console.log(res.data.hourly.summary);
                            // console.log(res.data.daily.summary);

                            callback(res.data)
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