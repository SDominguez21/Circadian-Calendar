import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

function Navbar(props) {
  const doTheLogout = () => {
    props.pleaseLogOut();
  };

  return (
    <nav>
      {props.theUser && (
        <Link to="/" style={{ textDecoration: 'none', margin: '10px' }}>
          <button>Home</button>
        </Link>
      )}

      {!props.theUser && (
        <span>
          <button onClick={() => props.toggleForm('login')}> Login </button>
          <button onClick={() => props.toggleForm('signup')}>Sign Up</button>
        </span>
      )}

      {props.theUser && (
        <span>
          <Link to="/" onClick={doTheLogout}>
            <button>Log Out</button>
          </Link>

          <span className="welcome-greetings">
            Hello, {props.theUser.username}
          </span>
        </span>
      )}
    </nav>
  );
}

export default Navbar;
