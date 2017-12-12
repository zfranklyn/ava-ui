import * as React from 'react';
import {
  IUser,
  IUserAPI,
  convertUser,
} from './../../sharedTypes';
import {
  Table,
  Layout,
} from 'antd';
const { Content } = Layout;
const PageHeader = require('ant-design-pro/lib/PageHeader');
import { Spinner } from '@blueprintjs/core';

export interface IUserSearchConditions {
  searchTerm: string;
}

interface IUserSectionState {
  users: IUser[];
}

interface IUserSectionProps {
  history: any[];
}

class UserSection extends React.Component<IUserSectionProps, IUserSectionState> {

  constructor(props: IUserSectionProps) {
    super(props);
    this.state = {
      users: [],
    };
  }

  private columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'd',
    },
    {
      title: 'First Name',
      key: 'firstName',
      dataIndex: 'firstName',
    },
    {
      title: 'Last Name',
      key: 'lastNamej',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'User Type',
      key: 'userType',
      dataIndex: 'userType',
    },
    {
      title: 'User Role',
      key: 'userRole',
      dataIndex: 'userRole',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
    },
  ];

  public componentDidMount() {
    this.updateUsers();
  }

  private updateUsers = () => {
    fetch(`http://localhost:8080/users`)
    .then((res: Response) => res.json())
    .then((studies: IUserAPI[]) => {
      // Convert API format into JS object format:
      const convertedUsers = studies.map(convertUser);
      return this.setState({
        users: convertedUsers,
      });
    })
    .catch(console.log);
  }

  private toggleExistingUserModal = (userId: string) => {
    console.log(userId);
  }

  private rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  private enrichDataWithRowKeys = (data: any[]) =>  {
    return data.map((d: any, i: number) => Object.assign(
      {}, d, {key: i, actions: <a onClick={() => this.toggleExistingUserModal(d.id)}>Details</a>})
    );
  }  

  private renderUserTable = (studies: IUser[]) => {
    return (
      <Table
        size="small"
        rowSelection={this.rowSelection}
        columns={this.columns}
        dataSource={this.enrichDataWithRowKeys(this.state.users)}
      />
    );
  }

  public render() {
    
        let UserTable = <Spinner/>;
    
        if (this.state.users.length) {
          UserTable = this.renderUserTable(this.state.users);
        }
    
        return (
          <Layout>
            <PageHeader
              title="Users"
            />
            <Content style={{margin: 24, background: '#fff', padding: 24}}>
              {UserTable}
            </Content>
          </Layout>
        );
      }
}

export default UserSection;
