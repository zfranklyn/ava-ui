import * as React from 'react';
import {
  Button,
  Spin,
  Table,
} from 'antd';
import {
  IUserAPI,
} from './../../../../sharedTypes';

import axios from 'axios';

export interface IParticipantsTabProps {
  studyId: string;
}

export interface IParticipantsTabState {
  users: IUserAPI[];
  loading: boolean;
}

class ParticipantsTab extends React.Component<IParticipantsTabProps, IParticipantsTabState> {

  constructor(props: IParticipantsTabProps) {
    super(props);
    this.state = {
      users: [],
      loading: true,
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
        rowSelection={this.rowSelection}
        columns={this.columns}
        dataSource={this.enrichDataWithRowKeys(this.state.users)}
      />
    );
  }

  private enrichDataWithRowKeys = (data: any[]) =>  {
    return data.map((d: any, i: number) => Object.assign({}, d, {key: i}));
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
  
          <Button>Add Participant</Button>
          <Button>Recruit Participant</Button>
          {this.renderTable()}
  
        </div>
      );
    }

  }
}

export default ParticipantsTab;
