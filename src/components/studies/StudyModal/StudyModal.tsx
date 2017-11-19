import * as React from 'react';
import './StudyModal.css';
import * as Moment from 'moment';
import { Dialog, Spinner, Tab2, Tabs2, EditableText } from '@blueprintjs/core';

import { IAPIStudy } from './../../../models/study.model';
import TabOverview from './TabOverview';
import TabParticipants from './TabParticipants';
import TabScheduling from './TabScheduling';

// import { BarSeries } from 'react-vis';

interface IStudyModalProps {
  isOpen: boolean;
  currentStudyId: string;
  closeStudy: Function;
}

interface IStudyModalState {
  loading: boolean;
  studyData: IAPIStudy | null;
}

class StudyModal extends React.Component<IStudyModalProps, IStudyModalState> {

  private url = 'http://localhost:8080/studies';

  public constructor(props: IStudyModalProps) {
    super(props);
    this.state = {
      loading: true,
      studyData: null,
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

  public handleEditTitle() {
    console.log('Title Edited');
  }

  public handleEditDescription() {
    console.log('Description Edited');
  }

  public render() {

    if (this.state.loading || !this.state.studyData) {
      return (
        <Dialog 
          className="study-modal"
          title="Loading..."
          isOpen={this.props.isOpen}
          onClose={() => this.props.closeStudy()}
        >
          <Spinner className="pt-small spinner"/>
        </Dialog>
      );
    } else {

      return (
        <Dialog 
          className="study-modal"
          title={this.state.studyData.title}
          isOpen={this.props.isOpen}
          onClose={() => this.props.closeStudy()}
        >
          <div className="pt-dialog-body">
            <span>
              <EditableText
                defaultValue={this.state.studyData.description}
                onChange={this.handleEditDescription}
              />
            </span>
            <div>
              <span className="small-text">
                Study Created At: {Moment(this.state.studyData.createdAt).format('HH:mm MM-DD-YYYY')}
              </span>
              <span className="small-text">
                Study Last Updated At: {Moment(this.state.studyData.updatedAt).fromNow()}
              </span>
            </div>

            <Tabs2 
              id="study_tabs"
              onChange={this.handleTabChange}
            >
              <Tab2 
                id="tab_overview" 
                title="Overview"
                panel={<TabOverview studyData={this.state.studyData}/>}
              />
              <Tab2 
                id="tab_participants" 
                title="Participants" 
                panel={<TabParticipants studyData={this.state.studyData}/>}
              />
              <Tab2 
                id="tab_scheduling" 
                title="Schedules & Tasks" 
                panel={<TabScheduling studyData={this.state.studyData}/>}
              />
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
