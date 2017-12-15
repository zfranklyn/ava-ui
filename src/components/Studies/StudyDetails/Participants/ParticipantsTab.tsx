import * as React from 'react';
import {
  Button,
  Spin,
  Table,
  Modal,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
} from 'antd';
import {
  IUserAPI,
} from './../../../../sharedTypes';

import axios from 'axios';
import * as _ from 'lodash';

export interface IParticipantsTabProps {
  studyId: string;
}

export interface IParticipantsTabState {
  users: IUserAPI[];
  allUsers: IUserAPI[];
  loading: boolean;
  addParticipantModalVisible: boolean;
  potentialParticipantsToAdd: IUserAPI[];
  selectedParticipants: IUserAPI[];
}

class ParticipantsTab extends React.Component<IParticipantsTabProps, IParticipantsTabState> {

  constructor(props: IParticipantsTabProps) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      allUsers: [],
      potentialParticipantsToAdd: [],
      addParticipantModalVisible: false,
      selectedParticipants: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  private fetchUserData = () => {
    axios.get(`http://localhost:8080/study/${this.props.studyId}/users`)
    .then(res => res.data)
    .then((users: IUserAPI[]) => {
      this.setState({
        users,
        loading: false,
      });
      console.log(users);
    })
    .catch(console.log);
  }

  private columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      width: '130px',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telephone',
      dataIndex: 'tel',
      key: 'tel',
    },
  ];

  private rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      this.setState({
        selectedParticipants: selectedRows,
      });
    },
  };

  private renderTable = () => {
    return (
      <Table
        size="small"
        rowSelection={this.rowSelection}
        columns={this.columns}
        dataSource={this.enrichDataWithRowKeys(this.state.users)}
      />
    );
  }

  private enrichDataWithRowKeys = (data: any[]) =>  {
    return data.map((d: any, i: number) => Object.assign({}, d, {key: i}));
  }

  private toggleAddParticipantModal = () => {
    this.setState({
      addParticipantModalVisible: !this.state.addParticipantModalVisible,
    });
    this.getUserData();
  }

  private addParticipantRowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      this.setState({
        potentialParticipantsToAdd: selectedRows,
      });
    },
    getCheckboxProps: (user: any) => ({
      disabled: !_.findIndex(user.studies, ((study: any) => study.id === this.props.studyId)),
    }),
  };

  private handleAddParticipant = () => {
    this.state.potentialParticipantsToAdd.map((user: IUserAPI) => {
      axios.post(`http://localhost:8080/actions/addUserToStudy?userId=${user.id}&studyId=${this.props.studyId}`)
      .then(() => {
        this.fetchUserData();
        this.toggleAddParticipantModal();
      })
      .catch(console.log);
    });
  }

  private handleRemoveParticipants = () => {
    Promise.all(this.state.selectedParticipants.map((user: IUserAPI) => {
      return axios
        .post(`http://localhost:8080/actions/removeUserFromStudy?userId=${user.id}&studyId=${this.props.studyId}`);
      }))
      .then((d) => {
        this.fetchUserData();
      });
  }

  private handleActionMenuClick = (e: any) => {
    switch (e.key) {
      case 'delete':
        this.handleRemoveParticipants();
        break;
      default:
        break;
    }
  }

  private getUserData = () => {
    axios.get(`http://localhost:8080/users`)
    .then(res => res.data)
    .then(data => this.setState({ allUsers: data }));
  }

  public render() {
    if (this.state.loading) {
      return (
        <div>
          <Spin/>
        </div>
      );
    } else {
      return (
        <div>
          <Row style={{marginBottom: 12}}>
            <Col span={12}>
              <Button type="primary" onClick={this.toggleAddParticipantModal}>Add Participants</Button>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Dropdown
                overlay={
                  <Menu onClick={this.handleActionMenuClick}>
                    <Menu.Item key="delete">
                      Delete
                    </Menu.Item>
                  </Menu>}
              >
                <Button>Actions <Icon type="down"/></Button>
              </Dropdown>
            </Col>
          </Row>
          {this.renderTable()}
          <Modal
            title="Add New Participants"
            visible={this.state.addParticipantModalVisible}
            footer={null}
            onCancel={this.toggleAddParticipantModal}
            style={{width: '80%'}}
          >
            <Table
              columns={this.columns}
              dataSource={this.enrichDataWithRowKeys(this.state.allUsers)}
              rowSelection={this.addParticipantRowSelection}
            />
            <Button onClick={this.toggleAddParticipantModal}>Cancel</Button>
            <Button onClick={this.handleAddParticipant}>Add Participants</Button>
          </Modal>
        </div>
      );
    }

  }
}

export default ParticipantsTab;
