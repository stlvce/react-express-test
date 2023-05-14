const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}
app.use(bodyParser.json({ type: 'application/*+json' }))
app.options('/device/parameters', cors())
app.use(bodyParser.urlencoded({ 
    extended: true 
}));

let dataDevice = JSON.parse(fs.readFileSync('./db/parameters.json'));
let dataLog = JSON.parse(fs.readFileSync('./db/changelog.json'));

function parametersUpdate(obj) {
    fs.writeFileSync('./db/changelog.json', JSON.stringify([dataLog, ...obj.filter(i => i.value !== i.oldValue)]));
}

function addLog(obj) {
    dataLog.push(obj)
    fs.writeFileSync('./db/changelog.json', JSON.stringify(dataLog));
}


app.get('/', cors(corsOptions), (req, res) => res.send('hello world'))

app.get('/device', cors(corsOptions), (req, res) => {
    let action = req.query.action;
    switch(action) {
        case 'restart': 
            return setTimeout(() => res.send(false), 5000)
        case 'off': 
            dataDevice[0].value = "отключено"
            fs.writeFileSync('./db/parameters.json', JSON.stringify(dataDevice));
            return res.send(dataDevice)
        case 'on':
            dataDevice[0].value = "включено"
            fs.writeFileSync('./db/parameters.json', JSON.stringify(dataDevice));
            return res.send(dataDevice)
        default:
            return null
    }
})

app.get('/device/parameters', cors(corsOptions), (req, res) => res.send(dataDevice))

app.put('/device/parameters', cors(corsOptions), (req, res) => {
    console.log(req.body)
    // parametersUpdate(req.body)
    return res.send(dataDevice)
})

app.get('/changelog', cors(corsOptions), (req, res) => {
    return res.send(dataLog)
})

app.post('/changelog', cors(corsOptions), (req, res) => {
    addLog({ name: "Сила сигнала Wi-Fi сети", prev: "1", next: "22"})
    return res.send("OK")
})


app.listen(5000);