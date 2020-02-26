# WeatheRandomizer
This is a simple application which displays weather information for a randomly generated location.

## Technology Used
The front end of this app was created with React.js, using the nano-react-app (https://github.com/adrianmcli/nano-react-app) boilerplate starter code, and the Reactstrap (https://reactstrap.github.io/) component styling library. The backend was built with Node.js and Express. 

The backend of this application makes use of the Random.org API (https://openweathermap.org/api) to generate random GPS coordinates and the Open Weather Maps API https://openweathermap.org/api) to fetch weather data. The front end uses the Google Maps Embedded API (https://developers.google.com/maps/documentation/embed/guide) to display the geographical location of the weather. 

## Running The App
All three external API's require a unique access key in order to run this app. Please follow the instructions at in provided links to generate your own keys. Then, create a "./env" and "./src/googleAPIKey.js" file (using the provided example files as templates) and paste your keys into the correspoinding fields. 

Finally, to run this application:
```
npm install
npm run build
npm start
```
You can then visit http://localhost:8080 in your browser to view the application.
