import React, { Component } from "react";

import DatePicker from "material-ui/DatePicker";

import { getFormattedDate } from "../services/Utils";

export default class DateField extends Component {
  minDate = new Date();

  render() {
    return (
      <div>
        <DatePicker
          hintText={this.props.placeholder}
          container="inline"
          mode="landscape"
          onChange={this._handleChange}
          minDate={this.minDate}
          formatDate={getFormattedDate}
        />
      </div>
    );
  }

  _handleChange = (event, date) => {
    this.props.onDateSelected(date);
  };
}
