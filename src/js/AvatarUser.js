import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DropDownMenuOpenImmediateExample from './DropDownMenuOpenImmediateExample';
import avat from '../img/avatar-1.svg';
import { muiTheme } from './dialog/Mui/muiTheme';


const style = { margin: "8px" };

const styles = {
  padding: {
    "paddingLeft": "24px"
  }
};



/**
 * Examples of `Avatar` using an image, [Font Icon](/#/components/font-icon), [SVG Icon](/#/components/svg-icon)
 * and "Letter" (string), with and without custom colors at the default size (`40dp`) and an alternate size (`30dp`).
 */
const AvatarUser = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <List >
        <ListItem
          disabled={true}
          leftAvatar={
            <Avatar
              size={60}
              style={style}
              src={avat}
            />
          }
        >
          <p style={styles.padding} className="text-left text-light"> John Smith</p>
          <p style={styles.padding} className="text-left text-light"> 0116 123 456</p>
        </ListItem>
      </List>

      <DropDownMenuOpenImmediateExample className="text-left text-secondary" />

    </div>

  </MuiThemeProvider>
);

export default AvatarUser;







