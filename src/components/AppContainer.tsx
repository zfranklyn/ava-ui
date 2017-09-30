import * as React from 'react';
import './AppContainer.css';

import NavbarComponent from './NavbarComponent';

class AppContainer extends React.Component<{}, {}> {
  render() {
    return (
      <div className="ava-container">
        <NavbarComponent />
      </div>
    );
  }
}

export default AppContainer;
