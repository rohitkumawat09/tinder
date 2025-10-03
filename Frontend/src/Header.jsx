import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyLogo</div>
      <nav className="nav">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/UPdataprofile">UP data profile</Link></li>
          <li><Link to="/MyProfile">My Profile</Link></li>
          <li><Link to="/loginform">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
