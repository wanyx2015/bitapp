const express = require('express');
const hbs = require('hbs');
var favicon = require('serve-favicon');
var path = require('path');

const weather = require('./weather/weather');
const coin = require('./coin/coin');

// process stores all the system environment
// If PORT does not exist, use 3000 instead
const port = process.env.PORT || 3000;

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// add partial support for hbs
hbs.registerPartials(__dirname + '/views/partials');

// add a hbs helper
hbs.registerHelper('getCurrentDate', () => {
    return new Date().toLocaleString();
})

hbs.registerHelper('screemIt', (text) => {
    return text.toUpperCase();
})

// set server rendering engine to hbs
app.set('view engine', 'hbs');

// provide static html file access
app.use(express.static(__dirname + './public'));


app.use((req, res, next) => {
    var rightNow = new Date().toLocaleString();
    var user_agent = req.headers['user-agent'];
    console.log(rightNow, user_agent);
    next();
})

// app.get('/', (req, res) => {

//     console.log(req);
//     weather.getWeather(req.ip, (data) => {
//         // console.log(data);
//         res.render('weather.hbs', data);
//     });
// });


// app.get('/', (req, res) => {
//     console.log(new Date(), req.url);

//     var headers = JSON.stringify(req.headers, undefined, 4);
//     var now = new Date().toLocaleString();
//     var user_agent = req.headers['user-agent'];

//     res.send(`<h1>It works!</h1>
//     <h3>${now}<h3> 

//     <h3>${user_agent}</h3>


//     ${headers}

//     <h3><a href='/bit'> SC Price </a></h3>
//     <h3><a href='/weather'> Weather </a></h3>

//     `)
// })



app.get('/bit', (req, res) => {

    coin.getPrice('btc-sc', (data) => {
        console.log(JSON.stringify(data, null, 2));
        // res.send(JSON.stringify(data, null, 2));

        res.render('bit.hbs', data)
    });

})

app.get('/', (req, res) => {

    console.log('req.ip', req.ip);
    console.log('req.ip split', req.ip.split(':'));
    console.log('req.ip split.length', req.ip.split(':').length);
    console.log('req.ip split.[-1]', req.ip.split(':')[req.ip.split(':').length - 1]);
    console.log('req.ips', req.ips);

    console.log("req.headers['x-forwarded-for']", req.headers['x-forwarded-for']);

    var ip = req.ip.split(':')[req.ip.split(':').length - 1]

    ip = req.headers['x-forwarded-for'].split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    weather.getWeather(ip, (data) => {
        console.log(data);

        // res.render('weather.hbs', data);

        res.render('weather.hbs', {
            ip: data.ip,
            city: data.city,
            lat: data.lat,
            lng: data.lng,
            summarycurrent: data.summarycurrent,
            summaryhourly: data.summaryhourly,
            summarydaily: data.summarydaily
        })
    })
});

app.get('/header', (req, res) => {

    var headers = JSON.stringify(req.headers, undefined, 4);
    // console.log(req);
    // console.log(JSON.stringify(req, null, 2));
    res.send(JSON.stringify(req.rawHeaders, null, 4));
    // res.send(req.ips);
})


app.get('/bad', (req, res) => {
    res.status(400).send({
        name: 'Andrew',
        likes: ['Biking', 'Movie'],
        errorMessage: 'Unable to handle request'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})