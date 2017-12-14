import * as React from 'react';
import { 
  Input,
  Select,
  Form,
  Button,
  Divider,
} from 'antd';

const { Option } = Select;

import {
  UserRoleType,
  UserType,
  // IUser
} from './../../sharedTypes/index';
import axios from 'axios';
// import * as moment from 'moment';
// import * as _ from 'lodash';

export interface INewUserModalProps {
  updateUsers: Function;
  toggleNewUserModal: Function;
}

export interface INewUserModalState {
  user: INewUser;
  modified: boolean;
}

interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  userType: UserType;
  userRole: UserRoleType;
  notes: string;
  metadata: object;
}

class NewUserModal extends React.Component<INewUserModalProps, INewUserModalState> {

  constructor(props: INewUserModalProps) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        userType: 'PARTICIPANT' as UserType,
        userRole: 'STUDENT' as UserRoleType,
        notes: '',
        metadata: {},
      },
      modified: false,
    };
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

  private handleSubmitNewUser = (e: any) => {
    e.preventDefault();
    console.log(this.state.user);
    const { firstName, lastName, email, tel, userType, userRole, notes, metadata } = this.state.user;
    axios.post(`http://localhost:8080/user`, {
      firstName, lastName, email, tel, userType, userRole, notes,
      metadata: JSON.stringify(metadata),
    })
    .then(() => {
      this.props.toggleNewUserModal();
      this.props.updateUsers();
    })
    .catch(console.log);
  }

  public render() {
    return(
      <Form onSubmit={this.handleSubmitNewUser}>
        <label>
          First Name
          <Input
            name="firstName"
            defaultValue={this.state.user.firstName}
            onChange={(e) => this.handleChangeDetails(e)}
          />
        </label>
        <label>
          Last Name
          <Input
            name="lastName"
            defaultValue={this.state.user.lastName}
            onChange={(e) => this.handleChangeDetails(e)}
          />
        </label>
        <label>
          Email
          <Input
            name="email"
            defaultValue={this.state.user.email}
            onChange={(e) => this.handleChangeDetails(e)}
          />
        </label>
        <label>
          Mobile Phone Number
          <Input
            name="tel"
            defaultValue={this.state.user.tel}
            onChange={(e) => this.handleChangeDetails(e)}
          />
        </label>
        <label>
          User Type
          <div>
            <Select
              defaultValue={this.state.user.userType}
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
              defaultValue={this.state.user.userRole}
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
        >
          Add New User
        </Button>
      </Form>
    );
  }
}
export default NewUserModal;
