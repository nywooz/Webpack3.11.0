import React, { Component } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Dustbin from "../Single Target/Dustbin";

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */

const defaultProps = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
};

export default class AddRemoveLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [0, 1, 2].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1).toString()
        };
      }),
      newCounter: 0
    };
    this.canvasRef = React.createRef();

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.toolboxDrop = this.toolboxDrop.bind(this);

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props && this.props.onLayoutChange
      ? this.props.onLayoutChange(layout)
      : null;
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  // Calls when drag starts.
  onDragStart() {
    console.log("rgl: onDragStart");
  }

  toolboxDrop() {
    console.log("toolboxDrop");
    this.onAddItem();
  }

  html_onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("html_onDragEnter");
    // this.onAddItem();
  }

  html_onDrop(e) {
    console.log("html_onDrop");

    this.onAddItem();
  }

  // Calls on each drag movement.
  onDrag() {
    console.log("rgl: onDrag");
  }
  // Calls when drag is complete.
  onDragStop() {
    console.log("rgl: onDragStop");
  }
  // Calls when resize starts.
  onResizeStart() {
    console.log("rgl: onResizeStart");
  }
  // Calls when resize movement happens.
  onResize() {
    console.log("rgl: onResize");
  }
  // Calls when resize is complete.
  onResizeStop() {
    console.log("rgl: onResizeStop");
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>

        <Dustbin2 dropCallback={this.toolboxDrop}> </Dustbin2>

        <div
          onDragEnter={e => this.html_onDragEnter(e)}
          onDragOver={this.preventDefault}
          onDrop={e => this.html_onDrop(e)}
        >
          <ResponsiveReactGridLayout
            ref={this.canvasRef}
            onDragStart={this.onDragStart}
            onDrag={this.onDrag}
            onDragStop={this.onDragStop}
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.items, el => this.createElement(el))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import ItemTypes from "../Single Target/ItemTypes";

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
  // height: "100%",
  // width: "100%",
  // position: "absolute"

  activeColor: "darkgreen",
  candropColor: "darkkhaki"
};

const boxTarget = {
  drop(props, monitor, component) {
    props && props.toolboxDrop ? props.toolboxDrop() : null;
    return { name: "Dustbin" };
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Dustbin2 extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  componentWillMount() {}

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = style.backgroundColor;

    if (isActive) {
      backgroundColor = style.activeColor;
    } else if (canDrop) {
      backgroundColor = style.candropColor;
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {isActive ? "Release to drop" : "Drag a box here"}
      </div>
    );
  }
}
