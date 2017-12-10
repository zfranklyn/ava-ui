import * as React from 'react';
import {
  DatePicker,
  InputNumber,
  Checkbox,
  Select,
  Divider,
} from 'antd';
const Option = Select.Option;
import {
} from './../../../../sharedTypes';
// import * as moment from 'moment';

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

        <label>
          Select Schedule Type:
          <Select
            value={this.props.schedule.scheduleType}
            onChange={e => this.props.handleChangeSchedule(e, 'scheduleType')}
          >
            <Option value="none">None</Option>
            <Option value="days">Every N Days</Option>
            <Option value="weeks">Every N Weeks</Option>
            <Option value="months">Every N Months</Option>
            <Option value="years">Every N Years</Option>
          </Select>
        </label>

        {(this.props.schedule.scheduleType === 'weeks') ? (
          <div className="weekpicker">
            <Divider/>
          
            <label className="pt-label">
              Which days of the week would you like to repeat the survey?
            </label>
            <Checkbox
              // checked={}
              value="monday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Monday
            </Checkbox>
            <Checkbox
              // checked={}
              value="tuesday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Tuesday
            </Checkbox>
            <Checkbox
              // checked={}
              value="wednesday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Wednesday
            </Checkbox>
            <Checkbox
              // checked={}
              value="thursday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Thursday
            </Checkbox>
            <Checkbox
              // checked={}
              value="friday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Friday
            </Checkbox>
            <Checkbox
              // checked={}
              value="saturday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
            Saturday
            </Checkbox>
            <Checkbox
              // checked={}
              value="sunday"
              onChange={e => this.props.handleChangeWeek(e)}
            >
              Sunday
            </Checkbox>
            <Divider/>
          </div>
        ) : null}

        {/* Only render schedule details if schedule is specified */}
        {(this.props.schedule.scheduleType !== 'none') ? (
          <div>
            <label className="pt-label">
              Every
              <InputNumber
                name="everyN"
                min={0}
                value={this.props.schedule.everyN}
                onChange={e => this.props.handleChangeN(e)}
              />
              {this.props.schedule.scheduleType}
            </label>

            <label>
              Schedule End Date
              <DatePicker
                format="MM-DD-YYYY"
                onChange={(newDate) => this.props.handleChangeScheduleEndDate(newDate)}
              />
            </label>
          </div>
        ) : null}

      </div>
    );
  }

}

export default ScheduleSection;
