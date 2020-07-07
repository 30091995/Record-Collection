import React from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import './RecordRow.css'
import {
  Card, CardImg, CardText, CardDeck, CardBody,
  CardTitle, CardSubtitle, Button, CardLink
} from 'reactstrap';


function RecordRow(props) {

  let removeRecordCallBack = () => {
    axios.put('/api/deleterecord/' + props.record.title)
    .then((response) => {
      console.log('Record removed from collection')
    })
    props.removeHandler(props.record.title)
  }


  return (
      <Card className="m-3 shadow">
        <CardImg top width="100%" className="imgSize" src={props.record.imgUrl} />
        <CardTitle>{props.record.artist}</CardTitle>
        <CardSubtitle>{props.record.title}</CardSubtitle>
        <CardLink href={'/showRelease/' + props.record.recordMainRelease}>{props.record.title}</CardLink>
        <Button outline inverted color="danger" onClick={removeRecordCallBack}>Remove from collection</Button>
      </Card>
  );
}

export default RecordRow;
