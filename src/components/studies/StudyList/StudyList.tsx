import * as React from 'react';
import './StudyList.css';
import './StudyCard.css';

import { IAPIStudy } from './../../../models/study.model';
import { Tag, Intent, Icon } from '@blueprintjs/core';

export interface IStudyListProps {
  studies: any[];
  openStudy: Function;
  closeStudy: Function;
}

class StudyList extends React.Component<IStudyListProps, {}> {
  render() {
    return (
      <div className="study-list">
        {this.props.studies.map((studyData: IAPIStudy, index: number) => {
          return (
            <div 
              className="study-card pt-card pt-elevation-2 pt-interactive"
              key={index}
              onClick={() => this.props.openStudy(studyData.id)}
            >
              {renderStudyCard(studyData)}
            </div>
          );
        })}

      </div>
    );
  }
}

const renderStudyCard = (studyData: IAPIStudy) => {

  return (
    <div>
      <Icon className="study-status active" iconName="pt-icon-record" /> 
      <h5 className="pt-text-overflow-ellipsis">{studyData.title}</h5>
      <p className="pt-ui-text pt-text-muted pt-text-overflow-ellipsis">
        {studyData.description}
      </p>
      <div className="study-tags">
        <Tag className="pt-minimal pt-round" intent={Intent.NONE}>Survey</Tag>
      </div>
    </div>
  );
};

export default StudyList;
