import * as React from 'react';
import {
  Button,
  Input,
  DatePicker,
  Select,
  Spin,
} from 'antd';
const Option = Select.Option;
const TextArea = Input.TextArea;

import {
  ITaskAPI,
  ITask,
  convertTask,
  MediumType,
  TaskType,
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

  private handleChangeTaskType = (val: string) => {
    const task = this.state.task;
    if (task) {
      task.taskType = val as TaskType;
      this.setState({
        task,
        modified: true,
      });
    }
  }

  private handleChangeMediumType = (val: string) => {
    const task = this.state.task;
    if (task) {
      task.mediumType = val as MediumType;
      this.setState({
        task,
        modified: true,
      });
    }

  }

  private handleChangeTaskTime = (newDate: any) => {
    const task = this.state.task;
    if (task) {
      task.scheduledTime = newDate;
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
            <div>
                <label>
                  Task Type
                  <div>
                    <Select
                      defaultValue={this.state.task.taskType}
                      onChange={this.handleChangeTaskType}
                    >
                      <Option value="SURVEY">Survey</Option>
                      <Option value="REMINDER">Reminder</Option>
                      <Option value="CUSTOM_MESSAGE">Custom Message</Option>
                    </Select>
                  </div>
                </label>            
                <label>
                  Subject
                  <Input
                    name="subject"
                    onChange={this.handleChange}
                    value={this.state.task.subject}
                  />
                </label>
                <label>
                  Message Medium
                  <div>
                    <Select
                      defaultValue={this.state.task.mediumType}
                      onChange={this.handleChangeMediumType}
                    >
                      <Option value="SMS">SMS</Option>
                      <Option value="EMAIL">Email</Option>
                    </Select>
                  </div>
                </label>

                <label>
                  Description
                  <TextArea
                    name="description"
                    onChange={this.handleChange}
                    defaultValue={this.state.task.description}
                  />
                </label>

                <label>
                  Message
                  <TextArea
                    name="message"
                    onChange={this.handleChange}
                    defaultValue={this.state.task.message}
                  />
                </label>
                <DatePicker
                  showTime={true}
                  format="MM-DD-YYYY HH:mm:ss"
                  defaultValue={moment(this.state.task.scheduledTime)}
                  onChange={this.handleChangeTaskTime}
                  onOk={this.handleChangeTaskTime}
                />
              </div>
            <div>
              <Button onClick={() => this.props.toggleExistingTaskModal()}>
                Cancel
              </Button>
              <Button
                onClick={() => this.handleDeleteTask()}
                type="danger"
                loading={this.state.deleting}
              >
                Delete
              </Button>
              <Button
                type="primary"
                disabled={!this.state.modified}
                htmlType="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
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

export default ExstingTaskModal;
