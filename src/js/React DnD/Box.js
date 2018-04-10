import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChartArea } from "@fortawesome/fontawesome-free-solid";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import RaisedButton from "material-ui/RaisedButton";
const style = {
  transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
  boxSizing: "border-box",
  boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
  borderRadius: "2px",
  width: "fit-content",
  margin: "20px",
  textAlign: "center",
  display: "inlineBlock",

  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  margin: ".5rem",
  background: "white",
  cursor: "move"
};

import MappedItemMenu from "./MappedItemMenu";
import ContentFilter from "material-ui/svg-icons/content/filter-list";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(cardMenuProps) {
    //this.props.card
    this.props.handleCardChange(cardMenuProps);
  }

  render() {
    const cardstyle = { ...(this.props.style || {}) };
    // <FontAwesomeIcon icon="arrows-alt" style={{marginRight:"10px"}}/>
    const {
      name,
      card,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0.4 : 1;

    const mapped = this.props.listId === 2 ? true : false;
    const sorted = this.props.listId === 3 ? true : false;
    let dragSource = mapped
      ? connectDropTarget(
          <div style={{ ...style, opacity, ...cardstyle }}>
            <span className="align-middle">{card.text} </span>
            <MappedItemMenu
              card={this.props.card}
              handleChange={this.handleChange}
            />
          </div>
        )
      : connectDropTarget(
          <div style={{ ...style, opacity, ...cardstyle }}>{card.text}</div>
        );

    dragSource = sorted
      ? connectDropTarget(
          <div style={{ ...style, opacity, ...cardstyle }}>
            <span className="align-middle">{card.text} </span>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <ContentFilter />
                </IconButton>
              }
              onChange={this.handleChangeMultiple}
              value={1}
            >
              <MenuItem value="1" primaryText="None" />
              <MenuItem value="2" primaryText="Descending" />
              <MenuItem value="3" primaryText="Ascending" />
            </IconMenu>
          </div>
        )
      : dragSource;

    return connectDragSource(dragSource);
  }
}

const cardSource = {
  // isDragging(props, monitor) {
  //   // If your component gets unmounted while dragged
  //   // (like a card in Kanban board dragged between lists)
  //   // you can implement something like this to keep its
  //   // appearance dragged:
  //   return monitor.getItem().id === props.id;
  // },

  // canDrag(props, monitor) {
  //   //disable elements already in both Mapped columns and sort
  // },

  beginDrag(props) {
    // Return the data describing the dragged item

    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },

  // monitor- wrapper that grab the changes to state of the item while it is being dragged.
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something
    // Read the original dragged item from getItem():

    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();
    const allowedDropEffect = props.allowedDropEffect;

    if (dropResult) {
      console.log(allowedDropEffect);
      let alertMessage = "";
      const isDropAllowed =
        allowedDropEffect === "any" ||
        allowedDropEffect === dropResult.dropEffect;

      if (isDropAllowed) {
        const isCopyAction = dropResult.dropEffect === "copy";
        const actionName = isCopyAction ? "copied" : "moved";
        alertMessage = `You ${actionName} ${item.name} into ${
          dropResult.name
        }!`;
      } else {
        alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${
          dropResult.name
        }`;
      }
      //alert(alertMessage); // eslint-disable-line no-alert
    }

    if (dropResult && dropResult.listId !== item.listId) {
      //   props.removeCard(item.index);
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
     // Time to actually perform the action
     props.moveCard(dragIndex, hoverIndex);

     // Note: we're mutating the monitor item here!
     // Generally it's better to avoid mutations,
     // but it's good here for the sake of performance
     // to avoid expensive index searches.
     monitor.getItem().index = hoverIndex;

    if (props.listId === monitor.getItem().listId) {
     
    }
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);
