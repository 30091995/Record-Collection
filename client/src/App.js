import React from "react";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import SearchField from "./components/searchField";


class App extends React.Component {
  state = {};

  render() {
    return (
      <div className="App">
        <SearchField></SearchField>
      </div>
    );
  }
}

export default App;
