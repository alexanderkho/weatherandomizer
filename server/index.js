const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api/random', (req, res) => {

});

app.listen(8080, () => console.log('listening on 8080'));

