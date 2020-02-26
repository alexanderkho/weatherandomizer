require('dotenv').config();
const axios = require('axios');
const countryCodes = require('./countryCodes.js');

module.exports.getRandomWeatherData = async () => {
    let isValidLocation = false;
    let coords;
    let weatherData;
    
    //brute force search to find coordinates with a valid city
    while (isValidLocation === false) {
        coords = await _getRandomCoordinates();
        var loc;
        for (let i = 0; i < coords.lat.length; i ++) {
            for (let j = 0; j < coords.lon.length; j ++) {
                weatherData = await _getWeatherData(coords.lat[i], coords.lon[j]);
                if (weatherData.name !== '') {
                    isValidLocation = true;
                    loc =  weatherData.name + ', ' + countryCodes[weatherData.sys.country] 
                    || weatherData.sys.country; // handle edge case of no corresponding country code in file
                    break;
                }
            }
            if (isValidLocation) break;
        }
    }
    return { loc, weatherData };
}

//Helper Functions

const _getWeatherData = async (lat, lon) => {
    const weatherData = await axios.get
    (`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OWM_KEY}&units=imperial`);
    return weatherData.data;
}

const _getRandomCoordinates = async () => {
    try {
        await Promise.all([_fetchCoordinate('lat'), _fetchCoordinate('lon')]).then((res) => {
            location = {lat: res[0], lon: res[1]}
        });
        return location;
    } catch (e) {
        console.log(e)
    }
}

const _fetchCoordinate = async (type) => {
    try {
        const options = {
            "jsonrpc": "2.0",
            "method": "generateIntegers",
            "id": "weatherApp",
            "params": {
                "apiKey": process.env.RANDOM_KEY,
                "n": 10,
            }
        }
        if (type === 'lat') {
            options.params = {...options.params, min: -90, max: 90}; //lat is between 0 and 90 (+ for N, - for S)
        } else if (type === 'lon') {
            options.params = {...options.params, min: -180, max: 180}; //long is between 0 and 180 (+ for E, - for W)
        }
        const apiRes = await axios.post('https://api.random.org/json-rpc/2/invoke', options);
        return apiRes.data.result.random.data;
    } catch (e) {
        throw 'could not retrieve coordinates ' + e;
    }
}