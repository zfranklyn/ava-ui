import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './AppContainer.css';

import NavbarComponent from './NavbarComponent';
import StudySection from './studies/StudySection';
import ParticipantSection from './participants/ParticipantSection';

class AppContainer extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <div className="ava-container">
            <NavbarComponent />
            <Route path="/studies" component={StudySection}/>
            <Route path="/participants" component={ParticipantSection}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default AppContainer;
