import * as React from 'react';
import {
  Button,
  // Spinner,
  // Dialog,
} from '@blueprintjs/core';
import {
} from './../../../../sharedTypes';

export interface IParticipantsTabProps {
  studyId: string;
}

export interface IParticipantsTabState {
}

class ParticipantsTab extends React.Component<IParticipantsTabProps, IParticipantsTabState> {

  constructor(props: IParticipantsTabProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <div>

        <Button>Add Participant</Button>
        <Button>Recruit Participant</Button>
        <div className="pt-card">
          <h5>How to Recruit Users</h5>
          <p>
            Text "REGISTER {this.props.studyId}"
          </p>
        </div>
      </div>
    );
  }
}

export default ParticipantsTab;
