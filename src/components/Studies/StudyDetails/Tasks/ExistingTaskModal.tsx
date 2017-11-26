import * as React from 'react';
import {
  Button,
  Spinner,
  // Intent,
  // Popover,
  // PopoverInteractionKind,
  // Position,
} from '@blueprintjs/core';
import {
  // DateTimePicker,
} from '@blueprintjs/datetime';
import {
  ITaskAPI,
  ITask,
  convertTask,
} from './../../../../sharedTypes';
import * as moment from 'moment';
import axios from 'axios';

export interface IExstingTaskModalProps {
  taskId: string;
  toggleExistingTaskModal: Function;
  updateTasksData: Function;
}

export interface IExstingTaskModalState {
  modified: boolean;
  uploading: boolean;
  deleting: boolean;
  task: ITask | null;
}

class ExstingTaskModal extends React.Component<IExstingTaskModalProps, IExstingTaskModalState> {

  constructor(props: IExstingTaskModalProps) {
    super(props);
    this.state = {
      modified: false,
      uploading: false,
      deleting: false,
      task: null,
    };
  }

  componentDidMount() {
    this.refreshTaskData();
  }

  private refreshTaskData = () => {

    axios.get(`http://localhost:8080/task/${this.props.taskId}`)
    .then((res: any) => res.data)
    .then((taskFromDB: ITaskAPI) => {
      this.setState({
        task: convertTask(taskFromDB),
        modified: false,
      });
    })
    .catch(console.log);
  }

  private handleChange = (e: any) => {
    const task = this.state.task;
    if (task) {
      task[e.target.name] = e.target.value;
      this.setState({
        task,
        modified: true,
      });
    }
  }

  private handleSubmit = (e: any) => {
    if (!this.state.task) {
      console.error(`Could not submit, task is null`);
      return;
    }

    e.preventDefault();
    this.setState({
      uploading: true,
    });
    axios.put(`http://localhost:8080/task/${this.state.task.id}`, this.state.task)
    .then((res: any) => res.data)
    .then((updatedTask: ITaskAPI) => {
      console.log(updatedTask);
      this.setState({
        task: convertTask(updatedTask),
        modified: false,
        uploading: false,
      });
      this.refreshTaskData();
      this.props.toggleExistingTaskModal();
      this.props.updateTasksData();
    })
    .catch(console.log);
  }

  private handleDeleteTask = () => {
    if (!this.state.task) {
      console.error(`Could not delete, task is null`);
      return;
    }

    this.setState({
      deleting: true,
    });

    axios.delete(`http://localhost:8080/task/${this.state.task.id}`)
    .then(() => {
      this.props.toggleExistingTaskModal();
      this.props.updateTasksData();
    })
    .catch((err) => {
      console.log(err);
    });
    this.setState({
      deleting: false,
    });
  }

  public render() {

    if (this.state.task !== null) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="pt-dialog-body">
                <label className="pt-label">
                  Task Type
                  <div className="pt-select">
                    <select
                      defaultValue={this.state.task.type}
                      name="type"
                      onChange={this.handleChange}
                    >
                      <option value="SURVEY">Survey</option>
                      <option value="REMINDER">Reminder</option>
                      <option value="CUSTOM_MESSAGE">Custom Message</option>
                    </select>
                  </div>
                </label>            
                <label className="pt-label">
                  Message Medium
                  <div className="pt-select">
                    <select
                      defaultValue={this.state.task.mediumType}
                      name="mediumType"
                      onChange={this.handleChange}
                    >
                      <option value="SMS">SMS</option>
                      <option value="EMAIL">Email</option>
                    </select>
                  </div>
                </label>

                <label className="pt-label">
                  Description
                  <textarea
                    name="description"
                    className="pt-input pt-fill"
                    onChange={this.handleChange}
                    defaultValue={this.state.task.description}
                  />
                </label>

                <label className="pt-label">
                  Message
                  <textarea
                    name="message"
                    className="pt-input pt-fill"
                    onChange={this.handleChange}
                    defaultValue={this.state.task.message}
                  />
                </label>

                <label className="pt-label">
                  Scheduled Time
                  <input
                    name="scheduledTime"
                    className="pt-input pt-fill"
                    onChange={this.handleChange}
                    defaultValue={moment(this.state.task.scheduledTime).format('YYYY-MM-DD HH:MM:ss.SSS Z')}
                  />
                </label>
              </div>
            <div className="pt-dialog-footer">
              <Button text="Cancel" onClick={() => this.props.toggleExistingTaskModal()}/>
              <Button
                text="Delete"
                onClick={() => this.handleDeleteTask()}
                className="pt-intent-danger"
                loading={this.state.deleting}
              />
              <Button
                text="Save Changes"
                className="pt-intent-primary"
                disabled={!this.state.modified}
                type="submit"
              />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <Spinner/>
        </div>
      );
    }
  }
}

export default ExstingTaskModal;
