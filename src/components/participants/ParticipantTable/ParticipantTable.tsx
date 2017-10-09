import * as React from 'react';
import './ParticipantTable.css';

import { Tag } from '@blueprintjs/core';

class ParticipantTable extends React.Component<{}, {}> {

  public render() {
    return (
      <div className="participant-table-container">
        <table className="participant-table pt-table pt-bordered pt-striped pt-interactive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Participant Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
            <tr>
              <td>12345</td>
              <td>Franklyn Zhu</td>
              <td>franklyn.zhu@yale.edu</td>
              <td>6509467649</td>
              <td><Tag>Bhutan</Tag></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ParticipantTable;
