import * as React from 'react';
import {
  Button,
  Spinner,
  Dialog,
} from '@blueprintjs/core';
import './TasksTab.css';
import ExistingTaskModal from './ExistingTaskModal';
import NewTaskModal from './NewTaskModal';
import {
  ITaskAPI,
  ITask,
  convertTask,
} from './../../../../sharedTypes';
import * as moment from 'moment';

export interface ITasksTabProps {
  studyId: string | undefined;
}

export interface ITasksTabState {
  tasks: ITask[];
  newTaskModalOpen: boolean;
  existingTaskModalOpen: boolean;
  currentTask: ITask | null;
}

class TasksTab extends React.Component<ITasksTabProps, ITasksTabState> {

  constructor(props: ITasksTabProps) {
    super(props);
    this.state = {
      tasks: [],
      newTaskModalOpen: false,
      existingTaskModalOpen: false,
      currentTask: null,
    };
  }

  private headersToShow = [
    {headerToRender: 'Scheduled Time', headerInDB: 'scheduledTime'},
    {headerToRender: 'Status', headerInDB: 'completed'},
    {headerToRender: 'Task Type', headerInDB: 'type'},
    {headerToRender: 'Description', headerInDB: 'description'},
    {headerToRender: 'Medium', headerInDB: 'mediumType'},
    {headerToRender: 'Message', headerInDB: 'message'},
  ];

  public componentDidMount() {
    this.updateTaskData();
  }

  private updateTaskData = () => {
    fetch(`http://localhost:8080/tasks/study/${this.props.studyId}`)
    .then((res: Response) => res.json())
    .then((tasks: ITaskAPI[]) => {
      const convertedTasks: ITask[] = tasks.map(convertTask);
      this.setState({
        tasks: convertedTasks,
      });
    })
    .catch(console.log);
  }

  private renderRows = (studies: ITask[]) => {
    const headerNamesInDB = this.headersToShow.map(h => h.headerInDB);
    return (
      <tbody>
        {studies.map((task: ITask, key1: number) => {
          return (
            <tr
              key={key1}
              onClick={() => this.toggleExistingTaskModal(task)}
              className={`${task.completed ? 'completed' : ''}`}
            >
              {headerNamesInDB.map((header: any, key2: number) => {

                let cellContents;
                // varied rendering logic
                switch (header) {
                  case 'createdAt':
                    cellContents = moment(task[header]).format('MMM D, YYYY HH:MM');
                    break;
                  case 'updatedAt':
                    cellContents = moment(task[header]).format('MMM D, YYYY HH:MM');
                    break;
                  case 'completed':
                    cellContents = (task[header] ? 'Completed' : 'Pending');
                    break;
                  default:
                    cellContents = `${task[header]}`;
                    break;
                }

                return (
                  <td key={key2}>
                    {cellContents}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  private renderHeaders = (tasks: ITask[]) => {
    const headerNamesToRender = this.headersToShow.map(h => h.headerToRender);
    return (
      <thead>
        <tr>
          {headerNamesToRender.map((header: string, index: number) => <td key={index}>{header}</td>)}
        </tr>
      </thead>
    );
  }

  private renderTaskTable = (tasks: ITask[]) => {
    return (
      <table className="pt-table pt-condensed pt-striped pt-interactive" style={{width: '100%'}}>
        {this.renderHeaders(tasks)}
        {this.renderRows((tasks))}
      </table>
    );
  }

  private toggleNewTaskModal = () => {
    const { newTaskModalOpen } = this.state;
    this.setState({
      newTaskModalOpen: !newTaskModalOpen,
    });
  }

  private toggleExistingTaskModal = (task: any) => {
    const { existingTaskModalOpen } = this.state;
    this.setState({
      currentTask: task,
      existingTaskModalOpen: !existingTaskModalOpen,
    });
  }

  public render() {

    let TaskTable = <Spinner/>;
    let ExistingTaskModalVar = <div>No Task Specified</div>;

    if (this.state.tasks.length) {
      TaskTable = this.renderTaskTable(this.state.tasks);
    }

    if (this.state.currentTask) {
      ExistingTaskModalVar = <ExistingTaskModal task={this.state.currentTask}/>;
    }

    return (
      <div className="tasks-tab">
        <Button text="Create Tasks" onClick={() => this.toggleNewTaskModal()}/>
        {TaskTable}
        
        <Dialog
          isOpen={this.state.newTaskModalOpen}
          onClose={this.toggleNewTaskModal}
        >
          <NewTaskModal/>
        </Dialog>
        <Dialog
          isOpen={this.state.existingTaskModalOpen}
          onClose={this.toggleExistingTaskModal}
        >
          {ExistingTaskModalVar}
        </Dialog>

      </div>
    );
  }
}

export default TasksTab;
