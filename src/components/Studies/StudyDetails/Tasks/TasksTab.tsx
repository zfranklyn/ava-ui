import * as React from 'react';
import {
} from '@blueprintjs/core';
import {
  Modal,
  Button,
  Spin,
  Table,
  Badge,
} from 'antd';
import ExistingTaskModal from './ExistingTaskModal';
import NewTaskModal from './NewTaskModal';
import {
  ITaskAPI,
  ITask,
  convertTask,
} from './../../../../sharedTypes';
import * as moment from 'moment';
import axios from 'axios';

export interface ITasksTabProps {
  studyId: string;
}

export interface ITasksTabState {
  loadingTasks: boolean;
  tasks: ITask[];
  newTaskModalOpen: boolean;
  existingTaskModalOpen: boolean;
  currentTaskId: string | null;
  selectedTasks: ITask[];
}

class TasksTab extends React.Component<ITasksTabProps, ITasksTabState> {

  constructor(props: ITasksTabProps) {
    super(props);
    this.state = {
      loadingTasks: false,
      tasks: [],
      newTaskModalOpen: false,
      existingTaskModalOpen: false,
      currentTaskId: null,
      selectedTasks: [],
    };
  }

  private columns = [
    {
      title: 'Scheduled Time',
      key: 'scheduledTime',
      dataIndex: 'scheduledTime',
    },
    {
      title: 'Status',
      key: 'completed',
      dataIndex: 'completed',
    },
    {
      title: 'Task Type',
      key: 'taskType',
      dataIndex: 'taskType',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'Medium',
      key: 'mediumType',
      dataIndex: 'mediumType',
    },
    {
      title: 'Message',
      key: 'message',
      dataIndex: 'message',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
    },
  ];

  private rowSelection = {
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      this.setState({
        selectedTasks: selectedRows,
      });
    },
  };

  public componentDidMount() {
    this.updateTasksData();
  }

  private updateTasksData = () => {
    this.setState({
      loadingTasks: true,
    });
    fetch(`http://localhost:8080/tasks/study/${this.props.studyId}`)
    .then((res: Response) => res.json())
    .then((tasks: ITaskAPI[]) => {
      const convertedTasks: ITask[] = tasks.map(convertTask);
      this.setState({
        tasks: convertedTasks,
        loadingTasks: false,
      });
    })
    .catch(console.log);
  }

  private nestify = (data: ITask[]) => {
    // extract main tasks
    let mainTasks = data.filter((task: ITask) => task.taskType !== 'REMINDER');
    // for each main task, find reminders and nest them
    mainTasks = mainTasks.map((task: ITask) => {
      // find subtasks
      const currentTaskId = task.id;
      const subTasks = data.filter((subTask: ITask) => subTask.ParentSurveyTaskId === currentTaskId);
      return (task.taskType === 'SURVEY') ? Object.assign({}, task, {children: subTasks}) : task;
    });
    return mainTasks;
  }

  private cleanData = (data: ITask[]) => {
    // console.log(data);
    const cleanedData = data.map((task: ITask) => {
      const newTask = {};
      const keys = Object.keys(task);

      keys.map(keyName => {
        switch (keyName) {
          case 'scheduledTime':
            newTask[keyName] = `${moment(task[keyName]).format('hh:mm A MMM Do, YYYY')}`;
            break;
          case 'createdAt':
            newTask[keyName] = `${moment(task[keyName]).format('hh:mm A MMM Do, YYYY')}`;
            break;
          case 'updatedAt':
            newTask[keyName] = `${moment(task[keyName]).format('hh:mm A MMM Do, YYYY')}`;
            break;
          case 'completed':
            newTask[keyName] = (task[keyName] ? 
              <Badge status="success" text="Completed"/>
              : <Badge status="default" text="Pending"/>);
            break;
          default:
            newTask[keyName] = `${task[keyName]}`;
            break;
        }
      });
    
      return newTask;
    });
    // console.log(cleanedData);
    return cleanedData;
  }

  private enrichDataWithRowKeys = (data: any[]) =>  {
    return data.map((d: any, i: number) => Object.assign(
      {}, d, {key: i, actions: <a onClick={() => this.toggleExistingTaskModal(d.id)}>Details</a>})
    );
  }

  private renderTaskTable = (taskData: ITask[]) => {
    return (
      <Table
        size="small"
        rowSelection={this.rowSelection}
        columns={this.columns}
        dataSource={this.nestify(this.enrichDataWithRowKeys(this.cleanData(taskData)))}
      />
    );
  }

  private toggleNewTaskModal = () => {
    const { newTaskModalOpen } = this.state;
    this.setState({
      newTaskModalOpen: !newTaskModalOpen,
    });
  }

  private toggleExistingTaskModal = (taskId: any) => {
    const { existingTaskModalOpen } = this.state;
    this.setState({
      currentTaskId: taskId,
      existingTaskModalOpen: !existingTaskModalOpen,
    });
  }

  private deleteTasks = () => {
    Promise.all(this.state.selectedTasks.map((task: ITask) => {
      return axios.delete(`http://localhost:8080/task/${task.id}`);
    }))
    .then((d) => {
      this.updateTasksData();
    });
  }

  public render() {

    let TaskTable = (this.state.loadingTasks ? <Spin/> : <div>No Tasks</div>);
    let ExistingTaskModalVar = <div>No Task Specified</div>;

    if (this.state.tasks.length) {
      TaskTable = this.renderTaskTable(this.state.tasks);
    }

    // Only renders if there is a task defined
    if (this.state.currentTaskId) {
      ExistingTaskModalVar = (
        <ExistingTaskModal
          taskId={this.state.currentTaskId}
          toggleExistingTaskModal={this.toggleExistingTaskModal}
          updateTasksData={this.updateTasksData}
        />
      );
    }

    let NewTaskModalVar = <div>No Task Specified</div>;
    if (this.props.studyId) {
      NewTaskModalVar = (
        <NewTaskModal
          studyId={this.props.studyId}
          updateTasksData={this.updateTasksData}
          toggleNewTaskModal={this.toggleNewTaskModal}
        />
      );
    }

    return (
      <div className="tasks-tab">
        <Button onClick={() => this.toggleNewTaskModal()}>Create New Task</Button>
        <Button type="danger" onClick={this.deleteTasks}>Delete Tasks</Button>
        {TaskTable}
        
        <Modal
          visible={this.state.newTaskModalOpen}
          onCancel={this.toggleNewTaskModal}
          title="Create New Task"
          maskClosable={false}
          footer={null}
          width="80%"
        >
          {NewTaskModalVar}
        </Modal>
        <Modal
          title="Edit Task"
          visible={this.state.existingTaskModalOpen}
          onCancel={this.toggleExistingTaskModal}
          maskClosable={false}
          footer={null}
          width="80%"
        >
          {ExistingTaskModalVar}
        </Modal>

      </div>
    );
  }
}

export default TasksTab;
