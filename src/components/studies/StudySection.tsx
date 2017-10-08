import * as React from 'react';
import './StudySection.css';

import StudyNavigation from './StudyNavigation/StudyNavigation';
import StudyList from './StudyList/StudyList';
// import StudyModal from './StudyModal/StudyModal';

class StudySection extends React.Component<{}, {}> {
  render() {
    return (
      <div className="study-section">
        <StudyNavigation title={'Studies'}/>
        <StudyList />
        {/* <StudyModal/> */}
      </div>
    );
  }
}

export default StudySection;
