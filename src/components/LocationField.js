import React, { Component } from "react";

import AutoComplete from "material-ui/AutoComplete";

import { getLocations } from "../services/Client";

export default class LocationField extends Component {
  state = {
    searchText: "",
    autocompleteSource: []
  };

  dataSourceConfig = {
    text: "name",
    value: "id"
  };

  render() {
    return (
      <div>
        <AutoComplete
          hintText={this.props.placeholder}
          searchText={this.state.searchText}
          onUpdateInput={this._handleUpdateInput}
          onNewRequest={this._handleNewRequest}
          dataSource={this.state.autocompleteSource}
          dataSourceConfig={this.dataSourceConfig}
          // Data sources are already filtered by server
          filter={() => true}
          openOnFocus={true}
        />
      </div>
    );
  }

  _handleUpdateInput = (searchText, dataSource, params) => {
    this.setState({
      searchText: searchText,
      autocompleteSource: []
    });

    // Changes only from user input triggers loading recommendations
    if (params.source === "change") {
      this.props.onLocationChanged(searchText);

      getLocations(searchText).then(response => {
        this.setState({
          ...this.state,
          autocompleteSource: response.locations
        });
      });
    }
  };

  _handleNewRequest = location => {
    this.props.onLocationChanged(location.code);
  };
}
