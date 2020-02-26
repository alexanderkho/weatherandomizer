const express = require('express');
const path = require('path');
const axios = require('axios');
const utils = require('./utils.js');
const cors = require('cors');

const app = express();

const corsOptions  = {
    origin: '*',
    methods: 'GET,POST,PUT',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../dist')));


app.get('/api/random', async (req, res) => {
    try {
        const data = await utils.getRandomWeatherData();
        res.send(data).status(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.listen(8080, () => console.log('listening on port 8080...'));

