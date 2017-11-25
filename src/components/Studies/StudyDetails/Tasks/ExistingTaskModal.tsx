import * as React from 'react';
import {
} from '@blueprintjs/core';
import {
  // ITaskAPI,
  ITask,
  // convertTask,
} from './../../../../sharedTypes';
// import * as moment from 'moment';

export interface IExstingTaskModalProps {
  task: ITask;
}

export interface IExstingTaskModalState {
}

class ExstingTaskModal extends React.Component<IExstingTaskModalProps, IExstingTaskModalState> {

  constructor(props: IExstingTaskModalProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    console.log(this.props.task);

    return (
      <div>
        Existing Task
      </div>
    );
  }
}

export default ExstingTaskModal;
