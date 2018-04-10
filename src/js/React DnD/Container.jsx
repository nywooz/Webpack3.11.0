import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Dustbin from "./Dustbin";

class Container extends Component {
  render() {
    const style = {
      //display: "flex",
      //justifyContent: "space-around",
      //paddingTop: "20px"
    };

    const {
      cardstyle,
      name,
      onLayoutChange,
      id,
      handleCardChange,
      boardstyle
    } = {
      ...this.props
    };

    return (
      <div style={{ ...style }}>
        <Dustbin
          allowedDropEffect="copy"
          handleCardChange={handleCardChange}
          id={id}
          list={this.props.items}
          cardstyle={cardstyle}
          boardstyle={boardstyle || {}}
          name={name || ""}
          onLayoutChange={onLayoutChange}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
