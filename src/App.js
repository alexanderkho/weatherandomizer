import React, { Component } from 'react';
import { Button, Spinner, Jumbotron, Container, Row, Col } from 'reactstrap';
import WeatherView from './WeatherView.js';
import MapView from './MapView.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loc: null,
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
    const data = await fetch('/api/random').then(res => res.json());
    this.setState({ loc: data.loc, weatherData: data.weatherData, loading: false });
  }

  handleClick() {
    this.setState({ loading: true }, this.fetchWeatherData);
  }
  
  render() {
    return (
      <div>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <div style={{textAlign: "center"}}>
                <h1 className="display-2">WeatheRandomizer</h1>
                <hr></hr>
                <p className="lead">Get Weather Info for Random Locations Across the Globe!</p>
              </div>
            </Container>
          </Jumbotron>
        </div>
          {this.state.loading ? <Spinner size="lg" color="primary"/> : 
          <Container style={{marginBottom: "2rem"}}>
            <Row>
              <Col xs="6">
                <h2>Current Location: {this.state.loc}</h2>
                <Button color="primary" size="lg" onClick={this.handleClick}>Try Another Location!</Button>
                <WeatherView weatherData={this.state.weatherData} />
              </Col>
              <Col xs="6">
                <MapView loc={this.state.loc} />
              </Col>
            </Row>
          </Container>
          }
      </div>
    )
  }
}

export default App;
