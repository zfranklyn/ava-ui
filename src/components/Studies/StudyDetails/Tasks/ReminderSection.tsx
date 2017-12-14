import * as React from 'react';
import {
  Button,
  Card,
  Input,
  InputNumber,
  Select,
} from 'antd';
import {
  TaskType,
} from './../../../../sharedTypes';
const { TextArea } = Input;
const Option = Select.Option;
export interface IReminderSectionProps {
  reminders: {
    taskType: TaskType,
    subject: string;
    message: string,
    description: string,
    mediumType: string,
    days: number;
    hours: number;
    minutes: number;
  }[];
  handleChangeReminder: Function;
  handleChangeReminderTime: Function;
  handleRemoveReminder: Function;
}

export interface IReminderSectionState {
}

class ReminderSection extends React.Component<IReminderSectionProps, IReminderSectionState> {

  constructor(props: IReminderSectionProps) {
    super(props);
  }

  public render() {

    // Reminders section for New Study
    if (this.props.reminders.length) {
      return (
        <div>
          {this.props.reminders.map((reminder: any, index: number) => {
            return (
              <Card key={index} title={`Reminder #${index + 1}`}>
                <label className="pt-label">
                  Reminder Medium
                  <div className="pt-select">
                    <Select
                      value={this.props.reminders[index].mediumType}
                      onChange={(e) => this.props.handleChangeReminder(e, index, 'mediumType')}
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
                    onChange={(e) => this.props.handleChangeReminder(e, index)}
                    value={this.props.reminders[index].description}
                  />
                </label>

                <label>
                  Subject
                  <Input
                    name="subject"
                    onChange={(e) => this.props.handleChangeReminder(e, index)}
                    value={this.props.reminders[index].subject}
                  />
                </label>
                <label>
                  Message
                  <TextArea
                    name="message"
                    onChange={(e) => this.props.handleChangeReminder(e, index)}
                    value={this.props.reminders[index].message}
                  />
                  <span className="pt-text-muted">{this.props.reminders[index].message.length}/160</span>
                </label>

                <h5>Reminder Send Time (since Survey distribution)</h5>
                <label className="pt-label">
                  Days Since Survey
                  <InputNumber
                    placeholder="Days"
                    min={0}
                    max={365}
                    name="days"
                    value={this.props.reminders[index].days}
                    onChange={(e) => this.props.handleChangeReminderTime(e, index, 'days')}
                  />
                </label>
                <label className="pt-label">
                  Hours Since Survey
                  <InputNumber
                    placeholder="Hours since survey"
                    min={0}
                    max={24}
                    name="hours"
                    value={this.props.reminders[index].hours}
                    onChange={(e) => this.props.handleChangeReminderTime(e, index, 'hours')}
                  />
                </label>
                <label className="pt-label">
                  Minutes Since Survey
                  <InputNumber
                    placeholder="Minutes since survey"
                    min={0}
                    max={60}
                    name="minutes"
                    value={this.props.reminders[index].minutes}
                    onChange={(e) => this.props.handleChangeReminderTime(e, index, 'minutes')}
                  />
                </label>
                <Button
                  onClick={() => this.props.handleRemoveReminder(index)}
                  type="danger"
                >
                  Delete Reminder
                </Button>
              </Card>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <span className="pt-text-muted">No Reminders</span>
        </div>
      );
    }
  }
}

export default ReminderSection;
