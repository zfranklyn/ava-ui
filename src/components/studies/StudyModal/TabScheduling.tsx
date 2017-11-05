import * as React from 'react';
import './TabScheduling.css';

// import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';

import { IAPIStudy } from './../../../models/study.model';

interface ITabSchedulingProps {
  studyData: IAPIStudy;
}

interface ITabSchedulingState {
}

class TabScheduling extends React.Component<ITabSchedulingProps, ITabSchedulingState> {

  // private url = 'http://localhost:8080/studies';

  public constructor(props: ITabSchedulingProps) {
    super(props);
    this.state = {
    };
  }

  public componentDidMount() {
    console.log('Scheduling Tab Mounted');
  }

  public render() {
    return <div>Scheduling</div>;
  }
}

export default TabScheduling;
