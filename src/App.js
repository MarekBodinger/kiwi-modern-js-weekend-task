import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import FlightSearch from "./components/FlightSearch";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <FlightSearch />
      </MuiThemeProvider>
    );
  }
}

export default App;