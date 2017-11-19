import * as React from 'react';
import './TabParticipants.css';

// import { Spinner } from '@blueprintjs/core';

import { IAPIStudy } from './../../../models/study.model';
import { IUser } from './../../../models/user.model';

interface ITabParticipantsProps {
  studyData: IAPIStudy;
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

  /* 
    Extract header names from first item; array is not empty
    Assume that all objects have the same keys
  */
  private renderHeader = (userData: IUser[]) => {
    const headers = ['id', 'firstName', 'lastName', 'email', 'tel', 'userRole', 'notes'];
    return (
      <thead>
        <tr>
        {headers.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
    );
  }
  
  private renderRows = (userData: IUser[]) => {
    const headers = ['id', 'firstName', 'lastName', 'email', 'tel', 'userRole', 'notes'];
    return (
      <tbody>
        {userData.map((u, i) => 
          <tr key={i}>
            {headers.map((h, j) => <td key={j}>{`${u[h]}`}</td>)}
          </tr>
        )}
      </tbody>
    );
  }

  private renderParticipantTable = (userData: IUser[]) => {
    if (userData) {
      return (
        <table className="pt-table pt-striped pt-interactive pt-condensed">
          {this.renderHeader(userData)}
          {this.renderRows(userData)}
        </table>
      );
    } else {
      return <div>No Participants</div>;
    }
  }

  public render() {
    return (
      <div className="table-container">
        {this.renderParticipantTable(this.props.studyData.users)}
      </div>
    );
  }
}

export default TabParticipants;
