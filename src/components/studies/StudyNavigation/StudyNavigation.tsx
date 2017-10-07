import * as React from 'react';
import './StudyNavigation.css';

import { Switch } from '@blueprintjs/core';

interface StudyNavigationProps {
    title: string;
}

interface StudyNavigationState {

}

class StudyNavigation extends React.Component<StudyNavigationProps, StudyNavigationState> {
  render() {
    return (
      <div className="study-navigation">
        <h2>{this.props.title}</h2>
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
