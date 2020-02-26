import React from 'react';
import { Card } from 'reactstrap';

const WeatherView = ({ weatherData }) => {
    return (
        <div>
            <Card>
                <p><em>Current Weather:</em> {weatherData.weather[0].description}</p>
                <p style={{fontSize: "4rem", marginLeft: "40%"}}>{mapWeatherEmoji(weatherData.weather[0].description)}</p>
            </Card>
            <Card>
                <p><em>Current Temp:</em> {weatherData.main.temp + '°F'}</p>
                <p><em>Feels Like:</em> {weatherData.main.feels_like + '°F'}</p>
                <p style={{fontSize: "4rem", marginLeft: "40%"}}>{mapTempEmoji(weatherData.main.feels_like)}</p>
            </Card>
        </div>
    )
}

const mapWeatherEmoji = (description) => {
    const weatherEmojis = {
        'sun': '🌞',
        'cloud': '☁️',
        'rain': '🌨',
        'thunder': '🌩',
        'snow': '❄️',
        'clear': '🌎'

    }

    for (let key in weatherEmojis) {
        if (description.includes(key)) {
            return weatherEmojis[key];
        }
    }
    return '';
}

const mapTempEmoji = (temp) => {
    if (temp > 80) {
        return '🥵';
    } else if (50 < temp && temp < 80) {
        return '😎';
    } else if (32 < temp && temp < 50) {
        return '🙂'
    } else {
        return '🥶'
    }
}

export default WeatherView;