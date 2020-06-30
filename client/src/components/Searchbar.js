import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Searchbar(props) {
  let searchHandler = (event) => {
    let inputValue = event.target.value;
    props.onSearchCallBack(inputValue);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search for artist"
        aria-label="Search for artist"
        aria-describedby="basic-addon2"
        onChange={searchHandler}
        value={props.currentSearchTerm}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary">Search</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default Searchbar;
