import * as React from 'react';
import {
  Spinner
} from '@blueprintjs/core';
import {
  // Link
} from 'react-router-dom';
import './StudySection.css';
import {
  IStudy,
  IStudyAPI,
  convertStudy,
} from './../../sharedTypes';

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
}

class StudySection extends React.Component<IStudySectionProps, IStudySectionState> {

  constructor(props: IStudySectionProps) {
    super(props);
    this.state = {
      studies: []
    };
  }

  private navigateToStudy = (studyId: any) => (
    this.props.history.push(`/study/${studyId}`)
  )

  private headersToShow = [
    {headerToRender: 'Title', headerInDB: 'title'},
    {headerToRender: 'Description', headerInDB: 'description'},
    {headerToRender: 'Active', headerInDB: 'active'},
  ];

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

  private renderTableRows = (studies: IStudy[]) => {
    // const headerNames = Object.keys(studies[0]);
    const headerNamesInDB = this.headersToShow.map(h => h.headerInDB);
    return (
      <tbody>
        {studies.map((study: IStudy, key1: number) => {
          return (
            <tr key={key1} onClick={() => this.navigateToStudy(study.id)}>
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

  private renderTableHeaders = (studies: IStudy[]) => {
    const headerNamesToRender = this.headersToShow.map(h => h.headerToRender);
    return (
      <thead>
        <tr>
          {headerNamesToRender.map((h: string, index: number) => <td key={index}>{h}</td>)}
        </tr>
      </thead>
    );
  }

  private renderStudyTable = (studies: IStudy[]) => {
    return (
      <table className="pt-table pt-interactive">
        {this.renderTableHeaders(studies)}
        {this.renderTableRows(studies)}
      </table>
    );
  }

  public render() {

    let StudyTable = <Spinner/>;

    if (this.state.studies.length) {
      StudyTable = this.renderStudyTable(this.state.studies);
    }

    return (
      <div className="study-section">
        <h1>Study Section</h1>
        {StudyTable}
      </div>
    );
  }
}

export default StudySection;
