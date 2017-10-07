import * as React from 'react';
import './AppContainer.css';

import NavbarComponent from './NavbarComponent';
import StudySection from './studies/StudySection';
// import ParticipantSection from './participants/ParticipantSection';

class AppContainer extends React.Component<{}, {}> {
  render() {
    return (
      <div className="ava-container">
        <NavbarComponent />
        <StudySection />
      </div>
    );
  }
}

export default AppContainer;
