import * as React from 'react';
import './StudyList.css';

import StudyCard from './StudyCard';

class StudyList extends React.Component<{}, {}> {
  render() {
    return (
      <div className="study-list">
        <StudyCard />
        <StudyCard />
        <StudyCard />
        <StudyCard />
        <StudyCard />
        <StudyCard />
      </div>
    );
  }
}

export default StudyList;
