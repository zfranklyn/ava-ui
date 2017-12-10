import * as React from 'react';
import { 
  Tabs,
  Select,
  Input,
  DatePicker,
  Button,
  Divider,
  Icon,
  Spin,
} from 'antd';
const Option = Select.Option;
const Tab = Tabs.TabPane;
const { TextArea } = Input;
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

interface INewTask {
  type: string;
  message: string;
  description: string;
  mediumType: string;
  reminders: {
    type: string,
    message: string,
    description: string,
    mediumType: string,
    days: number;
    hours: number;
    minutes: number;
  }[];
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

  private handleSubmitTask = async (e: any) => {
    e.preventDefault();

    this.setState({
      uploading: true,
    });

    let { scheduledTime }  = this.state.task;
    const {
      scheduleType,
      everyN,
      endRepeatDate,
      repeatDays,
    } = this.state.schedule;

    if (scheduleType === 'days' || scheduleType === 'months' || scheduleType === 'years') {

      let currentTime = scheduledTime;

      while (moment(currentTime).isBefore(endRepeatDate)) {
        const { type, message, description, mediumType, } = this.state.task;
        const { reminders } = this.state;
        let newTaskParams: INewTask = {
          type,
          message,
          description,
          mediumType,
          reminders,
        };

        await this.postTask(newTaskParams, currentTime);
        
        currentTime = moment(currentTime).add(everyN, scheduleType);
      }

    } else if (scheduleType === 'weeks') {
      /*
      Weeks need to be handled differently:
      You must recreate the task for each day of the week specified
      */

      let currentTime = scheduledTime;

      while (moment(currentTime).isBefore(endRepeatDate)) {
        const { type, message, description, mediumType, } = this.state.task;
        const { reminders } = this.state;
        let newTaskParams: INewTask = {
          type,
          message,
          description,
          mediumType,
          reminders,
        };

        for (let n = 0; n < repeatDays.length; n++) {
          let dayString = repeatDays[n];
          let dayOfTheWeek = new Date(moment(currentTime).day(dayString).format());
          await this.postTask(newTaskParams, dayOfTheWeek);
        }

        currentTime = moment(currentTime).add(everyN, 'weeks');
      }
    } else {
      const { type, message, description, mediumType, } = this.state.task;
      const { reminders } = this.state;
      await this.postTask({type, message, description, mediumType, reminders}, scheduledTime);
    }

    this.props.toggleNewTaskModal();
    this.props.updateTasksData();

  }

  private postTask = (params: any, scheduledTime: Date) => {

    const { type, message, description, mediumType, reminders, } = params;

    return axios.post(`http://localhost:8080/task/study/${this.props.studyId}`, {
      scheduledTime,
      type,
      message,
      description,
      mediumType,
    })
    .then((res: any) => res.data)
    .then((createdTask: any) => {
        // Create any reminders, if specified
        if (reminders.length) {
          console.log('doing reminders:', reminders);
          return Promise.all([
            reminders.map((reminder: any) => {
              console.log(`Creating Reminder`);
              const reminderTime = moment(scheduledTime)
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
              .catch(console.log);
            })
          ]);
        } else {
          return createdTask;
        }
    })
    .catch(console.log);    
  }

  private handleChangeTaskDetails = (val: any, inputName?: string) => {
    const task = this.state.task;
    if (inputName) {
      task[inputName] = val;
      this.setState({
        task,
        uploading: true,
      });
    } else {
      task[val.target.name] = val.target.value;
      this.setState({
        task,
        uploading: true,
      });      
    }

    console.log(this.state);
  }

  private handleChangeTaskTime = (time: any) => {
    const task = this.state.task;
    task.scheduledTime = time;
    this.setState({
      task,
    });
  }

  private handleChangeSchedule = (e: any, name: string) => {
    const schedule = this.state.schedule;
    schedule[name] = e;
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

  private handleChangeScheduleEndDate = (newDate: any) => {
    const schedule = this.state.schedule;
    schedule.endRepeatDate = newDate;
    this.setState({
      schedule,
    });
    console.log(schedule);
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

  private handleChangeReminder = (e: any, index: number, mediumType: string) => {
    let reminders = this.state.reminders;
    if (mediumType) {
      reminders[index][mediumType] = e;
      this.setState({
        reminders,
      });
    } else {
      reminders[index][e.target.name] = e.target.value;
      this.setState({
        reminders,
      });
    }

    console.log(this.state);

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
        <form onSubmit={this.handleSubmitTask}>
          <Tabs type="card">
            <Tab
              key="1"
              tab="Study Information"
            >
              <div>
                <label className="pt-label">
                  Task Type
                  <div className="pt-select">
                    <Select
                      defaultValue={this.state.task.type}
                      onChange={(val) => this.handleChangeTaskDetails(val, 'type')}
                    >
                      <Option value="SURVEY">Survey</Option>
                      <Option value="CUSTOM_MESSAGE">Custom Message</Option>
                    </Select>
                  </div>
                </label>            
                <label className="pt-label">
                  Message Medium
                  <div className="pt-select">
                    <Select
                      defaultValue={this.state.task.mediumType}
                      onChange={(val) => this.handleChangeTaskDetails(val, 'mediumType')}
                    >
                      <Option value="SMS">SMS</Option>
                      <Option value="EMAIL">Email</Option>
                    </Select>
                  </div>
                </label>

                <label className="pt-label">
                  Description
                  <TextArea
                    name="description"
                    onChange={this.handleChangeTaskDetails}
                    defaultValue={this.state.task.description}
                  />
                </label>

                <label className="pt-label">
                  Message
                  <TextArea
                    name="message"
                    onChange={this.handleChangeTaskDetails}
                    defaultValue={this.state.task.message}
                  />
                  <span className="pt-text-muted">
                    {this.state.task.message ? this.state.task.message.length : '0'}/160
                  </span>
                </label>

                  <DatePicker
                    showTime={true}
                    format="MM-DD-YYYY HH:mm:ss"
                    placeholder="Select Trigger Time"
                    onChange={this.handleChangeTaskTime}
                    onOk={this.handleChangeTaskTime}
                    defaultValue={moment()}
                  />
              </div>
            </Tab>
            <Tab
              tab="Reminders"
              key="2"
              disabled={!(this.state.task && this.state.task.type === 'SURVEY')}
            >
              <div>
                <ReminderSection
                  reminders={this.state.reminders}
                  handleChangeReminder={this.handleChangeReminder}
                  handleChangeReminderTime={this.handleChangeReminderTime}
                  handleRemoveReminder={this.handleRemoveReminder}
                /> 
                <Button
                  type="dashed"
                  onClick={this.handleAddReminder}
                  style={{width: '100%'}}
                >
                  <Icon type="plus"/>
                  Add a Reminder
                </Button>
              </div>
                
            </Tab>
            <Tab
              key="3"
              tab="Schedule"
            >
              <div>
                <ScheduleSection
                  schedule={this.state.schedule}
                  handleChangeSchedule={this.handleChangeSchedule}
                  handleChangeN={this.handleChangeN}
                  handleChangeScheduleEndDate={this.handleChangeScheduleEndDate}
                  handleChangeWeek={this.handleChangeWeek}
                />
              </div>
            </Tab>

          </Tabs>

          <Divider/>

            <Button onClick={(e: any) => this.props.toggleNewTaskModal(e)}>Cancel</Button>
            <Button
              disabled={!this.state.uploading}
              htmlType="submit"
              type="primary"
            >
              Create Task
            </Button>
        </form>
      );
    } else {
      return (
        <div>
          <Spin/>
        </div>
      );
    }
  }
}
export default NewTaskModal;
