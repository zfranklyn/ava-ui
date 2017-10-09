import * as React from 'react';
import './StudyNavigation.css';

import { Switch } from '@blueprintjs/core';

interface IStudyNavigationProps {
    title: string;
}

interface IStudyNavigationState {

}

class StudyNavigation extends React.Component<IStudyNavigationProps, IStudyNavigationState> {
  render() {
    return (
      <div className="study-navigation">
        <div className="title-bar">
          <h4>{this.props.title}</h4>
        </div>
        <div className="controls">
          <div className="pt-form-group">
            <div className="pt-input-group">
              <span className="pt-icon pt-icon-search"/>
              <input id="search" className="pt-input" placeholder="Search Studies"/>
            </div>
          </div>
          <div className="pt-input-group">
            <Switch label="View Active Studies Only" />
          </div>
        </div>
      </div>
    );
  }
}

export default StudyNavigation;
