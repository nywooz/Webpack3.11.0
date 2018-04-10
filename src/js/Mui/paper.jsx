import React from "react";
import Paper from "material-ui/Paper";

import RaisedButton from "material-ui";

const style = {
  height: "auto",
  width: "100%",
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

const PaperExampleSimple = () => (
  <div>
    <Paper style={style} zDepth={1}>
      <p>LandingAction</p>
    </Paper>
  </div>
);

export default PaperExampleSimple;
