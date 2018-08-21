import React from "react";
import ReactDOM from "react-dom";

import "bootstrap";
import "./css/react-grid-layout.css";

//  import './css/react-grid-layout-custom.css';

// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";
//import RDnD from "./React DnD/examples/00 Chessboard.1/Tutorial App.1/index";

const rootEl = document.getElementById("root");

// import Board from "./js/React DnD/examples/00 Chessboard.1/Tutorial App.1/Board";
// import { observe } from "./js/React DnD/examples/00 Chessboard.1/Tutorial App.1/Game";

// observe(knightPosition =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, rootEl)
// );

// import AddRemoveLayout from "./js/RGL/Dynamic-add-remove";
// ReactDOM.render(<AddRemoveLayout />, rootEl);

import Skeleton from "./js/RGL/Skeleton";
ReactDOM.render(<Skeleton />, rootEl);

// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );
//ReactDOM.render(<RDnD />, document.querySelector("#root"));


// import Container from "./js/Single Target/Container";
// ReactDOM.render(<Container />, rootEl);
