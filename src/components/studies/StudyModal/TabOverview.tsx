import * as React from 'react';
import './TabOverview.css';

// import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';

// import { IAPIStudy } from './../../../models/study.model';

interface ITabOverviewProps {
}

interface ITabOverviewState {
}

class TabOverview extends React.Component<ITabOverviewProps, ITabOverviewState> {

  // private url = 'http://localhost:8080/studies';

  public constructor(props: ITabOverviewProps) {
    super(props);
    this.state = {
    };
  }

  public componentDidMount() {
    console.log('Overview Tab Mounted');
  }

  public render() {
    return <div>Overview</div>;
  }
}

export default TabOverview;
