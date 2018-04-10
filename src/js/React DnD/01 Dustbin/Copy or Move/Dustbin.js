import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "../Single Target/ItemTypes";

import update from "immutability-helper";
import Box from "./Box";

const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  padding: "1rem",
  border: "1px dashed gray",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  display: "block",
  width: "100%"
};

const boxTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    const { name } = props;
    const sourceObj = monitor.getItem();

    const indx = props.box.findIndex(item => item.text === sourceObj.name);
    if (indx !== -1) {
      return;
    }
    if (name !== sourceObj.name) component.pushCard(sourceObj.name);
    return {
      listId: name
    };
  }
  // drop({ allowedDropEffect }) {
  //   return {
  //     name: `${allowedDropEffect} Dustbin`,
  //     allowedDropEffect
  //   };
  // }
};

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  BOX: "Dustbin"
};

class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    allowedDropEffect: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.findCard = this.findCard.bind(this);
    this.state = { boxes: props.box };
  }

  onBoxLayoutChange(boxes) {
    console.log(boxes);
    this.props.onLayoutChange ? this.props.onLayoutChange(boxes) : null;
  }

  pushCard(box) {
    this.setState(
      update(this.state, {
        boxes: {
          $push: [box]
        }
      }),
      () => {
        this.onBoxLayoutChange(this.state.boxes);
      }
    );
  }

  removeCard(index) {
    this.setState(
      update(this.state, {
        boxes: {
          $splice: [[index, 1]]
        }
      }),
      () => {
        this.onCardLayoutChange(this.state.boxes);
      }
    );
  }

  findCard(text) {
    const { boxes } = this.state;
    const box = boxes.filter(c => c.text === text)[0];

    return {
      box,
      index: boxes.indexOf(box)
    };
  }

  moveCard(dragIndex, hoverIndex) {
    const { boxes } = this.state;
    const dragCard = boxes[dragIndex];

    this.setState(
      update(this.state, {
        boxes: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      }),
      () => {
        this.onCardLayoutChange(this.state.boxes);
      }
    );
  }

  render() {
    const {
      name,
      box,
      canDrop,
      isOver,
      allowedDropEffect,
      connectDropTarget
    } = this.props;
    
    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? "#f2f6f7" : "#FFF";

    // onLayoutChange={this.props.onLayoutChange}
    // onBoxLayoutChange={this.onBoxLayoutChange.bind(this)}
    // index={i}
    // listId={this.props.id}
    // card={box}
    // removeCard={this.removeCard.bind(this)}
    // moveCard={this.moveCard.bind(this)}

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {(!box || box.length === 0) && (
          <p>
            <br />
            <br />
            {isActive ? "Release to drop" : "Drop here"}
          </p>
        )}

        {box &&
          box.length > 0 &&
          box.map((item, i, arr) => (
            <Box
              key={i}
              name={item.datasource.columnName}
              containerName={name}
              style={this.props.cardstyle || {}}
              index={i}
              listId={this.props.id}
              card={box}
              onLayoutChange={this.props.onLayoutChange}
              onBoxLayoutChange={this.onBoxLayoutChange.bind(this)}
              removeCard={this.removeCard.bind(this)}
              moveCard={this.moveCard.bind(this)}
            />
          ))}
      </div>
    );
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}
export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Dustbin);
