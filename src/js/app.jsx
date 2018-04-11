import React from "react";
import ReactDOM from "react-dom";
//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";
//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";

import Board from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/Board";
import { observe } from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/Game";

const rootEl = document.getElementById("root");

observe(knightPosition =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, rootEl)
);

//ReactDOM.render(<RDnD />, document.querySelector("#root"));





























// const dashboard = require("../css/dashboard.css");
// import "bootstrap/dist/css/bootstrap.min.css";
// //import '../bootstrap/customizations.scss';

// import "typeface-roboto";

// import React from "react";
// import ReactDOM from "react-dom";

// import Source from "../js/React DnD/examples/01 Dustbin/Single Target/index";
// import Bin from "../js/React DnD/examples/04 Sortable/Cancel on Drop Outside/index";
// import PropTypes from 'prop-types';

// class Welcome extends React.Component {
//   render() {
//     return (
//       <div>
//         <Bin />
//         <Bin />

//       </div>

//     );
//   }
// }

// ReactDOM.render(<Welcome />, document.querySelector(".container-app"));
