import React, { Component } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

class ShowReleases extends Component {
  state = {
    releases: [],
  };

  componentDidMount() {
    axios.get("/api/showReleases/" + this.props.artistId).then((releases) => {
      this.setState({
        releases: releases.data.releases.filter(
          (singleRelease) => singleRelease.type === "master"
        ),
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.releases.length > 0 ? (
          this.state.releases.map((release) => (
            <div key={release.id}>{release.title}</div>
          ))
        ) : (
          <Spinner animation="border" variant="info"></Spinner>
        )}
      </div>
    );
  }
}

export default ShowReleases;
