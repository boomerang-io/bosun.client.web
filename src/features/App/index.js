import React, { Component } from "react";
import { Route } from "react-router-dom";
import CreatePolicy from "Features/CreatePolicy";

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/policy/create" component={CreatePolicy} />
      </div>
    );
  }
}

export default App;
