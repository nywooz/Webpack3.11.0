import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from "react-swipeable-views";

import FontIcon from "material-ui/FontIcon";
import MapsPersonPin from "material-ui/svg-icons/maps/person-pin";
import Dashboard from "material-ui/svg-icons/action/dashboard";
import Pageview from "material-ui/svg-icons/action/description";
import SessionsMenu from "./SessionsMenu";
import SelectableMenuList from "./dialog/Mui/Menu";
import Divider from "material-ui/Divider";
import ActionInfo from "material-ui/svg-icons/action/info";
import ActionTrendingUp from "material-ui/svg-icons/action/trending-up";
import EditorPieChart from "material-ui/svg-icons/editor/pie-chart";
import MultilineChart from "material-ui/svg-icons/editor/multiline-chart";
import SvgIcon from "react-icons-kit";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { muiTheme } from "./dialog/Mui/muiTheme";

const styles = {
  headline: {
    fontSize: 10,
    paddingTop: 0,
    marginBottom: 0,
    fontWeight: 300
  },
  slide: {
    padding: 0
  }
};

const dashboardItems = [
  {
    id: 0,
    primaryText: "Dashboard 1",
    icon: () => {
      return <ActionTrendingUp />;
    },
    path: "/dashboard1"
  },
  {
    id: 1,
    primaryText: "Dashboard 2",
    icon: () => {
      return <EditorPieChart />;
    },
    path: "/dashboard2"
  }
];

const pageItems = [
  {
    id: 0,
    primaryText: "Flows",
    icon: () => {
      return <FontIcon className="fa fa-sitemap" />;
    },
    path: "/Flows"
  },
  {
    id: 1,
    primaryText: "Number Flow Map",
    icon: () => {
      return <FontIcon className="fa fa-briefcase" />;
    },
    path: "/NumberFlowMap"
  },
  {
    id: 2,
    primaryText: "Scheduling",
    icon: () => {
      return <FontIcon className="fa fa-calendar" />;
    },
    menu: [
      {
        id: 11,
        primaryText: "Schedule Groups",
        icon: () => {
          return <FontIcon />;
        },
        path: "/ScheduleGroups"
      },
      {
        id: 12,
        primaryText: "Schedules",
        icon: () => {
          return <FontIcon />;
        },
        path: "/Schedules"
      },
      {
        id: 13,
        primaryText: "Tasks",
        icon: () => {
          return <FontIcon />;
        },
        path: "/Tasks"
      }
    ]
  },

  {
    id: 3,
    primaryText: "External Data",
    icon: () => {
      return <FontIcon className="fa fa-database" />;
    },
    menu: [
      {
        id: 14,
        primaryText: "Connections",
        icon: () => {
          return <FontIcon />;
        },
        path: "/Connections"
      },
      {
        id: 15,
        primaryText: "Queries",
        icon: () => {
          return <FontIcon />;
        },
        path: "/Queries"
      }
    ]
  },
  {
    id: 4,
    primaryText: "Tags/ Waypoints",
    icon: () => {
      return <FontIcon className="fa fa-tags" />;
    },
    path: "/Tag"
  },
  {
    id: 6,
    primaryText: "Queues",
    icon: () => {
      return <FontIcon className="fa fa-briefcase" />;
    },
    path: "/Queues"
  },
  {
    id: 7,
    primaryText: "Sites",
    icon: () => {
      return <FontIcon className="fa fa-globe" />;
    },
    path: "/Sites"
  },
  {
    id: 8,
    primaryText: "Meta",
    icon: () => {
      return <FontIcon className="fa fa-code" />;
    },
    path: "/dashboard2"
  },
  {
    id: 9,
    primaryText: "Resource Manager",
    icon: () => {
      return <FontIcon className="fa fa-folder" />;
    },
    path: "/dashboard2"
  },
  {
    id: 10,
    primaryText: "Users",
    icon: () => {
      return <FontIcon className="fa fa-user" />;
    },
    path: "/Users"
  }
];

const tabs = [
  {
    icon: () => {
      return <Dashboard />;
    },
    label: "Dashboard",
    app: () => <SelectableMenuList items={dashboardItems} />
  },
  {
    icon: () => {
      return <Pageview />;
    },
    label: "Pages",
    app: () => <SelectableMenuList items={pageItems} />
  },
  {
    icon: () => {
      return <MapsPersonPin />;
    },
    label: "Sessions",
    app: () => <SessionsMenu />
  }
];

export default class TabsExampleIconText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  }

  render() {
    const { slideIndex } = this.state;

    return (
      <div>
        <Tabs onChange={this.handleChange} value={slideIndex}>
          {tabs.map((tab, index) => (
            <Tab
              style={styles.headline}
              key={index}
              icon={tab.icon()}
              label={tab.label}
              value={index}
            />
          ))}
        </Tabs>

        <SwipeableViews
          style={{}}
          animateHeight={true}
          index={slideIndex}
          onChangeIndex={e => {
            this.handleChange(slideIndex);
          }}
        >
          {tabs.map((tab, index) => (
            <div style={styles.slide} key={index}>
              {tab.app()}
            </div>
          ))}
        </SwipeableViews>
      </div>
    );
  }
}
