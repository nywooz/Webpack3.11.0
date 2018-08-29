import React from "react";
import { render, ReactDOM } from "react-dom";
var $ = require("jquery"); 

class AjaxTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    var URL = "https://api.github.com/users/nywooz";
    const that = this;

    this.makeAjaxCall(URL, "GET").then(
      function(respJson) {
        that.setState({
          isLoaded: true,
          login: respJson.login,
          name: respJson.name,
          public_repos: respJson.public_repos,
          public_gists: respJson.public_gists,
          created_at: respJson.created_at,
          url: respJson.url
        });
      },
      function(reason) {
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        this.setState({
          isLoaded: true,
          reason
        });
        console.log("error in processing your request", reason);
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  makeAjaxCall(url, methodType) {
    return $.ajax({
      url: url,
      method: methodType,
      dataType: "json"
    });
  }

  render() {
    const {
      error,
      isLoaded,
      login,
      name,
      public_repos,
      public_gists,
      created_at,
      url
    } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div />
          <div />
          <div> login: {login}</div>
          <div> name: {name} </div>
          <div> public_repos: {public_repos}</div>
          <div> public_gists: {public_gists}</div>
          <div> created_at: {created_at}</div>
          <div> url: {url}</div>
        </div>
      );
    }
  }
}

export { AjaxTest };

// https://medium.com/front-end-hacking/ajax-async-callback-promise-e98f8074ebd7
