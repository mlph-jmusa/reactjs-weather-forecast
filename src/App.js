import './App.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'react-bootstrap/Image'
import moment from 'moment';
import weatherData from './resources/weather.json';
import { Button } from 'react-bootstrap';
import { ForecastPage } from './resources/App';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherForecast/>
      </header>
    </div>
  );
}

export default App;

class WeatherForecast extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isPrevWeek: false, isNextWeek: false };
    this.handleNextClicked = this.handleNextClicked.bind(this);
    this.handlePrevClicked = this.handlePrevClicked.bind(this);
  }

  handleNextClicked() {
    if (!this.state.isPrevWeek && !this.state.isNextWeek) {
      this.setState({ isPrevWeek: false, isNextWeek: true });
    } else if (this.state.isPrevWeek) {
      this.setState({ isPrevWeek: false, isNextWeek: false });
    } 
  }

  handlePrevClicked() {
    if (!this.state.isPrevWeek && !this.state.isNextWeek) {
      this.setState({ isPrevWeek: true, isNextWeek: false });
    } else if (this.state.isNextWeek) {
      this.setState({ isPrevWeek: false, isNextWeek: false });
    } 
  }
  
  render() {
    var startDate = moment();
    var endDate = moment().add(7, 'd');
    var firstDayTitle = "Tomorrow";
    var isFirstDay = true;

    if (this.state.isPrevWeek) {
      startDate = moment().subtract(7, 'd');
      endDate = moment();
      firstDayTitle = "Prev week";
    }  
    
    if (this.state.isNextWeek) {
      startDate = moment().add(7, 'd');
      endDate = moment().add(14, 'd');
      firstDayTitle = "Next week";
    }

    console.log(startDate.format("MMM DD yyyy"));
    console.log(endDate);
    
    var items = [];

    var day = startDate;

    let weatherMappedData = weatherData.map((data) => data );

    do {
      let randomNumber = Math.floor(Math.random() * weatherMappedData.length);
      let weather = weatherMappedData[randomNumber];
      
        day = day.add(1, 'd');
        if (isFirstDay) {
          items.push(
            <Row key={day.date()} className="justify-content-md-center">
              <Col sm={2} className="main-col">
                <Container className="weather-tile">
                  <p className="day-title">{firstDayTitle}</p>
                  <Row className="justify-content-md-center"><p className="day-title">{ day.format("ddd") }<br/>{ day.format("MMM DD") }</p></Row>
                  <Row className="justify-content-md-center"><Container><Image className="weather-icon" src={ weather.image_url }/></Container></Row>
                  <Row className="justify-content-md-center"><p className="day-title">{ weather.temperature }°</p></Row>
                  <Row className="justify-content-md-center"><p className="day-title">{ weather.type }</p></Row>
                </Container>
              </Col>
            </Row>
          );
        } else {
          items.push(
            <Col key={day.date()} sm={2} className="main-col">
              <Container className="weather-tile">
                <Row className="justify-content-md-center"><p className="day-title">{ day.format("ddd") }<br/>{ day.format("MMM DD") }</p></Row>
                <Row className="justify-content-md-center"><Container><Image className="weather-icon" src={ weather.image_url }/></Container></Row>
                <Row className="justify-content-md-center"><p className="day-title">{ weather.temperature }°</p></Row>
                <Row className="justify-content-md-center"><p className="day-title">{ weather.type }</p></Row>
              </Container>
            </Col>
          ); 
        }

        isFirstDay = false;
    }
    while (day < endDate);

    return (
    <Container>
      <Row className="justify-content-md-center">
        {items}
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Button variant="outline-info" onClick={this.handlePrevClicked} >Prev</Button>
        </Col>
        <Col>
          <Button variant="outline-info" onClick={this.handleNextClicked}>Next</Button>
        </Col>
      </Row>
    </Container>
    );
  }
}
