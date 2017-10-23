import * as React from 'react';
import './StudySection.css';

import StudyNavigation from './StudyNavigation/StudyNavigation';
import StudyList from './StudyList/StudyList';
// import StudyModal from './StudyModal/StudyModal';

export interface IStudySectionProps {
  title: string;
}

export interface ISearchConditions {
  searchTerm: string;
  active: boolean;
}

export interface IStudySectionState {
  searchConditions: ISearchConditions;
  studies: Object[];
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
      studies: [],
      currentStudyId: '',
      modalOpen: false,
    };
  }

  public modifySearchConditions = async (newConditions: ISearchConditions) => {
    await this.setState({
      searchConditions: newConditions,
    });
    console.log(this.state.searchConditions);
  }

  public render() {
    return (
      <div className="study-section">
        <StudyNavigation 
          title={'Studies'} 
          modifySearchConditions={this.modifySearchConditions}
          searchConditions={this.state.searchConditions}
        />
        <StudyList />
        {/* <StudyModal/> */}
      </div>
    );
  }
}

export default StudySection;
