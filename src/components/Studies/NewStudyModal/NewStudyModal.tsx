import * as React from 'react';
import {
  Button,
  Tag,
  Input,
  Icon,
  Divider,
} from 'antd';
const TextArea = Input.TextArea;
const InputGroup = Input.Group;
import {
  // IStudy,
  IStudyAPI,
  // convertStudy,
} from './../../../sharedTypes';
import axios from 'axios';

export interface INewStudyModalProps {
  toggleNewStudyModal: Function;
  updateStudies: Function;
}

export interface INewStudyModalState {
  uploading: boolean;
  uploadFailed: boolean;
  title: string;
  description: string;
  metadata: object;
  key: string;
  value: string;
}

class NewStudyModal extends React.Component<INewStudyModalProps, INewStudyModalState> {

  constructor(props: INewStudyModalProps) {
    super(props);
    this.state = {
      uploading: false,
      uploadFailed: true,
      title: '',
      description: '',
      metadata: {},
      key: '',
      value: '',
    };
  }

  private handleChangeTitle = (e: any) => {
    const title = e.target.value;
    this.setState({
      title,
    });
  }

  private handleChangeDescription = (e: any) => {
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

  private submitStudy = () => {
    console.log(this.state);

    this.setState({
      uploading: true,
    });

    const payload = {
      title: this.state.title,
      description: this.state.description,
      metadata: JSON.stringify(this.state.metadata),
    };

    axios.post(`http://localhost:8080/study/create`, payload)
      .then((res: any) => res.data)
      .then((createdStudy: IStudyAPI) => {
        this.setState({
          uploading: false,
        });
        this.props.toggleNewStudyModal();
        this.props.updateStudies();
      })
      .catch((err: Error) => {
        console.log(`Failed`);
        console.log(err);
        this.setState({
          uploadFailed: true,
          uploading: false,
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
          <label>
            Study Title
            <Input
              type="text"
              value={this.state.title}
              style={{width: '100%'}}
              onChange={(e) => this.handleChangeTitle(e)}
            />
          </label>
          <label>
            Study Description
            <TextArea
              style={{width: '100%'}}
              value={this.state.description}
              onChange={(e) => this.handleChangeDescription(e)}
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
              className="pt-input"
              type="text"
              placeholder="Key"
              style={{maxWidth: '200px'}}
            />
              <Input
                value={this.state.value}
                onChange={this.handleChangeValue}
                className="pt-input"
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
          <Button onClick={() => this.props.toggleNewStudyModal()}>Cancel</Button>
          <Button
            className="pt-intent-primary"
            loading={this.state.uploading}
            type="primary"
            onClick={() => this.submitStudy()}
          >
            Create Study
          </Button>
      </div>
    );
  }
}

const STYLES = {
  tagSection: {
    marginTop: '10px',
  } ,
};

export default NewStudyModal;
