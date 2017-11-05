import * as React from 'react';
import './StudySection.css';

import StudyNavigation from './StudyNavigation/StudyNavigation';
import StudyList from './StudyList/StudyList';
import StudyModal from './StudyModal/StudyModal';

import { IAPIStudy } from './../../models/study.model';

export interface IStudySectionProps {
  title: string;
}

export interface ISearchConditions {
  searchTerm: string;
  active: boolean;
}

export interface IStudySectionState {
  searchConditions: ISearchConditions;
  studies: IAPIStudy[];
  currentStudyId: string;
  modalOpen: boolean;
}

class StudySection extends React.Component<IStudySectionProps, IStudySectionState> {

  public constructor(props?: IStudySectionProps) {
    super(props);
    this.state = {
      searchConditions: {
        searchTerm: '', 
        active: false
      },
      currentStudyId: '',
      studies: [],
      modalOpen: false,
    };
  }

  public componentDidMount() {
    fetch('http://localhost:8080/studies')
      .then(res => res.json())
      .then((studies: IAPIStudy[]) => {
        this.setState({
          studies
        });
      });
  }

  public modifySearchConditions = async (newConditions: ISearchConditions) => {
    await this.setState({
      searchConditions: newConditions,
    });
  }

  public openStudy = (id: string) => {
    this.setState({
      currentStudyId: id,
      modalOpen: true,
    });
  }

  public closeStudy = () => {
    this.setState({
      modalOpen: false,
    });
  }

  public render() {
    return (
      <div className="study-section">
        <StudyNavigation 
          title={'Studies'} 
          modifySearchConditions={this.modifySearchConditions}
          searchConditions={this.state.searchConditions}
        />
        <StudyList studies={this.state.studies} openStudy={this.openStudy} closeStudy={this.closeStudy}/>
        {(this.state.modalOpen) ? 
          <StudyModal 
            isOpen={this.state.modalOpen} 
            currentStudyId={this.state.currentStudyId} 
            closeStudy={this.closeStudy}
          />
          : null
        }

      </div>
    );
  }
}

export default StudySection;
