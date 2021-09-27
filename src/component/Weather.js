import React, { Component } from 'react';

class Weather extends Component {
    render() {
        return (
            <div>
                <p>Date :{this.props.weatherResult.date} </p>
                <p>description:{this.props.weatherResult.description} </p>
            </div>
        )
    }
}

export default Weather
