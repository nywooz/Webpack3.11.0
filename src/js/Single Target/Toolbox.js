import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  border: "1px dashed gray",
  // padding: "0.5rem 1rem",
  // marginRight: "1.5rem",
  marginBottom: "0.5rem",
  cursor: "move",
  float: "left"
};

//http://react-dnd.github.io/react-dnd/docs-drag-source.html
const boxSource = {
  beginDrag(props) {
    console.log("DnD: beginDrag");
    return {
      name: props.name
    };
  },

  isDragging(props, monitor) {
    console.log("DnD: isDragging");
  },

  endDrag(props, monitor) {
    console.log("DnD: endDrag");

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
    }
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    //isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }} onClick={this.props.onClick}>
        <div style={icon_div_style}>
          <i className={"fas " + name + " fa-3x "} />
        </div>
      </div>
    );
  }
}

const icon_div_style = {
  width: "fit-content",
  background: "#eaeaea"
};
