const dashboard = require("../css/dashboard.css");
import 'typeface-roboto'

import React from "react";
import ReactDOM from "react-dom";

import PageContent from "./PageContent.jsx";


ReactDOM.render(
  <PageContent
    open={false} />,
  document.querySelector(".container-app")
);

const nav = document.querySelector(".body-nav");
const section = document.querySelector(".body-section");
