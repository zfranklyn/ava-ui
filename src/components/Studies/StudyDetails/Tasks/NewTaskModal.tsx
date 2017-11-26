import * as React from 'react';
import {
  Button,
  Spinner,
} from '@blueprintjs/core';
import {
  ITaskAPI,
  ITask,
  // convertTask,
} from './../../../../sharedTypes';
import axios from 'axios';

export interface INewTaskModalProps {
  studyId: string;
  toggleNewTaskModal: Function;
  updateTasksData: Function;
}

export interface INewTaskModalState {
  task: any;
  reminders: ITask[];
  studyId: string;
  uploading: boolean;
}

class NewTaskModal extends React.Component<INewTaskModalProps, INewTaskModalState> {

  constructor(props: INewTaskModalProps) {
    super(props);
    this.state = {
      task: {
        type: 'SURVEY',
        mediumType: 'SMS',
        scheduledTime: Date(),
      },
      studyId: this.props.studyId,
      uploading: false,
      reminders: [],
    };
  }

  private submitTask = (e: any) => {
    e.preventDefault();
    const { scheduledTime, type, message, description, mediumType, completed } = this.state.task;
    axios.post(`http://localhost:8080/task/study/${this.props.studyId}`, {
      scheduledTime,
      type,
      message,
      description,
      mediumType,
      completed,
    })
    .then((res: any) => res.data)
    .then((createdTask: ITaskAPI) => {
      this.props.toggleNewTaskModal();
      this.props.updateTasksData();
    })
    .catch(console.log);

  }

  private handleChange = (e: any) => {
    const task = this.state.task;
    task[e.target.name] = e.target.value;
    this.setState({
      task,
      uploading: true,
    });
  }

  // private renderReminders = (reminders: ITask[]) => {
// 
  // }

  private handleAddReminder = (e: any) => {
    const currentReminders = this.state.reminders;
    currentReminders.push({
      scheduledTime: new Date(),
      type: 'REMINDER',
      message: '',
      description: '',
      mediumType: 'SMS',
      completed: false,
    }),
    this.setState({
      reminders: currentReminders,
    });
  }

  // private handleRemoveReminder = (e: any) => {
  //   console.log(e.target);
  // }

  public render() {

    let ReminderSection = null;
    let Reminders: any = <div>No Reminders</div>;

    if (this.state.reminders.length) {
      Reminders = this.state.reminders.map((reminder: ITask, index: number) => {
        return (
          <div key={index}>
            <label className="pt-label">
              Reminder Medium
              <div className="pt-select">
                <select
                  defaultValue={reminder.mediumType}
                  name="mediumType"
                  // onChange={this.handleChange}
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
                defaultValue={reminder.description}
              />
            </label>

            <label className="pt-label">
              Message
              <textarea
                name="message"
                className="pt-input pt-fill"
                onChange={this.handleChange}
                defaultValue={reminder.message}
              />
            </label>

            <label className="pt-label">
              Scheduled Time
              <input
                name="scheduledTime"
                className="pt-input pt-fill"
                onChange={this.handleChange}
                // defaultValue={reminder.scheduledTime}
              />
            </label>
          </div>
        );
      });
    }

    if (this.state.task && this.state.task.type === 'SURVEY') {
      ReminderSection = (
        <div>
          <h4>Survey Reminders</h4>
          {Reminders}
          <Button
            text="Add Reminder"
            onClick={this.handleAddReminder}
          />
        </div>
      );
    }

    if (this.state.task !== null) {
      return (
        <div>
          <form onSubmit={this.submitTask}>
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
                    defaultValue={this.state.task.scheduledTime}
                  />
                </label>

              {ReminderSection}

              </div>
            <div className="pt-dialog-footer">
              <Button text="Cancel" onClick={(e: any) => this.props.toggleNewTaskModal(e)}/>
              <Button
                text="Create Study"
                className="pt-intent-primary"
                disabled={!this.state.uploading}
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
export default NewTaskModal;
