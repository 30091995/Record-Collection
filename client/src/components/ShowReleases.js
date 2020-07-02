import React, { Component } from "react";
import axios from "axios";
import { Spinner } from 'reactstrap';

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
          <Spinner size="lg" color="info">Loading...</Spinner>
        )}
      </div>
    );
  }
}

export default ShowReleases;
