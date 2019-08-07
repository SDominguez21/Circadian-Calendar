import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
  const doTheLogout = () => {
    props.pleaseLogOut();
  };

  return (
    <nav>
      {props.theUser && (
        <Link to="/" style={{ textDecoration: 'none', margin: '10px' }}>
          Today
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
          <button>
            <Link to="/" onClick={doTheLogout}>
              Log Out
            </Link>
          </button>

          <span>Hello, {props.theUser.username}</span>
        </span>
      )}
    </nav>
  );
}

export default Navbar;
