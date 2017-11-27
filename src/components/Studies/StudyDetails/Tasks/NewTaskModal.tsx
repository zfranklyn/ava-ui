import * as React from 'react';
import {
  Button,
  Spinner,
  Tabs2,
  Tab2,
  NumericInput,
} from '@blueprintjs/core';
import {
  ITaskAPI,
  ITask,
  // convertTask,
} from './../../../../sharedTypes';
import axios from 'axios';
// import * as moment from 'moment';
import * as _ from 'lodash';

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
  schedule: any;
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
      schedule: {},
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

  private handleChangeReminder = (e: any, index: number) => {
    console.log(`Changed reminder ${index}`);
    let reminders = this.state.reminders;
    reminders[index][e.target.name] = e.target.value;
    this.setState({
      reminders,
    });
  }

  // Remove reminder at index
  private handleRemoveReminder = (index: number) => {
    let reminders = this.state.reminders;
    _.pullAt(reminders, [index]);
    this.setState({
      reminders,
    });
  }

  public render() {

    let ReminderSection = null;
    let Reminders: any = (
      <div>
        <span className="pt-text-muted">No Reminders</span>
      </div>
    );

    let ScheduleSection: any = <div>Schedule Section</div>;

    // Reminders section for New Study
    if (this.state.reminders.length) {
      Reminders = this.state.reminders.map((reminder: ITask, index: number) => {
        return (
          <div key={index}>
            <label className="pt-label">
              Reminder Medium
              <div className="pt-select">
                <select
                  value={this.state.reminders[index].mediumType}
                  name="mediumType"
                  onChange={(e) => this.handleChangeReminder(e, index)}
                >
                  <option value="SMS">SMS</option>
                  <option value="EMAIL">Email</option>
                </select>
              </div>
            </label>

            <label className="pt-label">
              Description
              <input
                name="description"
                className="pt-input pt-fill"
                onChange={(e) => this.handleChangeReminder(e, index)}
                value={this.state.reminders[index].description}
              />
            </label>

            <label className="pt-label">
              Message
              <input
                name="message"
                className="pt-input pt-fill"
                onChange={(e) => this.handleChangeReminder(e, index)}
                value={this.state.reminders[index].message}
              />
              <span className="pt-text-muted">{this.state.reminders[index].message.length}/160</span>
            </label>

            <h5>Reminder Send Time (since Survey distribution)</h5>
            <label className="pt-label">
              Days Since Survey
              <NumericInput
                placeholder="Days"
              />
            </label>
            <label className="pt-label">
              Hours Since Survey
              <NumericInput
                placeholder="Hours since survey"
              />
            </label>
            <label className="pt-label">
              Minutes Since Survey
              <NumericInput
                placeholder="Minutes since survey"
              />
            </label>
            <Button
              onClick={() => this.handleRemoveReminder(index)}
              className="pt-intent-danger"
              text="Delete Reminder"
            />
          </div>
        );
      });
    }

    if (this.state.task && this.state.task.type === 'SURVEY') {
      ReminderSection = (
        <div>
          {Reminders}
          <Button
            className="pt-fill pt-intent-success"
            text="Add Reminder"
            onClick={this.handleAddReminder}
          />
        </div>
      );
    }

    if (this.state.task !== null) {
      return (
        <div>
          <div className="pt-dialog-body">
          <Tabs2 id="new_task_tabs">
            <Tab2
              id="new_task_study"
              title="Study Information"
              panel={
              <form onSubmit={this.submitTask}>
                <label className="pt-label">
                  Task Type
                  <div className="pt-select">
                    <select
                      defaultValue={this.state.task.type}
                      name="type"
                      onChange={this.handleChange}
                    >
                      <option value="SURVEY">Survey</option>
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
                  <span className="pt-text-muted">
                    {this.state.task.message ? this.state.task.message.length : '0'}/160
                  </span>
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
              </form>}
            />
            <Tab2
              id="new_task_reminders"
              title="Reminders"
              disabled={!(this.state.task && this.state.task.type === 'SURVEY')}
              panel={
                <div>
                  {ReminderSection}
                </div>
              }
            />
            <Tab2
              id="new_task_schedule"
              title="Schedule"
              panel={
                <div>
                  {ScheduleSection}
                </div>
              }
              
            />
          </Tabs2>
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
