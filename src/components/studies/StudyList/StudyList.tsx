import * as React from 'react';
import './StudyList.css';

import StudyCard from './StudyCard';

export interface IStudyListProps {
  studies: any[];
}

class StudyList extends React.Component<IStudyListProps, {}> {
  render() {
    return (
      <div className="study-list">

        {this.props.studies.map((studyData: any, index: number) => {
          return <StudyCard studyData={studyData} key={index}/>;
        })}

      </div>
    );
  }
}

export default StudyList;
