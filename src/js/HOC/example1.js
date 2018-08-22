import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <div className="container-fluid">
    <h2> Higher-Order Components</h2>
    <p>
      A higher-order component (HOC) is an advanced technique in React for
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

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
