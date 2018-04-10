import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import ItemTypes from "../Single Target/ItemTypes";
import MappedItemMenu from "../../MappedItemMenu";
import { MuiThemeProvider, getMuiTheme } from "material-ui";

import ContentFilter from "material-ui/svg-icons/content/filter-list";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  float: "left"
};

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants
const Types = {
  BOX: "box"
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
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

    if (dropResult) {
      let alertMessage = "";
      const isDropAllowed =
        dropResult.allowedDropEffect === "any" ||
        dropResult.allowedDropEffect === dropResult.dropEffect;

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
      console.log(alertMessage);
    }
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  };

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

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const {
      id,
      name,
      containerName,
      columnName,
      card,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;

    const opacity = isDragging ? 0.4 : 1;
    let boxStyle = { ...style, opacity, ...cardstyle };
    let boxed = "";

    // boxStyle =
    //   name === "Custom Column"
    //     ? ({ ...boxStyle, backgroundColor: "#dedede" })
    //     : boxStyle;

    switch (containerName) {
      case "mappedColumns":
        boxed = connectDragSource(
          <div style={boxStyle}>
            <span className="align-middle">{name} </span>
            <MappedItemMenu card={card} handleChange={this.handleChange} />
          </div>
        );
        break;
      case "sortedColumns":
        boxed = connectDragSource(
          <div style={boxStyle}>
            <span className="align-middle">{name} </span>
            <MuiThemeProvider>
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
            </MuiThemeProvider>
          </div>
        );
        break;
      default:
        boxed = connectDragSource(
          <div style={{ ...style, opacity, ...cardstyle }}>{name}</div>
        );
    }

    return boxed;
  }
}

export default DragSource(Types.BOX, boxSource, collect)(Box);
