import * as React from 'react';
import './StudyNavigation.css';
import { ISearchConditions } from '../StudySection';

import { Switch } from '@blueprintjs/core';

interface IStudyNavigationProps {
    title: string;
    modifySearchConditions: Function;
    searchConditions: ISearchConditions;
}

interface IStudyNavigationState {
  searchConditions: ISearchConditions;
}

class StudyNavigation extends React.Component<IStudyNavigationProps, IStudyNavigationState> {

  public constructor(props: IStudyNavigationProps) {
    super(props);
    this.state = {
      searchConditions: props.searchConditions,
    };
  }

  public handleSearchTerm = async (e: any) => {
    const term = e.target.value;
    await this.setState({
      searchConditions: Object.assign({}, this.state.searchConditions, {searchTerm: term}),
    });
    this.props.modifySearchConditions(this.state.searchConditions);
  }

  public handleToggleActive = async () => {
    await this.setState({
      searchConditions: Object.assign({}, this.state.searchConditions, {active: !this.state.searchConditions.active}),
    });
    this.props.modifySearchConditions(this.state.searchConditions);
  }

  public render() {
    return (
      <div className="study-navigation">
        <div className="title-bar">
          <h4>{this.props.title}</h4>
        </div>
        <div className="controls">
          <div className="pt-form-group">
            <div className="pt-input-group">
              <span className="pt-icon pt-icon-search"/>
              <input 
                id="search" 
                className="pt-input" 
                placeholder="Search Studies" 
                value={this.state.searchConditions.searchTerm}
                onChange={this.handleSearchTerm}
              />
            </div>
          </div>
          <div className="pt-input-group">
            <Switch 
              label="View Active Studies Only" 
              checked={this.state.searchConditions.active}
              onChange={this.handleToggleActive}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StudyNavigation;
