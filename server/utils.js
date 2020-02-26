require('dotenv').config();
const axios = require('axios');

//Fetches new coordinates until they are in a valid city
module.exports.getRandomWeatherData = async () => {
    let isValidLocation = false;
    let coords;
    let weatherData;
    while (isValidLocation === false) {
        coords = await _getRandomCoordinates();
        weatherData = await _getWeatherData(coords);
        if (weatherData.name !== '') {
            isValidLocation = true;
        }
    }
    return { coords, weatherData };
}


//Helper Functions
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

const _getWeatherData = async (coords) => {
    const weatherData = await axios.get
            (`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.OWM_KEY}&units=metric`);
    return weatherData.data;
}