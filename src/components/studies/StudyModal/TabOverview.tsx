import * as React from 'react';
import './TabOverview.css';

// import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';
let ReactVis = require('react-vis');

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

  private renderDonutChart = (responseRate: number, title: string) => {
    const colorRange = ['#BFCCD6', '#2B95D6'];
    const data = [{angle: (responseRate / 100), colorType: 0, radius: 5, innerRadius: 4},
                  {angle: 1 - (responseRate / 100), colorType: 1, radius: 5, innerRadius: 4},
                  ];
    return (
      <ReactVis.RadialChart
        colorRange={colorRange}
        data={data}
        width={60}
        height={60}
      />
    );
  }

  public render() {
    return (
      <div>
        Hello
        {this.renderDonutChart(75, 'Average Response Rate')}
      </div>
    );
  }
}

export default TabOverview;
