import React, { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { DropTarget, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "./Card";
import ItemTypes from "./ItemTypes";

const style = {
  width: 400,
  border: "1px dashed gray",
  marginTop: "60px"
};

const cardTarget = {
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

    // if (name !== sourceObj.name) component.pushCard(sourceObj.name);
    // return {
    //   name: name
    // };
    console.log(sourceObj);
  }
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.pushCard = this.pushCard.bind(this);
    this.removeCard = this.removeCard.bind(this);

    this.state = {
      cards: this.props.box
    };
  }

  onBoxLayoutChange(boxes) {
    console.log(boxes);
    this.props.onLayoutChange ? this.props.onLayoutChange(boxes) : null;
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    if (index !== -1) {
      this.setState(
        update(this.state, {
          cards: {
            $splice: [[index, 1], [atIndex, 0, card]]
          }
        })
      );
    }
  }

  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }

  pushCard(box) {
    this.setState(
      update(this.state, {
        cards: {
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
        cards: {
          $splice: [[index, 1]]
        }
      }),
      () => {
        this.onBoxLayoutChange(this.state.boxes);
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

	const { cards } = this.state;

	const cardstyle = { ...(this.props.style || {}) };
    const isActive = canDrop && isOver;
	const backgroundColor = isActive ? "#f2f6f7" : "#FFF";

    console.log(cards);

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            text={card.text}
            moveCard={this.moveCard}
            findCard={this.findCard}
            pushCard={this.pushCard}
            removeCard={this.removeCard}
          />
        ))}
      </div>
    );
  }
}
