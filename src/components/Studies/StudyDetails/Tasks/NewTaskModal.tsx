import * as React from 'react';
import {
  Button,
  Spinner,
  Tabs2,
  Tab2,
  Popover,
} from '@blueprintjs/core';
import {
  DateTimePicker,
  TimePickerPrecision,
} from '@blueprintjs/datetime';
import {
  // convertTask,
} from './../../../../sharedTypes';
import ReminderSection from './ReminderSection';
import ScheduleSection from './ScheduleSection';
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
  reminders: {
    type: string,
    message: string,
    description: string,
    mediumType: string,
    days: number;
    hours: number;
    minutes: number;
  }[];
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
        scheduledTime: new Date(),
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

    this.setState({
      uploading: true,
    });

    let { scheduledTime }  = this.state.task;
    const {
      scheduleType,
      // everyN,
      // endRepeatDate,
      // repeatDays
    } = this.state.schedule;

    if (scheduleType !== 'none') {
      // Post multiple tasks (and their reminders) based off schedule
      // let currentTime = scheduledTime;
      console.log('Schedule');
    } else {
      this.postTask(scheduledTime);
    }

  }

  private postTask = (scheduledTime: Date) => {

    const { type, message, description, mediumType, } = this.state.task;

    axios.post(`http://localhost:8080/task/study/${this.props.studyId}`, {
      scheduledTime,
      type,
      message,
      description,
      mediumType,
    })
    .then((res: any) => res.data)
    .then((createdTask: any) => {
        // Create any reminders, if specified
        return Promise.all([
          this.state.reminders.map((reminder: any) => {
            console.log(`Creating Reminder`);
            const reminderTime = moment()
              .add(reminder.days, 'days')
              .add(reminder.hours, 'hours')
              .add(reminder.minutes, 'minutes')
              .format();

            return axios.post(`http://localhost:8080/task/study/${this.props.studyId}`, {
              scheduledTime: reminderTime,
              type: 'REMINDER',
              message: reminder.message,
              description: reminder.description,
              mediumType: reminder.mediumType,
              ParentSurveyTaskId: createdTask.id,
            })
            .then(() => {
              this.props.updateTasksData();
            })
            .catch(console.log);
          })
        ]);
    })
    .then(() => {
      this.props.toggleNewTaskModal();
      this.props.updateTasksData();      
    })
    .catch(console.log);    
  }

  private handleChangeTaskDetails = (e: any) => {
    const task = this.state.task;
    task[e.target.name] = e.target.value;
    this.setState({
      task,
      uploading: true,
    });
  }

  private handleChangeTaskTime = (e: any) => {
    const task = this.state.task;
    task.scheduledTime = e;
    this.setState({
      task,
    });
  }

  private handleChangeSchedule = (e: any) => {
    const schedule = this.state.schedule;
    schedule[e.target.name] = e.target.value;
    this.setState({
      schedule,
    });
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

  // Change survey Schedule (recurrence)
  private handleChangeScheduleEndDate = (newDate: Date) => {
    const schedule = this.state.schedule;
    schedule.endRepeatDate = newDate;
    this.setState({
      schedule,
    });
  }

  private handleAddReminder = (e: any) => {
    const currentReminders = this.state.reminders;
    currentReminders.push({
      days: 0,
      minutes: 0,
      hours: 0,
      type: 'REMINDER',
      message: '',
      description: '',
      mediumType: 'SMS',
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

  private handleChangeReminderTime = (e: any, index: number, type: string) => {
    const reminders = this.state.reminders;
    reminders[index][type] = e;
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

    if (this.state.task !== null) {
      return (
        <form onSubmit={this.submitTask}>
          <div className="pt-dialog-body">
          <Tabs2 id="new_task_tabs">
            <Tab2
              id="new_task_study"
              title="Study Information"
              panel={
              <div>
                <label className="pt-label">
                  Task Type
                  <div className="pt-select">
                    <select
                      defaultValue={this.state.task.type}
                      name="type"
                      onChange={this.handleChangeTaskDetails}
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
                      onChange={this.handleChangeTaskDetails}
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
                    onChange={this.handleChangeTaskDetails}
                    defaultValue={this.state.task.description}
                  />
                </label>

                <label className="pt-label">
                  Message
                  <textarea
                    name="message"
                    className="pt-input pt-fill"
                    onChange={this.handleChangeTaskDetails}
                    defaultValue={this.state.task.message}
                  />
                  <span className="pt-text-muted">
                    {this.state.task.message ? this.state.task.message.length : '0'}/160
                  </span>
                </label>

                <Popover>
                  <Button
                    text={`Scheduled Time: ${moment(this.state.task.scheduledTime).format('MMM Do, YYYY HH:mm:ss')}`}
                  />
                  <DateTimePicker
                    onChange={this.handleChangeTaskTime}
                    datePickerProps={
                      {
                        minDate: new Date(),
                        maxDate: new Date(moment().add(5, 'years').format()),
                      }
                    }
                    timePickerProps={
                      {
                        precision: TimePickerPrecision.MINUTE,
                      }
                    }
                  />
                </Popover>
              </div>}
            />
            <Tab2
              id="new_task_reminders"
              title="Reminders"
              disabled={!(this.state.task && this.state.task.type === 'SURVEY')}
              panel={
                <div>
                  <ReminderSection
                    reminders={this.state.reminders}
                    handleChangeReminder={this.handleChangeReminder}
                    handleChangeReminderTime={this.handleChangeReminderTime}
                    handleRemoveReminder={this.handleRemoveReminder}
                  /> 
                  <Button
                    className="pt-fill pt-intent-success"
                    text="Add Reminder"
                    onClick={this.handleAddReminder}
                  />
                </div>
                
              }
            />
            <Tab2
              id="new_task_schedule"
              title="Schedule"
              panel={
                <div>
                  <ScheduleSection
                    schedule={this.state.schedule}
                    handleChangeSchedule={this.handleChangeSchedule}
                    handleChangeN={this.handleChangeN}
                    handleChangeScheduleEndDate={this.handleChangeScheduleEndDate}
                    handleChangeWeek={this.handleChangeWeek}
                  />
                </div>
              }
              
            />
          </Tabs2>
          </div>
          <div className="pt-dialog-footer">
            <Button text="Cancel" onClick={(e: any) => this.props.toggleNewTaskModal(e)}/>
            <Button
              text={`Create New Task`}
              className="pt-intent-primary"
              disabled={!this.state.uploading}
              type="submit"
            />
          </div>
        </form>
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
