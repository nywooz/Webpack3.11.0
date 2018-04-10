import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";


import { RaisedButton } from "material-ui";
import { Menu, Close } from "material-ui-icons";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import ContentFilter from "material-ui/svg-icons/content/filter-list";
import FileFileDownload from "material-ui/svg-icons/file/file-download";
import Customicons from "../../Mui/mui-icons";
import grid_layout from "../../../css/react-grid-layout.css";

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];

const buttonStyle = {
  marginRight: 10
};

/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 1728,//144,
    rowHeight: 30,
    
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)) || this.props.gridlayout || JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    const newItems = _.reject(this.state.layout, { i: i });
    this.setState({ layout: newItems });
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
      <div key={i} data-grid={el} className={el.static ? "static" : ""}>
        <Menu className="" />

        <div>Select</div>

        {el.static ? (
          <span
            className="text"
            title="This item is static and cannot be removed or resized."
          >
            Static - {i}
          </span>
        ) : (
          <span className="text">{i}</span>
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


  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
    console.log(layout);
  }

  render() {
    return (
      <div>
        
      <RaisedButton
      label="Clear Layout"
      secondary={true}
      onClick={this.resetLayout}
      style={buttonStyle}
        />
        
    
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
        
        
        {_.map(this.state.layout, el => this.createElement(el))}

          
     
        </ReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}


