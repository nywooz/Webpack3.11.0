import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const numbers = [1, 2, 3, 4, 5];
const App = () => ( 
  
  [
    <MuiThemeProvider key={numbers[1]}>
      <RaisedButton label="Primary" primary={true} style={style} />
    </MuiThemeProvider>,

    <MuiThemeProvider key={numbers[2]}>
      <RaisedButton label="Secondary" secondary={true} style={style} />
    </MuiThemeProvider>,

    <MuiThemeProvider key={numbers[3]}>
    <RaisedButton label="Disabled" disabled={true} style={style} />
    </MuiThemeProvider>,

    <MuiThemeProvider key={numbers[4]}>
      <RaisedButton label="Full width" fullWidth={true} />
    </MuiThemeProvider>

  ]
);


export default App;



