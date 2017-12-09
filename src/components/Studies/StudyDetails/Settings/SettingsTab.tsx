import * as React from 'react';
import {
  Tag,
  Button,
} from '@blueprintjs/core';
import { IStudyAPI } from './../../../../sharedTypes';
import axios from 'axios';
// import * as moment from 'moment';

export interface ISettingsTabProps {
  studyId: string;
}

export interface ISettingsTabState {
  title: string;
  description: string;
  metadata: object;
  key: string;
  value: string;
  modified: boolean;
  uploading: boolean;
}

class SettingsTab extends React.Component<ISettingsTabProps, ISettingsTabState> {

  constructor(props: ISettingsTabProps) {
    super(props);
    this.state = {
      title: '',
      description: '',
      metadata: {},
      key: '',
      value: '',
      modified: false,
      uploading: false,
    };
  }

  public componentDidMount() {
    this.updateData();
  }

  public updateData = () => {
    axios.get(`http://localhost:8080/study/${this.props.studyId}`)
    .then(res => res.data)
    .then((studyDetails: IStudyAPI) => {
      const { title, description, metadata } = studyDetails;
      this.setState({
        title,
        description,
        metadata: JSON.parse(metadata),
      });
    })
    .catch(console.log);
  }

  private handleChangeTitle = (e: any) => {
    this.setState({modified: true});
    const title = e.target.value;
    this.setState({
      title,
    });
  }

  private handleChangeDescription = (e: any) => {
    this.setState({modified: true});
    const description = e.target.value;
    this.setState({
      description,
    });
  }

  private handleChangeKey = (e: any) => {
    const key = e.target.value;
    this.setState({
      key,
    });
  }

  private handleChangeValue = (e: any) => {
    const value = e.target.value;
    this.setState({
      value,
    });
  }

  private handleAddKeyValue = () => {
    this.setState({modified: true});
    const key = this.state.key;
    const value = this.state.value;
    const metadata = this.state.metadata;
    metadata[key] = value;

    this.setState({
      metadata,
      key: '',
      value: '',
    });
  }

  private handleRemoveTag = (key: string) => {
    this.setState({modified: true});
    const metadata = this.state.metadata;
    delete metadata[key];
    this.setState({
      metadata,
    });
  }

  private renderTags = (metadata: object) => {
    const keys = Object.keys(metadata);
    return (
      keys.map((k: string, index: number) => (
        <Tag style={{margin: '2px'}}key={index} onRemove={() => this.handleRemoveTag(k)}>
          {k}:{metadata[k]}
        </Tag>
      ))
    );
  }

  private handleSubmitForm = (e: any) => {
    e.preventDefault();
    this.setState({
      uploading: true,
    });
    axios.put(`http://localhost:8080/study/${this.props.studyId}`, {
      studyId: this.props.studyId,
      description: this.state.description,
      title: this.state.title,
      metadata: JSON.stringify(this.state.metadata),
    })
    .then(res => res.data)
    .then((updatedStudy: IStudyAPI) => {
      this.setState({
        uploading: false,
        modified: false,
      });
    });
  }

  public render() {
    let Tags = null;

    if (!!this.state.metadata) {
      Tags = this.renderTags(this.state.metadata);
    }

    return (
    <div>
      <form onSubmit={this.handleSubmitForm}>
        <label className="pt-label">
          Study Title
          <input
            name="title"
            className="pt-input"
            type="text"
            dir="auto"
            value={this.state.title}
            style={{width: '100%'}}
            onChange={this.handleChangeTitle}
          />
        </label>
        <label className="pt-label">
          Study Description 
          <textarea
            name="description"
            className="pt-input"
            dir="auto"
            value={this.state.description}
            style={{width: '100%'}}
            onChange={this.handleChangeDescription}
          />
        </label>

        <div className="metadata-section">
          <label className="pt-label">
            Metadata
          </label>
          <input
            value={this.state.key}
            onChange={this.handleChangeKey}
            className="pt-input"
            type="text"
            placeholder="Key"
            dir="auto"
          />
          <input
            value={this.state.value}
            onChange={this.handleChangeValue}
            className="pt-input"
            type="text"
            placeholder="Value"
            dir="auto"
          />
          <Button iconName="add" onClick={this.handleAddKeyValue}/>
        </div>
     
        <div className="tags-section" style={STYLES.tagSection}>
          {Tags}
        </div>     

        <Button
          disabled={!this.state.modified}
          type="submit"
          loading={this.state.uploading}
        >
          Save Changes
        </Button>
      </form>
    </div>
    );
  }
}

const STYLES = {
  tagSection: {
    marginTop: '10px',
  } ,
};

export default SettingsTab;
