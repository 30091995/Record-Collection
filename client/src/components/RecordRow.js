import React from "react";
import axios from 'axios'



function RecordRow(props) {

  let removeRecordCallBack = () => {
    axios.put('/api/deleterecord/' + props.record.title)
    .then((response) => {
      console.log('Record removed from collection')
    })
    props.removeHandler(props.record.title)
  }


  return (
    <div>
      {props.record.artist} {props.record.title}
      <br></br>
      <img src={props.record.imgUrl} />
      <br />
      <button onClick={removeRecordCallBack}>Remove from collection</button>
    </div>
  );
}

export default RecordRow;
