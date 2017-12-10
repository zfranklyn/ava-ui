import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './AppContainer.css';

import NavbarComponent from './Navbar/NavbarComponent';
import StudySection from './Studies/StudySection';
import StudyDetails from './Studies/StudyDetails/StudyDetails';
import UserSection from './Users/UserSection';

class AppContainer extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
          <div className="ava-container">
            <NavbarComponent/>
            <Route path="/studies" component={StudySection}/>
            <Route path="/study/:studyId" component={StudyDetails}/>
            <Route path="/users" component={UserSection}/>
          </div>
      </Router>
    );
  }
}

export default AppContainer;
