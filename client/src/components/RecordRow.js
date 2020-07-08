import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecordRow.css";
import {
  Card,
  Col,
  Row,
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
    <div className="card-group">
      <div className="card shadow m-3 border-secondary" style={{ width: "200px" }} id="st">
        <div
          id="imgSize"
          style={{ backgroundImage: `url("${props.record.imgUrl}"` }}
        />
        <div className="card-body">
          <h6 className="card-title">{props.record.artist}</h6>
          <p className="text-muted">{props.record.title}</p>
        </div>

        <div className="card-footer bg-light">
          <Link
            className="badge badge-info mx-1"
            to={"/showRelease/" + props.record.recordMainRelease}
          >
            Show Release
          </Link>

          <Link
            className="card-link badge badge-danger mx-1"
            onClick={removeRecordCallBack}
          >
            Remove
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecordRow;
