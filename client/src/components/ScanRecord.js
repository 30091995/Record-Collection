import React, { Component } from "react";
import "./ScanRecord.css";
import axios from "axios";
import AddRecord from "./AddRecord";
import { Row, Col, Button, Container, Collapse } from "reactstrap";
import Quagga from "quagga";

class ScanRecord extends Component {
  state = {
    scanResult: null,
    apiAnswer: null,
    isOpen: false,
    disabled: false,
  };

  componentWillUnmount() {
    Quagga.stop();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      scanResult: null,
      apiAnswer: null,
      disabled: !this.state.disabled,
    });
  };

  quaggaStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.getElementById("vid"),
          constraints: {
            facingMode: "environment",
          },
        },
        locate: true,
        decoder: {
          readers: ["ean_reader", "code_128_reader", "upc_reader"],
        },
        locator: {
          halfSample: true,
          patchSize: "medium",
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
              isOpen: false,
              disabled: false,
            });
          });
      }
    });
  };

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
    };

    return (
      <Container fluid className="topMargin">
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center my-4">
            <Col className="display-4 text-light my-3">Scan a Record</Col>
            <hr className="border border-info rounded"></hr>

            {!this.state.scanResult ? (
              <Col className="h-6 text-light my-3">
                Scan the barcode of a record and add it to your collection
              </Col>
            ) : (
              <Col className="h-6 text-light my-3">
                Record found for barcode
                <span className="text-info mx-1">{this.state.scanResult}</span>
              </Col>
            )}

            <Button
              color="info"
              disabled={this.state.disabled}
              onClick={() => {
                this.toggle();
                this.quaggaStart();
              }}
            >
              {!this.state.scanResult ? "Scan" : "Scan again"}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {this.state.scanResult && scannedRecordApiAnswer()}
        </Row>

        <Collapse isOpen={this.state.isOpen}>
          <Row className="justify-content-center align-items-center">
            <Col xs="auto" id="vid"></Col>
          </Row>
        </Collapse>
      </Container>
    );
  }
}

export default ScanRecord;
