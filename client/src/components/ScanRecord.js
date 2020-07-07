import React, { Component } from "react";
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
          // constraints: {
          //   width: 640,
          //   height: 480,
          //   facingMode: "environment",
          //   // deviceId: "7832475934759384534"
          // },
        },
        locate: true,
        decoder: {
          readers: ["ean_reader"],
        },
        locator: {
          halfSample: true,
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

    Quagga.onDetected((data) => {
      if (data) {
        Quagga.stop();
        axios.get("/api/scanRecord/" + data.codeResult.code).then((response) => {
          console.log("Scanned code Api result array: " + response.data);


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
      <Col>
        <h3>Scan a Record</h3>
        {!this.state.scanResult ? (
          <Col>
            <Col id="vid"></Col>
          </Col>
        ) : (
          <Col>
            Results for scanned code {this.state.scanResult} are:
            {this.state.apiAnswer.map(r => <Col>{r.title} -- <img src={r.thumb}></img> </Col>)}
          </Col>
        )}
      </Col>
    );
  }
}

export default ScanRecord;
