import React, { Component } from "react";
import axios from "axios";

class SearchField extends Component {
  state = {
    search: "",
  };

  searchHandler = (event) => {
    // this.props.instantSearchHandler(this.state.search);

    this.setState({
      search: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    axios.get("/profile/" + this.state.search).then((response) => {
      this.setState({
        search: "",
      });
    });
  };

  render() {

    return (
      <div>
        <form>
          <input
            type="text"
            className="input"
            name="search"
            value={this.state.search}
            onChange={this.searchHandler}
            placeholder="search for artist"
          />
          <button type="submit" onClick={this.submitHandler}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SearchField;
