import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';
import Today from './components/today/Today';
import Signup from './components/signup/Signup.js';
import Login from './components/login/Login.js';
import AllCalendar from './components/all-calendar/AllCalendar.js';
import './App.css';
// import Moment from 'react-moment';

// to-do:
// -redirect mooncal/access to logged in users only
// make api call blank date to blank date, from - to
// calculate moon phases (based off current api structure) : SEED MOON PHASES
// add dateISO to existing seeds
//add eyes that follow cursor

class App extends React.Component {
  state = {
    currentlyLoggedIn: null,
    ready: false,
    signupShowing: false,
    loginShowing: false,
    cosmicInfo: [],
    moonInfo: [],
    weatherInfo: []
  };

  month = async () => {
    let result = await axios.get(
      `${process.env.REACT_APP_BASE}/allCallsForMonth`
    );
    return result.data;
  };

  // Sign up/log in
  getCurrentlyLoggedInUser = () => {
    console.log('FETCHING USER!!!!');
    axios
      .get(`${process.env.REACT_APP_BASE}/api/auth/getcurrentuser`, {
        withCredentials: true
      })
      .then(response => {
        console.log('yay really fetching the user now');
        let theUser = response.data;
        this.setState({ currentlyLoggedIn: theUser, ready: true });
      })
      .catch(() => {
        this.setState({ currentlyLoggedIn: null });
      });
  };

  toggleForm = whichForm => {
    let theForm;

    if (whichForm === 'signup') {
      theForm = 'signupShowing';
    } else {
      theForm = 'loginShowing';
    }

    this.setState({ [theForm]: !this.state[theForm] });
  };

  async componentDidMount() {
    let apiResults = await this.month();
    console.log('should get:', apiResults);
    this.setState({
      cosmicInfo: apiResults.cosmic,
      moonInfo: apiResults.moon,
      weatherInfo: apiResults.weather
    });
    // this.fetchEvents();
    this.getCurrentlyLoggedInUser();
  }

  logout = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        this.getCurrentlyLoggedInUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // if I want a search a bar this is where the function would go

  render() {
    console.log('*************', this.state);

    return (
      <div>
        <div>
          <Navbar
            theUser={this.state.currentlyLoggedIn}
            pleaseLogOut={this.logout}
            toggleForm={this.toggleForm}
            getUser={this.getCurrentlyLoggedInUser}
          />

          {this.state.signupShowing && (
            <Signup
              getUser={this.getCurrentlyLoggedInUser}
              toggleForm={this.toggleForm}
            />
          )}

          {this.state.loginShowing && (
            <Login
              getUser={this.getCurrentlyLoggedInUser}
              toggleForm={this.toggleForm}
            />
          )}
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Today
                firstCosmic={this.state.cosmicInfo[0]}
                firstMoon={this.state.moonInfo[0]}
                firstWeather={this.state.weatherInfo[0]}
                ready={this.state.ready}
              />
            )}
          />
          {/* 
          <Route
            exact
            path="/home"
            render={props => (
              <Home
                // user events/ profile (two CRUDS)
                ready={this.state.ready}
                theUser={this.state.currentlyLoggedIn}
              />
            )}
          /> */}

          <Route
            exact
            path="/all-calendar"
            render={() => {
              if (this.state.currentlyLoggedIn)
                return (
                  <AllCalendar
                    currentlyLoggedIn={this.state.currentlyLoggedIn}
                    weatherEvents={this.state.weatherInfo}
                    moonEvents={this.state.moonInfo}
                    cosmicEvents={this.state.cosmicInfo}
                    ready={this.state.ready}
                    theUser={this.state.currentlyLoggedIn}
                  />
                );
              else return <Redirect to="/" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
