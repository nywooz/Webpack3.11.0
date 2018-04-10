import React, { Component } from "react";
import update from "immutability-helper";
import Box from "./Box";
import { DropTarget } from "react-dnd";

class Dustbin extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: props.list };
  }

  onCardLayoutChange(cards) {
    this.props.onLayoutChange ? this.props.onLayoutChange(cards) : null;
  }

  pushCard(card) {
    this.setState(
      update(this.state, {
        cards: {
          $push: [card]
        }
      }),
      () => {
        this.onCardLayoutChange(this.state.cards);
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
        this.onCardLayoutChange(this.state.cards);
      }
    );
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      }),
      () => {
        this.onCardLayoutChange(this.state.cards);
      }
    );
  }

  handleCardChange(cardInfo, cardMenuProps) {
    const modifiedCard = { ...cardInfo, ...cardMenuProps };
    const cards = this.state.cards.slice(0);
    const index = cards.findIndex(function(item) {
      return cardInfo.id === item.id;
    });

    if (index !== -1) {
      cards[index] = modifiedCard;

      this.setState(
        {
          cards: cards
        },
        () => {
          this.onCardLayoutChange(this.state.cards);
        }
      );
      this.props.handleCardChange(cards);
    }
  }

  render() {
    const { cards } = this.state;
    const {
      name,
      canDrop,
      isOver,
      connectDropTarget,
      allowedDropEffect
    } = this.props;
    const isActive = canDrop && isOver;

    let style = {
      width: "100%",
      minHeight: "300px",
      border: "1px dashed gray"
    };

    const backgroundColor = isActive ? "#e5f7f7" : "#FFF";

    style = { ...style, backgroundColor, ...this.props.boardstyle };
    return connectDropTarget(
      <div style={style}>
        {cards.map((card, i) => {
          return (
            <Box
              name={name}
              style={this.props.cardstyle || {}}
              key={i}
              allowedDropEffect={allowedDropEffect}
              onLayoutChange={this.props.onLayoutChange}
              handleCardChange={this.handleCardChange.bind(this)}
              name={name}
              style={this.props.cardstyle || {}}
              index={i}
              listId={this.props.id}
              card={card}
              removeCard={this.removeCard.bind(this)}
              moveCard={this.moveCard.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    const { id } = props;
    const sourceObj = monitor.getItem();

    const indx = props.list.findIndex(
      item => item.text === sourceObj.card.text
    );
    if (indx !== -1) {
      return;
    }
    if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
    return {
      listId: id
    };
  }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Dustbin);
