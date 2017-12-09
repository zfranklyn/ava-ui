import * as React from 'react';
import {
  
} from '@blueprintjs/core';
import {  } from './../../../../sharedTypes';
// import axios from 'axios';
import * as moment from 'moment';

export interface IOverviewTabProps {
  studyId: string;
}

export interface IOverviewTabState {
}

class OverviewTab extends React.Component<IOverviewTabProps, IOverviewTabState> {

  constructor(props: IOverviewTabProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <div style={STYLES.CONTAINER_STYLE}>
        <div style={STYLES.STATS_CONTAINER_STYLE}>
          <div className="pt-card pt-interactive" style={STYLES.CARD_STYLE}>
            <h5>
              Total Participants
            </h5>
            <span style={STYLES.STAT_STYLE}>
              238
            </span>
          </div>
          <div className="pt-card pt-interactive" style={STYLES.CARD_STYLE}>
            <h5>
              Average Response Rate
            </h5>
            <span style={STYLES.STAT_STYLE}>
              65.80%
            </span>
          </div>

          <div className="pt-card pt-interactive" style={STYLES.CARD_STYLE}>
            <h5>
              Recent Tasks
            </h5>
            <table className="pt-table pt-condensed pt-interactive">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Countdown</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Survey</td>
                  <td>Survey for Corbett Prep</td>
                  <td>{moment(moment().add(1, 'minutes')).fromNow()}</td>
                </tr>
                <tr>
                  <td>Reminder</td>
                  <td>Reminder 1 for Corbett Prep</td>
                  <td>{moment(moment().add(2.5, 'hours')).fromNow()}</td>
                </tr>
                <tr>
                  <td>Reminder</td>
                  <td>Reminder 2 for Corbett Prep</td>
                  <td>{moment(moment().add(4.5, 'hours')).fromNow()}</td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>

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
