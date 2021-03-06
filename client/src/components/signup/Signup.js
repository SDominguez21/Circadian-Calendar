import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // this.setState({usernameInput: 'hello' })
    // this is what this line evaluates to
  };

  tryToSignUp = e => {
    e.preventDefault();
    const uName = this.state.usernameInput;
    const pWord = this.state.passwordInput;

    axios
      .post(
        `${process.env.REACT_APP_BASE}/api/auth/signup`,
        {
          username: uName,
          password: pWord
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.getUser();
        this.props.toggleForm('signup');
      });
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.tryToSignUp}>
        <h3>Sign up</h3>

        <legend>Username</legend>
        <input
          value={this.state.usernameInput}
          name="usernameInput"
          onChange={this.handleChange}
        />

        <legend>Password</legend>
        <input
          value={this.state.passwordInput}
          name="passwordInput"
          type="password"
          onChange={this.handleChange}
        />

        <button>Submit</button>
      </form>
    );
  }
}

export default Signup;
