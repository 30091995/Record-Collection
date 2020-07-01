import React, { Component } from "react";
import SearchBar from "./Searchbar.js";
import { Link } from "react-router-dom";
import axios from "axios";

class ShowArtists extends Component {
  state = {
    searchTerm: "",
    artists: [],
  };

  searchHandler = (search) => {
    this.setState({
      searchTerm: search,
    });
  };

  submitHandler = () => {
    axios.get("/api/searchArtist/" + this.state.searchTerm).then((response) => {
      this.setState({
        searchTerm: "",
        artists: response.data.filter((res) => res.type === "artist"),
      });
      console.log(this.state.artists);
    });
  };

  render() {
    return (
      <div>
        <h3>Search Artist :</h3>

        <SearchBar
          onSearchCallBack={this.searchHandler}
          currentSearchTerm={this.state.searchTerm}
          onSubmit={this.submitHandler}
          placeholder="Type in Artist"
        >Search for Artist</SearchBar>

        {this.state.artists.map((singleArtist) => (
          <div key={singleArtist.id}>
            <Link to={""}>
              {" "}
              {singleArtist.title} <br />
            </Link>{" "}
          </div>
        ))}
      </div>
    );
  }
}

export default ShowArtists;
