import React, { Component } from "react";
import { Button } from 'reactstrap';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      weatherDataLoaded: false,
      mapDataLoaded: false
    }
    this.fetchMapData = this.fetchMapData.bind(this);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  async componentDidMount() {
    await this.fetchWeatherData();
    this.setState({ weatherDataLoaded: true });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.weatherDataLoaded && ! prevState.weatherDataLoaded) {
      await this.fetchMapData();
      this.setState({ mapDataLoaded: true });
    }
  }

  async fetchWeatherData() {
    console.log('fetching weather data...');
    return;
  }

  async fetchMapData() {
    console.log('fetching map data...');
    return;
  }
  
  render() {
    return (
      <div>
        <h1>Weatherly</h1>
        <Button color="danger"> click me!</Button>
        {this.state.weatherDataLoaded ? <p>The weather is: cold</p>: null}
        {this.state.mapDataLoaded ? <p>Map goes here</p>: null}
      </div>
    )
  }
}

export default App;
