// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator'; 
import spacing from 'material-ui/styles/spacing';

export const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#009ee1',    // '#00B2B0',    
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: '#ff4081',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 40,
    //color: palette.primary1Color,
    // textColor: pinkA200,
    // titleFontWeight: _typography2.default.fontWeightNormal,
    // padding: spacing.desktopGutter
  }
});


// MuiThemeProvider takes the theme as a property and passed it down the hierarchy.
const Main = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar title="My AppBar" />
  </MuiThemeProvider>
);

export default Main;



