import React, { Component } from "react";
import './ScanRecord.css'
import axios from "axios";
import { InputGroup, Input, Row, Col, Button } from "reactstrap";
import Quagga from "quagga";

class ScanRecord extends Component {
  state = {
    scanResult: null,
    apiAnswer: null,
  };

  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.getElementById("vid"),
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
            // deviceId: "7832475934759384534"
          },
        },
        locate: true,
        decoder: {
          readers: ["ean_reader", "code_128_reader", "upc_reader"]
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

    Quagga.onProcessed(result => {

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
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {

              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
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
        axios.get("/api/scanRecord/" + data.codeResult.code).then((response) => {

          this.setState({
            scanResult: data.codeResult.code,
            apiAnswer: response.data
          });
        });
      }
    });
  }

  render() {

    return (
      <Col className="marginTop">
        <h3>Scan a Record</h3>
        <h5>Scan the Barcode of your record to add it to your collection</h5>
        {!this.state.scanResult ? (
          <Col>
            <div id="vid"></div>
          </Col>
        ) : (
          <Col>
          <Row>
            Results for scanned code {this.state.scanResult} are:
            </Row>
            <Row>
            
            {this.state.apiAnswer.map(r => <Col className="col-4" ><img src={r.thumb}></img>{r.title}</Col>)}
            
            </Row>
          </Col>
        )}
      </Col>
    );
  }
}

export default ScanRecord;
