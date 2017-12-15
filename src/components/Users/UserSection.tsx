import * as React from 'react';
import {
  IUser,
} from './../../sharedTypes';
import {
  Table,
  Layout,
  Card,
  Button,
  Input,
  Modal,
  Icon,
  Col,
  Row,
} from 'antd';
const Search = Input.Search;
const { Content } = Layout;
const PageHeader = require('ant-design-pro/lib/PageHeader');
import { Spinner } from '@blueprintjs/core';
import NewUserModal from './NewUserModal';
import UserDetails from './UserDetails';
import axios from 'axios';

export interface IUserSearchConditions {
  searchTerm: string;
}

interface IUserSectionState {
  users: IUser[];
  newUserModalVisible: boolean;
  userDetailsModalVisible: boolean;
  userId: string;
  selectedUsers: any[];
}

interface IUserSectionProps {
  history: any[];
}

class UserSection extends React.Component<IUserSectionProps, IUserSectionState> {

  constructor(props: IUserSectionProps) {
    super(props);
    this.state = {
      users: [],
      newUserModalVisible: false,
      userDetailsModalVisible: false,
      userId: '',
      selectedUsers: [],
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
    .then((users: any[]) => {
      // Convert API format into JS object format:
      return this.setState({
        users,
      });
    })
    .catch(console.log);
  }

  private toggleExistingUserModal = (userId: string) => {
    this.setState({
      userDetailsModalVisible: true,
      userId,
    });
  }

  private toggleNewUserModal = () => {
    this.setState({
      newUserModalVisible: !this.state.newUserModalVisible,
    });
  }

  private rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      this.setState({
        selectedUsers: selectedRows,
      });
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

  private toggleUserDetailsModal = () => {
    this.setState({
      userDetailsModalVisible: !this.state.userDetailsModalVisible,
    });
  }

  private handleDeleteUsers = () => {
    Promise.all(this.state.selectedUsers.map(user => {
      return axios.delete(`http://localhost:8080/user/${user.id}`);
    }))
    .then(() => {
      this.updateUsers();
    });
  }

  private handleSubmitUserDetailsModal = () => {
    console.log(`handleSubmitUserDetailsModal`);
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
            <Content style={{margin: '24px 16px'}}>
              <Card
                title={
                  <Row>
                    <Col span={12}>
                      <Search
                        placeholder="Search Users..."
                        style={{width: 300}}
                      />
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                      <Button
                        onClick={this.handleDeleteUsers}
                        type="danger"
                      >
                        Delete Selected Users
                      </Button>
                      <Button
                        onClick={this.toggleNewUserModal}
                        type="dashed"
                      >
                        <Icon type="plus" />Add New User
                      </Button>
                    </Col>
                  </Row>
                }
              >
              {UserTable}
              </Card>
            </Content>
            <Modal
              title="Add User"
              maskClosable={false}
              footer={null}
              visible={this.state.newUserModalVisible}
              onCancel={this.toggleNewUserModal}
            >
              <NewUserModal
                updateUsers={this.updateUsers}
                toggleNewUserModal={this.toggleNewUserModal}
              />
            </Modal>
            <Modal
              title="User Details"
              maskClosable={false}
              footer={null}
              visible={this.state.userDetailsModalVisible}
              onCancel={this.toggleUserDetailsModal}
            >
              <UserDetails
                userId={this.state.userId}
                onCancel={this.toggleUserDetailsModal}
                handleSubmit={this.handleSubmitUserDetailsModal}
                updateUsers={this.updateUsers}
              />
            </Modal>
          </Layout>
        );
      }
}

export default UserSection;
