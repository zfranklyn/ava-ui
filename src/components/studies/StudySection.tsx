import * as React from 'react';
import './StudySection.css';

import StudyNavigation from './StudyNavigation/StudyNavigation';
import StudyList from './StudyList/StudyList';

class StudySection extends React.Component<{}, {}> {
  render() {
    return (
      <div className="study-section">
        <StudyNavigation title={'Studies'}/>
        <StudyList />
      </div>
    );
  }
}

export default StudySection;
