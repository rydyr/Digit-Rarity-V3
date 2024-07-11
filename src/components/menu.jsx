import React, { useState } from 'react';
import "./menu.css";
import Documentation from './documentation.jsx';

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDocVis, setIsDocVis] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDoc = () => {
    setIsDocVis(!isDocVis);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="menuTitle desktop">Welcome Anon!</h2>
        <div className="menuButton" onClick={toggleMenu}>
          <div className="burger">{isMenuOpen ? 'X' : 'DR'}</div>
        </div>
        <div className={`menuItems ${isMenuOpen ? 'show' : ''}`}>
          <h2 className="menuTitle mobile">Welcome Anon!</h2>
          <a className="menuItemDisabled">Login</a>
          <a className="menuItemDisabled">About</a>
          <a className='menuItemDisabled'>Favorites</a>
          <a id="docsLink" className="menuItem" onClick={toggleDoc}>Docs</a>
          <a className='menuItemDisabled'>Stats</a>
        </div>
        {isDocVis && <Documentation onClose={toggleDoc} />}
      </div>
    </nav>
  );
}

export default Menu;
