import * as React from 'react';
import {
  Switch,
  Modal,
  Button,
  Spin,
  Input,
  Row,
  Card,
  Col,
  Layout,
} from 'antd';
const PageHeader = require('ant-design-pro/lib/PageHeader');
const Charts = require('ant-design-pro/lib/Charts');
import 'ant-design-pro/dist/ant-design-pro.css';
const { Content } = Layout;
import {
} from 'react-router-dom';
import NewStudyModal from './NewStudyModal/NewStudyModal';
import './StudySection.css';
import {
  IStudy,
  IStudyAPI,
  convertStudy,
} from './../../sharedTypes';
// import * as moment from 'moment';
// import * as _ from 'lodash';

/*
  React Router V4 automatically pushes a history object onto the props hash of child components
  under BrowserRouter:
  https://stackoverflow.com/questions/39894547/navigating-programmatically-in-react-router-v4
  This allows us to access a `history` object on child components without ever explicitly
  passing down the object into the child's props
*/
export interface IStudySectionProps {
  history: any[];
}

export interface IStudySectionState {
  studies: IStudy[];
  newStudyModal: boolean;
  viewArchived: boolean;
  sortBy: string; // the various headers
  sortOrder: string; // 'ASCE', 'DESC'
}

class StudySection extends React.Component<IStudySectionProps, IStudySectionState> {

  constructor(props: IStudySectionProps) {
    super(props);
    this.state = {
      studies: [],
      newStudyModal: false,
      viewArchived: false,
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    };
  }

  private navigateToStudy = (studyId: any) => (
    this.props.history.push(`/study/${studyId}`)
  )

  // private headersToShow = [
  //   {headerToRender: 'Study Name', headerInDB: 'title'},
  //   {headerToRender: 'Description', headerInDB: 'description'},
  //   {headerToRender: 'Status', headerInDB: 'active'},
  //   {headerToRender: 'Last Modified', headerInDB: 'updatedAt'},
  //   {headerToRender: 'Creation Date', headerInDB: 'createdAt'},
  //   {headerToRender: 'Archived', headerInDB: 'archived'},
  // ];

  public componentDidMount() {
    this.updateStudies();
  }

  private updateStudies = () => {
    fetch(`http://localhost:8080/studies`)
    .then((res: Response) => res.json())
    .then((studies: IStudyAPI[]) => {
      // Convert API format into JS object format:
      const convertedStudies = studies.map(convertStudy);
      return this.setState({
        studies: convertedStudies,
      });
    })
    .catch(console.log);
  }

  public toggleNewStudyModal = () => {
    const newStudyModalState = this.state.newStudyModal;
    this.setState({
      newStudyModal: !newStudyModalState,
    });
  }

  private handleViewArchived = () => {
    const viewArchived = this.state.viewArchived;
    this.setState({
      viewArchived: !viewArchived,
    });
  }

  private renderStudyList = (studies: IStudy[]) => {
    if (studies.length) {
      
      return (
        <div>
          {studies.map((study: IStudy, index: number) => {
            return (
              <Col
                key={index}
                xs={{span: 24}}
                sm={{span: 12}}
                md={{span: 8}}
                lg={{span: 8}}
                xl={{span: 6}}
              >
                <div onClick={() => this.navigateToStudy(study.id)}>
                  <Card
                    title={study.title}
                    bordered={true}
                    extra={(study.active) ? 'Active' : 'Inactive'}
                    hoverable={true}
                    style={{margin: '5px', height: '240px'}}
                  >
                    {study.description}
                    <Charts.MiniProgress percent={78} strokeWidth={8} target={80}/>
                    <div style={{ margin: '12px 0', width: '100%', borderBottom: '1px solid #e8e8e8' }}/>
                    <span>Participants: 238</span>
                  </Card>
                </div>
              </Col>
            );
          })}
        </div>
      );
      
    } else {
      return (
        <div>No Studies</div>
      );
    }
  }

  public render() {

    let StudyList = <Spin/>;

    if (this.state.studies.length) {
      StudyList = this.renderStudyList(this.state.studies);
    }

    return (
      <div>
        <PageHeader
          title="Your Studies"
          content={
            <div>
              <Input.Search
                placeholder="Search Studies..."
                enterButton={true}
              />
            </div>
          }
          breadCrumbList={[
            {}
          ]}
        />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>

        <Row>
          <Col span={16}>
            <label>
              View Archived
              <Switch checked={this.state.viewArchived}  onChange={this.handleViewArchived}/>
            </label>
          </Col>
          <Col span={8}>
            <Button
              onClick={this.toggleNewStudyModal}
              style={{float: 'right'}}
            >
              Create New Study
            </Button>
          </Col>
        </Row>
        </Content>
        <Content style={{ margin: '24px 16px'}}>
          <Row>
            {StudyList}
          </Row>
        </Content>
        <Modal
          title="New Study"
          maskClosable={false} 
          footer={null}
          visible={this.state.newStudyModal}
          onCancel={this.toggleNewStudyModal}
        >
          <NewStudyModal
            toggleNewStudyModal={this.toggleNewStudyModal}
            updateStudies={this.updateStudies}
          />
        </Modal>
      </div>
    );
  }
}

export default StudySection;
