import React from "react";
import ReactDOM from "react-dom";

const App = ({ name }) => (
  <div className="container-fluid">
    <h2> Higher-Order Components</h2>
    <p>
      A higher-order component ({name}) is an advanced technique in React for
      reusing component logic. HOCs are not part of the React API, per se. They
      are a pattern that emerges from React’s compositional nature
    </p>

    <p>
      Concretely, a higher-order component is a function that takes a component
      and returns a new component.
    </p>

    <code>
      const EnhancedComponent = higherOrderComponent(WrappedComponent);
    </code>
  </div>
);

export default App;

/**
 *
 *
 *
 *
 *
 *
 *
 */

//  A component that receives props and renders the children.
const Username = props => <div>{props.children}</div>;

//
//  A higher-order component that transforms and returns "usernames" in uppercase
//
//  This higher-order component receives a "WrappedComponent" as an argument.
//  Then it returns "new" component with props passed to it creating a React element
//
const hoc = WrappedComponent => props => {
  debugger;
  return (
    <div>
      <WrappedComponent {...props}>
        {props.children.toUpperCase()}
      </WrappedComponent>
    </div>
  );
};
