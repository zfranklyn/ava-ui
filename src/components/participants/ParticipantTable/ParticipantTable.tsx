import * as React from 'react';
import './ParticipantTable.css';
import { IUser } from './../../../models/user.model';

import { Tag } from '@blueprintjs/core';

interface IParticipantTableProps {
  participants: any[];
}

class ParticipantTable extends React.Component<IParticipantTableProps, {}> {

  private renderHeaders = () => {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Participant Name</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>User Role</th>
        </tr>
      </thead>      
    );
  }

  private renderRows = () => {

    const participants = this.props.participants;

    return (
      <tbody>
        {participants.map((participant: IUser, index) => {
          return (
            <tr key={index}>
              <td>{participant.id}</td>
              <td>{participant.firstName} {participant.lastName}</td>
              <td>{participant.email}</td>
              <td>{participant.tel}</td>
              <td><Tag>{participant.userRole}</Tag></td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  public render() {
    return (
      <div className="participant-table-container">
        <table className="participant-table pt-table pt-bordered pt-striped pt-interactive">
          {this.renderHeaders()}
          {this.renderRows()}
        </table>
      </div>
    );
  }
}

export default ParticipantTable;
