import React from 'react';
import axios from 'axios';
import Weather from './component/Weather.js';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: [],
      searchQuery: '',
      showLocInfo: false,
      showError: false,
      weatherResult: []
    }
  }

  getLocFun = async (e) => {
    e.preventDefault();
    // let cityName = e.target.city.value;
    await this.setState({
      searchQuery: e.target.City.value
    })

    try {
      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

      let locResult = await axios.get(reqUrl);
        console.log(locResult)
      this.setState({
        locationResult: locResult.data[0],
        showLocInfo: true,
        showError:false
      })
    } 
    catch {
      this.setState({
        showError: true,
        showLocInfo:false
      })
    }

    try {
      let reqUrl = `http://localhost:3001/weather?nameOfCity=${this.state.searchQuery}`;

      let weaResult = await axios.get(reqUrl);

      this.setState({
        weatherResult: weaResult.data,
        showLocInfo: true,
        showError:false
      })
    }
    catch {
      this.setState({
        showError: true,
        showLocInfo:false
      })
    }
  }

  render() {
    return (
      <div>
        <h3>City Explorer app</h3>
        <Form onSubmit={this.getLocFun} >
          <input type="text" name='City' />
          <input type="submit" value='get city info' />
        </Form>

        {this.state.showLocInfo &&

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt='city' />
            <Card.Body>
              <Card.Title>City Explorer</Card.Title>
              {/* <button variant="primary">Get Location</button> */}
            </Card.Body>
            <ListGroup variant="list-group-flush">
              <ListGroup.Item>{this.state.searchQuery}</ListGroup.Item>
              <ListGroup.Item>{this.state.locationResult.lat}</ListGroup.Item>
              <ListGroup.Item>{this.state.locationResult.lon}</ListGroup.Item>
              {this.state.weatherResult.map(info => {
              return (
                <ListGroup.Item>
              <Weather weatherResult={info} />
            </ListGroup.Item>
              )})} 
            </ListGroup>
          </Card>
        }
      </div>
    )
  }
}

export default App;
