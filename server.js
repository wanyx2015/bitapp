const express = require('express');

var app = express();

app.use((req, res, next)=>{

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
    `)
})

app.get('/bit', (req, res)=>{

    res.send('coin price');
})

app.listen(3000, () => {
    console.log("Server started on port 3000.")
})