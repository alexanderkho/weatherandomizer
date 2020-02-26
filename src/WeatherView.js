import React from 'react';
import MapView from './MapView.js';
import { countryCodes } from './clientUtils.js';

const WeatherView = ({ coords, weatherData }) => {
    const location = weatherData.name + ', ' + countryCodes[weatherData.sys.country] 
        || weatherData.sys.country; // handle edge case of no corresponding country code in file
    return (
        <div>
            <h2>Current Location: {location}</h2>
            <MapView loc={location} />
            <p><em>Current Weather:</em> {weatherData.weather[0].description}</p>
            <p><em>Current Temp:</em> {weatherData.main.temp + '°C'}</p>
            <p><em>Feels Like:</em> {weatherData.main.feels_like + '°C'}</p>
        </div>
    )
}

export default WeatherView;