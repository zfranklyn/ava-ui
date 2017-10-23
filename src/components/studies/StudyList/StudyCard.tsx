import * as React from 'react';
import './StudyCard.css';

import { Tag, Intent, Icon } from '@blueprintjs/core';
import { IAPIStudy } from './../../../models/study.model';

export interface IStudyCardProps {
  studyData: IAPIStudy;
}

class StudyCard extends React.Component<IStudyCardProps, {}> {

  public render() {
    return (
      <div className="study-card pt-card pt-elevation-2 pt-interactive">
        <Icon className="study-status active" iconName="pt-icon-record" /> 
        <h5 className="pt-text-overflow-ellipsis">{this.props.studyData.title}</h5>
        <p className="pt-ui-text pt-text-muted pt-text-overflow-ellipsis">
          {this.props.studyData.description}
        </p>
        <div className="study-tags">
          <Tag className="pt-minimal pt-round" intent={Intent.NONE}>Survey</Tag>
        </div>
      </div>
    );
  }
}

export default StudyCard;
