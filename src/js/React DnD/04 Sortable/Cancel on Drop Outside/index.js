import React, { Component } from "react";
import Container from "./Container";

export default class SortableCancelOnDropOutside extends Component {
  render() {
    const { boxes, bins } = { ...this.props };
    if (boxes[0].box && Array.isArray(boxes[0].box)) {
      boxes[0].box.push({
        name: "Custom Column",
        id: "customColumn",
        text: "customColumn"
      });
    }

    return (
      <div>
        <div>
          <div
            style={{
              overflow: "hidden",
              clear: "both"
            }}
          >
            {boxes.map((item, i, arr) => (
              <Container
                key={i}
                allowedDropEffect="any"
                box={item.box}
                name={item.name}
              />
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              overflow: "hidden",
              clear: "both"
            }}
          >
            {bins.map((item, i, arr) => (
              <Container
                key={i}
                allowedDropEffect="any"
                box={item.box}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
