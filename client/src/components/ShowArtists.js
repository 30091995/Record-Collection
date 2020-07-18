import React, { Component } from "react";
import SearchBar from "./Searchbar.js";
import axios from "axios";
import placeholderImage from "../images/no-image-found-2.jpg";
import {
  Container,
  Card,
  CardImg,
  CardColumns,
  CardTitle,
  CardImgOverlay,
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
            <Card key={singleArtist.id} inverse>
              <CardImg
                width="100%"
                src={
                  !singleArtist.cover_image.includes("spacer")
                    ? singleArtist.cover_image
                    : placeholderImage
                }
                alt="Pic not available"
              />
              <CardImgOverlay>
                <CardTitle className="blurBg">{singleArtist.title}</CardTitle>

                <CardLink href={singleArtist.id + "/releases"}>
                  <span className="text-info"> {`${">"}`} see releases</span>
                </CardLink>
              </CardImgOverlay>
            </Card>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default ShowArtists;
