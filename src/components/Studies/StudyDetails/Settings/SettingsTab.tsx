import * as React from 'react';
import {
  Button,
  Input,
  Tag,
  Icon,
  Divider,
} from 'antd';
const TextArea = Input.TextArea;
const InputGroup = Input.Group;

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
        <Tag color="blue" closable={true} key={index} onClose={() => this.handleRemoveTag(k)}>
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
        <label>
          Study Title
          <Input
            name="title"
            type="text"
            value={this.state.title}
            style={{width: '100%'}}
            onChange={this.handleChangeTitle}
          />
        </label>
        <label>
          Study Description 
          <TextArea
            name="description"
            value={this.state.description}
            style={{width: '100%'}}
            onChange={this.handleChangeDescription}
          />
        </label>

        <div className="metadata-section">
          <label>
            Metadata
          </label>
          <InputGroup compact={true}>
            <Input
              value={this.state.key}
              onChange={this.handleChangeKey}
              type="text"
              placeholder="Key"
              style={{maxWidth: '200px'}}
            />
            <Input
              value={this.state.value}
              onChange={this.handleChangeValue}
              type="text"
              placeholder="Value"
              style={{maxWidth: '200px'}}
            />
            <Button onClick={this.handleAddKeyValue}>
              <Icon type="plus" />
            </Button>
          </InputGroup>

        </div>
     
        <div className="tags-section" style={STYLES.tagSection}>
          {Tags}
        </div>     

        <Divider/>

        <Button
          disabled={!this.state.modified}
          htmlType="submit"
          loading={this.state.uploading}
          type="primary"
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
