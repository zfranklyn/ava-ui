import * as React from 'react';
import './ParticipantSection.css';
import ParticipantNavigation from './ParticipantNavigation/ParticipantNavigation';
import ParticipantTable from './ParticipantTable/ParticipantTable';
import InfoBar from './InfoBar/InfoBar';

import { Spinner } from '@blueprintjs/core';

export interface IParticipantSearchConditions {
  searchTerm: string;
}

interface IParticipantSectionState {
  loading: boolean;
  participants: any[];
  displayRightPanel: boolean;
  searchConditions: IParticipantSearchConditions;
}

interface IParticipantSectionProps {

}

class ParticipantSection extends React.Component<IParticipantSectionProps, IParticipantSectionState> {

  private URL = 'http://localhost:8080/users/participants';

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      participants: [],
      displayRightPanel: true,
      searchConditions: {
        searchTerm: '',
      },
    };
  }

  componentDidMount() {
    console.log('fetch data');
    this.refreshParticipantData();
  }

  public modifySearchConditions = async (newConditions: IParticipantSearchConditions) => {
    await this.setState({
      searchConditions: newConditions,
    });
  }

  public refreshParticipantData = () => {
    fetch(this.URL)
      .then((res) => res.json())
      .then((participants) => {
        console.log(participants);
        this.setState({
          participants,
          loading: false,
        });
      })
      .catch(console.log);
  }

  private renderLoading = () => {
    return (
      <Spinner/>
    );
  }

  private renderParticipantTable = () => {
    return (
      <ParticipantTable 
        participants={this.state.participants}
      />
    )
  }

  render() {
    return (
      <div className="participant-section">
        <ParticipantNavigation 
          title="Participants"
          modifySearchConditions={this.modifySearchConditions}
          searchConditions={this.state.searchConditions}
        />
        {this.state.loading ? this.renderLoading() : this.renderParticipantTable()}
        {this.state.displayRightPanel ? <InfoBar /> : null}
      </div>
    );
  }
}

export default ParticipantSection;
