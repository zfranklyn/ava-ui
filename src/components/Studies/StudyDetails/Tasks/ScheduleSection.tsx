import * as React from 'react';
import {
  Button,
  Checkbox,
  NumericInput,
  Popover,
} from '@blueprintjs/core';
import {
  DatePicker,
} from '@blueprintjs/datetime';
import {
} from './../../../../sharedTypes';
import * as moment from 'moment';

export interface IScheduleSectionProps {
  handleChangeSchedule: Function;
  handleChangeN: Function;
  handleChangeScheduleEndDate: Function;
  handleChangeWeek: Function;
  schedule: {
    scheduleType: string; // days, weeks, months, years, none
    everyN: number;
    endRepeatDate: Date;
    repeatDays: string[];
  };
}

export interface IScheduleSectionState {
}

class ScheduleSection extends React.Component<IScheduleSectionProps, IScheduleSectionState> {

  constructor(props: IScheduleSectionProps) {
    super(props);
  }

  public render() {

    return (
      <div>
        <p>
          Please indicate the frequency with which you want this surve task
          to be executed. Every 'repeat' of this schedule will generate a 
          new task (along with its surveys).
        </p>

        <label className="pt-label">
          <div className="pt-select">
            <select
              value={this.props.schedule.scheduleType}
              name="scheduleType"
              onChange={e => this.props.handleChangeSchedule(e)}
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
        {(this.props.schedule.scheduleType !== 'none') ? (
          <div>
            <label className="pt-label">
              Every
              <NumericInput
                name="everyN"
                min={0}
                value={this.props.schedule.everyN}
                onValueChange={e => this.props.handleChangeN(e)}
              />
              {this.props.schedule.scheduleType}
            </label>

            <Popover>
              <Button
                className="pt-minimal"
                text={`Repeat End Date: ${moment(this.props.schedule.endRepeatDate).format('MMM Do, YYYY')}`}
              />
              <DatePicker
                defaultValue={this.props.schedule.endRepeatDate}
                onChange={(newDate) => this.props.handleChangeScheduleEndDate(newDate)}
                minDate={new Date()}
                maxDate={new Date(moment().add(5, 'years').format())}
              />
            </Popover>
          </div>
        ) : null}

        {(this.props.schedule.scheduleType === 'weeks') ? (
          <div className="weekpicker">
            <label className="pt-label">
              Which days of the week would you like to repeat the survey?
            </label>
            <Checkbox
              label="Monday"
              // checked={}
              value="monday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Tuesday"
              // checked={}
              value="tuesday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Wednesday"
              // checked={}
              value="wednesday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Thursday"
              // checked={}
              value="thursday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Friday"
              // checked={}
              value="friday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Saturday"
              // checked={}
              value="saturday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
            <Checkbox
              label="Sunday"
              // checked={}
              value="sunday"
              onChange={e => this.props.handleChangeWeek(e)}
            />
          </div>
        ) : null}

      </div>
    );
  }

}

export default ScheduleSection;
