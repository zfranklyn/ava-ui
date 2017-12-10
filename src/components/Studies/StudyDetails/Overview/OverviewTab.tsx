import * as React from 'react';
import {
  
} from '@blueprintjs/core';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.css';
const Charts = require('ant-design-pro/lib/Charts');
import { Timeline, Card } from 'antd';
import { ITaskAPI } from './../../../../sharedTypes';
// import axios from 'axios';
// import * as moment from 'moment';

export interface IOverviewTabProps {
  studyId: string;
}

export interface IOverviewTabState {
  currentResponseRate: number;
  averageResponseRate: number;
}

class OverviewTab extends React.Component<IOverviewTabProps, IOverviewTabState> {

  constructor(props: IOverviewTabProps) {
    super(props);
    this.state = {
      currentResponseRate: 68,
      averageResponseRate: 75
    };
  }

  private renderTimeline = (recentTasks: ITaskAPI[]) => {
    if (recentTasks.length) {
      return (
        <Timeline>
          {recentTasks.map((task: ITaskAPI, index: number) => {
            return (
              <Timeline.Item key={index} color="green">{task.description}</Timeline.Item>
            );
          })}
        </Timeline>
      );

    } else {

      return (
        <Timeline>
          <Timeline.Item color="green">SMS: Survey to Corbett Prep</Timeline.Item>
          <Timeline.Item color="green">SMS: Reminder to Corbett Prep</Timeline.Item>
          <Timeline.Item color="gray">SMS: Reminder to Corbett Prep</Timeline.Item>
          <Timeline.Item color="gray">SMS: Reminder to Corbett Prep</Timeline.Item>
          <Timeline.Item color="gray">SMS: Reminder to Corbett Prep</Timeline.Item>
        </Timeline>
      );

      // return (
      //   <div>No Recent Tasks</div>
      // );
    }
  }

  public render() {
    return (
      <div style={STYLES.CONTAINER_STYLE}>
        <Charts.ChartCard
          title="Survey Response Rates"
          total={`${this.state.currentResponseRate}%`}
        >
        <Charts.MiniProgress
          percent={this.state.currentResponseRate}
          strokeWidth={8}
          target={this.state.averageResponseRate}
        />
        </Charts.ChartCard>

        <Card title="Recent Tasks">
          {this.renderTimeline([])}
        </Card>

      </div>
    );
  }

}

const STYLES = {
  CARD_STYLE: {
    maxWidth: '300px',
    margin: '5px',
  },
  STAT_STYLE: {
    fontWeight: 100 as 100,
    fontSize: '3em',
  },
  STATS_CONTAINER_STYLE: {
    display: 'flex',
  },
  CONTAINER_STYLE: {
    width: '100%',
    height: '100%',
  },
};

export default OverviewTab;
