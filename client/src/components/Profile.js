import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./Searchbar";
import RecordRow from "./RecordRow";
import {
  InputGroup,
  CardGroup,
  Container,
  Input,
  Row,
  Col,
  CardDeck,
} from "reactstrap";

class Profile extends Component {
  state = {
    searchTerm: "",
    records: [],
  };

  componentDidMount() {
    axios.get("/api/records").then((allRecords) => {
      console.log(allRecords.data)
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
    filtered = this.state.records.filter((record) =>
      record.title
        .toLowerCase()
        .includes(this.state.searchTerm.toLocaleLowerCase())
    );

    return (
      <Container fluid className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4">ALL YOUR RECORDS</Col>
          </Col>
        </Row>

        <Row className="justify-content-center">
        <Col xs="12" md="8" className="my-4">
        <InputGroup>
            <Input
              placeholder="Search your record collection"
              onChange={this.searchHandler}
              value={this.state.searchTerm}
            />
          </InputGroup>

        </Col>
         
        </Row>

        <Row xs="12" className="justify-content-center">
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
