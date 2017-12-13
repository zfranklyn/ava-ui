import * as React from 'react';
import {
  Button,
  Spin,
  Table,
  Modal,
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
          <Button onClick={this.toggleAddParticipantModal}>Add Participants</Button>
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
