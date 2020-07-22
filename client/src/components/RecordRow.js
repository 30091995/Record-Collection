import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecordRow.css";
import {
  Button,
} from "reactstrap";
import { CSSTransition } from 'react-transition-group';

function RecordRow(props) {

  const [inProp, setInProp] = useState(true);

  let removeRecordCallBack = () => {

      axios.put("/api/deleterecord/" + props.record._id).then((response) => {
        console.log("Record removed from collection");
        props.removeHandler(props.record._id)    
      });
  };


  return (
    <CSSTransition in={inProp} onExited={removeRecordCallBack} timeout={200} classNames="fade">
    <div className="card-group">
        
      <div
        className="card shadow m-2 border-info"
        style={{ width: "150px" }}
        id="st"
      >
        <div
          id="imgSize"
          style={{ backgroundImage: `url("${props.record.imgUrl}"` }}
        />
        
        <div className="card-body linkAtBottom">
        <div>
          <h6 className="card-title">{props.record.artist}</h6>
          <p className="text-muted smallerText">{props.record.title}</p>
        </div>
          <Link
            className="text-info smallerText"
            to={"/showRelease/" + props.record.recordMainRelease}
          >
            {`${">>"}`} Show Tracks
          </Link>
        </div>


        <div className="card-footer bg-white">
          <Button outline block color="danger" size="sm" onClick={() => setInProp(false)}>Remove</Button>
        </div>
      </div>
    </div>
    </CSSTransition>
  );
}

export default RecordRow;
