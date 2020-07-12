import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import RecordRow from "./RecordRow";
import {
  Container,
  Input,
  Row,
  Col,
  CardDeck,
  CardColumns,
} from "reactstrap";

class Profile extends Component {
  state = {
    searchTerm: "",
    records: [],
  };

  componentDidMount() {
    axios.get("/api/records").then((allRecords) => {
      console.log(allRecords.data);
      this.setState({
        records: allRecords.data.filter((record) =>
          record.owners.includes(this.props.user._id)
        ),
      });
      console.log(this.state.records);
    });
  }

  searchHandler = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  removeOneRecord = (title) => {
    let newArr = this.state.records.filter((record) => record.title !== title);
    this.setState({
      records: newArr,
    });
  };

  render() {
    let filtered = [];
    filtered = this.state.records.filter((record) => {
      return (record.title.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()) ||
      record.artist.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      )
    });

    
    return (
      <Container fluid className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Your Records</Col>
            <hr className="border border-info rounded"></hr>
            <Col className="py-4">
              <Input
                className="text-center"
                placeholder="Type to search your collection"
                onChange={this.searchHandler}
                value={this.state.searchTerm}
              />
            </Col>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {filtered.map((record) => (
            <RecordRow
              key={record._id}
              record={record}
              removeHandler={this.removeOneRecord}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default Profile;
