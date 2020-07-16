import React, { Component } from "react";
import axios from "axios";
import AddRecord from './AddRecord'
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
        )
      });
      console.log(this.state.releases)
    });
  }

  render() {
    let singleRelease = {
      artist: "",
      title: "",
      imgUrl: "",
      recordMainRelease: ""
    }

    return (
      <div>
        {this.state.releases.length > 0 ? 
          this.state.releases.map((release, index) => {
            singleRelease = {
              artist: release.artist,
              title: release.title,
              imgUrl: release.thumb,
              recordMainRelease: release.main_release
            }
            return(<AddRecord singleRelease={singleRelease} key={index} user={this.props.user}/>)
          })
         : (
          <Spinner size="lg" color="info">Loading...</Spinner>
        )}
      </div>
    );
  }
}

export default ShowReleases;
