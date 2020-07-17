import React, { Component } from "react";
import axios from "axios";
import "./SingleRelease.css";
import ReactPlayer from "react-player";
import { Container, Row, Col, Spinner } from "reactstrap";

class SingleRelease extends Component {
  state = {
    release: null,
  };

  componentDidMount() {
    axios
      .get("/api/showSingleRelease/" + this.props.releaseNumber)
      .then((release) => {
        this.setState({
          release: release.data,
        });
        console.log(this.state.release);
      });
  }

  render() {
    return (
      <Container fluid className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Videos</Col>
            <hr className="border border-info rounded"></hr>
            {this.state.release && (
              <Col>
                <h4 className="text-light">
                  {this.state.release.artists_sort} - {this.state.release.title}
                </h4>
              </Col>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center">
          {!this.state.release && <Spinner color="info"></Spinner>}
          {this.state.release && this.state.release.videos
            ? this.state.release.videos.map((video, index) => (
                <Col xs="auto" className="m-3 border border-info">
                  <ReactPlayer width="100%" height="100%" url={video.uri} />
                </Col>
              ))
            : null}
        </Row>
      </Container>
    );
  }
}

export default SingleRelease;
