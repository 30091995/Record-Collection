import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function Searchbar(props) {

  let searchHandler = (event) => {
    let inputValue = event.target.value;
    props.onSearchCallBack(inputValue);
  };

  let sub = () => {
    props.onSubmit()
  }

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        aria-describedby="basic-addon2"
        onChange={searchHandler}
        value={props.currentSearchTerm}
      />
      <InputGroup.Append>
        <Button onClick={sub} variant="outline-secondary">{props.children}</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default Searchbar;
