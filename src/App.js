import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import WeatherView from './WeatherView.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      coords: null,
      weatherData: null,
      loading: true
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.fetchWeatherData();
  }

  async fetchWeatherData() {
    const data = await fetch('http://localhost:8080/api/random').then(res => res.json());
    this.setState({ coords: data.coords, weatherData: data.weatherData, loading: false });
  }

  handleClick() {
    this.setState({ loading: true }, this.fetchWeatherData);
  }
  
  render() {
    return (
      <div>
        <h1>Weatherly</h1>
        <Button color="primary" size="lg" onClick={this.handleClick}>Try Another Location!</Button>
        <div>
          {this.state.loading ? <Spinner size="lg" color="primary"/> : null}
        </div>
        {this.state.coords && this.state.weatherData ? 
        <WeatherView coords={this.state.coords} weatherData={this.state.weatherData} />
        :  null }
      </div>
    )
  }
}

export default App;
