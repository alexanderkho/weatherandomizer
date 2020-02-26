import React from 'react';
import googleAPIKey from './googleAPIKey.js';

const MapView = ({ loc }) => {
    return (
        <iframe 
        width="600"
        height="450"
        frameBorder="0" style={{border:0}}
        src={`https://www.google.com/maps/embed/v1/place?key=${googleAPIKey}&q=${loc}`} allowFullScreen>
        </iframe>
    )
}

export default MapView;