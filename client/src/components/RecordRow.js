import React from "react";
import axios from 'axios'
import { response } from "express";

function RecordRow(props) {


  /*let removeRecord = () => {
    axios.delete('/api/deleterecord' + props.record.id)
    .then((response) => {
      console.log('Record removed from collection')
    })
  } */


  return (
    <div>
      {props.record.artist} {props.record.title}
      <br />
      <img src={props.record.imgUrl} />
      <br />
      <button>Remove from collection</button>
    </div>
  );
}

export default RecordRow;
