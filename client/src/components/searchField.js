import React, { Component } from "react";
import axios from "axios";

class SearchField extends Component {
  state = {
    search: "",
  };

  searchHandler = (event) => {

    this.setState({
      search: event.target.value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    axios.get("/api/searchArtist/" + this.state.search).then((response) => {
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
            name="search"
            value={this.state.search}
            onChange={this.searchHandler}
            placeholder="search for artist"
          />

          <div>
            <button
              type="submit"
              onClick={this.submitHandler}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchField;
