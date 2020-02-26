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
        const coords = await utils.getRandomCoordinates();
        const weatherRequest = await axios.get
            (`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${utils.owmKey}&units=metric`);
        const weatherData = weatherRequest.data
        res.send({ coords, weatherData }).status(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

app.listen(8080, () => console.log('listening on port 8080...'));

