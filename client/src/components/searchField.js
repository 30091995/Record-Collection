import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
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
      <div className="col-6">
        <form className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            name="search"
            value={this.state.search}
            onChange={this.searchHandler}
            placeholder="search for artist"
          />

          <div className="input-group-append">
            <button
              className="btn btn-dark"
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
