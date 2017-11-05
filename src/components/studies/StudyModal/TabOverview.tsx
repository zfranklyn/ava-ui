import * as React from 'react';
import './TabOverview.css';
import * as Moment from 'moment';

// import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';

import { IAPIStudy } from './../../../models/study.model';

interface ITabOverviewProps {
  studyData: IAPIStudy;
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
    return (
      <div>
        <span>Study Created At: {Moment(this.props.studyData.createdAt).format('HH:mm MM-DD-YYYY')}</span>
        <br/>
        <span>Study Last Updated At: {Moment(this.props.studyData.updatedAt).fromNow()}</span>
      </div>
    );
  }
}

export default TabOverview;
