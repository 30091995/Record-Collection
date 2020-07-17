import React, { Component } from "react";
import "./ScanRecord.css";
import axios from "axios";
import AddRecord from "./AddRecord";
import { InputGroup, Input, Row, Col, Button, Container } from "reactstrap";
import Quagga from "quagga";

class ScanRecord extends Component {
  state = {
    scanResult: null,
    apiAnswer: null,
  };

  componentDidMount() {
    this.quaggaStart()
  }

  componentWillUnmount() {
    Quagga.stop();
  }

  quaggaStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.getElementById("vid"),
          constraints: {
            width: 300,
            height: 225,
            facingMode: "environment",
            // deviceId: "7832475934759384534"
          },
        },
        locate: true,
        decoder: {
          readers: ["ean_reader",  "code_128_reader", "upc_reader"],
        },
        locator: {
          halfSample: false,
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
        console.log("Initialization finished. Ready to start");
      }
    );

    Quagga.onProcessed((result) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "#17a2b8",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#17a2b8",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected((data) => {
      if (data) {
        Quagga.stop();
        axios
          .get("/api/scanRecord/" + data.codeResult.code)
          .then((response) => {
            let allResults = response.data;
            this.setState({
              scanResult: data.codeResult.code,
              apiAnswer: allResults,
            });
          });
      }
    });
  }

  render() {
    let singleRelease = {
      artist: "",
      title: "",
      imgUrl: "",
      recordMainRelease: "",
    };

    let scannedRecordApiAnswer = () => {
      return this.state.apiAnswer.map((release, index) => {
        singleRelease = {
          artist: release.title.split(" - ")[0],
          title: release.title.split(" - ")[1],
          imgUrl: release.thumb,
          recordMainRelease: release.id,
        };

        return (
          <AddRecord
            singleRelease={singleRelease}
            key={index}
            user={this.props.user}
          />
        );
      });
    }

    return (
      <Container fluid className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Scan a Record</Col>
            <hr className="border border-info rounded"></hr>
            <Col className="h-6 text-light my-3">
              Scan the Barcode of your record to add it to your collection
            </Col>
            
            {this.state.scanResult && <Button color="info" outline onClick={() => { this.quaggaStart() }}>Scan again</Button>}

          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col number={this.state.key} xs="auto" id="vid"></Col>
        </Row>
        {this.state.scanResult &&
        <Row className="justify-content-center m-3 text-center">
         <Row><h4 className="text-center">Records found for barcode <br></br><span className="text-info font-weight-normal">{this.state.scanResult}</span></h4></Row>
        </Row>
        }
        <Row className="justify-content-center m-3">
          {
            this.state.scanResult && 
            scannedRecordApiAnswer()
          }
        </Row>
      </Container>
    );
  }
}

export default ScanRecord;
