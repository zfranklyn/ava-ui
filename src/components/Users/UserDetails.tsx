import * as React from 'react';
import { 
  Input,
  Select,
  Form,
  Button,
  Divider,
  Tabs,
} from 'antd';
const Tab = Tabs.TabPane;
const { Option } = Select;

import {
  UserRoleType,
  UserType,
  IUser,
  IUserAPI,
  convertUser,
} from './../../sharedTypes/index';
import axios from 'axios';
// import * as moment from 'moment';
// import * as _ from 'lodash';

export interface IUserDetailsProps {
  userId: string;
  onCancel: Function;
  handleSubmit: Function;
  updateUsers: Function;
}

export interface IUserDetailsState {
  modified: boolean;
  user: IUser;
}

class UserDetails extends React.Component<IUserDetailsProps, IUserDetailsState> {

  constructor(props: IUserDetailsProps) {
    super(props);
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        userType: 'PARTICIPANT' as UserType,
        userRole: 'STUDENT' as UserRoleType,
        notes: '',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      modified: false,
    };
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  private fetchUserDetails = () => {
    axios.get(`http://localhost:8080/user/${this.props.userId}`)
    .then(res => res.data)
    .then((userDetails: IUserAPI) => {
      this.setState({
        user: convertUser(userDetails),
      });
      console.log(this.state);
    });
  }

  // handles both Input and Select
  private handleChangeDetails = (val: any, inputName?: string) => {
    const user = this.state.user;
    if (inputName) {
      user[inputName] = val;
      this.setState({
        user,
        modified: true,
      });
    } else {
      user[val.target.name] = val.target.value;
      this.setState({
        user,
        modified: true,
      });      
    }
  }

  private handleSaveUserDetails = (e: any) => {
    e.preventDefault();
    console.log(this.state.user);
    const { firstName, lastName, email, tel, userType, userRole, notes, metadata } = this.state.user;
    axios.put(`http://localhost:8080/user/${this.props.userId}`, {
      firstName, lastName, email, tel, userType, userRole, notes,
      metadata: JSON.stringify(metadata),
    })
    .then(() => {
      this.props.onCancel();
      this.props.updateUsers();
    })
    .catch(console.log);
  }

  public render() {
    return(
      <div>
        <h4>
          {`${this.state.user.firstName} ${this.state.user.lastName}`}
        </h4>
        <Tabs type="card">
          <Tab
            tab="Overview"
            key="1"
          >
            Overview
          </Tab>
          <Tab
            tab="User Details"
            key="2"
          >
            <Form onSubmit={this.handleSaveUserDetails}>
              <label>
                First Name
                <Input
                  name="firstName"
                  value={this.state.user.firstName}
                  onChange={(e) => this.handleChangeDetails(e)}
                />
              </label>
              <label>
                Last Name
                <Input
                  name="lastName"
                  value={this.state.user.lastName}
                  onChange={(e) => this.handleChangeDetails(e)}
                />
              </label>
              <label>
                Email
                <Input
                  name="email"
                  value={this.state.user.email}
                  onChange={(e) => this.handleChangeDetails(e)}
                />
              </label>
              <label>
                Mobile Phone Number
                <Input
                  name="tel"
                  value={this.state.user.tel}
                  onChange={(e) => this.handleChangeDetails(e)}
                />
              </label>
              <label>
                User Type
                <div>
                  <Select
                    value={this.state.user.userType}
                    onChange={(e) =>  this.handleChangeDetails(e, 'userType')}
                    style={{width: 300}}
                  >
                    <Option value="PARTICIPANT">Participant</Option>
                    <Option value="RESEARCHER">Researcher</Option>
                  </Select>
                </div>
              </label>
              <label>
                User Role
                <div>
                  <Select
                    value={this.state.user.userRole}
                    onChange={(e) => this.handleChangeDetails(e, 'userRole')}
                    style={{width: 300}}
                  >
                    <Option value="STUDENT">Student</Option>
                    <Option value="TEACHER">Teacher</Option>
                    <Option value="PARENT">Parent</Option>
                    <Option value="ADMIN">Administrator</Option>
                    <Option value="OTHER">Other</Option>
                  </Select>
                </div>
              </label>
              <Divider />
              <Button
                htmlType="submit"
                type="primary"
                disabled={!this.state.modified}
              >
                Save User Details
              </Button>
            </Form>
          </Tab>
          <Tab
            tab="Messages"
            key="3"
          >
            Messages
          </Tab>
          
        </Tabs>
      </div>
    );
  }
}
export default UserDetails;
