import * as React from 'react';
import './TabParticipants.css';

// import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';

// import { IAPIStudy } from './../../../models/study.model';

interface ITabParticipantsProps {
}

interface ITabParticipantsState {
}

class TabParticipants extends React.Component<ITabParticipantsProps, ITabParticipantsState> {

  // private url = 'http://localhost:8080/studies';

  public constructor(props: ITabParticipantsProps) {
    super(props);
    this.state = {
    };
  }

  public componentDidMount() {
    console.log('Participants Tab Mounted');
  }

  public render() {
    return <div>Participants</div>;
  }
}

export default TabParticipants;
