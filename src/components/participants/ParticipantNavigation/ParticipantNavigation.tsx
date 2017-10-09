import * as React from 'react';
import './ParticipantNavigation.css';

import { Switch } from '@blueprintjs/core';

interface IParticipantNavigationProps {
    title: string;
}

interface IParticipantNavigationState {

}

class StudyNavigation extends React.Component<IParticipantNavigationProps, IParticipantNavigationState> {
  render() {
    return (
      <div className="participant-navigation">
        <div className="title-bar">
          <h4>{this.props.title}</h4>
        </div>
        <div className="controls">
          <div className="pt-form-group">
            <div className="pt-input-group">
              <span className="pt-icon pt-icon-search"/>
              <input id="search" className="pt-input" placeholder="Search Participants"/>
            </div>
          </div>
          <div className="pt-input-group">
            <Switch label="" />
          </div>
        </div>
      </div>
    );
  }
}

export default StudyNavigation;
