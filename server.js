const express = require('express');
const hbs = require('hbs');

const weather = require('./weather/weather');
const coin = require('./coin/coin');

var app = express();

// set server rendering engine
app.set('view engine', 'hbs');

// provide static html file access
app.use(express.static(__dirname + './public'));

app.use((req, res, next) => {

    var rightNow = new Date().toLocaleString();
    var user_agent = req.headers['user-agent'];
    console.log(rightNow, user_agent);
    // console.log(JSON.stringify(req.headers, undefined, 4));
    // console.log(req.headers['user-agent']);
    next();
})




app.get('/', (req, res) => {
    console.log(new Date(), req.url);

    var headers = JSON.stringify(req.headers, undefined, 4);
    var now = new Date().toLocaleString();
    var user_agent = req.headers['user-agent'];

    res.send(`<h1>It works!</h1>
    <h3>${now}<h3> 
    
    <h3>${user_agent}</h3>


    ${headers}

    <h3><a href='/bit'> SC Price </a></h3>
    <h3><a href='/weather'> Weather </a></h3>
    
    `)
})



app.get('/bit', (req, res) => {

    coin.getPrice('btc-sc', (data)=>{
        console.log(JSON.stringify(data, null, 2));
        // res.send(JSON.stringify(data, null, 2));

        res.render('bit.hbs', data)
    });
    
    // res.send('coin price');
})

app.get('/weather', (req, res) => {
    weather.getWeather((result) => {
        console.log(result.currently.summary);
        console.log(result.hourly.summary);
        console.log(result.daily.summary);

        res.render('weather.hbs', {
            ip: '8.8.8.8',
            city: 'suzhou',
            lat: 32,
            lng: 34,
            summary: result.currently.summary + '\n' + result.hourly.summary + '\n' + result.daily.summary
        })
    })
});



app.get('/bad', (req, res) => {
    res.send({
        name: 'Andrew',
        likes: ['Biking', 'Movie'],
        errorMessage: 'Unable to handle request'
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})