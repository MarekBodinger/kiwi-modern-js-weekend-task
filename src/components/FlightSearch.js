import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import LinearProgress from "material-ui/LinearProgress";
import Paper from "material-ui/Paper";

import LocationField from "./LocationField";
import DateField from "./DateField";
import FlightList from "./FlightList";

import { getFlights } from "../services/Client";

export default class FlightSearch extends Component {
  state = {
    flyFrom: "",
    flyTo: "",
    date: undefined,
    loading: false,
    error: false
  };

  render() {
    return (
      <div>
        <LocationField
          placeholder="From"
          onLocationChanged={location =>
            this._handleLocationSelected(location, true)
          }
        />
        <LocationField
          placeholder="To"
          onLocationChanged={location =>
            this._handleLocationSelected(location, false)
          }
        />
        <DateField
          placeholder="Date of flight"
          onDateSelected={this._handleDateSelected}
        />
        {this.state.error && <Paper>Please fill all fields correctly.</Paper>}
        <RaisedButton
          label="Search"
          primary={true}
          onClick={this._handleSearchClick}
        />
        {this.state.loading && <LinearProgress mode="indeterminate" />}
        <FlightList flightData={this.state.flightData} />
      </div>
    );
  }

  _handleLocationSelected = (location, flightFrom) => {
    if (flightFrom) {
      this.setState({
        flyFrom: location
      });
    } else {
      this.setState({
        flyTo: location
      });
    }
  };

  _handleDateSelected = date => {
    this.setState({
      date
    });
  };

  _handleSearchClick = () => {
    // Check for incorrectly filled form
    if (!this.state.flyFrom.trim() || !(this.state.date instanceof Date)) {
      this.setState({
        error: true
      });

      return;
    }

    this.setState({
      loading: true,
      error: false
    });

    const { flyFrom, flyTo, date } = this.state;
    getFlights(flyFrom, flyTo, date).then(flightData => {
      this.setState({
        loading: false,
        flightData
      });
    });
  };
}
