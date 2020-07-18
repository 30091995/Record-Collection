import React, { Component } from "react";
import axios from "axios";
import AddRecord from "./AddRecord";
import { Spinner, Row, Container, Col } from "reactstrap";

class ShowReleases extends Component {
  state = {
    releases: [],
    artist: null
  };

  componentDidMount() {
    axios.get("/api/showReleases/" + this.props.artistId).then((releases) => {
      this.setState({
        releases: releases.data.releases.filter(
          (singleRelease) => singleRelease.type === "master"
        ),
        artist: releases.data.releases[0].artist
      });
      console.log(this.state.releases);
    });
  }

  render() {
    let singleRelease = {
      artist: "",
      title: "",
      imgUrl: "",
      recordMainRelease: "",
    };

    return (
      <Container fluid className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Releases</Col>
            <hr className="border border-info rounded"></hr>
           {this.state.artist &&  <Col><h4 className="text-info">{this.state.artist}</h4></Col>}
          
          </Col>
        </Row>

        {this.state.releases.length > 0 ? (
          <Row className="justify-content-center">
            {this.state.releases.map((release, index) => {
              singleRelease = {
                artist: release.artist,
                title: release.title,
                imgUrl: release.thumb,
                recordMainRelease: release.main_release,
              };
              return (
                <AddRecord
                  singleRelease={singleRelease}
                  key={index}
                  user={this.props.user}
                />
              );
            })}
          </Row>
        ) : (
          <Row className="justify-content-center">
          <Spinner size="lg" color="info">
            Loading...
          </Spinner>
          </Row>
        )}
      </Container>
    );
  }
}

export default ShowReleases;
