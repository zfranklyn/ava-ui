import * as React from 'react';
import {
  Modal,
  Button,
  Spin,
  Input,
  Row,
  Col,
  List,
  Badge,
  Card,
  Layout,
  Icon,
  Progress,
  Radio,
} from 'antd';
import {
  Link,
} from 'react-router-dom';
const PageHeader = require('ant-design-pro/lib/PageHeader');
import 'ant-design-pro/dist/ant-design-pro.css';
const { Content } = Layout;
import NewStudyModal from './NewStudyModal/NewStudyModal';
import './StudySection.css';
import {
  IStudy,
  IStudyAPI,
  convertStudy,
} from './../../sharedTypes';
import * as moment from 'moment';
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

  private renderStudyList = (studies: IStudy[]) => {
    if (studies.length) {
      
      return (
        <Content>
          <List
            itemLayout="vertical"
            dataSource={studies}
            renderItem={(study: IStudy, key: number) => (
              <List.Item 
                extra={
                  <Row style={{width: '360px'}} gutter={8}>
                    <Col lg={{span: 6}} md={{span: 12}}>
                      <span>Status</span>
                      <p>
                        {
                          <Badge 
                            status={(study.active) ? 'success' : 'default'} 
                            text={(study.active) ? 'Active' : 'Inactive'}
                          />
                        }
                      </p>
                    </Col>
                    <Col lg={{span: 6}} md={{span: 12}}>
                      <span>Last Modified</span>
                      <p>{moment(study.updatedAt).fromNow()}</p>
                    </Col>
                    <Col lg={{span: 12}} md={{span: 24}}>
                      <label>
                        Study Progress
                        <Progress percent={57} size="small" status="active" />
                      </label>
                    </Col>
                  </Row>}
              >
                <List.Item.Meta
                  title={<Link to={`/study/${study.id}`}>{study.title}</Link>}
                  description={study.description}
                />

              </List.Item>
            )}
          />
        </Content>
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
          title="Research Center"
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

        <Content style={{ margin: '24px 16px'}}>

          <Card
            title={
              <div>
                <Radio.Group>
                  <Radio.Button value="ACTIVE">Active Studies</Radio.Button>
                  <Radio.Button value="INACTIVE">Inactive Studies</Radio.Button>
                  <Radio.Button value="ALL">All Studies</Radio.Button>
                </Radio.Group>
                <Button
                  onClick={this.toggleNewStudyModal}
                  size="large"
                  type="dashed"
                  style={{float: 'right'}}
                >
                  <Icon type="plus" />Create New Study
                </Button>
              </div>
            }
          >
            {StudyList}
          </Card>
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
