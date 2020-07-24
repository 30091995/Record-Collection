import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import './AddRecord.css'

class AddRecord extends Component {
  state = {
    saved: false,
  };

  saveRecord = () => {
    const artist = this.props.singleRelease.artist;
    const title = this.props.singleRelease.title;
    const imgUrl = this.props.singleRelease.imgUrl;
    const userId = this.props.user._id;
    const recordMainRelease = this.props.singleRelease.recordMainRelease;

    console.log(userId);

    axios
      .post("/api/records", {
        artist,
        title,
        imgUrl,
        userId,
        recordMainRelease,
      })
      .then((response) => {
        if (response.data !== null) {
          this.setState({
            saved: response.data.saved,
          });
        }
      });
  };

  render() {
    return (
      <div className="card-group">
        <div
          className="card shadow m-2 border-info"
          style={{ width: "150px" }}
          id="st"
        >
          <div
            id="imgSize"
            style={{
              backgroundImage: `url("${this.props.singleRelease.imgUrl}"`,
            }}
          />
          <div className="card-body">
            <h6 className="card-title">{this.props.singleRelease.title}</h6>
            <Link
              className="text-info smallerText"
              to={"/showRelease/" + this.props.singleRelease.recordMainRelease}
            >
              {`${">>"}`} Show tracks
            </Link>
          </div>

          <div className="card-footer bg-light">
            {this.state.saved ? (
              <Button block color="info" size="sm" onClick={this.saveRecord}>
                {this.state.saved}
              </Button>
            ) : (
              <Button block color="dark" size="sm" onClick={this.saveRecord}>
                Save record
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecord;
