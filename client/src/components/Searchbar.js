import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

function Searchbar(props) {
  let searchHandler = (event) => {
    let inputValue = event.target.value;
    props.onSearchCallBack(inputValue);
  };

  let sub = (event) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <Form onSubmit={sub}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={props.placeholder}
          aria-label={props.placeholder}
          aria-describedby="basic-addon2"
          onChange={searchHandler}
          value={props.currentSearchTerm}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">{props.children}</Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default Searchbar;
