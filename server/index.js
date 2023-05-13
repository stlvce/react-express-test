const express = require('express');
const cors = require('cors');
const app = express();


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), (req, res) => res.send('hello world'))
app.get('/parameters', (req, res) => res.send('hello world'))
app.post('/', (req, res) => {
    let action = req.query.action;
    switch(action) {
        case 'перезапуск': 
            return setTimeout(() => res.send(false), 5000)
        case 'отключение': 
            return null
        default:
            return null
    }
})


app.listen(5000);