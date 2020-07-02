import React from "react";

function RecordRow(props) {
  return (
    <div>
      {props.record.artist} {props.record.title}
      <br></br>
      <img src={props.imgUrl} />
    </div>
  );
}

export default RecordRow;
