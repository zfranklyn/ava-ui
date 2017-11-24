import * as React from 'react';
import {
  IUser,
  IUserAPI,
  convertUser,
} from './../../sharedTypes';
import './UserSection.css';
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

  private headersToShow = [
    {headerToRender: 'ID', headerInDB: 'id'},
    {headerToRender: 'First Name', headerInDB: 'firstName'},
    {headerToRender: 'Last Name', headerInDB: 'lastName'},
    {headerToRender: 'Email', headerInDB: 'email'},
    {headerToRender: 'User Type', headerInDB: 'userType'},
    {headerToRender: 'Role', headerInDB: 'userRole'},
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

  private renderTableRows = (studies: IUser[]) => {
    // const headerNames = Object.keys(studies[0]);
    const headerNamesInDB = this.headersToShow.map(h => h.headerInDB);
    return (
      <tbody>
        {studies.map((study: IUser, key1: number) => {
          return (
            <tr key={key1}>
              {headerNamesInDB.map((header: any, key2: number) => {
                return (
                  <td key={key2}>
                    {`${study[header]}`}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  private renderTableHeaders = (studies: IUser[]) => {
    const headerNamesToRender = this.headersToShow.map(h => h.headerToRender);
    return (
      <thead>
        <tr>
          {headerNamesToRender.map((h: string, index: number) => <td key={index}>{h}</td>)}
        </tr>
      </thead>
    );
  }

  private renderUserTable = (studies: IUser[]) => {
    return (
      <table className="pt-table pt-interactive">
        {this.renderTableHeaders(studies)}
        {this.renderTableRows(studies)}
      </table>
    );
  }

  public render() {
    
        let UserTable = <Spinner/>;
    
        if (this.state.users.length) {
          UserTable = this.renderUserTable(this.state.users);
        }
    
        return (
          <div className="user-section">
            <h1>User Section</h1>
            {UserTable}
          </div>
        );
      }
}

export default UserSection;
