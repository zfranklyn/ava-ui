import * as React from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
import 'antd/dist/antd.css';
const Charts = require('ant-design-pro/lib/Charts');
import {
  Timeline,
  Card,
  Tag,
} from 'antd';
import { ITaskAPI, ITask, convertTask, } from './../../../../sharedTypes';
import axios from 'axios';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface IOverviewTabProps {
  studyId: string;
}

export interface IOverviewTabState {
  currentResponseRate: number;
  averageResponseRate: number;
  recentTasks: ITask[];
}

class OverviewTab extends React.Component<IOverviewTabProps, IOverviewTabState> {

  constructor(props: IOverviewTabProps) {
    super(props);
    this.state = {
      currentResponseRate: 68,
      averageResponseRate: 75,
      recentTasks: [],
    };
  }

  private renderTimeline = (recentTasks: ITask[]) => {
    if (recentTasks.length) {
      return (
        <Timeline>
          {recentTasks.map((task: ITask, index: number) => {
            return (
              <Timeline.Item key={index} color={(task.completed) ? 'green' : 'gray'}>
                {task.description}
                <Tag style={{marginLeft: 5}}>{moment(task.scheduledTime).fromNow()}</Tag>
                <Tag>{task.mediumType}</Tag>
              </Timeline.Item>
            );
          })}
        </Timeline>
      );

    } else {

      return (
        <Timeline>
          <Timeline.Item color="gray">No Tasks</Timeline.Item>
        </Timeline>
      );
    }
  }

  private updateTimeline = () => {
    axios.get(`http://localhost:8080/study/${this.props.studyId}/recentTasks`)
    .then(res => res.data)
    .then((data: ITaskAPI[]) => {
      const recentTasks = _.sortBy(data.map(convertTask), d => d.scheduledTime);
      this.setState({
        recentTasks,
      });
    })
    .catch(console.log);
  }

  componentDidMount() {
    this.updateTimeline();
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
          {this.renderTimeline(this.state.recentTasks)}
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
