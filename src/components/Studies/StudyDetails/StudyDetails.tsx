import * as React from 'react';
import { 
  Spin,
  Layout,
} from 'antd';
const { Content } = Layout;
const PageHeader = require('ant-design-pro/lib/PageHeader');
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

  private handleTabChange = (e: any) => {
    this.setState({
      activeTab: e,
    });
  }

  public render() {

    let StudyDetailsComponent = <Spin/>;

    if (this.state.study && this.state.study.id) {

      let CurrentTab = <div>null</div>;
      
      switch (this.state.activeTab) {
        case TabNames.OVERVIEW:
          CurrentTab = <OverviewTab studyId={this.state.study.id}/>;
          break;
        case TabNames.TASKS:
          CurrentTab = <TasksTab studyId={this.state.study.id}/>;
          break;
        case TabNames.PARTICIPANTS:
          CurrentTab = <ParticipantsTab studyId={this.state.study.id}/>;
          break;
        case TabNames.MESSAGES:
          CurrentTab = <div>Messages</div>;
          break;
        case TabNames.SETTINGS:
          CurrentTab = <SettingsTab studyId={this.state.study.id}/>;
          break;
        default:
          break;
      }

      StudyDetailsComponent = (
        <div>
          <PageHeader
            title={this.state.study.title}
            content={
              <div>
                {this.state.study.description}
              </div>
            }
            tabList={[
              {
                key: TabNames.OVERVIEW,
                tab: 'Overview',
              },
              {
                key: TabNames.TASKS,
                tab: 'Tasks',
              },
              {
                key: TabNames.MESSAGES,
                tab: 'Messages',
              },
              {
                key: TabNames.PARTICIPANTS,
                tab: 'Participants',
              },
              {
                key: TabNames.SETTINGS,
                tab: 'Settings',
              },
            ]}
            onTabChange={this.handleTabChange}
          />
          <Content style={{margin: 24, background: '#fff', padding: 24}}>
            {CurrentTab}
          </Content>
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
