import * as React from 'react';
import {
  Spinner,
  Tabs2,
  Tab2,
} from '@blueprintjs/core';
import {
  // Link
} from 'react-router-dom';
import './StudyDetails.css';
import TasksTab from './Tasks/TasksTab';
import ParticipantsTab from './Participants/ParticipantsTab';
import {
  IStudy,
  IStudyAPI,
  convertStudy,
} from './../../../sharedTypes';

/*
  React Router V4 automatically pushes a history object onto the props hash of child components
  under BrowserRouter:
  https://stackoverflow.com/questions/39894547/navigating-programmatically-in-react-router-v4
  This allows us to access a `history` object on child components without ever explicitly
  passing down the object into the child's props

  `params` are also passed down automatically (url params)
*/
export interface IStudyDetailsProps {
  history: any[];
  match: any;
  location: any;
}

export interface IStudyDetailsState {
  study: IStudy | null;
  activeTab: TabNames;
}

enum TabNames {
  OVERVIEW = 'OVERVIEW',
  TASKS = 'TASKS',
  PARTICIPANTS = 'PARTICIPANTS',
  SETTINGS = 'SETTINGS',
  MESSAGES = 'MESSAGES',
}

class StudyDetails extends React.Component<IStudyDetailsProps, IStudyDetailsState> {

  constructor(props: IStudyDetailsProps) {
    super(props);
    this.state = {
      study: null,
      activeTab: TabNames.OVERVIEW,
    };
  }

  /*
  private navigateToStudy = (studyId: any) => (
    this.props.history.push(`/study/${studyId}`)
  )

  private headersToShow = [
    {headerToRender: 'Title', headerInDB: 'title'},
    {headerToRender: 'Description', headerInDB: 'description'},
    {headerToRender: 'Active', headerInDB: 'active'},
  ];
  */

  public componentDidMount() {
    this.updateStudies();
  }

  private updateStudies = () => {
    // console.log(this.props);
    fetch(`http://localhost:8080/study/${this.props.match.params.studyId}`)
    .then((res: Response) => res.json())
    .then((study: IStudyAPI) => {
      // Convert API format into JS object format:
      const convertedStudy = convertStudy(study);
      return this.setState({
        study: convertedStudy,
      });
    })
    .catch(console.log);
  }

  private handleTabChange = () => {
    console.log('Changed Tab');
  }

  public render() {

    let StudyDetailsComponent = <Spinner/>;

    if (this.state.study && this.state.study.id) {
      StudyDetailsComponent = (
        <div className="study-details-toolbar">
          <div>
            <h4>{this.state.study.title}</h4>
            <p>
              {this.state.study.description}
            </p>
          </div>
          <div className="tab-section">
            <Tabs2 id="study_tabs" onChange={this.handleTabChange} renderActiveTabPanelOnly={true}>
              <Tab2 title="Overview" id="OVERVIEW" panel={<p>Hello</p>}/>
              <Tab2 
                title="Tasks"
                id="TASKS"
                panel={
                  <TasksTab
                    studyId={this.state.study.id}
                  />}
              /> 
              <Tab2
                title="Participants"
                id="PARTICIPANTS"
                panel={
                <ParticipantsTab
                  studyId={this.state.study.id}
                />
                }
              /> 
              <Tab2 title="Messages" id="MESSAGES" panel={<p>Hello</p>}/>  
              <Tab2 title="Settings" id="SETTINGS" panel={<p>Hello</p>}/>  
            </Tabs2>
          </div>
        </div>
      );
    }

    return (
      <div className="study-details-section">
        {StudyDetailsComponent}
      </div>
    );
  }
}

export default StudyDetails;
