import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  Button,
} from "reactstrap";

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
        <Input
          placeholder={props.placeholder}
          onChange={searchHandler}
          value={props.currentSearchTerm}
        />
        <InputGroupAddon addonType="append">
          <Button outline color="secondary">
            {props.children}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  );
}

export default Searchbar;
