import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecordRow.css";
import {
  Button,
} from "reactstrap";

function RecordRow(props) {

  let removeRecordCallBack = () => {

    axios.put("/api/deleterecord/" + props.record._id).then((response) => {
      console.log("Record removed from collection");
    });
    props.removeHandler(props.record._id);
  };


  return (
    <div className="card-group">
    
      <div
        className="card shadow m-2 border-secondary"
        style={{ width: "150px" }}
        id="st"
      >
        <div
          id="imgSize"
          style={{ backgroundImage: `url("${props.record.imgUrl}"` }}
        />
        
        <div className="card-body">
          <h6 className="card-title">{props.record.artist}</h6>
          <p className="text-muted smallerText">{props.record.title}</p>

          <Link
            className="text-info smallerText"
            to={"/showRelease/" + props.record.recordMainRelease}
          >
            Show Tracks
          </Link>
        </div>


        <div className="card-footer bg-light">
          <Button outline block color="danger" size="sm" onClick={removeRecordCallBack}>Remove</Button>
        </div>
      </div>
    </div>
  );
}

export default RecordRow;
