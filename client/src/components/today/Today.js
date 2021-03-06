import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './today.css';

export default class Today extends Component {
  state = {
    cosmicShowing: false,
    moonShowing: false,
    weatherShowing: false
  };

  // on toggle show info functions NOT DRY
  handleClickCosmic = () => {
    this.setState({
      cosmicShowing: !this.state.cosmicShowing
    });
  };

  handleClickMoon = () => {
    this.setState({
      moonShowing: !this.state.moonShowing
    });
  };

  handleClickWeather = () => {
    this.setState({
      weatherShowing: !this.state.weatherShowing
    });
  };

  componentDidMount() {
    // this.setState({
    //   cosmicInfo: this.props.firstCosmic,
    //   moonInfo: this.props.firstMoon,
    //   weatherInfo: this.props.firstWeather
    // });
  }

  render() {
    // console.log('inside of today', this.props);
    // console.log('6666666666', this.props.firstCosmic);
    return (
      <div className="today-container">
        <div className="caldiv">
          <Link to="/all-calendar">
            <button className="calbtn">CALENDAR</button>
          </Link>
        </div>
        <div className="todayBackground" />
        {/* cosmic */}
        <div className="cosmic-container">
          {this.state.cosmicShowing ? (
            <div className="today-stats" onClick={this.handleClickCosmic}>
              <p>{this.props.firstCosmic.name}</p>
              {/* <p>{this.props.firstCosmic.}</p> */}
            </div>
          ) : (
            <img
              src={require('../../shooting_star.png')}
              onClick={this.handleClickCosmic}
            />
          )}
        </div>

        {/* moon */}
        <div className="moon-container">
          {this.state.moonShowing ? (
            <div className="today-stats" onClick={this.handleClickMoon}>
              <p>{this.props.firstMoon.name}</p>
            </div>
          ) : (
            <img
              className="moon"
              src={require('../../moon.png')}
              onClick={this.handleClickMoon}
            />
          )}
        </div>

        {/* weather */}
        <div className="weather-container">
          {/* {console.log(this.state.weatherInfo)} */}
          {this.state.weatherShowing ? (
            <div className="today-stats" onClick={this.handleClickWeather}>
              <p>{this.props.firstWeather.weather}</p>
            </div>
          ) : (
            <img
              src={require('../../umbrella.png')}
              onClick={this.handleClickWeather}
            />
          )}
        </div>
      </div>
    );
  }
}
