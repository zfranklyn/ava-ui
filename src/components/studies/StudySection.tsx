import * as React from 'react';
import {
  Spinner,
  AnchorButton,
  Dialog,
  Switch,
} from '@blueprintjs/core';
import {
  // Link
} from 'react-router-dom';
import NewStudyModal from './NewStudyModal/NewStudyModal';
import './StudySection.css';
import {
  IStudy,
  IStudyAPI,
  convertStudy,
} from './../../sharedTypes';
import * as moment from 'moment';
import * as _ from 'lodash';

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

  private navigateToStudy = (studyId: any) => (
    this.props.history.push(`/study/${studyId}`)
  )

  private headersToShow = [
    {headerToRender: 'Study Name', headerInDB: 'title'},
    {headerToRender: 'Description', headerInDB: 'description'},
    {headerToRender: 'Status', headerInDB: 'active'},
    {headerToRender: 'Last Modified', headerInDB: 'updatedAt'},
    {headerToRender: 'Creation Date', headerInDB: 'createdAt'},
    {headerToRender: 'Archived', headerInDB: 'archived'},
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
      console.log(convertedStudies);
      return this.setState({
        studies: convertedStudies,
      });
    })
    .catch(console.log);
  }

  private renderTableRows = (studies: IStudy[]) => {
    const headerNamesInDB = this.headersToShow.map(h => h.headerInDB);

    const currentSortBy = this.state.sortBy;
    const currentSortOrder = this.state.sortOrder;

    // sort studies by params specified in this.state; default sort by updatedBy and title
    studies = _.orderBy(studies, [`${currentSortBy}`, `updatedBy`, `title`], [`${currentSortOrder}`, 'desc', 'desc']);

    return (
      <tbody>
        {studies.map((study: IStudy, key1: number) => {
          return (
            <tr key={key1} onClick={() => this.navigateToStudy(study.id)}>
              {headerNamesInDB.map((header: any, key2: number) => {

                let cellContents;
                // varied rendering logic
                switch (header) {
                  case 'createdAt':
                    cellContents = moment(study[header]).format('MMM D, YYYY HH:MM');
                    break;
                  case 'updatedAt':
                    cellContents = moment(study[header]).format('MMM D, YYYY HH:MM');
                    break;
                  case 'active':
                    cellContents = (study[header] ? 'Active' : 'Inactive');
                    break;
                  default:
                    cellContents = `${study[header]}`;
                    break;
                }

                return (
                  <td key={key2}>
                    {cellContents}
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
          {
            headerNamesToRender.map(
              (h: string, index: number) => {
                
                const id = this.headersToShow.filter((obj) => obj.headerToRender === h)[0].headerInDB;
                let style = STYLES.header;
                if (this.state.sortBy === id) {
                  style = Object.assign({}, style, STYLES.header_active);
                }
                return (
                  <td 
                    id={id}
                    key={index}
                    onClick={(e) => this.handleSortChange(e)}
                    style={style}
                  >
                    {h}
                  </td>
                );
                
              }
            )
          }
        </tr>
      </thead>
    );
  }

  private renderStudyTable = (studies: IStudy[]) => {
    if (this.state.viewArchived) {
      studies = studies.filter((s: IStudy) => s.archived);
    }
    return (
      <table className="pt-table pt-interactive" style={{width: '100%'}}>
        {this.renderTableHeaders(studies)}
        {this.renderTableRows(studies)}
      </table>
    );
  }

  public toggleNewStudyModal = () => {
    const newStudyModalState = this.state.newStudyModal;
    this.setState({
      newStudyModal: !newStudyModalState,
    });
  }

  private handleViewArchived = () => {
    const viewArchived = this.state.viewArchived;
    this.setState({
      viewArchived: !viewArchived,
    });
  }

  private handleSortChange = (e: any) => {
    const newSortBy = e.target.id;
    const currentSortBy = this.state.sortBy;
    const currentSortOrder = this.state.sortOrder;
    if (newSortBy === currentSortBy) {
      this.setState({
        sortOrder: (currentSortOrder === 'desc' ? 'asce' : 'desc'),
      });
    } else {
      this.setState({
        sortBy: newSortBy,
        sortOrder: 'desc',
      });
    }
    console.log(this.state);
  }

  public render() {

    let StudyTable = <Spinner/>;

    if (this.state.studies.length) {
      StudyTable = this.renderStudyTable(this.state.studies);
    }

    return (
      <div className="study-section">
        <div className="toolbar">
          <h3>Studies</h3>
          <input className="pt-input" placeholder="Search..."/>
          <Switch checked={this.state.viewArchived} label="View Archived" onChange={this.handleViewArchived}/>
          <AnchorButton
            text="Create Study"
            iconName="add"
            className="pt-intent-primary"
            onClick={this.toggleNewStudyModal}
          />
        </div>
        <div className="study-table">
          {StudyTable}
        </div>
        <Dialog
          iconName="inbox"
          title="New Study"
          canOutsideClickClose={false}
          canEscapeKeyClose={false}
          isOpen={this.state.newStudyModal}
          onClose={this.toggleNewStudyModal}
        >
          <NewStudyModal
            toggleNewStudyModal={this.toggleNewStudyModal}
            updateStudies={this.updateStudies}
          />
        </Dialog>
      </div>
    );
  }
}

const STYLES = {
  header_active: {
    fontWeight: 800,
  },
  header: {
    cursor: 'pointer',
  }
};

export default StudySection;
