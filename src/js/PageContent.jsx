
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { muiTheme } from "./dialog/Mui/muiTheme";
import { darkBlack } from "material-ui/styles/colors";

import FlatButton from "material-ui/FlatButton";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import DrawerMenu from "../js/DrawerMenu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Button from "./Button";
import LandingAction from "../js/Mui/paper.jsx";
import { routes } from "./data/data";

const mql = window.matchMedia(`(min-width: 800px)`);



// http://ramblings.mcpher.com/Home/excelquirks/reactredux/appnavdrawers
export default class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      open: this.props.open,
      docked: true,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleLeftTouchTap = this.handleLeftTouchTap.bind(this);
  }


  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql,open: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({
      mql: mql,
      open:  this.state.mql.matches,
    });
  }

  toggleOpen(ev) {
    this.setState({open: !this.state.open});

    if (ev) {
      ev.preventDefault();
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  handleLeftTouchTap() {
    this.handleToggle();
  }

  handleTouchTap() {
    alert("onClick triggered on the title component");
  }

  render() {
    const styles = {
      bodySection: {
        paddingTop: 72,
        marginLeft: 10,
        // marginRight: 72,
        // marginBottom: 48,
        // minHeight: 400
      },
      drawer: { width: 200 },
      contentStyle: {
        transition: "margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)"
      }
    };

    if (this.state.open) {
      styles.contentStyle.marginLeft = styles.drawer.width;
    }

    return (
      <header className="body-header" style={styles.contentStyle}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router>
            <div>
              <AppBar
                style={{
                  position: "fixed",
                  width: this.state.open
                    ? "calc(100% - " + styles.drawer.width + "px)"
                    : "100%"
                }}
                onLeftIconButtonClick={this.handleLeftTouchTap}
                onTitleClick={this.handleTouchTap}
                title=""
                iconElementRight={<FlatButton label="Save" />}
              />

              <nav className="body-nav">
                <Drawer
                  style={{ color: darkBlack }}
                  docked={this.state.docked}
                  width={styles.drawer.width}
                  open={this.state.open}
                  onRequestChange={open => this.setState({ open })}
                >
                  <DrawerMenu list={routes} />
                </Drawer>
              </nav>

              <section className="body-section" style={styles.bodySection}>
                <div>
                  {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  ))}
                </div>
              </section>
            </div>
          </Router>
        </MuiThemeProvider>
      </header>
    );
  }
}
