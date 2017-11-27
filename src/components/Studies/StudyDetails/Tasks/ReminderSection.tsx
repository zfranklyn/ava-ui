import * as React from 'react';
import {
  Button,
  NumericInput,
} from '@blueprintjs/core';
import {
} from './../../../../sharedTypes';

export interface IReminderSectionProps {
  reminders: {
    type: string,
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
              <div key={index}>
                <h3>Reminder #{index + 1}</h3>
                <label className="pt-label">
                  Reminder Medium
                  <div className="pt-select">
                    <select
                      value={this.props.reminders[index].mediumType}
                      name="mediumType"
                      onChange={(e) => this.props.handleChangeReminder(e, index)}
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
                    onChange={(e) => this.props.handleChangeReminder(e, index)}
                    value={this.props.reminders[index].description}
                  />
                </label>

                <label className="pt-label">
                  Message
                  <input
                    name="message"
                    className="pt-input pt-fill"
                    onChange={(e) => this.props.handleChangeReminder(e, index)}
                    value={this.props.reminders[index].message}
                  />
                  <span className="pt-text-muted">{this.props.reminders[index].message.length}/160</span>
                </label>

                <h5>Reminder Send Time (since Survey distribution)</h5>
                <label className="pt-label">
                  Days Since Survey
                  <NumericInput
                    placeholder="Days"
                    min={0}
                    name="days"
                    value={this.props.reminders[index].days}
                    onValueChange={(e) => this.props.handleChangeReminderTime(e, index, 'days')}
                  />
                </label>
                <label className="pt-label">
                  Hours Since Survey
                  <NumericInput
                    placeholder="Hours since survey"
                    min={0}
                    name="hours"
                    value={this.props.reminders[index].hours}
                    onValueChange={(e) => this.props.handleChangeReminderTime(e, index, 'hours')}
                  />
                </label>
                <label className="pt-label">
                  Minutes Since Survey
                  <NumericInput
                    placeholder="Minutes since survey"
                    min={0}
                    name="minutes"
                    value={this.props.reminders[index].minutes}
                    onValueChange={(e) => this.props.handleChangeReminderTime(e, index, 'minutes')}
                  />
                </label>
                <Button
                  onClick={() => this.props.handleRemoveReminder(index)}
                  className="pt-intent-danger"
                  text="Delete Reminder"
                />
              </div>
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
