import React from "react";

function RecordRow(props) {
  return (
    <div>
      {props.record.artist} {props.record.albumName}
    </div>
  );
}

export default RecordRow;
