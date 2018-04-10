import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import { indigo500 } from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import okimg from "../img/ok-128.jpg";
import kolage from "../img/kolage-128.jpg";
import uxceo from "../img/uxceo-128.jpg";
import kerem from "../img/kerem-128.jpg";
import raquelromanp from "../img/raquelromanp-128.jpg";


const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);


export default class ListExamplePhone extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <List>
                        <ListItem
                            leftIcon={<CommunicationCall color={indigo500} />}
                            rightIcon={<CommunicationChatBubble />}
                            primaryText="(650) 555 - 1234"
                            secondaryText="Mobile"
                        />
                        <ListItem
                            insetChildren={true}
                            rightIcon={<CommunicationChatBubble />}
                            primaryText="(323) 555 - 6789"
                            secondaryText="Work"
                        />
                    </List>
                    <Divider inset={true} />
                    <List>
                        <ListItem
                            leftIcon={<CommunicationEmail color={indigo500} />}
                            primaryText="aliconnors@example.com"
                            secondaryText="Personal"
                        />
                        <ListItem
                            insetChildren={true}
                            primaryText="ali_connors@example.com"
                            secondaryText="Work"
                        />
                    </List>

                    <Divider inset={true} />
                    <List>
                        <Subheader>Recent chats</Subheader>
                        <ListItem
                            leftAvatar={<Avatar src={okimg} />}
                            rightIconButton={rightIconMenu}
                            primaryText="Brendan Lim"
                            secondaryText={
                                <p>
                                    <span style={{ color: darkBlack }}>Brunch this weekend?</span><br />
                                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar src={kolage} />}
                            rightIconButton={rightIconMenu}
                            primaryText="me, Scott, Jennifer"
                            secondaryText={
                                <p>
                                    <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                                    Wish I could come, but I&apos;m out of town this weekend.
                   </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar src={uxceo} />}
                            rightIconButton={rightIconMenu}
                            primaryText="Grace Ng"
                            secondaryText={
                                <p>
                                    <span style={{ color: darkBlack }}>Oui oui</span><br />
                                    Do you have any Paris recs? Have you ever been?
                   </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar src={kerem} />}
                            rightIconButton={rightIconMenu}
                            primaryText="Kerem Suer"
                            secondaryText={
                                <p>
                                    <span style={{ color: darkBlack }}>Birthday gift</span><br />
                                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                   </p>
                            }
                            secondaryTextLines={2}
                        />
                        <Divider inset={true} />
                        <ListItem
                            leftAvatar={<Avatar src={raquelromanp} />}
                            rightIconButton={rightIconMenu}
                            primaryText="Raquel Parrado"
                            secondaryText={
                                <p>
                                    <span style={{ color: darkBlack }}>Recipe to try</span><br />
                                    We should eat this: grated squash. Corn and tomatillo tacos.
                   </p>
                            }
                            secondaryTextLines={2}
                        />
                    </List>
                </div>
            </MuiThemeProvider>
        );
    }
}