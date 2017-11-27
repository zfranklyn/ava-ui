import * as React from 'react';
import {
  Button,
  Spinner,
  Tabs2,
  Tab2,
  NumericInput,
  Popover,
  Checkbox,
} from '@blueprintjs/core';
import {
  DatePicker,
} from '@blueprintjs/datetime';
import {
  ITaskAPI,
  ITask,
  // convertTask,
} from './../../../../sharedTypes';
import axios from 'axios';
import * as moment from 'moment';
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
  schedule: {
    scheduleType: string; // days, weeks, months, years, none
    everyN: number;
    endRepeatDate: Date;
    repeatDays: string[];
  };
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
      schedule: {
        scheduleType: 'none',
        endRepeatDate: new Date(),
        repeatDays: [],
        everyN: 1,
      },
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

  private handleChangeSchedule = (e: any) => {
    const schedule = this.state.schedule;
    schedule[e.target.name] = e.target.value;
    this.setState({
      schedule,
    });
    console.log(this.state.schedule);
  }

  private handleChangeN = (e: any) => {
    const schedule = this.state.schedule;
    schedule.everyN = e;
    this.setState({
      schedule,
    });
  }

  private handleChangeWeek = (e: any) => {
    const toggleDay = e.target.value;
    const repeatDays = this.state.schedule.repeatDays;
    if (_.includes(repeatDays, toggleDay)) {
      _.remove(repeatDays, (n) => n === toggleDay);
    } else {
      repeatDays.push(toggleDay);
    }
    const schedule = this.state.schedule;
    schedule.repeatDays = repeatDays;
    this.setState({
      schedule,
    });
  }
  // output from bluprint: Tue Nov 21 2017 11:23:28 GMT-0500 (EST)
  private handleChangeScheduleDate = (e: any) => {
    const schedule = this.state.schedule;
    schedule.endRepeatDate = e;
    this.setState({
      schedule,
    });
  }

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

    // Schedule Section
    let ScheduleSection: any = (
      <div>
        <p>
          Please indicate the frequency with which you want this surve task
          to be executed. Every 'repeat' of this schedule will generate a 
          new task (along with its surveys).
        </p>

        <label className="pt-label">
          <div className="pt-select">
            <select
              value={this.state.schedule.scheduleType}
              name="scheduleType"
              onChange={this.handleChangeSchedule}            
            >
              <option value="none">None</option>
              <option value="days">Every N Days</option>
              <option value="weeks">Every N Weeks</option>
              <option value="months">Every N Months</option>
              <option value="years">Every N Years</option>
            </select>
          </div>
        </label>

        {/* Only render schedule details if schedule is specified */}
        {(this.state.schedule.scheduleType !== 'none') ? (
          <div>
            <label className="pt-label">
              Every
              <NumericInput
                name="everyN"
                min={0}
                value={this.state.schedule.everyN}
                onValueChange={this.handleChangeN}
              />
              {this.state.schedule.scheduleType}
            </label>

            <label className="pt-label">
              Repeat End Date
            </label>          
            <Popover>
              <Button
                className="pt-minimal"
                text={moment(this.state.schedule.endRepeatDate).format('MMM Do, YYYY')}
              />
              <DatePicker
                defaultValue={this.state.schedule.endRepeatDate}
                onChange={this.handleChangeScheduleDate}
              />
            </Popover>
          </div>
        ) : null}

        {(this.state.schedule.scheduleType === 'weeks') ? (
          <div className="weekpicker">
            <Checkbox
              label="Monday"
              // checked={}
              value="monday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Tuesday"
              // checked={}
              value="tuesday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Wednesday"
              // checked={}
              value="wednesday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Thursday"
              // checked={}
              value="thursday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Friday"
              // checked={}
              value="friday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Saturday"
              // checked={}
              value="saturday"
              onChange={this.handleChangeWeek}
            />
            <Checkbox
              label="Sunday"
              // checked={}
              value="sunday"
              onChange={this.handleChangeWeek}
            />
          </div>
        ) : null}

      </div>
    );

    // Reminders section for New Study
    if (this.state.reminders.length) {
      Reminders = this.state.reminders.map((reminder: ITask, index: number) => {
        return (
          <div key={index}>
            <h3>Reminder #{index + 1}</h3>
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
                min={0}
              />
            </label>
            <label className="pt-label">
              Hours Since Survey
              <NumericInput
                placeholder="Hours since survey"
                min={0}
              />
            </label>
            <label className="pt-label">
              Minutes Since Survey
              <NumericInput
                placeholder="Minutes since survey"
                min={0}
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
