import React from 'react';
import googleApiKey from './googleApiKey.js';

const MapView = ({ loc }) => {
    return (
        <iframe 
        width="600"
        height="450"
        frameBorder="0" style={{border:0}}
        src={`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=${loc}`} allowFullScreen>
        </iframe>
    )
}

export default MapView;