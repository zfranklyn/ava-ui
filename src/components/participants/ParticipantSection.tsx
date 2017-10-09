import * as React from 'react';
import './ParticipantSection.css';
import ParticipantNavigation from './ParticipantNavigation/ParticipantNavigation';
import ParticipantTable from './ParticipantTable/ParticipantTable';
import InfoBar from './InfoBar/InfoBar';

class ParticipantSection extends React.Component<{}, {}> {
  render() {
    return (
      <div className="participant-section">
        <ParticipantNavigation title="Participants"/>
        <ParticipantTable />
        <InfoBar />
      </div>
    );
  }
}

export default ParticipantSection;
