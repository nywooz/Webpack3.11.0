import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import grid_layout from "../../css/react-grid-layout.css";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import Config from "./react-grid-config";
import { Menu, Close } from "material-ui-icons";

export default class NoCompactingLayout extends React.PureComponent {
  static defaultProps = {
    // draggableHandle: ".draggableHandle",
    margin: [10, 10],
    containerPadding: [10, 10],
    className: "layout",
    rowHeight: 40,
    isDraggable: true,
    isResizable: true,
    useCSSTransforms: true,
    // If true, grid items won't change position when being
    // dragged over.
    preventCollision: false,
    cols: 12,//{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    onLayoutChange: function() {}

    // onDragStart: function () { },
    // onDrag: function () { },
    // onDragStop: function () { },
    // onResizeStart: function () { },
    // onResize: function () { },
    // onResizeStop: function () { },
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: this.props.layouts[this.props.currentBreakpoint]|| this.props.generateLayout() || this.props.layouts
    };
  }

  componentDidMount() {
    const mounted = this.props.mounted;
    this.setState({ [mounted]: true });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ layouts: _.reject(this.state.layouts, { i: i }) });
  }

  createElement(el, index) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    const i = el.add ? "+" : el.i;


    return (
      <div key={i}
        data-grid={el}
        className={el.static ? "static" : ""}>
        <Menu className="" />

        <div>Select Tile</div>

        {el.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {i}
          </span>
        ) : (
            <span
              className="text">
              {i}
            </span>
        )}

        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          <Close />
        </span>
      </div>
    );
  }

  generateDOM() {    
    return _.map(this.state.layouts, this.createElement.bind(this), this);
  }

  onLayoutChange = (item, items) => {
    this.props.onLayoutChange(item, items);
  };

  onNewLayout = () => {
    this.props.onNewLayout();
  };

  render() {
    return (
      <div>
      
        
      <ResponsiveReactGridLayout
      {...this.props}
      layouts={this.props.layouts}
      onNewLayout={this.onNewLayout}
      onBreakpointChange={this.props.onBreakpointChange}
      onLayoutChange={this.onLayoutChange}
      // WidthProvider option
      measureBeforeMount={false}
      // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
      // and set `measureBeforeMount={true}`.
      useCSSTransforms={this.props.mounted}
      verticalCompact={this.props.verticalCompact}
      // preventCollision={!this.state.verticalCompact}
      className={"layout"}
    >
      {this.generateDOM()}
    </ResponsiveReactGridLayout>


       
      </div>
    );
  }
}


