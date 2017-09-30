import * as React from 'react';
import './NavbarComponent.css';

class NavbarComponent extends React.Component<{}, {}> {
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Automated Virtual Assessment</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-label">Studies</button>
          <button className="pt-button pt-minimal pt-icon-people">Participants</button>
        </div>
      </nav>
    );
  }
}

export default NavbarComponent;
