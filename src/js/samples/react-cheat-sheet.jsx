//  *****************************************************************************
//  ES6 Class
//  *****************************************************************************
// use class for local state and lifecycle hooks
class App extends React.Component {
  constructor(props) {
    // fires before component is mounted
    super(props); // makes this refer to this component
    this.state = { date: new Date() }; // set state
  }
  render() {
    return <h1>It is {this.state.date.toLocaleTimeString()}.</h1>;
  }

  ////////////////////////////////////////////////////
  componentWillMount() {
    //Don’t use this
    // fires immediately before the initial render
  }
  componentWillUnmount() {
    //  is invoked immediately before a component is unmounted and destroyed
  }
  componentDidMount() {
    // fires immediately after the initial render
  }

  componentWillReceiveProps(nextProps) {
    // fires when component is receiving new props
  }

  shouldComponentUpdate(nextProps, nextState) {
    //  Skips render() if returns false, defaults to true
    // fires before rendering with new props or state
  }

  componentWillUpdate(nextProps, nextState) {
    // fires immediately before rendering
    // with new props or state
  }

  componentDidUpdate(prevProps, prevState) {
    // fires immediately after rendering with new P or S
  }

  //////////////////////////////////////////////////////////
}
// CodePen Demo: http://bit.ly/react-es6-class

//  *****************************************************************************
//  Conditional Rendering
//  *****************************************************************************
// conditional rendering of elements and CSS class
function render() {
  const { isLoggedIn, username } = this.state;
  return (
    <div className={`login ${isLoggedIn ? "is-in" : "is-out"}`}>
      {!!isLoggedIn ? <p>Logged in as {username}.</p> : <p>Logged out.</p>}
    </div>
  );
}
// CodePen Demo: http://bit.ly/react-if-statements

//  *****************************************************************************
//  Hello World
//  *****************************************************************************
//  Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";
//  Render component into the DOM - only once per app
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById("root"));

//  *****************************************************************************
//  Stasteless Components
//  *****************************************************************************
const Headline = () => {
  return <h1>React Cheat Sheet</h1>;
};
// Component that receives props
const Greetings = props => {
  return <p>You will love it {props.name}.</p>;
};
// Component must only return ONE element (eg. DIV)
const Intro = () => {
  return (
    <div>
      <Headline />
      <p>Welcome to the React world!</p>
      <Greetings name="Petr" />
    </div>
  );
};
ReactDOM.render(<Intro />, document.getElementById("root"));
// Components and Props API - http://bit.ly/react-props
// CodePen Demo: http://bit.ly/react-simple
