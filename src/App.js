import React, { Component } from "react";
import { Button } from 'reactstrap';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      coords: null,
      weatherData: null
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  async componentDidMount() {
    await this.fetchWeatherData();
  }

  async fetchWeatherData() {
    const data = await fetch('http://localhost:8080/api/random').then(res => res.json());
    this.setState({ coords: data.coords, weatherData: data.weatherData });
  }
  
  render() {
    return (
      <div>
        <h1>Weatherly</h1>
        <Button color="danger"> click me!</Button>
        {this.state.coords && this.state.weatherData ? 
        <p>yo</p> 
        : null }
      </div>
    )
  }
}

export default App;
