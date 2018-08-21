import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";

const style = {
  // height: '12rem',
  // width: '12rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  // textAlign: 'center',
  // fontSize: '1rem',
  // lineHeight: 'normal',
  // float: 'left',

  color: "white",
  padding: "1rem",

  backgroundColor: "#2222",
  zIndex: "999999999",
  height: "100%",
  position: "absolute",
  width: "100%"
};

const boxTarget = {
  drop() {
    return { name: "Dustbin" };
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };


  componentWillMount(){
    
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = style.backgroundColor;

    if (isActive) {

      this.props.onDrag ? this.props.onDrag() : null;

      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ? "Release to drop" : "Drag a box here"}
      </div>
    );
  }
}
