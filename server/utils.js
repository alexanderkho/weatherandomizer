require('dotenv').config();
const axios = require('axios');

const _fetchCoordinate = async (type) => {
    try {
        const options = {
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "id": "weatherApp",
            "params": {
                "apiKey": process.env.RANDOM_KEY,
                "n": 1,
            }
        }
        if (type === 'lat') {
            options.params = {...options.params, min: -90, max: 90}; //lat is between 0 and 90 (+ for N, - for S)
        } else if (type === 'lon') {
            options.params = {...options.params, min: -180, max: 180}; //long is between 0 and 180 (+ for E, - for W)
        }
        const apiRes = await axios.post('https://api.random.org/json-rpc/2/invoke', options);
        return apiRes.data.result.random.data[0];
    } catch (e) {
        throw 'could not retrieve coordinates ' + e;
    }
}

module.exports.getRandomCoordinates = async () => {
    try {
        await Promise.all([_fetchCoordinate('lat'), _fetchCoordinate('lon')]).then((res) => {
            location = {lat: res[0], lon: res[1]}
        });
        return location;
    } catch (e) {
        console.log(e)
    }
}

//mocks the api call for testing purposes
module.exports.getRandomCoordinatesSync = () => {
    const signs = [1, -1];
    return {
        lat: Math.floor(Math.random() * 91) * signs[Math.floor(Math.random() * 2)],
        lon: Math.floor(Math.random() * 181) * signs[Math.floor(Math.random() * 2)]
    }
}

module.exports.owmKey = process.env.OWM_KEY;