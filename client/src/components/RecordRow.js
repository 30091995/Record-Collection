import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecordRow.css";
import {
  Card,
  Col,
  CardImg,
  CardText,
  CardDeck,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardLink,
  CardHeader,
  CardFooter,
} from "reactstrap";

function RecordRow(props) {
  let removeRecordCallBack = () => {
    axios.put("/api/deleterecord/" + props.record.title).then((response) => {
      console.log("Record removed from collection");
    });
    props.removeHandler(props.record.title);
  };

  return (
    // <Card className="m-3 shadow">
    //   <div
    //     id="imgSize"
    //     style={{ backgroundImage: `url("${props.record.imgUrl}"` }}
    //   ></div>
    //   <CardBody>
    //     <CardText>
    //       {props.record.artist}
    //   {props.record.title}
    //     </CardText>
    //   </CardBody>
    //   <CardFooter>
    //     <Button outline inverted color="danger" onClick={removeRecordCallBack}>
    //       Remove
    //     </Button>
    //     <Button outline inverted color="info">
    //       <Link as Button to={"/showRelease/" + props.record.recordMainRelease}>
    //         Show Record
    //       </Link>
    //     </Button>
    //   </CardFooter>
    // </Card>

    <div className="card " style={{ width: "150px" }}>
      <div id="imgSize" style={{ backgroundImage: `url("${props.record.imgUrl}"` }} />
      <div className="card-body">
        <h5 className="card-title">{props.record.artist}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.record.title}</h6>
        <Link className="card-link" to={"/showRelease/" + props.record.recordMainRelease}>
          Show Release
        </Link>
        <Button outline inverted color="danger" onClick={removeRecordCallBack}>
       Remove
      </Button>
      </div>
    </div>



  );
}

export default RecordRow;
