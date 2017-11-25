import * as React from 'react';
import {
} from '@blueprintjs/core';
import {
  // ITaskAPI,
  // convertTask,
} from './../../../../sharedTypes';
// import * as moment from 'moment';

export interface INewTaskModalProps {
}

export interface INewTaskModalState {
}

class NewTaskModal extends React.Component<INewTaskModalProps, INewTaskModalState> {

  constructor(props: INewTaskModalProps) {
    super(props);
    this.state = {
    };
  }

  public render() {

    return (
      <div>
        New Task
      </div>
    );
  }
}

export default NewTaskModal;
