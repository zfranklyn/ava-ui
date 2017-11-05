import * as React from 'react';
import './StudyModal.css';

import { Dialog, Spinner, Tab2, Tabs2 } from '@blueprintjs/core';

import { IAPIStudy } from './../../../models/study.model';
import TabOverview from './TabOverview';
import TabParticipants from './TabParticipants';
import TabScheduling from './TabScheduling';

interface IStudyModalProps {
  isOpen: boolean;
  currentStudyId: string;
  closeStudy: Function;
}

interface IStudyModalState {
  loading: boolean;
  studyData: IAPIStudy;
}

class StudyModal extends React.Component<IStudyModalProps, IStudyModalState> {

  private url = 'http://localhost:8080/studies';

  public constructor(props: IStudyModalProps) {
    super(props);
    this.state = {
      loading: true,
      studyData: {
        id: '',
        title: '',
        description: '',
        metadata: '{}',
        active: false,
        createdAt: '',
        updatedAt: '',
        tasks: [],
      }
    };
  }

  public componentDidMount() {
    fetch(`${this.url}/study/${this.props.currentStudyId}`)
      .then((res) => res.json())
      .then((studyData: IAPIStudy) => {
        this.setState({
          studyData,
          loading: false,
        });
      });
  }

  public handleTabChange() {
    console.log('Tab changed');
  }

  public render() {

    if (this.state.loading) {
      return (
        <Dialog 
          className="study-modal"
          title={this.props.currentStudyId}
          isOpen={this.props.isOpen}
          onClose={() => this.props.closeStudy()}
        >
          <Spinner className="pt-small"/>
        </Dialog>
      );
    } else {

      return (
        <Dialog 
          className="study-modal"
          title="Study Details"
          isOpen={this.props.isOpen}
          onClose={() => this.props.closeStudy()}
        >
          <div className="pt-dialog-body">
            <h3>{this.state.studyData.title}</h3>
            <p>{this.state.studyData.description}</p>

            <Tabs2 
              id="study_tabs"
              onChange={this.handleTabChange}
            >
              <Tab2 id="tab_overview" title="Overview" panel={<TabOverview/>}/>
              <Tab2 id="tab_participants" title="Participants" panel={<TabParticipants/>}/>
              <Tab2 id="tab_scheduling" title="Schedules & Tasks" panel={<TabScheduling/>}/>
            </Tabs2>

          </div>
          <div className="pt-dialog-footer">
            Footer
          </div>
        </Dialog>
      );
    }
  }
}

export default StudyModal;
