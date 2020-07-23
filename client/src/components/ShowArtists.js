import React, { Component } from "react";
import SearchBar from "./Searchbar.js";
import axios from "axios";
import placeholderImage from "../images/default-band-image.png";
import {
  Container,
  CardImg,
  CardColumns,
  CardTitle,
  Row,
  Col,
  CardLink,
} from "reactstrap";
import "./ShowArtist.css";

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
      <Container className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Search Artist</Col>
            <hr className="border border-info rounded"></hr>
            <Col className="py-4">
              <SearchBar
                className="text-center"
                onSearchCallBack={this.searchHandler}
                currentSearchTerm={this.state.searchTerm}
                onSubmit={this.submitHandler}
                placeholder="Search for Artist"
              >
                Search
              </SearchBar>
            </Col>
          </Col>
        </Row>

        <CardColumns className="mx-2">
          {this.state.artists.map((singleArtist) => (
            <div
              key={singleArtist.id}
              className="card border-info text-black text-left px-2 pt-2"
            >
              <CardImg
                src={
                  !singleArtist.cover_image.includes("spacer")
                    ? singleArtist.cover_image
                    : placeholderImage
                }
                alt="Pic not available"
              />
              <div className="my-3 mx-2 text-left">
              <CardTitle className="h5 text-info">
                {singleArtist.title}
              </CardTitle>
              <CardLink className="stretched-link" href={singleArtist.id + "/releases"}>
                <span className="text-info"> {`${">>"}`} See releases</span>
              </CardLink>
              </div>
            </div>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default ShowArtists;
