import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";
//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";

import Board from "./js/React DnD/examples/00 Chessboard.1/Tutorial App.1/Board";
import { observe } from "./js/React DnD/examples/00 Chessboard.1/Tutorial App.1/Game";

const rootEl = document.getElementById("root");

observe(knightPosition =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, rootEl)
);



// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );
//ReactDOM.render(<RDnD />, document.querySelector("#root"));

























