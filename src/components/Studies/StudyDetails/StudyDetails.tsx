import * as React from 'react';
import { Tabs, Spin } from 'antd';
import {
  // Link
} from 'react-router-dom';
import './StudyDetails.css';
import TasksTab from './Tasks/TasksTab';
import ParticipantsTab from './Participants/ParticipantsTab';
import SettingsTab from './Settings/SettingsTab';
import OverviewTab from './Overview/OverviewTab';
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

    let StudyDetailsComponent = <Spin/>;

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
            <Tabs onChange={this.handleTabChange} animated={false}>
              <Tabs.TabPane
                tab="Overview"
                key="1"
                forceRender={true}
              >
                <OverviewTab studyId={this.state.study.id}/>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Tasks"
                key="2"
                forceRender={true}
              >
                <TasksTab studyId={this.state.study.id}/>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Participants"
                key="3"
                forceRender={true}
              >
                <ParticipantsTab studyId={this.state.study.id}/>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Messages"
                key="4"
                forceRender={true}
              >
                Hello
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Settings"
                key="5"
                forceRender={true}
              >
                <SettingsTab
                  studyId={this.state.study.id}
                />
              </Tabs.TabPane>
            </Tabs>
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
